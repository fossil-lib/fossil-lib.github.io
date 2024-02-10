// Load the JSON data
    fetch('wrapdb-fossil.json')
        .then(response => response.json())
        .then(data => {
            // Access the subprojects array from the JSON data
            const subprojects = data.subprojects;

            // Get the table body element
            const tableBody = document.getElementById('tableBody');

            // Create table rows for each subproject
            subprojects.forEach(subproject => {
                // Create a table row
                const row = tableBody.insertRow();

                // Create cells for each property in the subproject
                const properties = ['name', 'short_description', 'license', 'author', 'repo_link'];
                properties.forEach(property => {
                    const cell = row.insertCell();
                    if (property === 'repo_link') {
                        // For the GitHub Repo column, create a link
                        const link = document.createElement('a');
                        link.href = subproject[property];
                        link.textContent = 'GitHub Repo';
                        cell.appendChild(link);
                    } else {
                        // For other columns, directly set the text content
                        cell.textContent = property.split('.').reduce((obj, key) => obj[key], subproject);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
