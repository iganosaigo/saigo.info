#!/usr/bin/env bash

usage() {
    echo "Usage:"
    echo "${0} environment command [options]"
}

write_ansible_inventory() {
    output=$(echo $1 | jq)
    cat > ${ansible_inventory_file} <<-EOF
#!/usr/bin/env bash
cat << END
$output
END
EOF

    chmod u+x ${ansible_inventory_file}
}

check_return_code() {
    if [[ $1 -gt 0 ]]; then
        echo
        echo "${2} not available"
        echo
        exit 1
    fi
}

# TODO: Make TF output without dict. Just simple strings.
get_tf_output() {
    ansible_inventory=$($tf_cmd output -json ${tf_output_inventory} 2>/dev/null )
    check_return_code $? "Inventory"

    ansible_user=$($tf_cmd output -raw ${tf_output_user} 2>/dev/null)
    check_return_code $? "Deploy User"
}


clean_inventory_file() {
    if [[ $ansible_clean = true ]]; then
        rm -f $ansible_inventory_file
    fi
}

do_inventory_template() {
    local inventory_template='{"webserver":{"hosts":["%s"],"vars":{"ansible_host":"%s"}}}'
    local data=$(printf $inventory_template $1 $2)
    echo $data
}

run_playbook() {
    playbook=$1
    params=${@:2}
    ansible-playbook -D -i ${ansible_inventory_file} -u ${ansible_user} ${playbook} -e "env=${ENV}" ${params}
}

run_ansible() {
    cd $ansible_dir
    write_ansible_inventory $ansible_inventory
    run_playbook ${ansible_playbook} $@
    clean_inventory_file
}

check_kubeconf() {
    if [[ ! -f $1 ]]; then
        check_return_code 1 "kubeconfig not awailable"
    fi
}

run_helm() {
    kubeconf="$ansible_dir/kubeconfig-${ENV}"
    check_kubeconf $kubeconf
    cd $k8s_dir/helmfile
    KUBECONFIG=$kubeconf helmfile --concurrency=1 $@
    cd $k8s_dir
    KUBECONFIG=$kubeconf kubectl apply -f ./manifests/${ENV}
}

make_backup() {
    cd $ansible_dir
    # Compose deperecated
    # if [[ ! -f $ansible_inventory_file ]]; then
    #     write_ansible_inventory $ansible_inventory
    # fi
    # run_playbook make_backup.yaml $@
    # clean_inventory_file
    kubeconf="$PWD/kubeconfig-${ENV}" 
    if [[ ! -f $kubeconf ]] ; then
        check_return_code 1 "kubeconfig not awailable"
    fi

    if [[ ! -d backup ]]; then
        mkdir backup
    fi

    echo
    read -p "DB name: " db_name
    read -p "Username: " db_username
    read -sp "Password: " db_pass
    echo

    time_now=$(date +%Y%m%dT%H%M%S)
    KUBECONFIG=$kubeconf kubectl exec  postgres-postgresql-0 -- \
        bash -c "\
            PGPASSWORD=$db_pass pg_dump -U $db_username \
            -O --clean --if-exists -Z 4 $db_name" \
            > backup/${ENV}_db_${time_now}.gz

}

check_prod_tf_output() {
    if [[ $ENV == 'prod' ]]; then
        get_tf_output
    fi
}

