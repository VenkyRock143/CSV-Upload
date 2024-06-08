# CSV Upload

This application allows users to upload any number of .csv files and view them.

**Link:** [CSV Upload App](https://csv-upload-9txt.onrender.com)

## Overview

By using this app, users can perform the following actions:

1. Upload .csv files via a form, which are then stored in an array.
2. View and delete uploaded csv files.
3. Dynamically generate different csv files with different column headers.
4. Upload csv files with the delimiter as comma ','.
5. Accept only .csv files in the frontend using `accept=".csv"`.

## Folder Structure

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

## Approach

1. Created a form to only accept .csv files and upload them into an array.
2. When the upload button is clicked, it performs an action '/upload' and stores csvArray using a controller, and data is stored in the database using MongoDB with a model to fetch particular files.
3. In the csvArray, along with the file name, there are view and delete buttons. When view is clicked, a new ejs file is rendered using router and controller. When delete is clicked with the help of filename, the csv file is deleted.
4. In _viewCSV, the filename is rendered at the top, followed by a search box to fetch required words and display them. Then, a sort function is applied to sort the table in ascending or descending order. Finally, the csv table is rendered with dynamically generated headers.

