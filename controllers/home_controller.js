const csvFile = require('../models/model');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');


module.exports.csvArray = async function (req, res) {
  try {
      // Check if the uploaded file is a CSV file
      if (!req.file || !req.file.originalname.toLowerCase().endsWith('.csv')) {
        return res.status(400).send('Only CSV files are allowed!');
      }
    //parser the uploaded csv file and store it in array
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        //save csv data to db
        if (req.file) {
          const oldPath = req.file.path;
          const newPath = path.join(__dirname, '../uploads', req.file.originalname);
          fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
          });
          const csvData = new csvFile({
            filename: req.file.originalname,
            header_row: results[0],
            data_rows: results.slice(1),
            // path: newPath
          });
          await csvData.save();
        } else {
          res.status(400).send('No file uploaded');
        }

        return res.redirect('/');
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }

}



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