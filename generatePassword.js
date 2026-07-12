const bcrypt = require("bcrypt");

bcrypt.hash("warden123",10,(err,hash)=>{

    console.log(hash);

});