const bcryptjs = require('bcryptjs');
const Users = require('../model/user-model');
const jwt = require('jsonwebtoken');

function userController() {
    return {
        async login(req, res) {
            const { email, password } = req.body;
            
            if(!email || !password) {
                return res.json({ message: 'All fields are mandatory' });
            }

            Users.findOne({ email: email })
            .then((user) => {
                if(user !== null) { 
                bcryptjs.compare(password, user.password, (err, status) => {
                    if(status === true) { // Correct password
                            jwt.sign({ email, password }, "secretkey", (err, token) => {
                                if(err === null) {
                                    if (user.role === 'admin') {
                                        console.log('admin');                                        
                                    } else {
                                        console.log('not admin');         
                                    }
                                    res.send({user: user, token: token,}); 
                                }
                            })
                    } else {
                        res.send({message: "Wrong Password"})
                    }
                })
                } else {
                    res.send({message: "Username not found"});
                }
            }).catch((err) => {
                console.log(err);
                res.send({message: "user not found!!"});
            })
        },

        async getloginPage(req, res) {
            return res.render('login')
        },

        async register(req, res) {
            let { name, gender, role, email, phone, dob, address, password } = req.body; 

            if(!name || !gender || !email || !phone || !dob || !address || !password) {
                return res.json({ message: 'All fields are mandatory' });
            }

            Users.findOne({ email: email }, (err, user) => {
                if(err) {
                    res.json({message: err});
                }

                if(!user) {
                    bcryptjs.genSalt(10, (err, salt) => {
                        if(err === null) {
                            bcryptjs.hash(password, salt, (err, newpassword) => {
                                let userObj = new Users({
                                    name: name,
                                    gender: gender,
                                    role: role,
                                    email: email,
                                    phone: phone,
                                    dob: dob,
                                    address: address,
                                    password: newpassword
                                });
                                console.log(userObj);
                                
                                
                                userObj.save()
                                .then(() => {
                                    res.send({message: "User Registered"});
                                }).catch((err) => {
                                    console.log(err);
                                    res.send({message: "Problem creating the user!!"});
                                })
                            })
                        } else {
                            console.log(err);
                        }
                    })
                } else {
                    res.json({message: "User already registered, Please login!!!"});
                }
            })
        },

        async getregisterPage(req, res) {
            return res.render('register.ejs')
        },

        async logout(req, res) {
            
            return res.redirect('/login');
        },
    }
}

module.exports = userController;