create type public.ai_employee_status as enum ('DEVELOPMENT', 'ACTIVE', 'MAINTENANCE', 'SUSPENDED');
create type public.governance_severity as enum ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
create type public.platform_health_state as enum ('HEALTHY', 'WARNING', 'CRITICAL', 'EMERGENCY');

create table public.ai_employees (
  id integer primary key,
  name text not null unique,
  department text not null,
  mission text not null,
  confidence_threshold numeric(5,2) not null default 80,
  status public.ai_employee_status not null default 'ACTIVE',
  reports_to text not null default 'AI_ADMIN',
  permissions jsonb not null default '{}'::jsonb,
  memory_scopes jsonb not null default '[]'::jsonb,
  restrictions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.platform_events (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id),
  actor_type text not null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.governed_memory (
  id uuid primary key default uuid_generate_v4(),
  scope text not null,
  owner_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  memory_key text not null,
  value jsonb not null,
  recorded_by text not null,
  created_at timestamptz not null default now()
);

create table public.lifecycle_transitions (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id uuid not null,
  from_state text,
  to_state text not null,
  reason text not null,
  actor_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.governance_queue (
  id uuid primary key default uuid_generate_v4(),
  action_type text not null,
  entity_type text not null,
  entity_id uuid,
  requested_by uuid references public.profiles(id),
  assigned_ai text,
  severity public.governance_severity not null default 'MEDIUM',
  status text not null default 'PENDING',
  hold_until timestamptz not null default (now() + interval '30 minutes'),
  decision text,
  decided_by uuid references public.profiles(id),
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.platform_health (
  id uuid primary key default uuid_generate_v4(),
  subsystem text not null unique,
  state public.platform_health_state not null default 'HEALTHY',
  details jsonb not null default '{}'::jsonb,
  checked_at timestamptz not null default now()
);

alter table public.ai_employees enable row level security;
alter table public.platform_events enable row level security;
alter table public.governed_memory enable row level security;
alter table public.lifecycle_transitions enable row level security;
alter table public.governance_queue enable row level security;
alter table public.platform_health enable row level security;

create policy "authenticated users can view workforce" on public.ai_employees for select to authenticated using (true);
create policy "actors can view their events" on public.platform_events for select to authenticated using (actor_id = auth.uid());
create policy "owners can view scoped memory" on public.governed_memory for select to authenticated using (owner_id = auth.uid());
create policy "actors can view lifecycle history" on public.lifecycle_transitions for select to authenticated using (actor_id = auth.uid());
create policy "requesters can view governance queue" on public.governance_queue for select to authenticated using (requested_by = auth.uid());
create policy "authenticated users can view platform health" on public.platform_health for select to authenticated using (true);

create index platform_events_created_at_idx on public.platform_events(created_at desc);
create index platform_events_entity_idx on public.platform_events(entity_type, entity_id, created_at desc);
create index governed_memory_scope_idx on public.governed_memory(scope, entity_type, entity_id);
create index lifecycle_transitions_entity_idx on public.lifecycle_transitions(entity_type, entity_id, created_at desc);
create index governance_queue_status_idx on public.governance_queue(status, severity, hold_until);