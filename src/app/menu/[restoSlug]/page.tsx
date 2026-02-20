"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { getRestoIdBySlug } from "@/lib/restaurants";
import { MenuPageInner } from "../page";

function MenuSlugContent() {
  const params = useParams();
  const restoSlug = (params?.restoSlug as string) ?? "";
  const safeRestoId = getRestoIdBySlug(restoSlug);
  return <MenuPageInner safeRestoId={safeRestoId} />;
}

function MenuSlugFallback() {
  return (
    <div className="flex flex-col gap-2 w-full h-screen main-bg p-2 animate-pulse">
      <div className="h-20 bg-white rounded-md" />
      <div className="h-50 bg-white rounded-md" />
    </div>
  );
}

export default function MenuSlugPage() {
  return (
    <Suspense fallback={<MenuSlugFallback />}>
      <MenuSlugContent />
    </Suspense>
  );
}
