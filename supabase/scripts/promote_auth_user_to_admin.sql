-- Run this in the Supabase SQL Editor after creating the user through:
-- Authentication > Users > Add user
--
-- Replace the email below before executing.
-- Existing app_metadata values are preserved.

do $$
declare
  target_email constant text := 'admin@example.com';
  updated_user_id uuid;
begin
  update auth.users
  set raw_app_meta_data =
    coalesce(raw_app_meta_data, '{}'::jsonb)
    || jsonb_build_object('role', 'admin')
  where lower(email) = lower(target_email)
  returning id into updated_user_id;

  if updated_user_id is null then
    raise exception 'No Supabase Auth user found for email: %', target_email;
  end if;

  raise notice 'Admin role assigned to user %', updated_user_id;
end;
$$;

-- Verify the result.
select
  id,
  email,
  raw_app_meta_data ->> 'role' as app_role
from auth.users
where lower(email) = lower('admin@example.com');
