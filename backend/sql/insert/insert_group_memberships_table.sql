INSERT INTO 
    group_memberships (group_id, user_id, is_admin, is_online)
VALUES 
    ($1, $2, $3, $4) RETURNING group_id, user_id, is_admin, is_online;
