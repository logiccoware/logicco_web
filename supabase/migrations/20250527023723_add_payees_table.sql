create table public.payees (
  id uuid not null default gen_random_uuid (),
  name text not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid not null default gen_random_uuid (),
  constraint payees_pkey primary key (id),
  constraint payees_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

ALTER TABLE public.payees ENABLE ROW LEVEL SECURITY;