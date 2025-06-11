"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

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

export const MemoryList: React.FC<MemoryListProps> = ({
  memories,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredMemories = memories.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          Your Memories
        </h2>
        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
          <Button
            variant="outline"
            onClick={() => setShowSearch((prev) => !prev)}
            className="flex items-center gap-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            {showSearch ? "Close Search" : "Search Memories"}
          </Button>
        </motion.div>
      </div>

      {/* Search Bar Animation */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory List with Animation */}
      <AnimatePresence>
        {filteredMemories.length === 0 ? (
          <motion.p
            key="no-results"
            className="text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No matching memories found.
          </motion.p>
        ) : (
          filteredMemories.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="list-none p-4 border rounded-xl shadow-sm bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 relative hover:shadow-md transition-shadow mb-4"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {m.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{m.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <div className="absolute top-2 right-2 flex gap-2">
                <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(m)}
                    className="hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300"
                  >
                    Edit
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(m.id)}
                    className="hover:bg-red-500 dark:hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </motion.div>
              </div>
            </motion.li>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};
