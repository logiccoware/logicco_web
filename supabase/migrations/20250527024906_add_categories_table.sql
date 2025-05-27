create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  created_at timestamp with time zone not null default now(),
  parent_id uuid null,
  user_id uuid not null,
  constraint categories_pkey primary key (id),
  constraint categories_parent_id_fkey foreign KEY (parent_id) references categories (id) on delete CASCADE,
  constraint categories_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;


ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;