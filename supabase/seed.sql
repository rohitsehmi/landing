-- Seed data for local development
-- Run: npx supabase db reset

insert into public.waitlist (email, name) values
  ('test@example.com', 'Test User'),
  ('dev@example.com', 'Dev User')
on conflict (email) do nothing;
