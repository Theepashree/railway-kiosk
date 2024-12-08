const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  // Start button event listener (for the welcome page)
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      alert("Starting the navigation...");
      ipcRenderer.send("navigate-to-map");
    });
  }

  // Search button event listener (for the map page)
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value;
      if (query.trim() === "") {
        alert("Please enter a location to search.");
      } else {
        alert(`Searching for: ${query}`);
        // Add functionality to display the search results on the map
      }
    });
  }

  // Back button event listener (for the map page)
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      console.log("Navigating back to index.html");
      ipcRenderer.send("navigate-to-index");
    });
  }
});
