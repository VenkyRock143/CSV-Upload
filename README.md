# CSV-Upload
By using this app we can upload any number of .csv files and we can view them.
Link:- https://csv-upload-9txt.onrender.com

folder structure
CSV Upload
```sh
│
├── assets
│   ├── css
│   │   ├── header.css
│   │   └── home.css
│   └── js
│       ├── search.js
│       └── sorting.js
│
├── config
│   ├── mongoose.js
│   └── multer.js
│
├── controllers
│   ├── csvView_controller.js
│   └── home_controller.js
│
├── models
│   └── model.js
│
├── routes
│   └── index.js
│
├── uploads
│
├── views
│   ├── _header.ejs
│   ├── _home.ejs
│   ├── _ViewCSV.ejs
│   └── layout.ejs
│
├── index.js
├── .gitignore
├── package.json
└── README.md
```


1.By using upload form we can upload .csv files to an array which store the csv files in an array.

2.By using upload button we can upload the csv files.

3.After the files are uploaded they are stored in an array with filename along with view and delete buttons. View button is used to render the csv file and delete button will delete the csv file from the array using filename.
  
4.By using router view button will render the _viewCSV.ejs file with csv data in the form of table data.

5.Here different csv files with different column headers are dynamically generated.

6.csv files are uploaded into system with delimiter as comma','.

7.By using accept=".csv" we can only accept csv files in frontend.

Approach

1.created a form to only accept .csv files and upload them in array.When i click on upload it will perform a action '/upload' and csvArray is created using controller and data is stored in database using mongodb with model to fetch particular files.
  
2.In the csvArray along with file name we have two buttons view and delete.when view is clicked a new ejs file will render using router and controller.when delete is clicked with the help of filename csv file is deleted.
  
3.In _viewCSV at the top filename is render then a search box to fetch required words and display them.then sort function to sort the table 
  in asc or desc order.Then the csv table is render with the headers which are  dynamically generated.
