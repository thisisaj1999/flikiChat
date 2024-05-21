UPDATE users
SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), joinned_group_ids = COALESCE($4, joinned_group_ids) 
WHERE id = $5;