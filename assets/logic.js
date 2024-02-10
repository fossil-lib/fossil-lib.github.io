// Fetch the JSON data
async function fetchData() {
    try {
        const response = await fetch('fscl-project.json');
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
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${encodeHTML(project.project)}</td>
            <td>${encodeHTML(project.description)}</td>
            <td><a href="${encodeHTML(project.url)}" target="_blank">${encodeHTML(project.url)}</a></td>
            <td>${encodeHTML(project.license)}</td>
            <td>${encodeHTML(project.languages.join(', '))}</td>
        `;
        dashboardElement.appendChild(row);
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

    const filteredProjects = projects.filter(project =>
        Object.values(project).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(filter)
        )
    );

    displayProjects(filteredProjects);
}