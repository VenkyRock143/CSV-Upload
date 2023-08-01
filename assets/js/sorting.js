// Using Jquery for sorting functionalities

const table = $('table');
function sortTable(selectedColumnIndex, order) {
  const rows = table.find('tbody tr').get();
  rows.sort((rowA, rowB) => {
    const cellA = $(rowA).find('td').eq(selectedColumnIndex).text();
    const cellB = $(rowB).find('td').eq(selectedColumnIndex).text();
    return (order === 'asc') ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
  });
  // This code first empties the column body and then appends the sorted data
  table.find('tbody').empty().append(rows);
}
// By using this code when we cliclking on the order arrows it sort the columns data and order
table.on('click', '.dropdown-content a', function (event) {
  event.stopPropagation();
  const selectedColumnIndex = parseInt($(this).parent().prev().data('index'));
  const sortingOrder = $(this).data('order');
  sortTable(selectedColumnIndex, sortingOrder);

  // button text is updated when the order changes
  $(this).parent().prev().text(`Sort (${sortingOrder.charAt(0).toUpperCase() + sortingOrder.slice(1)})`);
});
