// dashboard.js

// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('api/fossil/wrapdb-fossil.json');
        const data = await response.json();
        displaySubprojects(data.subprojects);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Display subprojects on page load
fetchData();

// Function to display subprojects
function displaySubprojects(subprojects) {
    const dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = '';

    subprojects.forEach(subproject => {
        const subprojectItem = document.createElement('div');
        subprojectItem.className = 'subproject-item';
        subprojectItem.innerHTML = `
            <p><strong>${encodeHTML(subproject.name)}</strong></p>
            <p>${encodeHTML(subproject.short_description)}</p>
            <p>${encodeHTML(subproject.long_description)}</p>
            <p>License: ${encodeHTML(subproject.license)}</p>
            <p>Author: ${encodeHTML(subproject.author)}</p>
            <p>Min Meson Version: ${encodeHTML(subproject.min_meson_version)}</p>
            <p><a href="${encodeHTML(subproject.repo_link)}" target="_blank">Repository Link</a></p>
            <p><a href="${encodeHTML(subproject.wiki_link)}" target="_blank">Wiki Link</a></p>
            <p><a href="${encodeHTML(subproject.wrap_link)}" target="_blank" download="${encodeHTML(subproject.wrap_link)}.wrap">Wrap Link</a></p>
            <p>Releases: ${encodeHTML(displayReleases(subproject.releases))}</p>
        `;
        dashboardElement.appendChild(subprojectItem);
    });
}

// Function to display releases
function displayReleases(releases) {
    return releases.map(release => `
        Version: ${encodeHTML(release.version)}, 
        Date: ${encodeHTML(release.date)}, 
        Notes: ${encodeHTML(release.notes)}
    `).join('<br>');
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
