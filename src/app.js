const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

var corsOptions = {
    credentials: true,
    origin: ['https://kravitzy-task-app.web.app', 'http://localhost:4200']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
