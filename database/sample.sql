-- Sample data for the 'teams' table
INSERT INTO teams (teamName) VALUES
('Engineering'),
('Design'),
('Marketing'),
('Sales');

-- Sample data for the 'users' table
-- Note: passwordHashes are placeholders (e.g., hashed 'password123')
INSERT INTO users (firstName, lastName, gradYear, permissions, teamID, email, passwordHash) VALUES
('Alice', 'Smith', 2024, 1, 1, 'alice.smith@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU'),
('Bob', 'Johnson', 2025, 1, 1, 'bob.johnson@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTV'),
('Charlie', 'Williams', 2023, 1, 2, 'charlie.williams@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTW'),
('David', 'Brown', 2024, 2, 3, 'david.brown@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTX'),
('Eve', 'Jones', 2026, 1, NULL, 'eve.jones@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTY');
