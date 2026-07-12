const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    console.log("TOKEN RECEIVED:", token);


    if (!token) {
        return res.redirect("/login");
    }


    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {

            if(err){

                console.log("TOKEN ERROR:", err);

                return res.redirect("/login");

            }


            req.user = decoded;

            next();

        }
    );

};