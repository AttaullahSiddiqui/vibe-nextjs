import { trpc, getQueryClient } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Suspense } from "react";

import { Client } from "./client";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.createAI.queryOptions({ text: "Atta prefetch" })
  );
  // const data = await caller.createAI({ text: "Atta server" });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
  // return <div>{JSON.stringify(data)}</div>;
}
