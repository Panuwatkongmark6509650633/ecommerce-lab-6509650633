const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {

  // ทดสอบการดึงข้อมูลสินค้าทั้งหมด
  describe('GET /products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // ทดสอบการดึงข้อมูลสินค้าด้วย ID
  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const response = await request(app).get('/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 if product not found', async () => {
      const response = await request(app).get('/products/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });

  // ทดสอบการเพิ่มสินค้าตัวใหม่
  describe('POST /products', () => {
    it('should add a new product', async () => {
      const newProduct = { name: 'Tablet', price: 300, stock: 15 };
      const response = await request(app)
        .post('/products')
        .send(newProduct);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newProduct);
      expect(response.body).toHaveProperty('id');
    });
  });

  // ทดสอบการแก้ไขข้อมูลสินค้า
  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
      const updatedProduct = { name: 'Updated Laptop', price: 1200, stock: 8 };
      const response = await request(app)
        .put('/products/1')
        .send(updatedProduct);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedProduct);
    });

    it('should return 404 if product not found', async () => {
      const response = await request(app)
        .put('/products/999')
        .send({ name: 'Non-existent' });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });

  // ทดสอบการลบสินค้า
  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const response = await request(app).delete('/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Product deleted');
    });

    it('should return 404 if product not found', async () => {
      const response = await request(app).delete('/products/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });

});
