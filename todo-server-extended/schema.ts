import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todos', {
  id: text().primaryKey(),
  title: text(),
  status: text(),
  createdAt: text(),
  updatedAt: text(),
});
