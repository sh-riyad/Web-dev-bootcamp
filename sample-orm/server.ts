
import { Hono } from 'hono'
import { db } from "./db.ts";
import {studentTable} from "./schema.ts"

const app = new Hono()

app.get('/', async (c) => {
  const students = await db.select().from(studentTable).all()

  return c.json(students)
})

app.post("/", async (c) => {
  try {
    const body = await c.req.json()
    if (!body.name) {
      throw new Error("Name is required")
    }
    const student = await db
      .insert(studentTable)
      .values({
        name: body.name,
      })
      .returning();
    
    return c.json(student)

  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
})


Deno.serve(app.fetch)
