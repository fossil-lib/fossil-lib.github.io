// dashboard.js

// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('api/fossil/wrapdb-fossil.json');
        const data = await response.json();
        displayProjects(data.projects);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Display projects on page load
fetchData();

// Function to display projects
function displayProjects(projects) {
    const dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <p><strong>${encodeHTML(project.project)}</strong></p>
            <p>${encodeHTML(project.description)}</p>
            <p><a href="${encodeHTML(project.url)}" target="_blank">${encodeHTML(project.url)}</a></p>
            <p>License: ${encodeHTML(project.license)}</p>
            <p>Languages: ${encodeHTML(project.languages.join(', '))}</p>
        `;
        dashboardElement.appendChild(projectItem);
    });
}

// Function to encode HTML entities
function encodeHTML(text) {
    return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}

// Function to filter the list
function filterList() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();

    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
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
