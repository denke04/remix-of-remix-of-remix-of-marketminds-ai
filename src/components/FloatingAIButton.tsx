import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const suggestedQuestions = [
  "What content should I post today?",
  "How can I improve my engagement?",
  "Best times to post this week?",
];

export const FloatingAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI marketing assistant. How can I help you grow your business today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(input),
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("post") || lowerQuestion.includes("content")) {
      return "Based on your industry trends, I recommend posting behind-the-scenes content today. It's currently getting 3x more engagement in your niche!";
    }
    if (lowerQuestion.includes("engagement")) {
      return "To improve engagement, focus on: 1) Stronger hooks in the first 2 seconds, 2) Add clear CTAs, 3) Post during peak hours (9-11 AM). Would you like more specific tips?";
    }
    if (lowerQuestion.includes("time") || lowerQuestion.includes("when")) {
      return "Based on your audience activity, the best times to post are: Tuesday-Thursday at 9-11 AM, and evenings 7-9 PM. Avoid posting on weekends for now.";
    }
    return "Great question! Based on your performance data and industry trends, I'd recommend focusing on short-form video content with strong hooks. Would you like me to generate some content ideas?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-20 right-4 w-[calc(100%-2rem)] max-w-sm z-50 transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="gradient-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">AI Assistant</p>
                <p className="text-white/70 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    message.isUser
                      ? "gradient-primary text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                variant="gradient"
                size="icon"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110",
          isOpen && "rotate-180"
        )}
        style={{
          boxShadow: "0 0 30px hsl(24 100% 62% / 0.4)",
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
};
