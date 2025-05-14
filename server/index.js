require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 5000;

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем запросы с фронтенда
    credentials: true,
}));

app.use(express.json());

// Настройка хранения аватаров через multer (сохраняем в папку uploads)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});
const upload = multer({ storage });

// --- Middleware для проверки JWT ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Требуется авторизация' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Токен не найден' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Неверный токен' });
    }
};

// --- Регистрация ---
app.post('/api/register',
    body('email').isEmail().withMessage('Неверный формат email'),
    body('password').notEmpty().withMessage('Пароль обязателен'),
    body('name').notEmpty().withMessage('Имя обязательно'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password, name } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ error: 'Пользователь уже существует' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { email, password: hashedPassword, name }
            });

            res.status(201).json({ id: user.id, email: user.email, name: user.name });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
);

// --- Логин ---
app.post('/api/login',
    body('email').isEmail(),
    body('password').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(401).json({ error: 'Неверный email или пароль' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Неверный email или пароль' });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
);

// --- Получение профиля ---
app.get('/api/profile', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true, name: true, avatar: true, exerciseResults: true }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// --- Обновление профиля (включая загрузку аватара) ---
app.put('/api/profile', authMiddleware, upload.single('avatar'), async (req, res) => {
    const { name, email, password } = req.body;
    let avatarUrl;

    try {
        if (req.file) {
            avatarUrl = `/uploads/${req.file.filename}`;
        }

        const dataToUpdate = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (avatarUrl) dataToUpdate.avatar = avatarUrl;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
            }
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }

        // Обновляем пользователя
        await prisma.user.update({
            where: { id: req.userId },
            data: dataToUpdate,
        });

        // После обновления заново получаем пользователя с полным набором данных, включая exerciseResults
        const updatedUser = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true, name: true, avatar: true, exerciseResults: true },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// --- Получение результатов упражнений пользователя по ID упражнения ---
app.get('/api/user/exercise/:exerciseId/results', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { exerciseResults: true }
        });

        const exerciseId = String(req.params.exerciseId);
        const allResults = user.exerciseResults || {};
        const results = allResults[exerciseId] || [];

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// --- Сохранение нового результата упражнения ---
app.post('/api/user/exercise/:exerciseId/result', authMiddleware, async (req, res) => {
    try {
        const exerciseId = String(req.params.exerciseId);
        const newResult = req.body; // { workout, weight, reps, difficulty }

        const user = await prisma.user.findUnique({ where: { id: req.userId } });

        let exerciseResults = user.exerciseResults || {};

        if (!exerciseResults[exerciseId]) {
            exerciseResults[exerciseId] = [];
        }

        exerciseResults[exerciseId].push(newResult);

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { exerciseResults }
        });

        res.json(newResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// --- Статическая раздача загруженных файлов ---
app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
