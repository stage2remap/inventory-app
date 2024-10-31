const request = require('supertest');
const app = require('../app');

describe('Items API', () => {
    let createdItemId;

    // Test GET /items
    test('should get all items', async () => {
        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test GET /items/:id
    test('should get a single item by ID', async () => {
        const response = await request(app).get('/api/items/1'); 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    // Test POST /items
    test('should create a new item', async () => {
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
        createdItemId = response.body.id; 
    });

    // Test PUT /items/:id
    test('should update an existing item', async () => {
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

    // Test  DELETE /items/:id
    test('should delete an item', async () => {
        const response = await request(app).delete(`/api/items/${createdItemId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdItemId);

       
        const getResponse = await request(app).get(`/api/items/${createdItemId}`);
        expect(getResponse.status).toBe(404); 
    });
});
