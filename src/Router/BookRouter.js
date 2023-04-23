const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const Book = require('./../Schema/BookSchema')

router.post('/create', async (req, res) => {
    try {
        const { title, isbn, author, describe, date, publisher, userId } = req.body
        if (!title || !isbn || !author || !describe || !date || !publisher || !userId) {
            return res.status(400).json({ error: "Fill all the details" })

        }
        const upload = new Book({
            title, isbn, author, describe, date, publisher, userId
        })
        const saveData = await upload.save()
        return res.status(200).json({ message: "Book created" })
    } catch (err) {
        console.log(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const updateData = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        return res.status(200).json({ message: "Book Updated" })
    } catch (err) {
        console.log(err)
    }
})

router.get('/booklist/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        return res.status(200).send(book)
    } catch (err) {
        console.log(err)
    }

})

router.get('/getall',authenticate, async (req, res) => {
    try {
        const data = await Book.find()
        return res.status(200).send(data)
    } catch (err) {
        console.log(err)
    }
})
router.get('/getid',authenticate, async (req, res) => {
    try {
        return res.status(200).json({id:req.id})
    } catch (err) {
        console.log(err)
    }
})


router.delete('/remove/:id',async(req,res)=>{
    try{
        const id = req.params.id
        
        const Remove = await Book.findByIdAndRemove(id)
        return res.status(200).json({message:"Removed Successfully"})
    }catch(err){
        console.log(err)
    }
})

module.exports = router