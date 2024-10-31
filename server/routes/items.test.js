const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('Items API', () => {
    let createdItemId;

    // Test for GET /items
    it('should get all items', async () => {
        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for GET /items/:id
    it('should get a single item by ID', async () => {
        const response = await request(app).get('/api/items/1'); // Replace with a valid ID in your database
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    // Test for POST /items
    it('should create a new item', async () => {
        const newItem = {
            color: 'Blue',
            year: 2021,
            mileage: 15000,
            make: 'Honda',
            model: 'Civic',
            bhp: 180,
            raaminess: 3,
            description: 'A reliable and efficient car.',
            image: 'https://example.com/car-image.jpg',
            price: 15000
        };

        const response = await request(app)
            .post('/api/items')
            .send(newItem)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        createdItemId = response.body.id; // Store ID for further tests
    });

    // Test for PUT /items/:id
    it('should update an existing item', async () => {
        const updateData = {
            color: 'Red',
            mileage: 14000
        };

        const response = await request(app)
            .put(`/api/items/${createdItemId}`)
            .send(updateData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('color', 'Red');
        expect(response.body).toHaveProperty('mileage', 14000);
    });

    // Test for DELETE /items/:id
    it('should delete an item', async () => {
        const response = await request(app).delete(`/api/items/${createdItemId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdItemId);

        // Verify the item is deleted by attempting to get it again
        const getResponse = await request(app).get(`/api/items/${createdItemId}`);
        expect(getResponse.status).toBe(404); // Assuming your API returns 404 if not found
    });
});
