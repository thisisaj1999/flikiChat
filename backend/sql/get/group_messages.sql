SELECT 
  m.*, 
  u.name AS sender_name
FROM 
  messages m
JOIN 
  users u ON m.sender_id = u.id
WHERE 
  m.group_id = $1 ORDER BY m.created_at DESC LIMIT $2 OFFSET $3;