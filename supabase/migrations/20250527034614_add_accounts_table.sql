CREATE TYPE public.currency_type AS ENUM ('CAD', 'INR', 'USD');

create table public.accounts (
  id uuid not null default gen_random_uuid (),
  name text not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid not null default gen_random_uuid (),
  currency currency_type not null default 'CAD',
  constraint accounts_pkey primary key (id),
  constraint accounts_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_accounts_user_id ON public.accounts(user_id);