const orgName = 'fossil-lib';
const excludedRepos = ['.github', 'fossil-lib.github.io'];

async function fetchRepos() {
try {
  const response = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
  const repos = await response.json();

  const filteredRepos = repos.filter(repo => !excludedRepos.includes(repo.name));

  displayRepos(filteredRepos);
} catch (error) {
  console.error('Error fetching repositories:', error);
}
}

async function fetchRepoDetails(repo) {
try {
  const detailsResponse = await fetch(`https://api.github.com/repos/${orgName}/${repo.name}`);
  const details = await detailsResponse.json();

  // Extracting relevant details
  const { name, description, html_url: projectLink, homepage, language, owner, releases_url } = details;

  // Fetch the latest release
  const releaseResponse = await fetch(releases_url);
  const releases = await releaseResponse.json();
  const latestRelease = releases[0] ? releases[0].tag_name : 'No releases';

  // Display the details in the table
  displayRepoDetailsInTable({ name, description, projectLink, homepage, language, owner, latestRelease });
} catch (error) {
  console.error(`Error fetching details for ${repo.name}:`, error);
}
}

function displayRepoDetailsInTable({ name, description, projectLink, homepage, language, owner, latestRelease }) {
const repoBody = document.getElementById('repoBody');
const tr = document.createElement('tr');

// Create HTML for the repository details in a table row
tr.innerHTML = `
  <td>${name}</td>
  <td>${description || 'No description available'}</td>
  <td>${owner.login}</td>
  <td>${language || 'Not specified'}</td>
  <td><a href="${projectLink}" target="_blank">${projectLink}</a></td>
  <td><a href="${homepage}" target="_blank">${homepage || 'Not available'}</a></td>
  <td>${latestRelease}</td>
`;

repoBody.appendChild(tr);
}

function displayRepos(repos) {
const repoBody = document.getElementById('repoBody');

repos.forEach(async repo => {
  await fetchRepoDetails(repo);
});
}

// Fetch and display repositories on page load
fetchRepos();

function filterTable() {
const input = document.getElementById('searchInput').value.toUpperCase();
const rows = document.getElementById('repoBody').getElementsByTagName('tr');

for (let i = 0; i < rows.length; i++) {
  const projectName = rows[i].getElementsByTagName('td')[0].textContent.toUpperCase();
  if (projectName.indexOf(input) > -1) {
    rows[i].style.display = '';
  } else {
    rows[i].style.display = 'none';
  }
}
}
