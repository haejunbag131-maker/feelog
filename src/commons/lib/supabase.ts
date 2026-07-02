import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/commons/types/database";

let supabaseAdmin: SupabaseClient<Database> | null = null;

/**
 * RLS를 우회하는 서버 전용 Supabase 클라이언트를 반환합니다.
 * 반드시 인증·권한 검증을 마친 API Route에서만 사용해야 합니다.
 */
export function getSupabaseAdmin() {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase 서버 환경변수가 설정되지 않았습니다.");
  }

  supabaseAdmin = createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseAdmin;
}
