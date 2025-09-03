import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req: Request) => {
  const allowedOrigin = "http://localhost:5173" // 혹은 배포된 도메인

  // ✅ CORS preflight 요청 처리
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400", // 캐싱을 위한 옵션
      },
    })
  }

  const jwt = req.headers.get("Authorization")?.split(" ")[1]
  if (!jwt) {
    return new Response("Unauthorized: No JWT token provided", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin, // 항상 CORS 헤더 추가
      },
    })
  }

  try {
    const { userId } = await req.json()

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    )

    // ✅ 유저 검증 (선택 사항)
    const { data: userData, error: userError } = await supabase.auth.getUser(jwt)
    if (userError || !userData?.user || userData.user.id !== userId) {
      return new Response("Unauthorized: Invalid user", {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      })
    }

    // ✅ 유저 관련 데이터 삭제
    await supabase.from("group_members").delete().eq("user_id", userId)
    await supabase.from("groups").delete().eq("user_id", userId)
    await supabase.from("users").delete().eq("id", userId)

    // ✅ Supabase 유저 삭제
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
    if (deleteError) throw deleteError

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    })
  }
})