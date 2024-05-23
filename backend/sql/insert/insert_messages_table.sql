INSERT INTO 
    messages (message, sender_id, group_id)
VALUES 
    ($1, $2, $3) RETURNING id, message, sender_id, group_id, created_at, updated_at;
