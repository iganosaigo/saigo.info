#!/usr/bin/env python3

# TODO: This CRAP is just first and very early version
# for nginx ssl certs fall-back test and it should be completly
# rewritten.
# It is only for simple docker/compose service implemetations.

import dataclasses
from dataclasses import dataclass, field
from distutils.util import strtobool
import json
import os
import re
import subprocess as sp
import sys
import time
from typing import Dict, List, Literal, Optional

import crossplane


NGINXCONF_REGEXP = r"(?:(?:conf\.d|vhosts?|vhosts?\.d)/[0-9a-z_-]+)\.conf$"
FQDN_REGEXP = r".+\.[a-z0-9-]{2,63}\.?$"

NGINX_DIR = "/etc/nginx"
NGINX_CONFIG = os.path.join(NGINX_DIR, "nginx.conf")
NGINX_SSL_DIR = os.path.join(NGINX_DIR, "ssl")
NGINX_ENTRYPOINT = "/docker-entrypoint.sh"
NGINX_ACME_DIR = "/usr/share/nginx/acme/"

SSL_DEFAULT_DIR = os.path.join(NGINX_DIR, "default_ssl")
SSL_CERT_NAME = "cert.crt"
SSL_KEY_NAME = "cert.key"
SSL_DEFAULT_CERT = os.path.join(SSL_DEFAULT_DIR, SSL_CERT_NAME)
SSL_DEFAULT_KEY = os.path.join(SSL_DEFAULT_DIR, SSL_KEY_NAME)
SSL_LINKED_CERT = os.path.join(NGINX_SSL_DIR, SSL_CERT_NAME)
SSL_LINKED_KEY = os.path.join(NGINX_SSL_DIR, SSL_KEY_NAME)

LTS_BASE_DIR = "/etc/letsencrypt/live"
LTS_CERTNAME = "nginx_cert"
LTS_CERT_DIR = os.path.join(LTS_BASE_DIR, LTS_CERTNAME)
LTS_CERT = os.path.join(LTS_CERT_DIR, "fullchain.pem")
LTS_KEY = os.path.join(LTS_CERT_DIR, "privkey.pem")

LTS_EMAIL = "saigonosaigo84@gmail.com"


class ConfigError(Exception):
    """Basic exception when nginx payload contains errors"""


class DataclassJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)
        return super().default(obj)


@dataclass
class ServerParams:
    server_names: List[str] = field(default_factory=list)
    ssl_cert_file: Optional[str] = None
    ssl_key_file: Optional[str] = None
    ssl: bool = False


@dataclass
class FileData:
    file: str
    data: List[ServerParams] = field(default_factory=list)


def find_server_names(obj: List) -> List[str]:
    server_names = [x for x in obj if x]
    return server_names


def get_server_params(obj: List) -> ServerParams:
    result = ServerParams()

    for block in obj:
        directive = block["directive"]

        if directive == "server_name":
            result.server_names.extend(find_server_names(block["args"]))
        elif directive == "ssl_certificate":
            result.ssl_cert_file = block["args"][0]
        elif directive == "ssl_certificate_key":
            result.ssl_key_file = block["args"][0]
        elif directive == "listen":
            if "ssl" in block["args"]:
                result.ssl = True

    return result


def get_server_blocks(obj: List, file: str) -> FileData:
    result = FileData(file=file)

    for block in obj:
        directive = block["directive"]
        if directive == "server":
            server_block = block["block"]
            data = get_server_params(server_block)
            result.data.append(data)
    return result


def make_config_data(obj: List[Dict]) -> List[FileData]:
    result = []
    for file_block in obj:
        file = file_block["file"]
        file_match = re.search(NGINXCONF_REGEXP, file)
        if file_match and len(file_block["parsed"]) > 0:
            data = get_server_blocks(file_block["parsed"], file)
            result.append(data)

    return result


def get_all_ssl_domains(data: List[FileData]) -> List[str]:
    result = []
    for file in data:
        for server in file.data:
            if server.ssl and server.ssl_cert_file:
                result.extend(server.server_names)

    return sorted(result)


def convert_altnames_to_str(alt_names: List[str]) -> str:
    modified_names = [f"DNS:{x}" for x in alt_names]
    return ",".join(modified_names)


def run_cmd(cmd: List) -> sp.CompletedProcess:
    proc = sp.run(cmd, capture_output=True)
    if proc.returncode != 0:
        print(proc.stderr)
        exit(1)
    return proc


def create_selfsigned_cert(
    *,
    domain_names: List[str],
    cert_key_name: str = "cert.key",
    cert_file_name: str = "cert.crt",
) -> None:
    common_name = domain_names[0]
    cmd = [
        "openssl",
        "req",
        "-x509",
        "-keyout",
        os.path.join(SSL_DEFAULT_DIR, cert_key_name),
        "-out",
        os.path.join(SSL_DEFAULT_DIR, cert_file_name),
        "-newkey",
        "rsa:4096",
        "-sha256",
        "-days",
        "10",
        "-nodes",
        "-subj",
        f"/CN={common_name}",
    ]

    if len(domain_names) > 1:
        alt_names = convert_altnames_to_str(domain_names[1:])
        cmd.extend(
            [
                "-addext",
                f"subjectAltName={alt_names}",
            ],
        )

    run_cmd(cmd)


def link_file(src: str, dest: str) -> None:
    os.symlink(src=src, dst=dest)


def create_link(src: str, link: str) -> None:
    if os.path.exists(link):
        if os.readlink(link) != src:
            os.remove(link)
            link_file(src, link)
    else:
        link_file(src, link)


def link_ssl(ssl_type: Literal["letsencrypt", "selfsigned"]) -> None:
    mapping = {
        "selfsigned": [
            {"src": SSL_DEFAULT_KEY, "link": SSL_LINKED_KEY},
            {"src": SSL_DEFAULT_CERT, "link": SSL_LINKED_CERT},
        ],
        "letsencrypt": [
            {"src": LTS_CERT, "link": SSL_LINKED_CERT},
            {"src": LTS_KEY, "link": SSL_LINKED_KEY},
        ],
    }

    for item in mapping[ssl_type]:
        src = item["src"]
        link = item["link"]

        create_link(src, link)


def test_nginx() -> None:
    cmd_nginx_test = ["nginx", "-t"]
    try:
        run_cmd(cmd_nginx_test)
    except sp.TimeoutExpired:
        print("Nginx process not responding. Exited.")
        exit(1)


def run_nginx_bg() -> sp.Popen:
    cmd_nginx_run = ["nginx", "-g", "daemon off;"]
    process = sp.Popen(cmd_nginx_run)
    return process


def run_certbot(*, domains: List, email: str) -> None:
    cmd_certbot = [
        "certbot",
        "certonly",
        # "--staging",
        "--expand",
        "--agree-tos",
        "--keep",
        "--noninteractive",
        "--text",
        "--preferred-challenges",
        "http",
        "--debug",
        "--webroot",
        "--webroot-path",
        NGINX_ACME_DIR,
    ]
    alt_names = [f"-d {x}" for x in domains]
    cmd_certbot.extend(alt_names)
    cmd_certbot.extend(["--email", email])
    cmd_certbot.extend(["--cert-name", LTS_CERTNAME])

    run_cmd(cmd_certbot)


def exec_entrypoint() -> None:
    argv = [NGINX_ENTRYPOINT]
    argv.extend(sys.argv[1:])
    os.execv(NGINX_ENTRYPOINT, argv)


def main():
    LTS_ENABLE = strtobool(os.getenv("APP_LETSENCRYPT", "False"))

    NGINX_PARSE: Dict = crossplane.parse(NGINX_CONFIG)
    if NGINX_PARSE["status"] != "ok":
        raise ConfigError("Nginx config parse error")

    nginx_data = make_config_data(NGINX_PARSE["config"])
    ssl_domains = get_all_ssl_domains(nginx_data)

    if ssl_domains:
        if not (os.path.exists(SSL_DEFAULT_CERT) or os.path.exists(SSL_DEFAULT_KEY)):
            create_selfsigned_cert(domain_names=ssl_domains)

        if LTS_ENABLE:
            LTS_EMAIL = os.environ["APP_LETSENCRYPT_EMAIL"]

            # TODO: Temporary because of docker volumes
            if os.path.exists(LTS_CERT_DIR):
                link_ssl("letsencrypt")
            else:
                link_ssl("selfsigned")

            test_nginx()
            nginx_bg = run_nginx_bg()
            time.sleep(2)
            try:
                run_certbot(domains=ssl_domains, email=LTS_EMAIL)
            finally:
                nginx_bg.terminate()

            link_ssl("letsencrypt")
        else:
            link_ssl("selfsigned")

    test_nginx()
    exec_entrypoint()


if __name__ == "__main__":
    main()
