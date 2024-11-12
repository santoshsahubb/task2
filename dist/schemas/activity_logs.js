"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityLogs = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.activityLogs = (0, pg_core_1.pgTable)('activity_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    time_stamp: (0, pg_core_1.timestamp)("time_stamp", { mode: "string" }).defaultNow(),
    user_id: (0, pg_core_1.varchar)('user_id').notNull(),
    action: (0, pg_core_1.varchar)('action').notNull(),
    service: (0, pg_core_1.varchar)('service').notNull()
});
