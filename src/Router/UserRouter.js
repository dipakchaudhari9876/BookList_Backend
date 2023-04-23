const router = require('express').Router()
const User = require('./../Schema/UserSchema')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const { username, password, Cpassword } = req.body
        const userCheck = await User.findOne({ username: username })
        if (userCheck) {
            return res.status(400).json({ error: "Username Exist" })
        }
        const encrypt = await bcrypt.hash(password, 12)
        if (encrypt) {
            const upload = new User({
                username, password: encrypt, Cpassword: encrypt
            })
            const saveData = await upload.save()
            return res.status(200).json({ message: 'Registered Successfull' })
        }
    } catch (err) {
        return res.status(400).json({ error: "Invalid credentials" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const check = await User.findOne({ username: username })
        if (!check) {
            return res.status(400).json({ error: "Incorrect username/password" })
        }
        const decrypt = await bcrypt.compare(password, check.password)
        if (decrypt) {
            const token = json.sign({ id: check._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
            if(token){
                res.status(200).json({message:"login successfull",token:token,id:check._id})
            }
        }else{
        return res.status(400).json({ error: "Incorrect username/password" })
        }
    } catch (err) {
        return res.status(400).json({ error: "Incorrect username/password" })
    }
})

module.exports = router