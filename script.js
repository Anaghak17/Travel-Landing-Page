// Function to load external HTML files
// function loadHTML(id, file) {
//     fetch(file)
//         .then(response => response.text())
//         .then(data => document.getElementById(id).innerHTML = data)
//         .catch(error => console.error('Error loading file:', error));
// }

// // Load header and footer when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//     loadHTML("header", "header.html");
//     loadHTML("footer", "footer.html");
// });
function loadComponent(file, elementId, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback(); 
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
  }
  
  // Load header and footer when the page loads
  document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header.html", "header", function () {
        // Now that the header is loaded, we can add event listeners
        const menuToggle = document.getElementById("mobile-menu-toggle");
        const navigation = document.getElementById("site-navigation");
        const menuItems = document.querySelectorAll("#site-navigation a"); // Select menu links
        const header = document.getElementById("masthead"); // Ensure header is selected after loading
  
        if (!menuToggle || !navigation) {
            console.error("Menu toggle button or navigation not found!");
            return;
        }
  
        // Toggle menu on hamburger click
        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("toggled");
            const isExpanded = navigation.classList.contains("toggled");
            menuToggle.setAttribute("aria-expanded", isExpanded);
        });
  
        // Close menu when clicking a menu item
        menuItems.forEach(item => {
            item.addEventListener("click", function () {
                navigation.classList.remove("toggled"); // Hide the menu
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
  
        // Scroll event listener (now inside the header load callback)
        if (header) {
            window.addEventListener("scroll", function () {
                if (window.scrollY > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            });
        } else {
            console.error("Header element not found after loading!");
        }
    });
  
    loadComponent("footer.html", "footer");
  });