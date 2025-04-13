const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const User = require('../models/user.server.model');
const logger = require('../../config/logger');

exports.signup = async (req, res) => {

    try {

        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email Already in Use' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const lowercase = email.toLowerCase();

        user = new User({ email: lowercase, password: hashedPassword, vehiclesOwned: 0 });
        await user.save();

        logger.info(`New User Registred: ${email}`);
        res.json({ msg: "Signup Successfull" });

    } catch (error) {

        logger.error(`Signup Error : ${error.message}`);
        res.status(500).json({ error: error.message })

    };
};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const lowercase = email.toLowerCase();

        let user = await User.findOne({ email: lowercase });
        if (!user) return res.status(400).json({ msg: 'Invalid User EmailId' });

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        logger.info(`User Logged in :${email}`);
        res.json({ token });

    } catch (error) {

        logger.error(`Error Logging In: ${error.message}`);
        res.status(500).json({ error: error.message });

    };

};