DELETE FROM public.manychat_message_buffer
WHERE subscriber_id=$1
AND received_at <= $2::timestamptz
RETURNING id;
