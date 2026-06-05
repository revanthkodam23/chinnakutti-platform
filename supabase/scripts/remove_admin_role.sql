-- Replace the email below before executing.
-- This removes only the custom "role" key and preserves other app_metadata.

do $$
declare
  target_email constant text := 'admin@example.com';
  updated_user_id uuid;
begin
  update auth.users
  set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) - 'role'
  where lower(email) = lower(target_email)
  returning id into updated_user_id;

  if updated_user_id is null then
    raise exception 'No Supabase Auth user found for email: %', target_email;
  end if;

  raise notice 'Admin role removed from user %', updated_user_id;
end;
$$;
