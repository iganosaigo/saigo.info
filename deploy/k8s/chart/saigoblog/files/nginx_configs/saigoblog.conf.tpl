server {
    server_name {{ .Values.ingress.serverName }} www.{{ .Values.ingress.serverName }};
    listen {{ get .Values.frontend.containerPort "http-alt" | default 8080 }};
    location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html =404;
        }
}
