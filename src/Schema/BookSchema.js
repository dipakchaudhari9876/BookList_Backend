const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const bookSchema = new mongoose.Schema({
    title:{
        type:String
    },
    isbn:{
        type:String
    },
    author:{
        type:String
    },
    describe:{
        type:String
    },
    date:{
        type:String
    },
    publisher:{
        type:String
    },
    userId:{
        type:ObjectId
    },
})

const Book = mongoose.model("Book",bookSchema)

module.exports = Book