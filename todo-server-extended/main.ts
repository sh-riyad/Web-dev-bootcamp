import { Hono } from 'hono';
import { db } from './database.ts';
import { todoTable } from './schema.ts';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.get('/todos', async (c) => {
  const todos = await db.select().from(todoTable).all();
  return c.json(todos);
});

app.get('/todos/:id', async (c) => {
  try {
    const id = c.req.param().id;
    const todos = await db.select().from(todoTable).all();

    console.log(todos);
    const todo = todos.find((todo) => todo.id == id);

    if (!todo) {
      return c.json({ message: 'Todo not found' }, 404);
    }
    return c.json(todo, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.post('/todos', async (c) => {
  try {
    const todo = await c.req.json();

    todo.status = todo.status || 'todo';

    if (
      typeof todo !== 'object' ||
      todo === null ||
      Object.keys(todo).length === 0
    ) {
      return c.json(
        { message: 'Request body must be a non-empty object.' },
        400
      );
    }

    // As title is required
    if (!todo.title) {
      return c.json({ message: 'Title is required' }, 400);
    }

    // Checking if title field is empty
    if (typeof todo.title !== 'string' || todo.title.trim().length === 0) {
      return c.json({ error: 'Title must be a non-empty string.' }, 400);
    }

    // checking status length
    if (todo.status.length > 20) {
      return c.json(
        { error: 'Status must be between 3 and 20 characters long.' },
        400
      );
    }

    // checking unknown parameters
    const invalidKeys = Object.keys(todo).filter(
      (key) => key !== 'title' && key !== 'status'
    );
    if (invalidKeys.length > 0) {
      return c.json({ message: 'Invalid Parameters', invalidKeys }, 400);
    }

    const result = await db
      .insert(todoTable)
      .values({
        title: todo.title,
        status: todo.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return c.json({ message: 'Todo Created', todo: result }, 200);

  } catch  {
    return c.json({ message: 'Invalid Input' }, 400);
  }
});

// update todo
app.put('/todos/:id', async (c) => {
  const id = c.req.param().id;

  try {
    const todoData = await c.req.json();

    const todo = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id,id));

    if (todo.length === 0) {
      return c.json({ message: 'Todo not found' }, 404);
    }
    // console.log(todo)

    // // updating todo
    const result = await db
      .update(todoTable)
      .set({
        title: todoData.title || todo[0].title,
        status: todoData.status || todo[0].status,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(todoTable.id, id))
      .returning()

    return c.json({ message: 'Todo Updated', todo: result[0] }, 200);
  } catch {
    return c.json({ message: 'Invalid Input' }, 400);
  }
});

// Todo delete operation
app.delete('/todos/:id', async (c) => {
  const id = await c.req.param().id;

  try {
    // getting the specific todo from db based on id
    const todo = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, id));
    
    if (todo.length === 0) {
      return c.json({ message: 'Todo not found' }, 404);
    }

    const result = await db
      .delete(todoTable)
      .where(eq(todoTable.id, id))
      .returning()
    
    return c.json({ message: 'Todo Deleted', todo: result[0] }, 200);

  } catch {
    return c.json({ message: 'Invalid Input'}, 400);
  }
  
});

// Delete all todos
app.delete('/todos', async (c) => {
  try {
    await db
      .delete(todoTable)
      .returning();

    return c.json({ message: 'All Todos Deleted' }, 200);

  } catch (error) {
    return c.json({ message: 'Error deleting todos', error: error }, 500);
  }
});

Deno.serve(app.fetch);
