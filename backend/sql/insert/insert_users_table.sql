INSERT INTO
    users (name, email, password, joinned_group_ids)
VALUES
    ($1, $2, $3, $4) RETURNING id;
