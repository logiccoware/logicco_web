create table public.transactions (
  id uuid not null default gen_random_uuid (),
  date timestamp without time zone not null,
  note text,
  user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  payee_id uuid not null,
  account_id uuid not null,
  category_id uuid not null,
  constraint transactions_pkey primary key (id),
  constraint transactions_category_id_fkey foreign KEY (category_id) references categories (id) on delete CASCADE,
  constraint transactions_account_id_fkey foreign KEY (account_id) references accounts (id) on delete CASCADE,
  constraint transactions_payee_id_fkey foreign KEY (payee_id) references payees (id) on delete CASCADE,
  constraint transactions_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_payee_id ON public.transactions(payee_id);
CREATE INDEX idx_transactions_account_id ON public.transactions(account_id);
CREATE INDEX idx_transactions_category_id ON public.transactions(category_id);