INSERT INTO
    groups (group_name, owner_id, profile_image_url, description, participant_ids)
VALUES
    ($1, $2, $3, $4, $5) RETURNING id;