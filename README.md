# Contact Management

This Contact Management System uses a Node.js REST API for backend operations and a React.js frontend with MUI. It is built in a Bun monorepo for dependency management. The features are displaying contacts, sorting and filtering, updating and deleting contacts, and adding new contacts.

![preview](https://github.com/user-attachments/assets/32585479-1621-41e6-bbaa-01ca93de8a59)

I chose a future-proof, modern techstack:
- Database:
  - **PostgreSQL** - A database with advanced plugins available such UUID generation (used in this project)
- Backend:
  - **Fastify** - A modern alternative webserver for Nodejs, easier to use as compared to Express with less boilerplate
  - **Drizzle ORM** - An object-relational mapping for PostgreSQL database for intellisense, typesafety and integreation with JS rather than writing SQL queries
- Frontend: React, MUI _(as per requirement)_

To install dependencies:

```bash
bun install
```

To run:

1. Backend
```bash
cd packages/backend
bun start
```

2. Frontend
```bash
cd packages/frontend
bun start
```
