"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { serverUrl } from "@/environment";



type Memory = {
  id: string;
  content: string;
  createdAt: string;
};

export default function RootPage() {
  const [content, setContent] = useState("");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Fetch memories
  const fetchMemories = async () => {
    try {
      const res = await fetch(`${serverUrl}/memories`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.memories) setMemories(data.memories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Add or update memory
  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      if (editingId) {
        // Update functionality placeholder (PUT or PATCH to be implemented later)
        alert("Edit functionality not implemented in backend yet.");
      } else {
        const res = await fetch(`${serverUrl}/memories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const data = await res.json();
        if (data.memory) {
          setContent("");
          setMemories([data.memory, ...memories]);
        } else {
          setError(data.error || "Failed to add memory");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setEditingId(null);
    }
  };

  // Delete memory
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this memory?")) return;

    try {
      const res = await fetch(`${serverUrl}/memories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.message) {
        setMemories((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert(data.error || "Failed to delete memory");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Ask chatbot
  const handleChatSubmit = async () => {
    if (!chatQuery.trim()) return;
    setChatLoading(true);
    setChatResponse("");

    try {
      const res = await fetch(`${serverUrl}/chat?q=${encodeURIComponent(chatQuery)}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.summary) {
        setChatResponse(data.summary);
      } else {
        setChatResponse("No answer found.");
      }
    } catch (err) {
      console.error(err);
      setChatResponse("Error fetching response.");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Memory Assistant</h1>

      {/* Memory Input */}
      <div className="mb-6">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={editingId ? "Edit memory..." : "Add a new memory..."}
          rows={4}
          className="mb-3"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {editingId ? (loading ? "Saving..." : "Update Memory") : loading ? "Saving..." : "Save Memory"}
        </Button>
        {editingId && (
          <Button variant="ghost" className="ml-2" onClick={() => {
            setEditingId(null);
            setContent("");
          }}>
            Cancel
          </Button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Chatbox */}
      <div className="mb-10 bg-muted p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Ask your memory assistant</h2>
        <Textarea
          value={chatQuery}
          onChange={(e) => setChatQuery(e.target.value)}
          placeholder="Ask a question..."
          rows={4}
          className="mb-3"
        />
        <Button onClick={handleChatSubmit} disabled={chatLoading}>
          {chatLoading ? "Thinking..." : "Ask"}
        </Button>
        {chatResponse && (
          <div className="mt-4 p-3 bg-background border rounded-lg text-sm whitespace-pre-line">
            <strong>Answer:</strong>
            <div className="mt-1">{chatResponse}</div>
          </div>
        )}
      </div>

      {/* Memory List */}
      <h2 className="text-2xl font-semibold mb-4">Your Memories</h2>
      {memories.length === 0 ? (
        <p className="text-gray-600">No memories yet.</p>
      ) : (
        <ul className="space-y-4">
          {memories.map((m) => (
            <li
              key={m.id}
              className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white relative"
            >
              <p>{m.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => {
                  setContent(m.content);
                  setEditingId(m.id);
                }}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
