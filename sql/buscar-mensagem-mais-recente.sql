SELECT message_id,subscriber_id,received_at
FROM public.manychat_message_buffer
WHERE subscriber_id=$1
ORDER BY received_at DESC,id DESC
LIMIT 1;
