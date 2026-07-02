import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DiaryData } from "@/components/diaries/hooks/index.binding.hook";
import { authenticateRequest } from "@/commons/lib/server-auth";
import { getSupabaseAdmin } from "@/commons/lib/supabase";

const createDiarySchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.string().trim().min(1).max(20000),
  emotion: z.enum(["HAPPY", "SAD", "ANGRY", "SURPRISE", "ETC"]),
});

const updateDiarySchema = createDiarySchema.extend({
  id: z.number().int().positive(),
});

const unauthorizedResponse = () =>
  NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

/**
 * 일기 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const { data, error } = await getSupabaseAdmin()
      .from("diaries")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("일기 조회 중 오류:", error);
      return NextResponse.json(
        { error: "일기 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ diaries: data || [] });
  } catch (error) {
    console.error("일기 조회 중 오류:", error);
    return NextResponse.json(
      { error: "일기 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 일기 생성
 */
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const parsedBody = createDiarySchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "유효하지 않은 일기 데이터입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseAdmin()
      .from("diaries")
      .insert({
        ...parsedBody.data,
        userId: user._id,
        userName: user.name,
      })
      .select()
      .single();

    if (error) {
      console.error("일기 생성 중 오류:", error);
      return NextResponse.json(
        { error: "일기 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(data as DiaryData, { status: 201 });
  } catch (error) {
    console.error("일기 생성 중 오류:", error);
    return NextResponse.json(
      { error: "일기 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 일기 수정
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) return unauthorizedResponse();

    const parsedBody = updateDiarySchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "유효하지 않은 일기 데이터입니다." },
        { status: 400 }
      );
    }

    const { id, ...updates } = parsedBody.data;
    const { data, error } = await getSupabaseAdmin()
      .from("diaries")
      .update(updates)
      .eq("id", id)
      .eq("userId", user._id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("일기 수정 중 오류:", error);
      return NextResponse.json(
        { error: "일기 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "수정할 수 있는 일기를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(data as DiaryData);
  } catch (error) {
    console.error("일기 수정 중 오류:", error);
    return NextResponse.json(
      { error: "일기 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 일기 삭제
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
      .from("diaries")
      .delete()
      .eq("id", id)
      .eq("userId", user._id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("일기 삭제 중 오류:", error);
      return NextResponse.json(
        { error: "일기 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "삭제할 수 있는 일기를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("일기 삭제 중 오류:", error);
    return NextResponse.json(
      { error: "일기 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
