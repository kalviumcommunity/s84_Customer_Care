const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectToDb = require("./db");
const users = require('./Routes/userRoutes')

app.use(express.json())
app.use('/users', users)


app.get('/', (req,res)=>{
  res.send('This is Home Route')
})

app.get("/ping", (req, res) => {
  try {
    res.status(200).send("You are inside Ping Route");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const db = process.env.DB_URI;


app.listen(PORT, async () => {
  try {
    await connectToDb(db);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('connected to DataBase')
  } catch (error) {
    console.error('Failed to start server:', error);
  }
});