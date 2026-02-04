-- Sample data for the 'users' table
-- Note: passwordHashes are placeholders (e.g., hashed 'password123')
INSERT INTO users (firstName, lastName, gradYear, teamID, email, passwordHash) VALUES
('Frank', 'Miller', 2025, NULL, 'frank.miller@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Grace', 'Lee', 2026, NULL, 'grace.lee@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Henry', 'Anderson', 2024, NULL, 'henry.anderson@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Isabella', 'Martinez', 2027, NULL, 'isabella.martinez@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Jack', 'Taylor', 2023, NULL, 'jack.taylor@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Kaitlyn', 'Nguyen', 2026, NULL, 'kaitlyn.nguyen@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Lucas', 'Hernandez', 2025, NULL, 'lucas.hernandez@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Maya', 'Patel', 2024, NULL, 'maya.patel@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Noah', 'Wilson', 2027, NULL, 'noah.wilson@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Olivia', 'Garcia', 2025, NULL, 'olivia.garcia@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Ryan', 'Thompson', 2023, NULL, 'ryan.thompson@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Sophia', 'Kim', 2026, NULL, 'sophia.kim@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Tyler', 'Robinson', 2024, NULL, 'tyler.robinson@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Vanessa', 'Lopez', 2027, NULL, 'vanessa.lopez@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('William', 'Carter', 2025, NULL, 'william.carter@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Aaron', 'Bennett', 2025, NULL, 'aaron.bennett@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Bianca', 'Rivera', 2026, NULL, 'bianca.rivera@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Caleb', 'Moore', 2024, NULL, 'caleb.moore@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Diana', 'Ng', 2027, NULL, 'diana.ng@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Ethan', 'Park', 2025, NULL, 'ethan.park@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Farah', 'Khan', 2026, NULL, 'farah.khan@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Gavin', 'Scott', 2024, NULL, 'gavin.scott@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Hannah', 'Brooks', 2027, NULL, 'hannah.brooks@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Ian', 'Coleman', 2023, NULL, 'ian.coleman@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Jasmine', 'Ali', 2025, NULL, 'jasmine.ali@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Kevin', 'Olsen', 2024, NULL, 'kevin.olsen@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Lena', 'Petrov', 2026, NULL, 'lena.petrov@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Marcus', 'Green', 2025, NULL, 'marcus.green@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Nina', 'Choi', 2027, NULL, 'nina.choi@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Owen', 'Fletcher', 2023, NULL, 'owen.fletcher@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Priya', 'Desai', 2026, NULL, 'priya.desai@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Quinn', 'Harris', 2024, NULL, 'quinn.harris@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Rosa', 'Mendoza', 2025, NULL, 'rosa.mendoza@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Sam', 'Whitaker', 2027, NULL, 'sam.whitaker@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Talia', 'Rosen', 2026, NULL, 'talia.rosen@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Umar', 'Siddiqui', 2025, NULL, 'umar.siddiqui@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Valerie', 'Stone', 2024, NULL, 'valerie.stone@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Wyatt', 'King', 2026, NULL, 'wyatt.king@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Ximena', 'Cruz', 2027, NULL, 'ximena.cruz@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Yusuf', 'Rahman', 2025, NULL, 'yusuf.rahman@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG'),
('Zoe', 'Turner', 2024, NULL, 'zoe.turner@example.com', '$2b$12$s3qFPAHFGgvA3t1Pujx2RuTz8qnLj4NQpIsVm9IXfW1N8uEUED4kG');

-- Sample data for the 'teams' table
INSERT INTO teams (teamName, leaderID) VALUES
('Byte Me', 1),
('HackStreet Boys', 2),
('Null Pointers', 3),
('404 Found', 4),
('Code Blooded', 5),
('Runtime Terrors', 6),
('Stack Smashers', 7),
('Bug Slayers', 8),
('Binary Beasts', 9),
('Logic Lords', 10),
('Segfault Squad', 11),
('Data Dragons', 12),
('Script Kiddos', 13),
('Compile Time', 14),
('Pixel Pirates', 15),
('Algorithm Alphas', 16);

-- Add leaders to their respective teams
UPDATE users u
JOIN teams t ON u.userID = t.leaderID
SET u.teamID = t.teamID;