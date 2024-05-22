UPDATE groups
SET group_name = COALESCE($1, group_name),
    owner_id = COALESCE($2, owner_id),
    profile_image_url = COALESCE($3, profile_image_url),
    description = COALESCE($4, description)
WHERE id = $5;
