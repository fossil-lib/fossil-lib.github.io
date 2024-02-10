// Function to fetch JSON data
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
    const searchInput = document.getElementById('searchInput');

    // Function to create a table row
    function createTableRow(project) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${encodeHTML(project.project)}</td>
            <td>${encodeHTML(project.description)}</td>
            <td><a href="${encodeHTML(project.url)}" target="_blank">${encodeHTML(project.url)}</a></td>
            <td>${encodeHTML(project.license)}</td>
            <td>${encodeHTML(project.languages.join(', '))}</td>
        `;
        dashboardElement.appendChild(row);
    }

    // Function to create a tile
    function createTile(project) {
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        tile.innerHTML = `
            <h3>${encodeHTML(project.project)}</h3>
            <p>${encodeHTML(project.description)}</p>
            <p><strong>GitHub URL:</strong> <a href="${encodeHTML(project.url)}" target="_blank">${encodeHTML(project.url)}</a></p>
            <p><strong>License:</strong> ${encodeHTML(project.license)}</p>
            <p><strong>Languages:</strong> ${encodeHTML(project.languages.join(', '))}</p>
        `;
        dashboardElement.appendChild(tile);
    }

    // Function to encode HTML entities
    function encodeHTML(text) {
        return document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;
    }

    // Function to filter the list
    function filterList() {
        const filter = searchInput.value.toLowerCase();
        const filteredProjects = projects.filter(project =>
            Object.values(project).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(filter)
            )
        );

        // Clear existing content
        dashboardElement.innerHTML = '';

        // Choose between table and tile view based on screen size
        if (window.innerWidth <= 600) {
            filteredProjects.forEach(createTile);
        } else {
            // Create table header
            const tableHeader = document.createElement('tr');
            tableHeader.innerHTML = '<th>Dependency</th><th>Description</th><th>GitHub URL</th><th>License</th><th>Languages</th>';
            dashboardElement.appendChild(tableHeader);

            // Create table rows
            filteredProjects.forEach(createTableRow);
        }
    }

    // Event listener for screen size changes
    window.addEventListener('resize', filterList);

    // Initial display based on screen size
    filterList();
}