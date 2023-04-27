#!/usr/bin/env bash

# TODO: Rewrite needed.
# Initially I just wanted some small entry point with couple dozens lines.
# And at the end it has became to this pile of CRAP at the end.
# Also i wanted some kind of "dynamic" inventory for Ansible. This is a
# sort of... Maybe I'll create dynamic inventory script when
# there'll be time for it or necessity...
# Need completly to be rewritten

current_dir=$(pwd)
script_dir=$(dirname $(realpath $0))

ENV=$1

tf_dir="$(dirname ${script_dir})/terraform"
tf_cmd="terraform -chdir=./${ENV}"
tf_backend="../backend-${ENV}.tf"
tf_output_inventory="ansible_inventory"
tf_output_user="ansible_user"

ansible_dir="$(dirname ${script_dir})/ansible"
k8s_dir="$(dirname ${script_dir})/k8s"
ansible_inventory_file="inventory_${ENV}.sh"
ansible_clean=false
ansible_playbook="playbook.yaml"
ansible_deploy_mode="k3s"

test_host="test01"
test_addr="192.168.2.31"
test_user="saigo"

source $script_dir/utils.sh

if [[ $# -eq 0 || $1 == "help" ]]; then
    usage
    exit
fi

if [[ "${current_dir}" != "${tf_dir}" ]]; then
    cd $tf_dir
fi

# For now. Test server is my local vm.
if [[ $ENV == 'test' ]] ; then
    ansible_inventory=$(do_inventory_template $test_host $test_addr)
    ansible_user=$test_user
fi

case $2 in
    "init")
        terraform -chdir=./$ENV init -backend-config=$tf_backend
        ;;

    "inventory")
        if [[ $ENV == 'prod' ]]; then
            $tf_cmd output -json $tf_output_inventory 2>/dev/null
            check_return_code $? "Inventory"
        elif [[ $ENV == 'test' ]]; then
            do_inventory_template $test_host $test_addr
        fi
        ;;

    "deploy")
        if [[ $ENV == 'prod' ]]; then
            TF_IN_AUTOMATION=1 $tf_cmd init -backend-config=$tf_backend -input=false
            TF_IN_AUTOMATION=1 $tf_cmd apply -auto-approve -input=false
            get_tf_output
        fi

        run_ansible -e "env=$ENV" -e "deploy_mode=$ansible_deploy_mode"
        sleep 100
        run_helm -e $ENV apply
        ;;

    "ansible")
        check_prod_tf_output
        run_ansible -e "env=$ENV" -e "deploy_mode=$ansible_deploy_mode" ${@:3}
        ;;

    "terraform")
        $tf_cmd ${@:3}
        ;;

    "make_backup")
        check_prod_tf_output
        make_backup ${@:3}
        ;;

    "helm")
        run_helm -e $ENV ${@:3}
        ;;

    *)
        usage
        ;;
esac
