const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb is connected");
    } catch (error) {
        console.log("error in connecting mongodb",error);
    }
};

module.exports = connectDB;
