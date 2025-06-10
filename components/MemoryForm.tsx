'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MemoryForm({ memoryId }: { memoryId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memoryId) {
      fetch(`/api/memories/${memoryId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
  }, [memoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/memories${memoryId ? `/${memoryId}` : ''}`, {
      method: memoryId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
      credentials: 'include',
    });
    setLoading(false);
    if (res.ok) router.push('/memories');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Memory title"
        className="border p-2"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Memory content"
        rows={6}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded" disabled={loading}>
        {loading ? 'Saving...' : memoryId ? 'Update' : 'Create'} Memory
      </button>
    </form>
  );
}