import Book from "../model/booksmodel.js"


export const updateAverageRating = async (bookId) => {
    try {
        const book = await Book.findById(bookId).populate("reviews");

        if (!book) {
            throw new Error("Book not found");
        }

        
        const totalReviews = book.reviews.length;

        if (totalReviews === 0) {
            book.averageRating = 0;  
        } else {
            const sumRatings = book.reviews.reduce((acc, review) => acc + review.rating, 0);
            book.averageRating = sumRatings / totalReviews;
        }

        await book.save();
    } catch (error) {
        console.error("Error", error);
    }
};