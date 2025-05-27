create table public.transaction_items (
  id uuid not null default gen_random_uuid(),
  amount bigint not null,
  user_id uuid not null,
  transaction_id uuid not null,
  created_at timestamp with time zone not null default now(),
  constraint transaction_items_pkey primary key (id),
  constraint transaction_items_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint transaction_items_transaction_id_fkey foreign key (transaction_id) references transactions (id) on delete cascade
) TABLESPACE pg_default;

ALTER TABLE public.transaction_items ENABLE ROW LEVEL SECURITY;

-- Add indexes for foreign key columns
CREATE INDEX idx_transaction_items_user_id ON public.transaction_items(user_id);
CREATE INDEX idx_transaction_items_transaction_id ON public.transaction_items(transaction_id);