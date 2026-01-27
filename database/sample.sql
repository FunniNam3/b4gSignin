-- Sample data for the 'teams' table
INSERT INTO teams (teamName) VALUES
('Engineering'),
('Design'),
('Marketing'),
('Sales');

-- Sample data for the 'users' table
-- Note: passwordHashes are placeholders (e.g., hashed 'password123')
INSERT INTO users (firstName, lastName, gradYear, permissions, teamID, email, passwordHash) VALUES
('Alice', 'Smith', 2024, 1, 1, 'alice.smith@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Bob', 'Johnson', 2025, 1, 1, 'bob.johnson@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Charlie', 'Williams', 2023, 1, 2, 'charlie.williams@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('David', 'Brown', 2024, 2, 3, 'david.brown@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Eve', 'Jones', 2026, 1, NULL, 'eve.jones@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG');
