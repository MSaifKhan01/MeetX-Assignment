const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


const app = express();
app.use(express.json());

let PORT=process.env.PORT

app.get("/",(req,res)=>{
    res.status(200).send("Well Come to the MeetX Assignment Home Page")
})

app.listen(PORT, async() => {
    try {
        await connectDB
        console.log('DB Connected Succesfully')
    } catch (error) {
        
    }
    console.log(`Server running on port ${PORT}`)
});
