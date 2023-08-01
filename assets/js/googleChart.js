 // Function to draw the Google Chart
 function drawChart(selectedColumn) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', '<%= fileData.header_row[0] %>');
    data.addColumn('number', fileData.header_row[selectedColumn]);

    // Adding data rows to the table
    <% fileData.data_rows.forEach(function(row) { %>
      data.addRow(['<%= row[fileData.header_row[0]] %>', <%= row[fileData.header_row[selectedColumn]] %>]);
    <% }); %>

    var options = {
      title: '<%= fileData.filename %> Data',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  // Function to draw the table using Google Charts
  function drawTable() {
    var data = new google.visualization.DataTable();
    <% fileData.header_row.forEach(function(cell) { %>
    data.addColumn('string', '<%= cell %>');
    <% }); %>

    // Adding data rows to the table
    <% fileData.data_rows.forEach(function(row) { %>
    data.addRow(['<% Object.values(row).forEach(function(cell) { %><%= cell %><% }); %>']);
    <% }); %>

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  }

  // Loading Google Charts to draw the table and chart
  google.charts.load('current', {'packages':['corechart', 'table']});
  google.charts.setOnLoadCallback(drawTable);

  // Checking if there's a selected column index in the URL query parameters and draw the chart
  const urlParams = new URLSearchParams(window.location.search);
  const selectedColumnIndex = urlParams.get('column');
  if (selectedColumnIndex !== null) {
    drawChart(selectedColumnIndex);
  }