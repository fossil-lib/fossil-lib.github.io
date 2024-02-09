import requests
import json

def get_github_action_status(repo):
    url = f'https://api.github.com/repos/fossil-lib/{repo}/actions/runs'
    response = requests.get(url, headers={'Accept': 'application/vnd.github.v3+json'})
    
    if response.status_code == 200:
        data = response.json()
        if data.get('workflow_runs'):
            latest_run = data['workflow_runs'][0]
            return latest_run['conclusion'] if 'conclusion' in latest_run else 'Unknown'
    
    return 'Unknown'

def update_gh_action_status():
    repositories = [
        'fscl-xtest-c',
        'fscl-xmock-c',
        'fscl-xcore-c',
        'fscl-xutil-c',
        'fscl-xdata-c',
        'fscl-xscience',
        'fscl-xstring-c',
        'fscl-xfish-c',
        'fscl-xcude-c',
        'fscl-xpattern-c'
        # Add more repositories as needed
    ]

    status_data = {'repositories': []}

    for repo in repositories:
        status = get_github_action_status(repo)
        status_data['repositories'].append({'name': repo, 'status': status})

    with open('gh-action-status.json', 'w') as json_file:
        json.dump(status_data, json_file, indent=2)

if __name__ == '__main__':
    update_gh_action_status()
