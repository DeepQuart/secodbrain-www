'use client';

import { useState } from 'react';

export default function AIPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ answer: string; references: any[] } | null>(null);

  const handleSearch = async () => {
    const res = await fetch('/api/ai/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      credentials: 'include',
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Semantic AI Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="Ask anything..."
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Answer</h2>
          <p className="mb-4">{result.answer}</p>
          <h3 className="font-medium">References:</h3>
          <ul className="list-disc pl-5">
            {result.references.map((ref, idx) => (
              <li key={idx}>{ref.title || ref.content?.slice(0, 80)}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
