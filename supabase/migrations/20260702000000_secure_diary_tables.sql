-- Feelog은 Next.js API Route에서 인증을 검증한 뒤 Secret key로 접근합니다.
-- 브라우저의 publishable/anon key로는 테이블을 직접 읽거나 변경할 수 없습니다.

drop policy if exists "Allow all" on public.diaries;
drop policy if exists "Allow all" on public.retrospects;

alter table public.diaries enable row level security;
alter table public.retrospects enable row level security;

revoke all on table public.diaries from anon, authenticated;
revoke all on table public.retrospects from anon, authenticated;
revoke all on sequence public.diaries_id_seq from anon, authenticated;
revoke all on sequence public.retrospects_id_seq from anon, authenticated;

grant all on table public.diaries to service_role;
grant all on table public.retrospects to service_role;
grant all on sequence public.diaries_id_seq to service_role;
grant all on sequence public.retrospects_id_seq to service_role;
