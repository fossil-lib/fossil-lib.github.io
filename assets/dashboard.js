document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from JSON file
    fetch('assets/wrapdb-fossil.json')
        .then(response => response.json())
        .then(data => {
            // Process data and build dashboard
            buildDashboard(data.subprojects);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to build the dashboard
    function buildDashboard(subprojects) {
        const dashboardElement = document.getElementById('dashboard');

        // Loop through each subproject and create a tile
        subprojects.forEach(subproject => {
            const tile = createTile(subproject);
            dashboardElement.appendChild(tile);
        });
    }

    // Function to create a tile for a subproject
    function createTile(subproject) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        const tileHeader = document.createElement('div');
        tileHeader.classList.add('tile-header');
        tileHeader.textContent = subproject.name;
        tile.appendChild(tileHeader);

        const tileBody = document.createElement('div');
        tileBody.classList.add('tile-body');

        const shortDescription = document.createElement('p');
        shortDescription.textContent = subproject.short_description;
        tileBody.appendChild(shortDescription);

        const longDescription = document.createElement('p');
        longDescription.textContent = subproject.long_description;
        tileBody.appendChild(longDescription);

        tile.appendChild(tileBody);

        const tileLinks = document.createElement('div');
        tileLinks.classList.add('tile-links');

        const repoLink = createLinkButton('Repository', subproject.repo_link);
        const wikiLink = createLinkButton('Wiki', subproject.wiki_link);
        const wrapLink = createLinkButton('Wrap', subproject.wrap_link);

        tileLinks.appendChild(repoLink);
        tileLinks.appendChild(wikiLink);
        tileLinks.appendChild(wrapLink);

        tile.appendChild(tileLinks);

        return tile;
    }

    // Function to create a link button
    function createLinkButton(text, link) {
        const linkButton = document.createElement('a');
        linkButton.classList.add('link-button');
        linkButton.href = link;
        linkButton.target = '_blank';
        linkButton.textContent = text;
        return linkButton;
    }
});
