UPDATE messages
SET message = COALESCE($1, message),
    sender_id = COALESCE($2, sender_id),
    group_id = COALESCE($3, group_id)
WHERE id = $4;
