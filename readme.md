# Blog API - RESTful Service with Node.js, TypeScript, TypeORM, Clean Architecture, and SOLID Principles

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0909?logo=typeorm&logoColor=white)](https://typeorm.io/)

A RESTful API for blog management built with modern backend technologies and software architecture principles. Designed for scalability, maintainability, and testability.

## Features

- **User Authentication** (JWT-based)
- **CRUD Operations** for:
    - Blog Posts
    - Comments
    - Categories
    - Tags
- **Search and Filtering** with pagination
- **Validation** Middleware
- **Error Handling** with custom exceptions
- **Database Migrations**
- **Environment Configuration**
- **API Documentation** (Swagger/OpenAPI)

## Technologies Used

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt
- Jest
- Supertest
- ESLint
- Prettier
- Docker

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- npm (v9+)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/franklinserif/portfolio-blog.git
cd blog-api
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file (use .env.example as template):

```bash
cp .env.example .env
```

4. Update environment variables in .env:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

5. Run migrations:

```bash
npm run typeorm migration:run
```

6. (Optional) Seed initial data:

```bash
npm run seed
```
