// Fetch and process each subproject JSON file
async function processSubprojects() {
  const languages = ['c', 'cpp', 'objc', 'rust']; // Add more languages as needed

  // Array to store all subprojects
  let allSubprojects = [];

  // Loop through each language
  for (const language of languages) {
    const subprojectFileName = `fossil-subprojects-${language}.json`;

    // Fetch subproject JSON file for the current language
    try {
      const response = await fetch(`api/fossil/${subprojectFileName}`);
      const subprojectData = await response.json();

      // Combine all subprojects into one array
      allSubprojects = allSubprojects.concat(subprojectData.subprojects);

      // Process subprojectData as needed (e.g., display in a table)
      displaySubprojects(language, subprojectData.subprojects);
    } catch (error) {
      console.error(`Error fetching ${language} subproject data:`, error);
    }
  }

  // Function to filter and display subprojects based on search criteria
  function filterAndDisplaySubprojects(searchCriteria) {
    const filteredSubprojects = allSubprojects.filter(subproject =>
      Object.values(subproject).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchCriteria.toLowerCase())
      )
    );

    // Display the filtered subprojects
    displaySubprojects('filtered', filteredSubprojects);
  }

  // Call the function to start the process with an example search
  filterAndDisplaySubprojects('c OR Fossil XTest');
}

// Call the function to start the process
processSubprojects();