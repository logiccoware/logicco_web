ALTER TABLE public.transactions
  ALTER COLUMN date TYPE timestamp with time zone
  USING date AT TIME ZONE 'America/Winnipeg';