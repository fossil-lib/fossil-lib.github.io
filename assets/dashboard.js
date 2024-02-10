// dashboard.js

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProjects(data.subprojects);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function displayProjects(projects) {
    const projectsElement = document.getElementById('projects');
    projectsElement.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.innerHTML = `
            <h2>${encodeHTML(project.name)}</h2>
            <p>${encodeHTML(project.short_description)}</p>
            <p>${encodeHTML(project.long_description)}</p>
            <p>License: ${encodeHTML(project.license)}</p>
            <p>Author: ${encodeHTML(project.author)}</p>
            <p>Minimum Meson Version: ${encodeHTML(project.min_meson_version)}</p>
            <p>Repo Link: <a href="${encodeHTML(project.repo_link)}" target="_blank">${encodeHTML(project.repo_link)}</a></p>
            <p>Wiki Link: <a href="${encodeHTML(project.wiki_link)}" target="_blank">${encodeHTML(project.wiki_link)}</a></p>
            <p>Wrap Link: <a href="${encodeHTML(project.wrap_link)}" target="_blank">${encodeHTML(project.wrap_link)}</a></p>
            <h3>Releases:</h3>
            <ul>
                ${project.releases.map(release => `
                    <li>
                        Version: ${encodeHTML(release.version)}
                        Date: ${encodeHTML(release.date)}
                        Notes: ${encodeHTML(release.notes)}
                    </li>
                `).join('')}
            </ul>
        `;
        projectsElement.appendChild(card);
    });
}

function encodeHTML(text) {
    return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}

function filterList() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();

    const filteredProjects = projects.filter(project =>
        Object.values(project).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(filter)
        )
    );

    displayProjects(filteredProjects);
}