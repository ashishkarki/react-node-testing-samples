var express = require('express')
var router = express.Router()

const httpCodes = require('http-codes')

const todos = [
  {
    id: 1,
    title: 'Learn Node.js',
    completed: false,
  },
  {
    id: 2,
    title: 'Learn React.js',
    completed: true,
  },
]

/* GET users listing. */
router.get('/', function (_req, res, next) {
  res.status(httpCodes.OK).json(todos)
})

router.get('/:id', function (req, res) {
  const id = +req.params.id
  const todo = todos.find((todo) => todo.id === id)

  if (!todo) {
    return res.status(httpCodes.NOT_FOUND).json({
      message: 'Todo not found',
    })
  } else {
    res.status(httpCodes.OK).json(todo)
  }
})

router.post('/', function (req, res) {
  const todo = req.body

  // basic validation
  if (!todo.title) {
    return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
      message: 'Title is required',
    })
  }

  todo.id = todos.length + 1
  todos.push(todo)

  res.status(httpCodes.CREATED).json(todo)
})

module.exports = router
