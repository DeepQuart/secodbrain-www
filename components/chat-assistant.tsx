"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type ChatAssistantProps = {
  serverUrl: string;
};

type ChatMessage = {
  type: "user" | "assistant";
  text: string;
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ serverUrl }) => {
  const [open, setOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleChatSubmit = async () => {
    if (!chatQuery.trim()) return;

    const newUserMessage: ChatMessage = { type: "user", text: chatQuery };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setChatLoading(true);
    setChatQuery("");

    try {
      const res = await fetch(`${serverUrl}/chat?q=${encodeURIComponent(chatQuery)}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const response = data.summary || "No answer found.";

      const newAssistantMessage: ChatMessage = { type: "assistant", text: response };
      setChatHistory((prev) => [...prev, newAssistantMessage]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { type: "assistant", text: "Error fetching response." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-10"
        >
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition"
            onClick={() => setOpen(true)}
          >
            💬 Chat with Assistant
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 relative flex flex-col"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ask Your AI Assistant
              </h2>

              {/* Chat window */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2 max-h-96">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[85%] whitespace-pre-line text-sm ${
                      msg.type === "user"
                        ? "bg-blue-100 dark:bg-blue-800 self-end text-right ml-auto"
                        : "bg-gray-100 dark:bg-gray-700 text-left mr-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input box */}
              <div className="mt-2">
                <Textarea
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="Ask about your memories..."
                  rows={2}
                  className="rounded-lg shadow-sm mb-2"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleChatSubmit}
                    disabled={chatLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {chatLoading ? "Thinking..." : "Ask"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
