// Function to populate the table with data
function populateTable(subprojects) {
    const tableBody = document.getElementById('tableBody');

    subprojects.forEach(subproject => {
        const row = tableBody.insertRow();
        const rowData = [
            subproject.name,
            subproject.short_description,
            subproject.license,
            subproject.author,
            subproject.releases[0].date
        ];

        rowData.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    });
}

// Load the JSON data
fetch('assets/wrapdb-fossil.json')
    .then(response => response.json())
    .then(data => {
        // Access the subprojects array from the JSON data
        const subprojects = data.subprojects;
        
        // Populate the table with data
        populateTable(subprojects);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


// Fetch the JSON file
fetch('wrapdb-fossil.json')
    .then(response => response.json())
    .then(data => {
        // Create a dashboard from the JSON data
        const dashboardElement = document.getElementById('dashboard');
        data.subprojects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.short_description}</td>
                <td><a href="${project.repo_link}" target="_blank">${project.repo_link}</a></td>
                <td><a href="${project.wrap_link}" target="_blank">${project.wrap_link}</a></td>
                <td><a href="${project.wiki_link}" target="_blank">${project.wiki_link}</a></td>
                <td>${project.author}</td>
                <td>${project.license}</td>
                <td>${project.languages.join(', ')}</td>
            `;
            dashboardElement.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
