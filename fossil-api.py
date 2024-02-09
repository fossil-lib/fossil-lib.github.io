import requests
import json

def get_fossil_logic_wraps():
    github_token = "GITHUB_TOKEN"
    org_name = "fossil-lib"
    api_url = f"https://api.github.com/orgs/{org_name}/repos"

    headers = {"Authorization": f"token {github_token}"}
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        repos = response.json()
        fossil_logic_wraps = []

        for repo in repos:
            repo_name = repo["name"]

            if repo_name == ".github" or repo_name == "fossil-lib.github.io":
                continue

            wrap_entry = {
                "project": repo_name,
                "description": repo.get("description", ""),
                "url": repo["html_url"],
                "revision": "latest",
                "license": "Unknown"
            }

            fossil_logic_wraps.append(wrap_entry)

        return fossil_logic_wraps
    else:
        print(f"Failed to retrieve repositories. Status code: {response.status_code}")
        return None

def generate_json_file(data, output_file="fscl-project.json"):
    with open(output_file, "w") as json_file:
        json.dump({"projects": data}, json_file, indent=2)

if __name__ == "__main__":
    wraps_data = get_fossil_logic_wraps()

    if wraps_data:
        generate_json_file(wraps_data)
        print("Fossil Logic wraps JSON file generated successfully.")
    else:
        print("Failed to generate Fossil Logic wraps JSON file.")
