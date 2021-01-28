const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // for token as bearer token auth sent in header
        // console.log(req.header('Authorization'));
        // const token = req.header('Authorization').replace('Bearer ', '')
        
        //for token sent in header by cookies
        const token = req.headers.cookie.replace('TOKEN=', '')
        // console.log(req.headers.cookie);
        // console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        // console.log(e);
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth