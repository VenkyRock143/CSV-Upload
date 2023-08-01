const fs = require('fs');
const CSV = require('../models/model');
const path = require('path');

module.exports.viewCSV = async function (req, res) {
  try {
    const filename = req.params.filename;
    const csvFile = await CSV.findOne({ filename });
    if (!csvFile) {
      return res.status(404).send('File not found');
    }

    // Read CSV file contents using Promise
    const uploadsPath = path.join(__dirname, '../uploads');
    const fileData = await new Promise((resolve, reject) => {
      fs.readFile(path.join(uploadsPath, csvFile.filename), 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Parsing the CSV data and sending it to the view
          const rows = data.trim().split('\n');
          const header_row = rows[0].split(',');
          const data_rows = rows.slice(1).map((row) => {
            const row_data = {};
            row.split(',').forEach((value, index) => {
              row_data[header_row[index]] = value;
            });
            return row_data;
          });
          resolve({ filename: csvFile.filename, header_row, data_rows });
        }
      });
    });

    // To get the selected column index from the query parameter
    const selectedColumnIndex = req.query.column;
    console.log(selectedColumnIndex);

    res.render('_ViewCSV', {
      fileData,
      title: 'CSV file',
      selectedColumn: selectedColumnIndex,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
