const express= require("express");
const app= express();
PORT = 3000

app.get("/", (req, res)=>{
    res.send("I am Iron Man");
})

app.listen(PORT, ()=>
    console.log(`Server is running at http://localhost:${PORT}`)
).on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});