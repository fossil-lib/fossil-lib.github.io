// Function to filter table rows based on search input
function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#tableBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const shortDescription = row.cells[1].textContent.toLowerCase();
        const license = row.cells[2].textContent.toLowerCase();
        const author = row.cells[3].textContent.toLowerCase();

        const matches = name.includes(searchInput) || shortDescription.includes(searchInput) ||
            license.includes(searchInput) || author.includes(searchInput);

        row.style.display = matches ? '' : 'none';
    });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', filterTable);
