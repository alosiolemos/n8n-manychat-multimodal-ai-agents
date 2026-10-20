INSERT INTO public.manychat_message_buffer
(message_id, subscriber_id, message, received_at)
VALUES ($1,$2,$3,$4::timestamptz)
RETURNING id,message_id,subscriber_id,message,received_at;
