document.addEventListener('DOMContentLoaded', function () {
    const dashboardElement = document.getElementById('../dashboard');
    const searchInput = document.getElementById('searchInput');

    // Fetch data from JSON file
    fetch('../wrapdb-fossil.json')
        .then(response => response.json())
        .then(data => {
            displaySubprojects(data.subprojects);

            // Event listener for search input
            searchInput.addEventListener('input', function () {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredSubprojects = data.subprojects.filter(subproject =>
                    subproject.name.toLowerCase().includes(searchTerm)
                );

                displaySubprojects(filteredSubprojects);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function displaySubprojects(subprojects) {
        // Clear previous content
        dashboardElement.innerHTML = '';

        subprojects.forEach(subproject => {
            const tile = document.createElement('div');
            tile.className = 'tile';

            const tileHeader = document.createElement('div');
            tileHeader.className = 'tile-header';
            tileHeader.innerHTML = `<h2>${subproject.name}</h2>`;

            const tileBody = document.createElement('div');
            tileBody.className = 'tile-body';
            tileBody.innerHTML = `<p>${subproject.short_description}</p>`;

            const tileLinks = document.createElement('div');
            tileLinks.className = 'tile-links';
            tileLinks.innerHTML = `
                <a href="${subproject.repo_link}" class="link-button" target="_blank">Repository</a>
                <a href="${subproject.wiki_link}" class="link-button" target="_blank">Wiki</a>
                <a href="${subproject.wrap_link}" class="link-button" target="_blank">Documentation</a>
            `;

            tile.appendChild(tileHeader);
            tile.appendChild(tileBody);
            tile.appendChild(tileLinks);

            dashboardElement.appendChild(tile);
        });
    }
});
