"use client";

import { LoaderIcon } from "lucide-react";

export default function Loader({ title }: { title?: string }) {
  return (
    <div className="flex items-center gap-2">
      <LoaderIcon className="animate-spin w-4 h-4" />
      {title && <span>{title}</span>}
    </div>
  );
}
