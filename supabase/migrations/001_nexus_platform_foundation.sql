create extension if not exists "uuid-ossp";

create type public.user_role as enum ('buyer', 'seller', 'agent', 'investor', 'developer', 'verifier', 'agency', 'corporate', 'government', 'admin');
create type public.property_status as enum ('draft', 'pending_review', 'listed', 'rejected', 'under_offer', 'closed', 'archived');
create type public.verification_status as enum ('pending', 'in_review', 'approved', 'rejected', 'needs_information');
create type public.lead_status as enum ('new', 'qualified', 'locked', 'negotiation', 'converted', 'expired', 'disputed');
create type public.payment_status as enum ('pending', 'under_review', 'received', 'failed', 'refunded', 'disputed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'buyer',
  phone text,
  city text,
  area text,
  verification_status public.verification_status not null default 'pending',
  trust_score numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id),
  title text not null,
  description text not null,
  city text not null,
  area text not null,
  category text not null,
  property_type text not null,
  intent text not null,
  price numeric(15,2),
  bedrooms integer,
  bathrooms integer,
  facilities jsonb not null default '[]'::jsonb,
  status public.property_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_documents (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references public.properties(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  document_type text not null,
  storage_path text not null,
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.verifications (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id) on delete cascade,
  subject_id uuid references public.profiles(id) on delete cascade,
  status public.verification_status not null default 'pending',
  score numeric(5,2),
  risk_level text,
  findings jsonb not null default '[]'::jsonb,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid not null references public.profiles(id),
  property_id uuid not null references public.properties(id),
  assigned_agent_id uuid references public.profiles(id),
  status public.lead_status not null default 'new',
  intent_score numeric(5,2),
  locked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references public.properties(id),
  lead_id uuid references public.leads(id),
  buyer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  agent_id uuid references public.profiles(id),
  status text not null default 'open',
  offer_amount numeric(15,2),
  milestones jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  assistant_id integer not null,
  title text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  payment_type text not null,
  reference_id uuid,
  amount numeric(15,2) not null,
  currency text not null default 'PKR',
  status public.payment_status not null default 'pending',
  provider_reference text,
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id),
  actor_type text not null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  before_state jsonb,
  after_state jsonb,
  reason text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_documents enable row level security;
alter table public.verifications enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.payments enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles are visible to signed in users" on public.profiles for select to authenticated using (true);
create policy "users update their own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "users create their own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "listed properties are public" on public.properties for select using (status = 'listed' or owner_id = auth.uid());
create policy "owners create properties" on public.properties for insert to authenticated with check (owner_id = auth.uid());
create policy "owners update draft properties" on public.properties for update to authenticated using (owner_id = auth.uid() and status = 'draft') with check (owner_id = auth.uid());

create policy "document owners can view documents" on public.property_documents for select to authenticated using (uploaded_by = auth.uid() or exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "document owners can upload" on public.property_documents for insert to authenticated with check (uploaded_by = auth.uid());

create policy "users view relevant verifications" on public.verifications for select to authenticated using (subject_id = auth.uid() or exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "users create verification requests" on public.verifications for insert to authenticated with check (subject_id = auth.uid() or exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));

create policy "lead participants can view leads" on public.leads for select to authenticated using (buyer_id = auth.uid() or assigned_agent_id = auth.uid() or exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "buyers create leads" on public.leads for insert to authenticated with check (buyer_id = auth.uid());

create policy "deal participants can view deals" on public.deals for select to authenticated using (buyer_id = auth.uid() or seller_id = auth.uid() or agent_id = auth.uid());

create policy "users view their AI conversations" on public.ai_conversations for select to authenticated using (user_id = auth.uid());
create policy "users create their AI conversations" on public.ai_conversations for insert to authenticated with check (user_id = auth.uid());
create policy "users update their AI conversations" on public.ai_conversations for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "users view their payments" on public.payments for select to authenticated using (user_id = auth.uid());
create policy "users create payment records" on public.payments for insert to authenticated with check (user_id = auth.uid());

create policy "actors view their audit events" on public.audit_events for select to authenticated using (actor_id = auth.uid());

create index properties_city_area_idx on public.properties(city, area);
create index properties_search_idx on public.properties using gin (to_tsvector('english', title || ' ' || description));
create index leads_status_idx on public.leads(status);
create index audit_events_created_at_idx on public.audit_events(created_at desc);
create index ai_conversations_user_idx on public.ai_conversations(user_id, updated_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Nexus User'));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
