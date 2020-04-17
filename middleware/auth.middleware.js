const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TokEN" => 'TOKEN'

        if (!token) {
            res.status(401).json({message: 'Нет авторизации'})
        }

        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}

module.exports = auth