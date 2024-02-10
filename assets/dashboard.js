// dashboard.js

// Function to fetch JSON data
async function fetchData(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        displayProjects(data.subprojects);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Display projects on page load
fetchData('fossil-wrapdb.json');

// Function to display projects
function displayProjects(subprojects) {
    const projectsElement = document.getElementById('projects');
    projectsElement.innerHTML = '';

    // Create a table
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>License</th>
                <th>Author</th>
                <th>Minimum Meson Version</th>
                <th>Repository Link</th>
                <th>Wiki Link</th>
                <th>Wrap Link</th>
                <th>Releases</th>
            </tr>
        </thead>
        <tbody id="projectsBody"></tbody>
    `;
    projectsElement.appendChild(table);

    const projectsBodyElement = document.getElementById('projectsBody');

    subprojects.forEach(subproject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${encodeHTML(subproject.name)}</td>
            <td>${encodeHTML(subproject.short_description)}</td>
            <td>${encodeHTML(subproject.license)}</td>
            <td>${encodeHTML(subproject.author)}</td>
            <td>${encodeHTML(subproject.min_meson_version)}</td>
            <td><a href="${encodeHTML(subproject.repo_link)}" target="_blank">${encodeHTML(subproject.repo_link)}</a></td>
            <td><a href="${encodeHTML(subproject.wiki_link)}" target="_blank">${encodeHTML(subproject.wiki_link)}</a></td>
            <td><a href="${encodeHTML(subproject.wrap_link)}" target="_blank">${encodeHTML(subproject.wrap_link)}</a></td>
            <td>${generateReleasesHTML(subproject.releases)}</td>
        `;
        projectsBodyElement.appendChild(row);
    });
}

// Function to generate HTML for releases
function generateReleasesHTML(releases) {
    return releases.map(release => `
        <div>
            <strong>Version:</strong> ${encodeHTML(release.version)}<br>
            <strong>Date:</strong> ${encodeHTML(release.date)}<br>
            <strong>Notes:</strong> ${encodeHTML(release.notes)}
        </div>
    `).join('');
}

// Function to encode HTML entities
function encodeHTML(text) {
    return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}