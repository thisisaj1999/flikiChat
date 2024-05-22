INSERT INTO 
    group_memberships (group_id, user_id, is_admin)
VALUES 
    ($1, $2, $3) RETURNING group_id, user_id;
