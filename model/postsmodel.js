import mongoose from "mongoose";

const postsSchema = new mongoose.Schemna({
    comment:{
        type:String,
        required: true,
        minLength: 10
        },
    user:{
        tpye:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("posts", userSchema)