SELECT 
  g.id AS group_id,
  g.group_name,
  g.profile_image_url,
  g.description,
  (
    SELECT msg.message
    FROM messages msg
    WHERE msg.group_id = g.id
    ORDER BY msg.created_at DESC
    LIMIT 1
  ) AS last_message,
  (
    SELECT msg.created_at
    FROM messages msg
    WHERE msg.group_id = g.id
    ORDER BY msg.created_at DESC
    LIMIT 1
  ) AS last_message_time
FROM groups g
JOIN group_memberships gm ON g.id = gm.group_id
WHERE gm.user_id = 5