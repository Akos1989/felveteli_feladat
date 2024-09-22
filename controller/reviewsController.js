import Review from "../model/reviewsmodel.js";
import Book from "../model/booksmodel.js";
import { updateAverageRating } from "../helpers/ratinghelper.js";


//create review
 export const createReview = async (req, res) => {
    const { bookId } = req.params; 
    const { content, rating } = req.body; 

    const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }


    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id
    
    try {
        const review = await Review.create({
            bookId,
            userId: req.user._id,
            reviewer: req.user.name,
            content,
            rating
        });
        // adding the review to the book
        book.reviews.push(review._id);
        await book.save();
        // average helper
        await updateAverageRating(book._id);

        return res.status(201).json({
            message: "Review created successfully",
            review
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// get all the reviews of a book

export const getBookwithReviews = async (req,res) =>{
    const {bookId} = req.params
    try {
        
        const book = await Book.findById(bookId).populate('reviews');

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book and reviews:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



// updating a review
export const updateReview = async (req, res) => {
    const { id } = req.params; 
    const { content, rating } = req.body;

    try {
        
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        
        review.content = content || review.content;
        review.rating = rating || review.rating;

        
        const updatedReview = await review.save();

        return res.status(200).json({
            message: "Review updated successfully",
            updatedReview
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// deleting reviews
export const deleteReview = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        
        await Review.findByIdAndDelete(id);

        
        const book = await Book.findById(review.bookId);
        if (book) {
            book.reviews = book.reviews.filter(
                (reviewId) => reviewId.toString() !== id.toString()
            );
            await book.save(); 
        }
            // average helper
            await updateAverageRating(review.bookId)

        return res.status(200).json({
            message: "Review deleted successfully"
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};