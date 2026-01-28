## Database Setup

### 1. Create a MySQL Server

Create and host a MySQL server using your preferred method.

For guidance, refer to the official MySQL documentation:

> [MySQL Getting Started](https://dev.mysql.com/doc/mysql-getting-started/en/)

Ensure the server is running before proceeding to the next steps.

### 2. Initialize the Database Schema

Once the MySQL server is running, execute the SQL queries in the `setup.sql` file to create all required tables and database structures.

```bash
mysql -u <username> -p <database_name> < setup.sql
```

### 3. (Optional) Load Sample Data

If sample data is required for testing or development, run the queries in the `sample.sql` file after completing the initial setup:

```bash
mysql -u <username> -p <database_name> < sample.sql
```

### 4. Sample User Credentials

All users included in the sample data share the following password:

```
password123
```

> **Note:** This password is intended for development and testing purposes only. Be sure to update credentials before deploying to a production environment.
