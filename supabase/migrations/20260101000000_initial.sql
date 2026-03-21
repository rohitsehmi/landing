-- Initial schema
-- Run: npx supabase db push

-- Waitlist
create table if not exists public.waitlist (
  id          uuid default gen_random_uuid() primary key,
  email       text unique not null,
  name        text,
  created_at  timestamptz default now() not null
);

alter table public.waitlist enable row level security;

-- Only service role can read/write waitlist (no user-level access needed)
create policy "Service role only"
  on public.waitlist
  as restrictive
  to authenticated
  using (false);

-- ── Add future migrations below as new files ──────────────────────────────────
-- Naming: YYYYMMDDHHMMSS_description.sql
-- Example: 20260201120000_add_users_table.sql
