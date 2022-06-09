const User = require('../schema')

const registerController = async (req, res) => {
    let check = await User.findOne({ username: req.body.username })
    if (!check) {
        let user = await User.create(req.body)
        user.password = ""
        res.status(200).json(user)
    } else {
        res.status(201).json({ message: 'already registered' })
    }
}

module.exports = registerController