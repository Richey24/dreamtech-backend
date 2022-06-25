const { User } = require('../../schema')

const getAllUserController = async (req, res) => {
    try{
        const user = await User.find()
        res.status(200).json({ state:true, user })
    }catch(err){
        console.log('error', err);
    }
   
}

module.exports = getAllUserController