import Link from 'next/link';

export default function MemoryCard({ memory }: { memory: any }) {
  return (
    <Link href={`/memories/${memory.id}`} className="block p-4 border rounded hover:shadow">
      <h3 className="text-lg font-semibold">{memory.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{memory.content.slice(0, 100)}...</p>
    </Link>
  );
}