"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBill = () => {
    setIsLoading(true);
    router.push("/create-bill");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Bill Creator</h1>
      <Button
        onClick={handleCreateBill}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? <Loader /> : "Create New Bill"}
      </Button>
      <Link href="/create-bill/view">
        <Button variant={"link"}>View Bill</Button>
      </Link>
    </main>
  );
}
