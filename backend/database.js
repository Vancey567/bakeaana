const mongoose = require('mongoose');

async function DbConnect() {
    const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/bakeaano";
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        await mongoose.connect(DB_URL, options);
        console.log("DB connected...")
    } catch (err) {
        handleError(error);
        res.json({ message: err.message });
    }
}


module.exports = DbConnect;