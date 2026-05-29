drop index if exists public.stories_single_featured_story_idx;
drop index if exists public.stories_title_idx;
drop index if exists public.stories_seo_metadata_idx;

alter table public.stories
  add column if not exists difficulty_level integer not null default 1,
  add column if not exists view_count integer not null default 0;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'stories_difficulty_level_range'
      and conrelid = 'public.stories'::regclass
  ) then
    alter table public.stories
      add constraint stories_difficulty_level_range
      check (difficulty_level between 1 and 4);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'stories_view_count_non_negative'
      and conrelid = 'public.stories'::regclass
  ) then
    alter table public.stories
      add constraint stories_view_count_non_negative
      check (view_count >= 0);
  end if;
end;
$$;

create index if not exists stories_featured_published_idx
  on public.stories (category_id, published_at desc)
  where is_featured = true and status = 'published';

create index if not exists stories_category_status_published_at_idx
  on public.stories (category_id, status, published_at desc);

create index if not exists stories_status_view_count_idx
  on public.stories (status, view_count desc);
