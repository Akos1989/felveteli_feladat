import mongoose from "mongoose";

const booksSchema = new mongoose.Schemna({
    title:{
        type:String,
        required: true
        },
    author:{
        tpye:String,
        required:true
    },
    published:{
        type:Date,
        required:true
    }
})

export default mongoose.model("books", userSchema)