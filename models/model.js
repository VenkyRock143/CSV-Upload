const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    headers:{
        type: [String],
        required:true,
    },
    data:{
        type:[Object],
        require:true,
    }
});

const csvFile = mongoose.model('csvFile', csvSchema)

module.exports = csvFile;
