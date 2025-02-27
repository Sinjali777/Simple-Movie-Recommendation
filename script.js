// Sort Table Functionality
function sortTable(columnIndex) {
    const table = document.getElementById("movie-table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Get the current sorting order and toggle it
    const currentOrder = tbody.getAttribute("data-sort-order");
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    tbody.setAttribute("data-sort-order", newOrder);

    // Sort rows based on the column content
    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll("td")[columnIndex].textContent.trim();
        const cellB = rowB.querySelectorAll("td")[columnIndex].textContent.trim();

        if (columnIndex === 1) { // Numeric sorting for rating
            return newOrder === "asc" ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
        } else { // String sorting for movie name and remarks
            return newOrder === "asc" ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    // Clear the table and re-add sorted rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

// Add New Movie Functionality
document.getElementById("movie-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name-of-movie").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const remarks = document.getElementById("remarks").value.trim();

    // Validate inputs
    if (!name || !rating || !remarks) {
        alert("All fields are required!");
        return;
    }

    if (isNaN(rating) || rating < 0 || rating > 10) {
        alert("Rating must be a number between 0 and 10!");
        return;
    }

    // Create a new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${rating}</td>
        <td>${remarks}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Append row to table
    document.getElementById("table-body").appendChild(newRow);

    // Attach delete event listener to the new button
    newRow.querySelector(".delete-btn").addEventListener("click", function () {
        newRow.remove();
    });

    // Clear the form
    document.getElementById("movie-form").reset();
});

// Search Functionality
document.getElementById("search-bar").addEventListener("input", function () {
    const searchQuery = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll("#table-body tr");

    rows.forEach(row => {
        const movieName = row.querySelector("td").textContent.toLowerCase();
        row.style.display = movieName.includes(searchQuery) ? "" : "none";
    });
});

// Delete Functionality for Existing Movies
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function () {
        this.parentElement.parentElement.remove();
    });
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get the href attribute
        const targetSection = document.querySelector(targetId); // Find the target section

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth' // Smooth scroll
            });
        }
    });
});

// Add scroll event listener to make navbar change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Adjust this value based on when you want the effect to trigger
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});