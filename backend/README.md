# AcademiaLink Backend

Backend API for the AcademiaLink — Academia–Industry Collaboration Platform.

## Technologies

- Node.js
- Express.js
- Prisma ORM
- MySQL
- CORS
- dotenv

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers/
│   │   └── healthController.js
│   ├── routes/
│   │   └── healthRoutes.js
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── .env.example
├── package.json
└── README.md