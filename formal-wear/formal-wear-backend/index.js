const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// User Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, password, role: 'USER' },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && user.password === password) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Available Products (For Rent)
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isAvailable: true },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rent a Product
app.post('/rent', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const rental = await prisma.rental.create({
            data: {
                userId,
                productId,
                status: 'PENDING',
            },
        });
        await prisma.product.update({
            where: { id: productId },
            data: { isAvailable: false },
        });
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View Rented Products (For User)
app.get('/rented/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const rentals = await prisma.rental.findMany({
            where: { userId: parseInt(userId) },
            include: { product: true },
        });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel Rental
app.post('/cancel', async (req, res) => {
    const { rentalId } = req.body;
    try {
        const rental = await prisma.rental.update({
            where: { id: rentalId },
            data: { status: 'CANCELED' },
        });
        await prisma.product.update({
            where: { id: rental.productId },
            data: { isAvailable: true },
        });
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Return a Product
app.post('/return', async (req, res) => {
    const { rentalId } = req.body;
    try {
        const rental = await prisma.rental.update({
            where: { id: rentalId },
            data: { status: 'RETURNED' },
        });
        await prisma.product.update({
            where: { id: rental.productId },
            data: { isAvailable: true },
        });
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Profile
app.get('/user/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Confirm or Decline Rentals
app.post('/admin/rentals', async (req, res) => {
    const { rentalId, status } = req.body;
    try {
        const rental = await prisma.rental.update({
            where: { id: rentalId },
            data: { status },
        });
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Add New Product
app.post('/admin/product', async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, description, price, imageUrl },
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Delete Product
app.delete('/admin/product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        await prisma.product.delete({ where: { id: parseInt(productId) } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: View All Rentals
app.get('/admin/rentals', async (req, res) => {
    try {
        const rentals = await prisma.rental.findMany({
            include: { user: true, product: true },
        });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Users (Admin)
app.get('/admin/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: { role: 'USER' }, // Exclude admin accounts if necessary
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User (Admin)
app.delete('/admin/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Delete associated rentals first to maintain database integrity
        await prisma.rental.deleteMany({
            where: { userId: parseInt(userId) },
        });

        // Delete the user
        await prisma.user.delete({
            where: { id: parseInt(userId) },
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
