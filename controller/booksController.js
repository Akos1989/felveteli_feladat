import books from "../model/booksmodel.js";


//creating book

export const createBook = async (req, res) => {
    const { title, author, published } = req.body;

    try {
        const book = await books.create({
            title,
            author,
            published  
        });
        return res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// getting All the books

export const getAllBooks = async(req, res)=>{
    try {
        const allBooks = await books.find().populate('reviews')
        if(allBooks.length === 0){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json(allBooks)
        console.log(allBooks)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}


// getting one Book by id
export const getBookById = async (req, res) => {
    const { id } = req.params; 

    try {
        const book = await books.findById(id).populate('reviews'); 
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Server error" });
    }
};

// modifying a book
 export const updateBookById = async (req, res) => {
    const { id } = req.params; 
    const updates = req.body;

    try {
        const updatedBook = await books.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Server error" });
    }
};


// deleting a book

export const deleteBookById = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedBook = await books.findByIdAndDelete(id); 
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Server error" });
    }
};