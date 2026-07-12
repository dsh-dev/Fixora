require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

const { verifyToken } = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");


const app = express();


// Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials:true
}));

app.use(cookieParser());


// Static files

app.use(express.static(path.join(__dirname, "public")));


// EJS Setup

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Routes
app.use("/", authRoutes);
app.get("/", (req,res)=>{
    res.render("home");
});



// Server Start
const complaintRoutes = require("./routes/complaintRoutes");
app.use("/",complaintRoutes);
const studentRoutes = require("./routes/studentRoutes");
app.use("/",studentRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/",adminRoutes);
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/", notificationRoutes);
app.get("/privacy-policy",(req,res)=>{
    res.render("privacy-policy");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});