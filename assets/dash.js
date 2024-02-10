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
