import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

// 항상 최신 값을 읽도록 캐시하지 않습니다.
export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

const linkIds = new Set(profile.links.map((link) => link.id));

async function getCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭 수를 한 번에 반환: { counts: { github: 12, ... } }
export async function GET() {
  try {
    const docs = await (await getCollection())
      .find({ _id: { $in: Array.from(linkIds) } })
      .toArray();

    const counts: Record<string, number> = {};
    for (const id of Array.from(linkIds)) counts[id] = 0;
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 링크 하나의 클릭 수를 1 증가: body { id: "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 페이지에 실제로 있는 링크만 집계 (임의의 값으로 DB가 채워지는 것 방지)
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await getCollection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
