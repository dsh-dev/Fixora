const db = require("../config/db");


// Get Student Notifications

exports.getNotifications = (req,res)=>{


    const user_id = req.user.id;


    const sql = `

    SELECT *

    FROM notifications

    WHERE user_id = ?

    ORDER BY created_at DESC

    `;


    db.query(
        sql,
        [user_id],
        (err,notifications)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }


            res.render("notifications",{

                notifications

            });


        }
    );


};



// Mark Notification As Read

exports.markAsRead = (req,res)=>{


    const notification_id = req.params.id;


    const sql = `

    UPDATE notifications

    SET is_read = TRUE

    WHERE id = ?

    `;


    db.query(
        sql,
        [notification_id],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Update Failed");

            }


            res.redirect("/notifications");


        }
    );


};