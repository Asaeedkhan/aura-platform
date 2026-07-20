"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import type { BusinessReport } from "@/types/assessment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AdvisorChatProps = {
  report: BusinessReport;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatApiResponse = {
  answer: string;
};

export function AdvisorChat({ report }: AdvisorChatProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isSending) {
      return;
    }

    setError(null);
    setIsSending(true);
    const priorMessages = messages;
    setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);

    try {
      console.log("AdvisorChat report before /chat fetch:", report);
      console.log("AdvisorChat report presence check:", {
        isNull: report == null,
        isEmptyObject: !report || Object.keys(report).length === 0,
        topLevelKeys: report ? Object.keys(report) : [],
      });

      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report,
          messages: priorMessages,
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `Chat request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ChatApiResponse;
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
      setQuestion("");
    } catch (requestError) {
      console.error("Advisor chat request failed:", requestError);
      setError("Unable to get an answer right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full border-slate-800 bg-slate-900/80 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.65)]">
      <CardContent className="px-6 py-6 sm:px-8">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">AI Advisor</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Ask AURA about this report</h3>
          <p className="mt-1 text-sm text-slate-400">Your question is answered using this report context.</p>
        </div>

        <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          {messages.length === 0 ? (
            <div className="space-y-2 text-sm text-slate-400">
              <p className="text-slate-500">Try asking about:</p>
              <ul className="space-y-1">
                <li>✓ Highest ROI opportunities</li>
                <li>✓ 90-day roadmap</li>
                <li>✓ Biggest business risks</li>
                <li>✓ Recommended automations</li>
                <li>✓ Expected financial impact</li>
              </ul>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "ml-auto max-w-[85%] border border-blue-500/30 bg-blue-500/10 text-blue-100"
                    : "mr-auto max-w-[92%] border border-slate-700 bg-slate-900 text-slate-200"
                }`}
              >
                {message.content}
              </div>
            ))
          )}

          {isSending ? (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              AURA is thinking...
            </div>
          ) : null}
        </div>

        <form onSubmit={submitQuestion} className="mt-4 space-y-3">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question about your report..."
            className="min-h-[96px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
          />

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700" disabled={isSending || !question.trim()}>
              Send
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
