import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
const uniqueId = crypto.randomUUID();
let todos = [
  {
    "title": "Example 1",
    "id": "fd0f3a88-74f2-42d4-a7c7-96fa72b67ee9",
    "status": "todo",
    "createdAt": "2024-05-11T22:59:50.083Z",
    "updatedAt": "2024-05-11T22:59:50.083Z"
  }
]

// All todo list
app.get('/todos', async (c) => {
  return c.json(todos)
})

// Get a single todo by id
app.get('/todos/:id', (c) => {
  try {
    const id = c.req.param().id
    const todo = todos.find((todo) => 
      todo.id === id
    )
    if (!todo) {
      return c.json({"message": "Todo not found"}, 404)
    }
    return c.json(todo ,400)
  } catch {
    return c.json({"message": "Id required"}, 400)
  }
})


// Create new todo
app.post('/todos', async (c) => {
  try {

    const todo = await c.req.json()
    todo.status = todo.status || "todo" // if status field is empty

    // typeof todo !== 'object' || todo === null || Object.keys(todo).length === 0 ? c.json({"message": "Request body must be a non-empty object."}, 400) : null
    // !todo.title ? c.json({ "message": "Title is required" }, 400) : null
    // todo.status.length > 20 ? c.json({ error: 'Status must be between 3 and 20 characters long.' }, 400) : null
    

    if (typeof todo !== 'object' || todo === null || Object.keys(todo).length === 0) {
      return c.json({ "message": "Request body must be a non-empty object." }, 400);
    }

    // As title is required
    if (!todo.title) {
      return c.json({ "message": "Title is required" }, 400);
    }

    // Checking if title field is empty
    if (typeof todo.title !== 'string' || todo.title.trim().length === 0) {
      return c.json({ error: 'Title must be a non-empty string.' }, 400);
    }

    // checking status length
    if (todo.status.length > 20) {
      return c.json({ error: 'Status must be between 3 and 20 characters long.' }, 400);
    }

    // checking unknown parameters
    const invalidKeys = Object.keys(todo).filter(key => key !== 'title' && key !== 'status');
    if (invalidKeys.length > 0) {
      return c.json({ message: "Invalid Parameters", invalidKeys }, 400);
    }

    todo.id = uniqueId
    todo.createdAt = new Date().toISOString()
    todo.updatedAt = new Date().toISOString()
    todos.push(todo)

    return c.json({ "message" :"Todo Created", "todo": todo}, 200)

  } catch {
    return c.json({"message": "Invalid Input"}, 400)
  }
})


// Todo update operation
app.put('/todos/:id', async (c) => {
  const id = await c.req.param().id

  try {
    const todoData = await c.req.json()
    const index = todos.findIndex(todo => todo.id === id) // finding the index of matched todo
  
    if (index === -1) {
      return c.json({ message: "Todo not found" }, 404)
    }

    // updating todo
    todos[index].title = todoData.title || todos[index].title
    todos[index].status = todoData.status || todos[index].status
    todos[index].updatedAt = new Date().toISOString()

    return c.json({ message: "Todo Updated", todo: todos[index] }, 200)
  } catch {
    return c.json({message: "Invalid Input"},400)
  }
  
})


// Todo delete operation
app.delete('/todos/:id', async (c) => {
  const id = await c.req.param().id

  const index = todos.findIndex((todo) => 
    todo.id == id
  )

  if (index === -1) {
    return c.json({"message":"Todo not found"}, 404)
  }

  const deletedTodo = todos.splice(index, 1)[0]
  return c.json({ "message": "Todo Deleted", deletedTodo }, 200)
})

// Delete all todos
app.delete('/todos', async (c) => {
  todos = []
  return c.json({ "message": "All Todo Deleted", todos }, 200)
})

const port = +(process.env.port || "3000")
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
