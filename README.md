# Contact Management

This Contact Management System uses a Node.js REST API for backend operations and a React.js frontend with MUI. It is built in a Bun monorepo for dependency management. The features are displaying contacts, sorting and filtering, updating and deleting contacts, and adding new contacts.

![preview](https://github.com/user-attachments/assets/32585479-1621-41e6-bbaa-01ca93de8a59)

I chose a future-proof, modern techstack:
- Database:
  - **PostgreSQL** - A database with advanced plugins available such UUID generation (used in this project)
- Backend:
  - [**Fastify**](https://fastify.dev/) - A modern alternative webserver for Nodejs, easier to use as compared to Express with less boilerplate
  - [**Drizzle ORM**](https://orm.drizzle.team/) - An object-relational mapping for PostgreSQL database for intellisense, typesafety and integreation with JS rather than writing SQL queries
- Frontend: React, [MUI](https://mui.com/) _(as per requirement)_

To install dependencies:

```bash
bun install
```

To run:

1. Database
```sql
CREATE EXTENSION "uuid-ossp";
CREATE TABLE contacts (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "phone" varchar(20) NOT NULL,
    "company" varchar(255) NOT NULL,
    "job_title" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);
```

2. Backend

Add Database URL in .env file
```bash
# packages/backend/.env
DATABASE_URL=postgresql://erino_backend:******@127.0.0.1/erino_contacts
PORT=3000
```
```bash
cd packages/backend
bun start
```

3. Frontend
```bash
cd packages/frontend
bun start
```
