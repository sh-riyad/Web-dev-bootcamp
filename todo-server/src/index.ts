import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
let todos = [
  {
    "id": "1",
    "title": "todo name",
    "status": "process"
  },
  {
    "id": "2",
    "title": "create do",
    "status":"done"
  }
]

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

app.get('/todos', async (c) => {
  return c.json(todos)

  // todos.map((todo) => {
  //   console.log(todo)
  // })
})

app.get('/todos/:id',  (c) => {
  const id = c.req.param().id  
  const todo = todos.find((todo) => 
    todo.id === id
  )
  return c.json(todo)
})



app.post('/todos', async (c) => {
  const todo = await c.req.json()
  todos.push(todo)
  return c.json("Todo Created")
})

app.put('/todos/:id', async (c) => {
  const id = await c.req.param().id
  const todoData = await c.req.json()
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.title = todoData.title
      todo.status = todoData.status
    }
  })
  return c.json("Todo Updated")
})

app.delete('/todos/:id', async (c) => {
  const id = await c.req.param().id
  const index = todos.findIndex((todo) => 
    todo.id == id
  )
  todos.splice(index, 1)
  return c.json("Todo Deleted")
})

app.delete('/todos', async (c) => {
  todos = []
  return c.json("All Todo Deleted")
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
