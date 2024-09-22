import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Books and Reviews API',
      version: '1.0.0',
      description: 'API for managing books and reviews',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            address: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        Book: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            author: {
              type: 'string',
            },
            published: {
              type: 'string',
              format: 'date',
            },
            reviews: {
              type: 'array',
              items: {
                type: 'string',
                format: 'uuid',
              },
            },
            averageRating: {
              type: 'number',
              format: 'float',
            },
          },
          required: ['title', 'author', 'published'],
        },
        Review: {
          type: 'object',
          properties: {
            bookId: {
              type: 'string',
              format: 'uuid',
            },
            userId: {
              type: 'string',
              format: 'uuid',
            },
            reviewer: {
              type: 'string',
            },
            content: {
              type: 'string',
              minLength: 10,
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          required: ['bookId', 'userId', 'reviewer', 'content', 'rating'],
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const swaggerRouter = express.Router();
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerRouter;