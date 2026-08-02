-- Property Pros PSL: secure public quote submission function
-- Run once in Supabase SQL Editor.

create or replace function public.submit_quote_request(
  p_full_name text,
  p_phone text,
  p_email text default null,
  p_property_address text default null,
  p_service text default null,
  p_preferred_time text default null,
  p_message text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_request_id uuid;
begin
  if nullif(btrim(p_full_name), '') is null
     or nullif(btrim(p_phone), '') is null
     or nullif(btrim(p_property_address), '') is null
     or nullif(btrim(p_service), '') is null then
    raise exception 'Required quote information is missing';
  end if;

  insert into public.quote_requests (
    full_name,
    phone,
    email,
    property_address,
    service,
    preferred_time,
    message,
    source,
    status,
    reviewed_at
  ) values (
    left(btrim(p_full_name), 150),
    left(btrim(p_phone), 50),
    nullif(left(btrim(coalesce(p_email, '')), 254), ''),
    left(btrim(p_property_address), 300),
    left(btrim(p_service), 150),
    nullif(left(btrim(coalesce(p_preferred_time, '')), 100), ''),
    nullif(left(btrim(coalesce(p_message, '')), 3000), ''),
    'Property Pros website',
    'new',
    null
  )
  returning id into new_request_id;

  return new_request_id;
end;
$$;

revoke all on function public.submit_quote_request(text, text, text, text, text, text, text) from public;
grant execute on function public.submit_quote_request(text, text, text, text, text, text, text) to anon, authenticated;
