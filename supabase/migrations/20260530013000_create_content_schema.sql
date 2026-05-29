create extension if not exists pgcrypto;

create type public.story_status as enum ('draft', 'scheduled', 'published', 'archived');
create type public.story_block_type as enum ('heading', 'paragraph', 'image', 'audio', 'activity_prompt', 'moral');

create table public.languages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  native_name text not null,
  direction text not null default 'ltr' check (direction in ('ltr', 'rtl')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint languages_code_format check (code ~ '^[a-z]{2}(-[A-Z]{2})?$')
);

create table public.age_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  min_age integer not null check (min_age >= 0),
  max_age integer not null check (max_age >= min_age),
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null,
  description jsonb not null default '{}'::jsonb,
  icon text,
  color text not null default '#FF6B6B',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint categories_color_format check (color ~ '^#[0-9A-Fa-f]{6}$'),
  constraint categories_name_is_object check (jsonb_typeof(name) = 'object'),
  constraint categories_description_is_object check (jsonb_typeof(description) = 'object')
);

create table public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid not null references public.categories(id) on delete restrict,
  age_group_id uuid references public.age_groups(id) on delete set null,
  title jsonb not null,
  excerpt jsonb not null default '{}'::jsonb,
  cover_image_url text,
  cover_image_alt jsonb not null default '{}'::jsonb,
  audio_narration_url text,
  is_featured boolean not null default false,
  status public.story_status not null default 'draft',
  published_at timestamptz,
  seo_metadata jsonb not null default '{}'::jsonb,
  author_name text,
  difficulty_level integer not null default 1,
  view_count integer not null default 0,
  reading_time_minutes integer not null default 4 check (reading_time_minutes > 0),
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint stories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint stories_title_is_object check (jsonb_typeof(title) = 'object'),
  constraint stories_excerpt_is_object check (jsonb_typeof(excerpt) = 'object'),
  constraint stories_cover_alt_is_object check (jsonb_typeof(cover_image_alt) = 'object'),
  constraint stories_seo_metadata_is_object check (jsonb_typeof(seo_metadata) = 'object'),
  constraint stories_difficulty_level_range check (difficulty_level between 1 and 4),
  constraint stories_view_count_non_negative check (view_count >= 0),
  constraint stories_published_at_required check (
    status <> 'published' or published_at is not null
  )
);

create index stories_featured_published_idx
  on public.stories (category_id, published_at desc)
  where is_featured = true and status = 'published';

create index stories_category_id_idx on public.stories (category_id);
create index stories_age_group_id_idx on public.stories (age_group_id);
create index stories_status_published_at_idx on public.stories (status, published_at desc);
create index stories_category_status_published_at_idx on public.stories (category_id, status, published_at desc);
create index stories_status_view_count_idx on public.stories (status, view_count desc);
create index stories_tags_idx on public.stories using gin (tags);

create table public.story_blocks (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  language_id uuid not null references public.languages(id) on delete restrict,
  block_type public.story_block_type not null default 'paragraph',
  sort_order integer not null default 0,
  content text,
  asset_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint story_blocks_metadata_is_object check (jsonb_typeof(metadata) = 'object'),
  constraint story_blocks_content_or_asset check (
    content is not null or asset_url is not null
  )
);

create unique index story_blocks_story_language_sort_idx
  on public.story_blocks (story_id, language_id, sort_order);

create index story_blocks_story_id_idx on public.story_blocks (story_id);
create index story_blocks_language_id_idx on public.story_blocks (language_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger languages_set_updated_at
  before update on public.languages
  for each row execute function public.set_updated_at();

create trigger age_groups_set_updated_at
  before update on public.age_groups
  for each row execute function public.set_updated_at();

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create trigger stories_set_updated_at
  before update on public.stories
  for each row execute function public.set_updated_at();

create trigger story_blocks_set_updated_at
  before update on public.story_blocks
  for each row execute function public.set_updated_at();

alter table public.languages enable row level security;
alter table public.age_groups enable row level security;
alter table public.categories enable row level security;
alter table public.stories enable row level security;
alter table public.story_blocks enable row level security;

create policy "Public can read active languages"
  on public.languages for select
  using (is_active = true);

create policy "Public can read age groups"
  on public.age_groups for select
  using (true);

create policy "Public can read active categories"
  on public.categories for select
  using (is_active = true);

create policy "Public can read published stories"
  on public.stories for select
  using (status = 'published' and published_at <= now());

create policy "Public can read blocks for published stories"
  on public.story_blocks for select
  using (
    exists (
      select 1
      from public.stories
      where stories.id = story_blocks.story_id
        and stories.status = 'published'
        and stories.published_at <= now()
    )
  );

insert into public.languages (code, name, native_name, sort_order)
values
  ('en', 'English', 'English', 1),
  ('te', 'Telugu', 'తెలుగు', 2)
on conflict (code) do nothing;

insert into public.age_groups (slug, label, min_age, max_age, description, sort_order)
values
  ('ages-2-4', 'Ages 2-4', 2, 4, 'Gentle read-aloud stories for toddlers and preschoolers.', 1),
  ('ages-3-8', 'Ages 3-8', 3, 8, 'Short stories for early listeners and new readers.', 2),
  ('ages-5-10', 'Ages 5-10', 5, 10, 'Longer stories and activities for growing readers.', 3)
on conflict (slug) do nothing;

insert into public.categories (slug, name, description, icon, color, sort_order)
values
  (
    'moral-stories',
    '{"en":"Moral Stories","te":"నైతిక కథలు"}',
    '{"en":"Tiny life lessons wrapped in warm, funny tales.","te":"చిన్నారులకు సరదాగా నేర్పే మంచి కథలు."}',
    '📖',
    '#FF6B6B',
    1
  ),
  (
    'rhymes',
    '{"en":"Rhymes & Songs","te":"పద్యాలు మరియు పాటలు"}',
    '{"en":"Catchy Telugu and English rhymes kids love to sing.","te":"పిల్లలు పాడటానికి ఇష్టపడే తెలుగు, ఇంగ్లీష్ పద్యాలు."}',
    '🎵',
    '#F59E0B',
    2
  ),
  (
    'worksheets',
    '{"en":"Worksheets","te":"వర్క్ షీట్లు"}',
    '{"en":"Free printable learning sheets for little hands.","te":"పిల్లల కోసం ఉచిత ముద్రించదగిన అభ్యాస పేజీలు."}',
    '✏️',
    '#10B981',
    3
  ),
  (
    'puzzles',
    '{"en":"Puzzles & Games","te":"పజిల్స్ మరియు ఆటలు"}',
    '{"en":"Gentle brain games for curious young minds.","te":"ఆసక్తిగల చిన్నారుల కోసం సరదా ఆలోచనా ఆటలు."}',
    '🧩',
    '#6366F1',
    4
  )
on conflict (slug) do nothing;
