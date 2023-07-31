const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        await mongoose.connect('mongodb+srv://venkybalusani1:Rock143@csvupload.sfrzi7o.mongodb.net/?retryWrites=true&w=majority')
        console.log("mongodb is connected");
    } catch (error) {
        console.log("error in connecting mongodb",error);
    }
};

module.exports = connectDB;