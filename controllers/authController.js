const User = require("../models/userModel");

exports.signUp = async (req, res) => {
    try {
        let newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                newUser
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail"
        })
    }
}
