"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";


type Memory = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type MemoryListProps = {
  memories: Memory[];
  onEdit: (memory: Memory) => void;
  onDelete: (id: string) => void;
};

export const MemoryList: React.FC<MemoryListProps> = ({ memories, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Memories</h2>
      {memories.length === 0 ? (
        <p className="text-muted-foreground">No memories yet.</p>
      ) : (
        <ul className="space-y-4">
          {memories.map((m) => (
            <motion.li
              key={m.id}
              className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white relative hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
              <p className="text-gray-700">{m.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(m)}
                  className="hover:bg-blue-50"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(m.id)}
                  className="hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};