'use client';

import MemoryForm from '@/components/MemoryForm';
import { useParams } from 'next/navigation';


export default function EditMemoryPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Memory</h1>
      <MemoryForm memoryId={id} />
    </main>
  );
}
