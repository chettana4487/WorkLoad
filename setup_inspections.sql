-- 1. Create the Inspections table
create table public.inspections (
  id uuid default gen_random_uuid() primary key,
  project_id text references public.projects(id) on delete cascade,
  type text not null, -- 'EEP' or 'EEW'
  file_name text not null,
  file_path text not null,
  passed_items integer default 0,
  dept_status jsonb default '{}'::jsonb,
  uploaded_at timestamp with time zone default now()
);

-- 2. Enable Row-Level Security (RLS)
alter table public.inspections enable row level security;

-- 3. Add Policies
-- Allow anyone to view inspection data
create policy "Allow public read access" on public.inspections
  for select using (true);

-- Allow anyone to insert (The app will handle this)
create policy "Allow insert for everyone" on public.inspections
  for insert with check (true);

-- 4. Storage Bucket
-- IMPORTANT: Go to your Supabase Dashboard -> Storage and create a bucket named 'inspections'
-- Set it to 'Public' or add a policy to allow read/write access.
