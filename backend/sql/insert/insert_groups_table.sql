INSERT INTO 
    groups (group_name, owner_id, profile_image_url, description)
VALUES 
    ($1, $2, $3, $4) RETURNING id;
