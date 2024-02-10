// dashboard.js

// Function to fetch subproject data
async function fetchSubprojectData(language, file) {
    try {
        const response = await fetch(file);
        const data = await response.json();
        displaySubprojects(language, data.subprojects);
    } catch (error) {
        console.error(`Error fetching ${language} subproject data:`, error);
    }
}

// Function to display subprojects
function displaySubprojects(language, subprojects) {
    const dashboardElement = document.getElementById('dashboard');
    subprojects.forEach(subproject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${encodeHTML(subproject.name)}</td>
            <td>${encodeHTML(subproject.short_description)}</td>
            <td><a href="${encodeHTML(subproject.repo_link)}" target="_blank">${encodeHTML(subproject.repo_link)}</a></td>
            <td>${encodeHTML(subproject.license)}</td>
            <td>${encodeHTML(subproject.languages.join(', '))}</td>
            <td>${encodeHTML(subproject.min_meson_version)}</td>
            <td>${encodeHTML(subproject.author)}</td>
            <td><a href="${encodeHTML(subproject.wiki_link)}" target="_blank">Wiki</a></td>
            <td><a href="${encodeHTML(subproject.wrap_link)}" target="_blank">Wrap</a></td>
            <td>${generateReleases(subproject.releases)}</td>
        `;
        dashboardElement.appendChild(row);
    });
}

// Function to generate releases HTML
function generateReleases(releases) {
    if (!releases || releases.length === 0) {
        return 'No releases';
    }

    return releases.map(release => `
        <p>Version: ${encodeHTML(release.version)}</p>
        <p>Date: ${encodeHTML(release.date)}</p>
        <p>Notes: ${encodeHTML(release.notes)}</p>
    `).join('<hr>');
}

// Function to encode HTML entities
function encodeHTML(text) {
    return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}

// Fetch subproject data from fossil-wrapdb.json
fetch('fossil-wrapdb.json')
    .then(response => response.json())
    .then(data => {
        // Loop through wrapdb array and fetch subproject data
        data.wrapdb.forEach(entry => {
            fetchSubprojectData(entry.language, entry.file);
        });
    })
    .catch(error => console.error('Error fetching fossil-wrapdb.json:', error));