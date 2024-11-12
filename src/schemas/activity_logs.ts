
import { pgTable, serial, varchar ,timestamp} from 'drizzle-orm/pg-core';

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  time_stamp: timestamp("time_stamp", { mode: "string" }).defaultNow(),

  user_id: varchar('user_id').notNull(),
  action: varchar('action').notNull(),
  service: varchar('service').notNull()

});