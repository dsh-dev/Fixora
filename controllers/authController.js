const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");


// ===============================
// REGISTER USER
// ===============================

exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            hostel_block,
            room_number,
            password
        } = req.body;


        // Check if user already exists
        const checkUser = "SELECT * FROM users WHERE email = ?";

        db.query(checkUser, [email], async (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }


            if (result.length > 0) {
                return res.send("User already exists");
            }


            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);


            const sql = `
                INSERT INTO users
                (name, email, password, phone, hostel_block, room_number)
                VALUES (?, ?, ?, ?, ?, ?)
            `;


            db.query(
                sql,
                [
                    name,
                    email,
                    hashedPassword,
                    phone,
                    hostel_block,
                    room_number
                ],
                (err, result) => {


                    if (err) {

                        console.log(err);
                        return res.send("Registration Failed");

                    }


                    res.send("Registration Successful");

                }
            );

        });


    }

    catch(error){

        console.log(error);
        res.send("Something Went Wrong");

    }

};



// ===============================
// LOGIN USER
// ===============================

// ===============================
// LOGIN USER
// ===============================

exports.loginUser = (req,res)=>{


const {
    email,
    password,
    role
}=req.body;



const sql = `
SELECT *
FROM users
WHERE email = ?
`;



db.query(
sql,
[email],
async(err,result)=>{


if(err){

console.log(err);

return res.send("Database Error");

}



if(result.length === 0){

return res.send("User not found");

}



const user = result[0];



// Password check

const isMatch = await bcrypt.compare(
    password,
    user.password
);


if(!isMatch){

return res.send("Invalid Password");

}




// Role checking


if(role === "student"){


    if(user.role !== "student"){

        return res.send("Invalid student login");

    }


}



if(role === "admin"){


    if(user.role !== "admin"){

        return res.send("Invalid warden login");

    }


}




// Create JWT


const token = jwt.sign(

{
    id:user.id,
    role:user.role
},

process.env.JWT_SECRET,

{
    expiresIn:"1d"
}

);




// Store token

res.cookie(
    "token",
    token,
    {
        httpOnly:true
    }
);




// Redirect


if(user.role === "admin"){

    return res.redirect("/admin");

}


else{

    return res.redirect("/dashboard");

}



});


};