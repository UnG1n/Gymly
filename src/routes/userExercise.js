const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получить результаты упражнения пользователя
router.get('/user/exercise/:exerciseId/results', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const exerciseId = parseInt(req.params.exerciseId, 10);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { exerciseResults: true },
        });

        // exerciseResults хранится как JSON, ожидаем объект с ключами - id упражнений
        const allResults = user.exerciseResults || {};
        const results = allResults[exerciseId] || [];

        res.json(results);
    } catch (error) {
        console.error('Ошибка получения результатов упражнения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить результат упражнения
router.post('/user/exercise/:exerciseId/result', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const exerciseId = parseInt(req.params.exerciseId, 10);
        const newResult = req.body; // { workout, weight, reps, difficulty }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { exerciseResults: true },
        });

        let exerciseResults = user.exerciseResults || {};

        if (!exerciseResults[exerciseId]) {
            exerciseResults[exerciseId] = [];
        }

        exerciseResults[exerciseId].push(newResult);

        await prisma.user.update({
            where: { id: userId },
            data: { exerciseResults },
        });

        res.json(newResult);
    } catch (error) {
        console.error('Ошибка добавления результата упражнения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
