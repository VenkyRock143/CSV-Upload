    // Function to sort the table data based on the selected column and sorting order
    function sortTable(selectedColumnIndex, order) {
        const table = document.querySelector('table');
        const rows = Array.from(table.tBodies[0].rows);
  
        rows.sort((rowA, rowB) => {
          const cellA = rowA.cells[selectedColumnIndex].textContent;
          const cellB = rowB.cells[selectedColumnIndex].textContent;
          return (order === 'asc') ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });
  
        // Clear the table body
        table.tBodies[0].innerHTML = '';
  
        // Re-insert the sorted rows
        rows.forEach(row => table.tBodies[0].appendChild(row));
      }
  
      // Add event listener to the sort buttons
      const sortButtons = document.querySelectorAll('.sort');
      sortButtons.forEach(button => {
        button.addEventListener('click', function(event) {
          event.stopPropagation();
          const selectedColumnIndex = parseInt(this.dataset.index);
          const dropdownContent = this.nextElementSibling;
          dropdownContent.classList.toggle('show');
        });
      });
  
      // Add event listener to the dropdown menu options
      const dropdownOptions = document.querySelectorAll('.dropdown-content a');
      dropdownOptions.forEach(option => {
        option.addEventListener('click', function(event) {
          event.stopPropagation();
          const selectedColumnIndex = parseInt(this.parentElement.previousElementSibling.dataset.index);
          const sortingOrder = this.dataset.order;
          sortTable(selectedColumnIndex, sortingOrder);
  
          // Update the button text to reflect the sorting order
          this.parentElement.previousElementSibling.textContent = `Sort (${sortingOrder.charAt(0).toUpperCase() + sortingOrder.slice(1)})`;
  
          // Hide the dropdown menu
          this.parentElement.classList.remove('show');
        });
      });
  
      // Close the dropdown menu when clicking outside of it
      window.addEventListener('click', function() {
        const dropdownMenus = document.querySelectorAll('.dropdown-content');
        dropdownMenus.forEach(menu => menu.classList.remove('show'));
      });