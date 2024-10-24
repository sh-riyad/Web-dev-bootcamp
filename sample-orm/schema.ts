import { integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const studentTable = sqliteTable('Students', {
    id: integer().primaryKey(),
    name: text()
});
