#!/usr/bin/python
from collections.abc import MutableMapping

from ansible.errors import AnsibleFilterError


def k3s_outdated(result):
    # print(result)
    if not isinstance(result, MutableMapping):
        raise AnsibleFilterError("The 'k3s_outdated' expects a dictionary")

    if 'k3s_needed' not in result:
        raise AnsibleFilterError("Input 'k3s_needed' cannot be empty")

    if 'k3s_available' not in result:
        raise AnsibleFilterError("Input 'k3s_available' cannot be empty")


    if 'k3s_installed' not in result: # K3S not installed
        return True
    elif result['k3s_needed'] == 'latest': # Latest required
        if result['k3s_available'] != result['k3s_installed']:
            return True
    elif result['k3s_installed'] != result['k3s_needed']: # Specific required
        return True

    # Vesions match. No install required
    return False


class TestModule(object):
  def tests(self):
    return {
      'k3s_outdated': k3s_outdated,
    }
 
