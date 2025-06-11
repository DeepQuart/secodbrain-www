"use client";

import { useEffect, useState } from "react";
import { serverUrl } from "@/environment";
import { motion } from "framer-motion";

import { ChatAssistant } from "@/components/chat-assistant";
import { MemoryList } from "@/components/memory-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Memory = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function MemoriesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMemories = async () => {
    try {
      const res = await fetch(`${serverUrl}/memories`, { credentials: "include" });
      const data = await res.json();
      if (data.memories) setMemories(data.memories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editingId) {
        alert("Edit functionality not implemented in backend yet.");
      } else {
        const res = await fetch(`${serverUrl}/memories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        if (data.memory) {
          setTitle("");
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

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Your Second Brain
      </h1>

      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={editingId ? "Edit memory title..." : "Enter memory title..."}
          className="mb-3 rounded-lg shadow-sm"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={editingId ? "Edit memory content..." : "Add a new memory..."}
          rows={4}
          className="mb-3 rounded-lg shadow-sm"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {editingId ? (loading ? "Saving..." : "Update Memory") : loading ? "Saving..." : "Save Memory"}
          </Button>
          {editingId && (
            <Button
              variant="ghost"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </motion.div>

      {serverUrl && <ChatAssistant serverUrl={serverUrl} />}
      <MemoryList
        memories={memories}
        onEdit={(memory) => {
          setTitle(memory.title);
          setContent(memory.content);
          setEditingId(memory.id);
        }}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}