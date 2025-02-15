# Blog API - RESTful Service with Node.js, TypeScript, TypeORM, Clean Architecture, and SOLID Principles

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0909?logo=typeorm&logoColor=white)](https://typeorm.io/)

A RESTful API for blog management built with modern backend technologies and software architecture principles. Designed for scalability, maintainability, and testability.

## Index

1. [Architecture and structure](#architecture-and-structure)
2. [Domain Layer (Core Business Logic)](#domain-layer)
3. [Application Layer (Service Layer & DTOs)](#application-layer)
4. [Infrastructure Layer (Database, Repositories, External Dependencies)](#infrastructure-layer)
5. [Shared Utilities & Middleware](#shared-utilities-&-middleware)
6. [How It Works in Practice](#how-it-works-in-practice)
7. [Features](#features)
8. [Technologies Used](#technologies-used)
9. [Getting Started](#getting-started)

## Architecture and structure <a name="architecture-and-structure"></a>

this project is inspire on Clean Architecture, and try to simplify the concepts presenter by clean architecture and SOLID using patterns like Repository, dependency injections and others.

feel free to copy the folder structure or the entire project

## Domain Layer (Core Business Logic) <a name="domain-layer"></a>

#### 📂 domain/

- Entities (entities/):
    - Defines business models (e.g., user.ts).
    - Pure TypeScript classes without dependencies on frameworks.
- Repositories (repositories/):
    - Defines interfaces for data access (user.repository.ts).
    - Abstracts data access logic (e.g., TypeORM, Prisma).
- Use Cases (useCases/):
    - Implements business logic independently.
    - Example: createUser.ts, updateUser.ts, listUsers.ts.

#### ✅ Purpose:

This layer contains the core business logic and doesn't depend on external systems.

## Application Layer (Service Layer & DTOs) <a name="application-layer"></a>

#### 📂 application/

- DTOs (Data Transfer Objects) (dtos/):
    - Defines input validation models (e.g., createUser.dto.ts).
    - Prevents unnecessary data exposure.
- Services (services/):
    - Acts as an intermediary between controllers and use cases.
    - Calls use cases (user.service.ts).

#### ✅ Purpose:

This layer orchestrates business logic and defines input/output formats.

## Infrastructure Layer (Database, Repositories, External Dependencies) <a name="infrastructure-layer"></a>

#### 📂 infrastructure/

- Database Connection (database/dataSource.ts):
    - Manages TypeORM database connection.
- Entities (entities/):
    - TypeORM models for the database (e.g., user.entity.ts, post.entity.ts).
- Repositories (Implementations) (repositories/):
    - Concrete implementations of domain/repositories (e.g., TypeORMUser.repository.ts).

#### ✅ Purpose:

This layer manages external dependencies, such as the database.

## Presentation Layer (Controllers & Routes) <a name="infrastructure-layer-(database,-repositories,-external-dependencies)"></a>

#### 📂 presentation/

- Controllers (controllers/):
    - Handle HTTP requests and responses (user.controller.ts).
- Routes (routes/):
    - Defines API routes (user.router.ts, router.ts).

#### ✅ Purpose:

This layer interacts with external users (HTTP requests, APIs).

## Shared Utilities & Middleware <a name="shared-utilities-&-middleware"></a>

#### 📂 shared/

- Enums (enums/): Common constants (log.ts, server.ts).
- Interfaces (interfaces/): Shared interfaces (logs.ts).
- Middlewares (middlewares/): Express middlewares (validation.middleware.ts).
- Utils (utils/):
    - config/: App configuration.
    - crypt/: Encryption utilities.
    - logger/: Logging system.

#### ✅ Purpose:

Contains cross-cutting concerns used across the application.

## 🔄 How It Works in Practice <a name="how-it-works-in-practice"></a>

1. User makes an API request to POST /users via the user.router.ts.
2. Router calls the Controller (user.controller.ts).
3. Controller calls the Service (user.service.ts).
4. Service calls the Use Case (createUser.ts).
5. Use Case calls the Repository (user.repository.ts).
6. Repository interacts with the database (TypeORMUser.repository.ts).
7. Data flows back to the user.

## Features <a name="features"></a>

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

## Technologies Used <a name="technologies-used"></a>

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

## Getting Started <a name="getting-started"></a>

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
