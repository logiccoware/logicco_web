CREATE TYPE transaction_type AS ENUM ('EXPENSE', 'INCOME');

ALTER TABLE public.transactions 
ADD COLUMN type transaction_type NOT NULL DEFAULT 'EXPENSE';

CREATE INDEX idx_transactions_type ON public.transactions(type);