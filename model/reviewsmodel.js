import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({ 
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books", 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Review", reviewSchema);