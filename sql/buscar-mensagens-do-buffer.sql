SELECT id,message_id,subscriber_id,message,received_at
FROM public.manychat_message_buffer
WHERE subscriber_id=$1
AND received_at <= $2::timestamptz
ORDER BY received_at ASC,id ASC;
