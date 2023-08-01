const csvFile = require('../models/model');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// This code is used to store the csv files in the form of array
module.exports.csvArray = async function (req, res) {
  try {
      // Checking if the uploaded file is a CSV file
      if (!req.file || !req.file.originalname.toLowerCase().endsWith('.csv')) {
        return res.status(400).send('Upload only CSV Files');
      }
    // created a array to uploaded csv file and store
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        //This code is used to store data in db
        if (req.file) {
          const oldPath = req.file.path;
          const newPath = path.join(__dirname, '../uploads', req.file.originalname);
          fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
          });
          const csvData = new csvFile({
            filename: req.file.originalname,
            header_row: results[0],
            data_rows: results.slice(1)
          });
          await csvData.save();
        } else {
          res.status(400).send('No file uploaded');
        }

        return res.redirect('/');
      });
  } catch (error) {
    console.log("error in creating array",error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// This code is used display the homepage 
module.exports.home = async function (req, res) {
  try {
    const csvFiles = await csvFile.find({});
    const fileNames = csvFiles.map((file) => file.filename)
    res.render('_home', { csvFiles: fileNames });
  } catch (error) {
    console.log('error in rendering home', error);
    res.status(500).send('error');
  }
}

// This code is used to delete csv files from the csvArray 
module.exports.deleteCSV = async function (req, res) {
  try {
    const deleteFile = req.params.filename;
    await csvFile.deleteOne({ filename: deleteFile });
    console.log('file deleted successfully', deleteFile);
    return res.redirect('back');
  } catch (error) {
    console.log('error in deleting file', error);
    return res.status(500).send('Error in deleting file')
  }
};