-- Recur application schema draft.
-- Apply to a dedicated Recur Supabase project after project creation.

create extension if not exists pgcrypto;
create schema if not exists private;

create type public.app_role as enum ('consumer', 'dealer', 'operations');
create type public.agreement_status as enum ('application', 'active', 'service_due', 'return_window', 'return_booked', 'renewed', 'completed', 'exception');
create type public.lifecycle_choice as enum ('undecided', 'return', 'renew');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null check (kind in ('dealer', 'manufacturer', 'recur', 'finance_provider')),
  external_ref text unique,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null,
  organization_id uuid references public.organizations(id),
  display_name text not null,
  finance_authorized boolean not null default false,
  created_at timestamptz not null default now(),
  constraint dealer_requires_org check (role <> 'dealer' or organization_id is not null)
);

create table public.bikes (
  id uuid primary key default gen_random_uuid(),
  manufacturer_org_id uuid references public.organizations(id),
  current_dealer_org_id uuid references public.organizations(id),
  model text not null,
  frame_number text not null unique,
  original_specification jsonb not null default '{}'::jsonb,
  lifecycle_status text not null default 'available',
  created_at timestamptz not null default now()
);

create table public.agreements (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  consumer_id uuid not null references public.profiles(id),
  bike_id uuid not null references public.bikes(id),
  dealer_org_id uuid not null references public.organizations(id),
  finance_provider_org_id uuid references public.organizations(id),
  status public.agreement_status not null default 'application',
  started_on date,
  term_ends_on date,
  choice_opens_on date,
  lifecycle_choice public.lifecycle_choice not null default 'undecided',
  created_at timestamptz not null default now()
);

-- Financial figures are deliberately separated from the operational agreement.
-- Dealers receive no privileges or policies on this table.
create table private.agreement_finance (
  agreement_id uuid primary key references public.agreements(id) on delete cascade,
  monthly_payment numeric(12,2),
  remaining_balance numeric(12,2),
  paid_percent numeric(5,2),
  next_payment_on date,
  provider_payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Exposed projection still obeys the underlying private-table RLS policies.
create view public.agreement_finance_visible
with (security_invoker = true)
as
select agreement_id, monthly_payment, remaining_balance, paid_percent, next_payment_on, updated_at
from private.agreement_finance;

create table public.service_events (
  id uuid primary key default gen_random_uuid(),
  bike_id uuid not null references public.bikes(id),
  agreement_id uuid references public.agreements(id),
  dealer_org_id uuid not null references public.organizations(id),
  technician_user_id uuid references auth.users(id),
  event_type text not null,
  summary text not null,
  evidence jsonb not null default '[]'::jsonb,
  occurred_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.lifecycle_events (
  id uuid primary key default gen_random_uuid(),
  bike_id uuid not null references public.bikes(id),
  agreement_id uuid references public.agreements(id),
  event_type text not null,
  actor_user_id uuid references auth.users(id),
  actor_org_id uuid references public.organizations(id),
  detail jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('consumer', 'dealer', 'manufacturer', 'support')),
  name text,
  email text not null,
  message text,
  consent_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function private.current_profile()
returns public.profiles
language sql
stable
security definer
set search_path = ''
as $$
  select p from public.profiles p where p.id = (select auth.uid());
$$;
revoke all on function private.current_profile() from public;
grant usage on schema private to authenticated;
grant execute on function private.current_profile() to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.bikes enable row level security;
alter table public.agreements enable row level security;
alter table private.agreement_finance enable row level security;
alter table public.service_events enable row level security;
alter table public.lifecycle_events enable row level security;
alter table public.enquiries enable row level security;

create policy "profile self or operations" on public.profiles for select to authenticated
using (id = (select auth.uid()) or ((private.current_profile()).role = 'operations'));

create policy "organizations visible to signed in users" on public.organizations for select to authenticated using (true);

create policy "bike access by lifecycle relationship" on public.bikes for select to authenticated
using (
  (private.current_profile()).role = 'operations'
  or current_dealer_org_id = (private.current_profile()).organization_id
  or exists (select 1 from public.agreements a where a.bike_id = bikes.id and a.consumer_id = (select auth.uid()))
);

create policy "agreement access by role" on public.agreements for select to authenticated
using (
  consumer_id = (select auth.uid())
  or dealer_org_id = (private.current_profile()).organization_id
  or (private.current_profile()).role = 'operations'
);

create policy "consumer finance access" on private.agreement_finance for select to authenticated
using (exists (select 1 from public.agreements a where a.id = agreement_id and a.consumer_id = (select auth.uid())));

create policy "authorized operations finance access" on private.agreement_finance for select to authenticated
using ((private.current_profile()).role = 'operations' and (private.current_profile()).finance_authorized);

create policy "service history access" on public.service_events for select to authenticated
using (exists (select 1 from public.bikes b where b.id = bike_id));

create policy "dealer service event creation" on public.service_events for insert to authenticated
with check (dealer_org_id = (private.current_profile()).organization_id and (private.current_profile()).role = 'dealer');

create policy "lifecycle history access" on public.lifecycle_events for select to authenticated
using (exists (select 1 from public.bikes b where b.id = bike_id));

create policy "public enquiry submission" on public.enquiries for insert to anon, authenticated with check (true);
create policy "operations enquiry access" on public.enquiries for select to authenticated
using ((private.current_profile()).role = 'operations');

grant select on public.organizations, public.profiles, public.bikes, public.agreements, public.service_events, public.lifecycle_events to authenticated;
grant insert on public.service_events to authenticated;
grant insert on public.enquiries to anon, authenticated;
grant select on public.enquiries to authenticated;
grant select on private.agreement_finance to authenticated;
grant select on public.agreement_finance_visible to authenticated;
