const express = require('express');
const router = express.Router();
const upload = require('../config/multer')
const homecontroller = require('../controllers/home_controller');
const csvViewController = require('../controllers/csvView_controller')

console.log('router connected');

router.get('/',homecontroller.home);
router.post('/upload',upload.single('csvfile'),homecontroller.csvArray);
router.post('/deleteCSV/:filename',homecontroller.deleteCSV);
router.get('/viewCSV/:filename', csvViewController.viewCSV);

module.exports = router;