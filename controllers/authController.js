const userModel = require("../models/user-model");
const bcrypt =require("bcrypt");
const jwt= require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken"); 


module.exports.registerUser = async function(req,res)
{
   try{ 
    let{email,password, fullname} = req.body;

    let user= await userModel.findOne({email:email});
    if(user)
         return res.status(401).send("you already have account please login");



    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let  user = await userModel.create({
                password: hash,
                email,
                fullname
            })
           let token = generateToken(user); 
            // let token = jwt.sign({ email:req.body.email ,id:user._id}, 'shhhhh');
            res.cookie("token",token);
            res.redirect("/shop");

        });
    });


   } catch(err){
    res.send(err.message);
   }

}

module.exports.loginUser =async (req,res)=>{
 let  {email,password} = req.body;
  
 let user= await userModel.findOne({email});
 if(!user)
 {
    req.flash('error', 'Email and password are not valid.');
    return res.redirect("/");
 }
    

 bcrypt.compare(password, user.password, function(err, result) {
    if(result)
    {
        let token = generateToken(user)
        res.cookie("token",token);
        return res.redirect("/shop")

    }
    else
    {
        req.flash('error', 'Email and password are not valid.');
        return  res.redirect("/");
        // res.send("email and password are not valid.")
    }

});
}

module.exports.logout =function (req,res)
{
    res.cookie("token","");
    res.redirect("/");
}
