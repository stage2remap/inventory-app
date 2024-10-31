const request = require('supertest');
const app = require('../app'); 

describe('Reviews API', () => {
    // Test  GET /reviews
    test('should get all reviews', async () => {
        const response = await request(app).get('/api/reviews');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test  POST /reviews
    test('should create a new review', async () => {
        const newReview = {
            name: 'John Doe',
            rating: 5,
            comment: 'This is an excellent service!'
        };

        const response = await request(app)
            .post('/api/reviews')
            .send(newReview)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('rating', 5);
        expect(response.body).toHaveProperty('comment', 'This is an excellent service!');
    });

    // Test  POST /reviews with missing field
    test('should return 400 when required fields are missing', async () => {
        const incompleteReview = {
            name: 'John Doe'
        };
    
        const response = await request(app)
            .post('/api/reviews')
            .send(incompleteReview)
            .set('Accept', 'application/json');
    
       
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0]).toHaveProperty('msg'); 
    });
    
});
