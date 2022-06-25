const { User } = require('../../schema')

const createUserController = async (req, res) => {
    const { firstname, lastname, email, gender,phone } = req.body
    const check = await User.findOne({ email })
    if (check) {
        res.status(201).json({ message: "user with this email already exists" })
        return
    }
    if (firstname && lastname && gender && phone) {
        const user = await User.create(req.body)
        res.status(200).json({ status:true, user })
    } else {
        res.status(203).json({ message: "please send all the required information" })
    }
}

module.exports = createUserController