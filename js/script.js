/* Select form and website list elements
const urlForm = document.getElementById('urlForm');
const websiteList = document.getElementById('websiteList');

// Event listener for form submission
urlForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const websiteName = document.getElementById('websiteName').value;
    const websiteUrl = document.getElementById('websiteUrl').value;

    // Validate the URL starts with http:// or https://
    if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }

    // Create a new list item for the website
    const listItem = document.createElement('li');

    // Create anchor element for the URL
    const link = document.createElement('a');
    link.href = websiteUrl;
    link.target = "_blank"; // Open link in new tab
    link.textContent = websiteName;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        websiteList.removeChild(listItem); // Remove item from list
    });

    // Append the link and delete button to the list item
    listItem.appendChild(link);
    listItem.appendChild(deleteButton);

    // Append the list item to the website list
    websiteList.appendChild(listItem);

    // Clear the form inputs after adding
    document.getElementById('websiteName').value = '';
    document.getElementById('websiteUrl').value = '';
});
*/






document.addEventListener("DOMContentLoaded", function() {
    const urlForm = document.getElementById("urlForm");
    const websiteList = document.getElementById("websiteList");

    // Load stored websites from localStorage
    function loadStoredWebsites() {
        const storedWebsites = JSON.parse(localStorage.getItem("websites"));
        if (storedWebsites && storedWebsites.length > 0) {
            storedWebsites.forEach(function(website) {
                addWebsiteToList(website.name, website.url);
            });
        }
    }

    // Save websites to localStorage
    function saveWebsite(name, url) {
        let websites = JSON.parse(localStorage.getItem("websites")) || [];
        websites.push({ name: name, url: url });
        localStorage.setItem("websites", JSON.stringify(websites));
    }

    // Add website to the displayed list
    function addWebsiteToList(name, url) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = url;
        a.textContent = name;
        a.target = "_blank"; // Opens the link in a new tab
        li.appendChild(a);
        websiteList.appendChild(li);
    }

    // Form submit event handler
    urlForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const websiteName = document.getElementById("websiteName").value;
        const websiteUrl = document.getElementById("websiteUrl").value;

        // Add to the list in the UI
        addWebsiteToList(websiteName, websiteUrl);

        // Save the website to localStorage
        saveWebsite(websiteName, websiteUrl);

        // Clear the form fields
        urlForm.reset();
    });

    // Load websites when the page is loaded
    loadStoredWebsites();
});
