const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const userValidation = require('../models/validations/User');
const loginValidation = require('../models/validations/Login');


router.post('/register', async (req, res) => {
    try {
        // User validation
        const validation = userValidation(req.body);
        if (validation.error) throw { status: 400, message: validation.error.details[0].message };

        // Check for users with the same email
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) throw { status: 400, message: "email already exists" };

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });

        const newUser = await user.save();
        
        res.status(200).send(newUser);
    } catch (err) {
        res.status(500).send({ status: err.status || 500, message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        // User validation
        const validation = loginValidation(req.body);
        if (validation.error) throw { status: 400, message: validation.error.details[0].message };

        // Check for users with the same email
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw { status: 400, message: "Email does not exists" };
        
        // Check for users with the same email
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) throw { status: 400, message: "Password is incorrect" };

        res.send({message: "sucess"});

    } catch (err) {
        res.status(500).send({ status: err.status || 500, message: err.message });
    }

});

module.exports = router;