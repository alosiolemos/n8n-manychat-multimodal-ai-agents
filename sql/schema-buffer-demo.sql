-- Proposta didática derivada das colunas usadas no workflow. Não é o DDL original.
-- Execute somente em banco de demonstração após revisão.
CREATE TABLE public.manychat_message_buffer (
    id BIGSERIAL PRIMARY KEY,
    message_id TEXT NOT NULL UNIQUE,
    subscriber_id TEXT NOT NULL,
    message TEXT NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX manychat_buffer_contato_data
    ON public.manychat_message_buffer (subscriber_id, received_at, id);
