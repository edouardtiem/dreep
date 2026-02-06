-- Dreep Phase 5: Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Diagnostics table (created by salespeople)
create table public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  understanding jsonb not null,
  questions jsonb not null,
  breakdown_templates jsonb not null,
  created_at timestamptz not null default now()
);

-- Responses table (submitted by prospects)
create table public.responses (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  answers jsonb not null,
  breakdowns jsonb not null,
  annual_cost numeric not null,
  completed_at timestamptz not null default now()
);

-- Index for looking up responses by diagnostic
create index idx_responses_diagnostic_id on public.responses(diagnostic_id);

-- RLS: enable on both tables
alter table public.diagnostics enable row level security;
alter table public.responses enable row level security;

-- Diagnostics: anyone can read (public shareable links), anyone can insert
create policy "Diagnostics are publicly readable"
  on public.diagnostics for select
  using (true);

create policy "Anyone can create diagnostics"
  on public.diagnostics for insert
  with check (true);

-- Responses: anyone can insert, anyone can read (for now)
create policy "Anyone can submit responses"
  on public.responses for insert
  with check (true);

create policy "Responses are publicly readable"
  on public.responses for select
  using (true);
