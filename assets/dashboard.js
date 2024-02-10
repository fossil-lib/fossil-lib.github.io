// dashboard.js

// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('api/fossil/wrapdb-fossil.json');
        const data = await response.json();
        displayProjects(data.subprojects);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Display subprojects on page load
fetchData();

// Function to display projects
function displayProjects(projects) {
    const dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = '';

    const isMobileView = window.innerWidth <= 600;

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        const description = isMobileView ? project.long_description : project.short_description;

        projectItem.innerHTML = `
            <p><strong>${encodeHTML(project.name)}</strong></p>
            <p>${encodeHTML(description)}</p>
            <p><a href="${encodeHTML(project.repo_link)}" target="_blank">${encodeHTML(project.repo_link)}</a></p>
            <p>License: ${encodeHTML(project.license)}</p>
            <p>Min Meson Version: ${encodeHTML(project.min_meson_version)}</p>
            <p>Wiki Link: <a href="${encodeHTML(project.wiki_link)}" target="_blank">${encodeHTML(project.wiki_link)}</a></p>
            <p>Wrap Link: <a href="${encodeHTML(project.wrap_link)}" target="_blank"  download="${encodeHTML(subproject.wrap_link)}.wrap">${encodeHTML(project.wrap_link)}</a></p>
            <p>Releases: ${encodeHTML(displayReleases(project.releases))}</p>
        `;
        dashboardElement.appendChild(projectItem);
    });
}

// Function to display releases
function displayReleases(releases) {
    return releases.map(release => {
        return `<div>Version: ${encodeHTML(release.version)}, Date: ${encodeHTML(release.date)}, Notes: ${encodeHTML(release.notes)}</div>`;
    }).join('');
}

// Function to encode HTML entities
function encodeHTML(text) {
    return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}

// Function to filter the list
function filterList() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();

    const subprojectItems = document.querySelectorAll('.subproject-item');

    subprojectItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        item.style.display = itemText.includes(filter) ? '' : 'none';
    });
}

// Check screen width and apply appropriate view
function applyResponsiveView() {
    const screenWidth = window.innerWidth;
    const dashboardElement = document.getElementById('dashboard');

    if (screenWidth <= 600) {
        dashboardElement.classList.add('mobile-view');
        dashboardElement.classList.remove('desktop-view');
    } else {
        dashboardElement.classList.add('desktop-view');
        dashboardElement.classList.remove('mobile-view');
    }
}

// Apply responsive view on page load and resize
applyResponsiveView();
window.addEventListener('resize', applyResponsiveView);
