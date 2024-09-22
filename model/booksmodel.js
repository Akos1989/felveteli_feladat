import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    averageRating: {
        type: Number,
        default: 0,
    }

});

export default mongoose.model("Book", booksSchema);