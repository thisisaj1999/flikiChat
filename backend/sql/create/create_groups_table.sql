CREATE TABLE
    IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        group_name TEXT NOT NULL,
        owner_id INTEGER NOT NULL,
        profile_image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        participant_ids TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )