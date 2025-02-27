const express = require("express");
const connectToDb = require("./db");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const db = process.env.DB_URI


app.get("/", (req, res)=>{
    res.send("I am Iron Man");
})



app.listen(port, async () => {
  try {
    await connectToDb(db);
    console.log(`Server is running at http://localhost:${port}`);
    console.log("connected successfully to Database")
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});