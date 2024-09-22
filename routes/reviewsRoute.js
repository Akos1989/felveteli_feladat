import express from "express"
import { createReview, getBookwithReviews, updateReview, deleteReview } from "../controller/reviewscontroller.js";
import protect from "../middleware/auth.js";

const router = express.Router()

/**
 * @swagger
 * /books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book (protected route)
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Review content
 *               rating:
 *                 type: number
 *                 description: Rating (1-5)
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/books/:bookId/reviews', protect, createReview);

/**
 * @swagger
 * /books/{bookId}/reviews:
 *   get:
 *     summary: Get all reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: List of reviews for a book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/books/:bookId/reviews', getBookwithReviews)

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update a review (protected route, only review author)
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated review content
 *               rating:
 *                 type: number
 *                 description: Updated rating (1-5)
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch('/reviews/:id', protect, updateReview)

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review (protected route, only review author)
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/reviews/:id', protect, deleteReview);
export default router