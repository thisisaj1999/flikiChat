# Project Setup Instructions

This guide will walk you through setting up the necessary tools and running the backend and frontend servers for the project.

## Prerequisites

1. **PostgreSQL**
2. **pgAdmin**

## Installation

### Install PostgreSQL and pgAdmin

Follow the official documentation to install PostgreSQL and pgAdmin on your system:

- [PostgreSQL Installation Guide](https://www.postgresql.org/download/)
- [pgAdmin Installation Guide](https://www.pgadmin.org/download/)

## Database Setup

You have two options to set up your database:

1. **Use a Database Backup**

   Download the database backup from [this link](https://github.com/thisisaj1999/flikiChat/blob/main/DBbackup/db_backup.sql) and restore it in PostgreSQL using pgAdmin.

2. **Create a New Database**

   Create a new database named `fliki_chat`. The required tables will be automatically created when the server runs for the first time.

## Backend Setup

1. Navigate to the backend directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Frontend Setup

1. Navigate to the frontend directory.
2. Update the backend server IP address in the `socket.js` and `requests.js` file located in the `src/utils` directory.
3. Make a copy of the frontend directory if you want to run the client side on different ports.
4. Change the port in `package.json`:
   ```json
   "scripts": {
     "dev": "vite --port {any port}"
   }
   ```
5. Install the required dependencies and run the development server:
   ```bash
   npm install
   npm run dev
   ```

## Login Credentials

- If you used the database backup, use the provided login credentials:

  - **User 1**
    - Email: `atul.j@famproperties.com`
    - Password: `atul.j@famproperties.com`

  - **User 2**
    - Email: `test.atul@outlook.com`
    - Password: `test.atul@outlook.com`

  - **User 3**
    - Email: `test@example.com`
    - Password: `test@example.com`

- If you created a new database, you will need to create new login credentials.

## Support

If you encounter any issues or need assistance, please reach out via [email](mailto:contact.atul.dev@gmail.com).

Thank you!
