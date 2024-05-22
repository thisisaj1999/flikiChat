UPDATE users
SET name = COALESCE($1, name),
    email = COALESCE($2, email),
    password = COALESCE($3, password)
WHERE id = $4;
