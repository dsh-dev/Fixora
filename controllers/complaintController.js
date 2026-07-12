const db = require("../config/db");


// Submit Complaint

const analyzeComplaint = require("../utils/aiAnalyzer");
exports.createComplaint = async (req, res) => {

    try{

        const {
            title,
            description
        } = req.body;

        const user_id = req.user.id;

        const image = req.file ? req.file.filename : null;


        // AI Analysis
        const aiResult = await analyzeComplaint(description);
        const sql = `
        INSERT INTO complaints
        (
            user_id,
            title,
            description,
            category,
            priority,
            image,
            summary,
            ai_category,
            ai_priority
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;


        db.query(
            sql,
            [
                user_id,
                title,
                description,

                // Category used in project
                aiResult.category,

                // Priority used in project
                aiResult.priority,

                image,

                aiResult.summary,

                // Store AI results separately
                aiResult.category,
                aiResult.priority
            ],

            (err)=>{

                if(err){

                    console.log(err);

                    return res.send("Complaint submission failed");

                }

                res.redirect("/dashboard");

            }

        );

    }

    catch(error){

        console.log(error);

        res.send("AI Analysis Failed");

    }

};

// Get Complaint Details

exports.getComplaintDetails = (req,res)=>{


    const complaintId = req.params.id;

    const user_id = req.user.id;


    const sql = `
        SELECT *
        FROM complaints
        WHERE id = ?
        AND user_id = ?
    `;


    db.query(
        sql,
        [
            complaintId,
            user_id
        ],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.send("Database Error");

            }


            if(result.length === 0){

                return res.send("Complaint not found");

            }


            res.render("complaintDetails",{

                complaint: result[0]

            });


        }
    );


};
exports.analyzeAI = async (req, res) => {

    try {

        const { title, description } = req.body;

        const analyzeComplaint = require("../utils/aiAnalyzer");

        const result = await analyzeComplaint(
            title + "\n\n" + description
        );

        res.json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "AI Analysis Failed"
        });

    }

};
// Delete Complaint

exports.deleteComplaint = (req, res) => {

    const complaintId = req.params.id;

    const user_id = req.user.id;


    const sql = `
        DELETE FROM complaints
        WHERE id = ?
        AND user_id = ?
    `;


    db.query(
        sql,
        [
            complaintId,
            user_id
        ],
        (err, result) => {


            if(err){

                console.log(err);

                return res.send("Delete failed");

            }


            if(result.affectedRows === 0){

                return res.send("Complaint not found");

            }


            res.redirect("/my-complaints");


        }
    );

};