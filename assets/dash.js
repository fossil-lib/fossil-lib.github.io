// Load the JSON data
fetch('../wrapdb-fossil.json') // Adjust the path to the JSON file
  .then(response => response.json())
  .then(data => {
    // Access the subprojects array from the JSON data
    const subprojects = data.subprojects;

    // Get the table body
    const tableBody = document.getElementById('tableBody');

    // Create table rows for each subproject
    subprojects.forEach(subproject => {
      const row = tableBody.insertRow();

      // Extract data from the subproject
      const { name, short_description, license, author, releases } = subproject;

      // Format release date
      const releaseDate = releases.length > 0 ? releases[0].date : "N/A";

      // Cell data
      const rowData = [name, short_description, license, author, releaseDate];

      rowData.forEach(cellData => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
