document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch('wrapdb-fossil.json')
        .then(response => response.json())
        .then(data => {
            // Call the function to populate the table view
            populateTableView(data.subprojects);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateTableView(subprojects) {
    // Get the dashboard container
    const dashboardContainer = document.getElementById('dashboard');

    // Create a table element
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Short Description', 'License', 'Author', 'Min Meson Version', 'Release Date'];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Iterate through subprojects and populate table rows
    subprojects.forEach(subproject => {
        const row = document.createElement('tr');
        
        const columns = [
            subproject.name,
            subproject.short_description,
            subproject.license,
            subproject.author,
            subproject.min_meson_version,
            subproject.releases[0].date
        ];

        columns.forEach(columnText => {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(columnText));
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the dashboard container
    dashboardContainer.appendChild(table);
}
