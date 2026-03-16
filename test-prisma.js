require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.game.findMany()
    .then(games => console.log('SUCCESS! Games in DB:', games.length))
    .catch(e => {
        console.error('Error:', e.name, '-', e.message);
    })
    .finally(() => prisma.$disconnect());
