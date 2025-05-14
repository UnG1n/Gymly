const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Требуется авторизация' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Токен не найден' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Неверный токен' });
    }
};
