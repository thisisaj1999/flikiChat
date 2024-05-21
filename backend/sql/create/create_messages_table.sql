CREATE TABLE
    IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        sender_id INTEGER NOT NULL,
        group_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )