const db = require("../config/db");


// View all complaints

exports.getAllComplaints = (req, res) => {

    const sql = `
    SELECT
    complaints.*,
    users.name,
    users.email,
    users.room_number

    FROM complaints

    JOIN users
    ON complaints.user_id = users.id

    ORDER BY created_at DESC
    `;

    db.query(sql, (err, complaints) => {

        if (err) {

            console.log(err);

            return res.send("Database Error");

        }

        // Statistics
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

        res.render("adminDashboard", {

            complaints,

            total,

            pending,

            inProgress,

            resolved

        });

    });

};
// Search Complaints

exports.searchComplaints = (req, res) => {
    const search = req.query.search || "";

    const keyword = `%${search}%`;

    const sql = `
    SELECT
        complaints.*,
        users.name,
        users.email,
        users.room_number

    FROM complaints

    JOIN users
    ON complaints.user_id = users.id

    WHERE

    complaints.title LIKE ?

    OR users.name LIKE ?

    OR users.room_number LIKE ?

    ORDER BY complaints.created_at DESC
    `;

    db.query(

        sql,

        [

            keyword,
            keyword,
            keyword

        ],

        (err, complaints) => {

            if (err) {

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

            res.render("adminDashboard", {

                complaints,

                total,

                pending,

                inProgress,

                resolved

            });

        }

    );

};
exports.updateStatus = (req,res)=>{


    const {
        complaint_id,
        status
    } = req.body;



    // First get student id

    const getUserSql = `

    SELECT user_id

    FROM complaints

    WHERE id = ?

    `;



    db.query(
        getUserSql,
        [complaint_id],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }



            const user_id = result[0].user_id;



            // Update complaint status

            const updateSql = `

            UPDATE complaints

            SET status = ?

            WHERE id = ?

            `;



            db.query(
                updateSql,
                [
                    status,
                    complaint_id
                ],
                (err)=>{


                    if(err){

                        console.log(err);

                        return res.send("Update Failed");

                    }



                    // Create notification

                    const notificationSql = `

                    INSERT INTO notifications
                    (user_id,message)

                    VALUES (?,?)

                    `;



                    const message =
                    `Your complaint status changed to ${status}`;



                    db.query(
                        notificationSql,
                        [
                            user_id,
                            message
                        ],
                        (err)=>{


                            if(err){

                                console.log(err);

                                return res.send("Notification Failed");

                            }


                            res.redirect("/admin");


                        }
                    );


                }
            );


        }
    );


};
// Filter Complaints

exports.filterComplaints = (req,res)=>{


    const {
        status,
        category
    } = req.query;


    let sql = `

    SELECT
    complaints.*,
    users.name,
    users.email,
    users.room_number

    FROM complaints

    JOIN users

    ON complaints.user_id = users.id

    WHERE 1=1

    `;


    let values = [];


    if(status && status !== "All"){

        sql += " AND complaints.status = ? ";

        values.push(status);

    }


    if(category && category !== "All"){

        sql += " AND complaints.category = ? ";

        values.push(category);

    }


    sql += " ORDER BY complaints.created_at DESC ";



    db.query(
        sql,
        values,
        (err,complaints)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }


            const total = complaints.length;


            const pending = complaints.filter(
                c=>c.status==="Pending"
            ).length;


            const inProgress = complaints.filter(
                c=>c.status==="In Progress"
            ).length;


            const resolved = complaints.filter(
                c=>c.status==="Resolved"
            ).length;



            res.render("adminDashboard",{

                complaints,

                total,

                pending,

                inProgress,

                resolved

            });


        }
    );


};
// Get Complaint Details

exports.getComplaintDetails = (req,res)=>{


    const complaintId = req.params.id;


    const sql = `

    SELECT

    complaints.*,

    users.name,

    users.email,

    users.room_number


    FROM complaints


    JOIN users

    ON complaints.user_id = users.id


    WHERE complaints.id = ?

    `;



    db.query(

        sql,

        [complaintId],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }



            if(result.length === 0){

                return res.send("Complaint Not Found");

            }



            res.render("adminComplaintDetails",{

                complaint: result[0]

            });


        }

    );


};