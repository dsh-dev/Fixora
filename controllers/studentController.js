const db = require("../config/db");


// =================================
// STUDENT DASHBOARD
// =================================

exports.getDashboard = (req, res) => {

    console.log("STUDENT DASHBOARD ROUTE HIT");
    const user_id = req.user.id;


    const sql = `
        SELECT *
        FROM complaints
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;


    db.query(
        sql,
        [user_id],
        (err, complaints) => {


            if(err){

                console.log(err);

                return res.send("Database Error");

            }



            const total = complaints.length;


            const pending = complaints.filter(
                c => c.status === "Pending"
            ).length;



            const inProgress = complaints.filter(
                c => c.status === "In Progress"
            ).length;



            const resolved = complaints.filter(
                c => c.status === "Resolved"
            ).length;

            console.log("USER:", req.user);
            console.log("COMPLAINTS:", complaints);

            res.render("dashboard", {

                user: req.user,

                complaints,

                total,

                pending,

                inProgress,

                resolved

            });


        }
    );


};





// =================================
// MY COMPLAINTS PAGE
// =================================

exports.getMyComplaints = (req, res) => {


    const user_id = req.user.id;


    const sql = `
        SELECT *
        FROM complaints
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;


    db.query(
        sql,
        [user_id],
        (err, complaints)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }


            res.render("myComplaints", {

                complaints

            });


        }
    );


};
// =================================
// STUDENT PROFILE
// =================================

exports.getProfile = (req,res)=>{


    const user_id = req.user.id;


    const sql = `
        SELECT 
        name,
        email,
        phone,
        hostel_block,
        room_number

        FROM users

        WHERE id = ?
    `;


    db.query(
        sql,
        [user_id],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }


            res.render("profile",{

                user:result[0]

            });


        }
    );


};
// Update Profile

exports.updateProfile = (req, res) => {

    const user_id = req.user.id;

    const {
        phone,
        hostel_block,
        room_number
    } = req.body;



    const sql = `

    UPDATE users

    SET 
    phone = ?,
    hostel_block = ?,
    room_number = ?

    WHERE id = ?

    `;



    db.query(

        sql,

        [
            phone,
            hostel_block,
            room_number,
            user_id
        ],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Profile Update Failed");

            }


            res.redirect("/profile");


        }

    );


};