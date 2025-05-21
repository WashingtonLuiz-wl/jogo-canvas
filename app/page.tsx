import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Link href="/jogo"> Play </Link>
    </div>
  );
}
