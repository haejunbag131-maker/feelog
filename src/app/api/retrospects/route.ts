import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { RetrospectData } from "@/components/diaries-detail/hooks/index.retrospect.form.hook";
import { authenticateRequest } from "@/commons/lib/server-auth";
import { getSupabaseAdmin } from "@/commons/lib/supabase";

const createRetrospectSchema = z.object({
  content: z.string().trim().min(1).max(10000),
  diaryId: z.number().int().positive(),
});

const updateRetrospectSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().trim().min(1).max(10000),
});

const unauthorizedResponse = () =>
  NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

/**
 * 회고 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const diaryIdParam = new URL(request.url).searchParams.get("diaryId");
    const diaryId = diaryIdParam === null ? null : Number(diaryIdParam);

    if (diaryId !== null && (!Number.isInteger(diaryId) || diaryId <= 0)) {
      return NextResponse.json(
        { error: "유효하지 않은 일기 ID입니다." },
        { status: 400 }
      );
    }

    let query = getSupabaseAdmin().from("retrospects").select("*");
    if (diaryId !== null) {
      query = query.eq("diaryId", diaryId);
    }

    const { data, error } = await query.order("createdAt", {
      ascending: true,
    });

    if (error) {
      console.error("회고 조회 중 오류:", error);
      return NextResponse.json(
        { error: "회고 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ retrospects: data || [] });
  } catch (error) {
    console.error("회고 조회 중 오류:", error);
    return NextResponse.json(
      { error: "회고 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 회고 생성
 */
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const parsedBody = createRetrospectSchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "유효하지 않은 회고 데이터입니다." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: diary, error: diaryError } = await supabase
      .from("diaries")
      .select("id")
      .eq("id", parsedBody.data.diaryId)
      .maybeSingle();

    if (diaryError) {
      console.error("회고 대상 일기 조회 중 오류:", diaryError);
      return NextResponse.json(
        { error: "회고 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!diary) {
      return NextResponse.json(
        { error: "회고를 등록할 일기를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("retrospects")
      .insert({
        ...parsedBody.data,
        userId: user._id,
        userName: user.name,
      })
      .select()
      .single();

    if (error) {
      console.error("회고 생성 중 오류:", error);
      return NextResponse.json(
        { error: "회고 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(data as RetrospectData, { status: 201 });
  } catch (error) {
    console.error("회고 생성 중 오류:", error);
    return NextResponse.json(
      { error: "회고 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 회고 수정
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const parsedBody = updateRetrospectSchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "유효하지 않은 회고 데이터입니다." },
        { status: 400 }
      );
    }

    const { id, content } = parsedBody.data;
    const { data, error } = await getSupabaseAdmin()
      .from("retrospects")
      .update({ content })
      .eq("id", id)
      .eq("userId", user._id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("회고 수정 중 오류:", error);
      return NextResponse.json(
        { error: "회고 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "수정할 수 있는 회고를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(data as RetrospectData);
  } catch (error) {
    console.error("회고 수정 중 오류:", error);
    return NextResponse.json(
      { error: "회고 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 회고 삭제
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "유효하지 않은 ID입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseAdmin()
      .from("retrospects")
      .delete()
      .eq("id", id)
      .eq("userId", user._id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("회고 삭제 중 오류:", error);
      return NextResponse.json(
        { error: "회고 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "삭제할 수 있는 회고를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("회고 삭제 중 오류:", error);
    return NextResponse.json(
      { error: "회고 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
