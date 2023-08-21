const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//require('dotenv').config({ path: './config/.env' });



//dotenv conig
dotenv.config();

//MondoDB connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json()); // to free error from jsx in body
app.use(moragan('dev'));

// Serve static files from the 'public' directory(addition code)
app.use(express.static('public'));


//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));
// Define the /profile route (addition code)
app.get('/Profile', (req, res) => {
  res.send('This is the profile page.');
});

//test purpose
/*app.get('/', (req,res) => {
    res.status(200).send({
        message: "server running" ,
    });
});*/

//listen port  (enviromental variable as to port it will automatically take the value)
//port
const port = process.env.PORT || 8080;
const mode = process.env.NODE_MODE || 'development';

// Start the server
app.listen(port, () => {
  console.log(`Server Running in ${mode} Mode on port ${port}`.bgCyan.white);
});