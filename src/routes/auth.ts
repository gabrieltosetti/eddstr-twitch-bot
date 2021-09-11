import express from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import userValidation from '../models/validations/User';
import loginValidation from '../models/validations/Login';
// import express from 'express';

const Router = express.Router();

Router.post('/register', async (req, res) => {
    try {
        // User validation
        const validation = userValidation(req.body);
        if (validation.error) throw { status: 400, message: validation.error.details[0].message };

        // Check for users with the same email
        const emailExists = await UserModel.findOne({ email: req.body.email });
        if (emailExists) throw { status: 400, message: "email already exists" };

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });

        const newUser = await user.save();
        
        res.status(200).send(newUser);
    } catch (err:  any) {
        res.status(500).send({ status: err.status || 500, message: err.message });
    }
});

Router.post('/login', async (req, res) => {
    try {
        // User validation
        const validation = loginValidation(req.body);
        if (validation.error) throw { status: 400, message: validation.error.details[0].message };

        // Check for users with the same email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) throw { status: 400, message: "Email does not exists" };
        
        // Check for users with the same email
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) throw { status: 400, message: "Password is incorrect" };

        res.send({message: "sucess"});

    } catch (err: any) {
        res.status(500).send({ status: err.status || 500, message: err.message });
    }

});

export { Router as authRouter };