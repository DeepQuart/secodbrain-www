"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";


type ChatAssistantProps = {
  serverUrl: string;
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ serverUrl }) => {
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

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
      setChatResponse(data.summary || "No answer found.");
    } catch (err) {
      console.error(err);
      setChatResponse("Error fetching response.");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <motion.div
      className="mb-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 p-6 rounded-xl shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Ask Your AI Assistant</h2>
      <Textarea
        value={chatQuery}
        onChange={(e) => setChatQuery(e.target.value)}
        placeholder="Ask about your memories..."
        rows={4}
        className="mb-3 rounded-lg shadow-sm"
      />
      <Button
        onClick={handleChatSubmit}
        disabled={chatLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {chatLoading ? "Thinking..." : "Ask"}
      </Button>
      {chatResponse && (
        <motion.div
          className="mt-4 p-4 bg-background border rounded-lg text-sm whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <strong>Answer:</strong>
          <div className="mt-1">{chatResponse}</div>
        </motion.div>
      )}
    </motion.div>
  );
};