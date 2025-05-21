import { Play } from 'lucide-react';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-accent-foreground flex h-screen w-screen items-center justify-center">
      <Link
        href="/jogo"
        className="mt-4 flex flex-row items-center gap-2 rounded bg-pink-500 px-6 py-2 text-lg font-semibold text-white hover:bg-pink-600"
      >
        Play <Play />
      </Link>
    </div>
  );
}
