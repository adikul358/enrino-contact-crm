import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const contactsTable = pgTable('contacts', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  jobTitle: varchar('job_title', { length: 255 }).notNull()
})
