const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@example.com',
            password: 'adminpassword',
            role: 'ADMIN',
        },
    });

    // Add Sample Products
    await prisma.product.createMany({
        data: [
            { name: 'Tuxedo', description: 'Black Tuxedo', price: 100.0, imageUrl: 'https://example.com/tuxedo.jpg' },
            { name: 'Gown', description: 'Elegant Evening Gown', price: 150.0, imageUrl: 'https://example.com/gown.jpg' },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
