import { Suspense } from "react";
import StudiosContent from "./StudiosContent";


export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="mb-8 h-10 w-80 rounded-lg bg-neutral-200" />
            <div className="mb-8 h-28 rounded-2xl bg-neutral-200" />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 rounded-2xl bg-neutral-200"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}