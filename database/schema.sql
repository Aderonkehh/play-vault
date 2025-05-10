use playvault;

/* users table creation*/
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/*game_score table creation*/
CREATE TABLE game_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_name VARCHAR(100),
    score INT DEFAULT 0,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


/*indexing*/
CREATE INDEX idx_user_game ON game_scores(user_id, game_name);

/*insertion*/
INSERT INTO users (username, password) VALUES ('testuser', 'hashed_password_here');

-- After registering and getting user_id:
INSERT INTO game_scores (user_id, game_name, score) VALUES (1, 'RockPaperScissors', 85);


