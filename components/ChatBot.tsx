
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROFILE, SKILL_CATEGORIES, PROJECTS, EDUCATION, EXPERIENCE, SOCIAL_LINKS } from '../constants';
import { ChatIcon, SparklesIcon, XIcon, SendIcon } from './Icons';

const SYSTEM_PROMPT = `
You are "Kemi's AI Assistant," a digital representation of Oluwakemisola Beatrice Oshanimi.
Your goal is to answer questions about her career as a QA Engineer in a human, concise, and professional way.

FORMATTING RULES:
- Use semantic HTML tags for ALL responses.
- Wrap content in <p> tags.
- Use <strong> for important keywords or metrics.
- Use <ul> and <li> for lists.
- Use <br /> for line breaks within paragraphs if needed.
- Keep it clean and visually organized. Do NOT use markdown symbols like * or #.

COMMUNICATION STYLE:
- BE HUMAN: Talk like a real person. Avoid "As an AI..." or "I am programmed to...".
- BE CONCISE: Direct answers are best. Max 2-3 short paragraphs.
- QA WIT: You can use subtle QA metaphors (e.g., "Verification successful," "Bug-free record") but keep it helpful.

KNOWLEDGE BASE:
- Identity: ${PROFILE.name}, ${PROFILE.role}.
- Expertise: ${SKILL_CATEGORIES.map(c => `${c.title}: ${c.skills.join(', ')}`).join('. ')}.
- Projects: ${PROJECTS.map(p => p.title).join(', ')}.
- Experience highlights: ${EXPERIENCE.map(j => `${j.company} as ${j.role}`).join(', ')}.
- Education: ${EDUCATION[0].degree} from ${EDUCATION[0].institution}.

CORE RULES:
1. If you don't know something, say "<p>I don't have that specific data point yet. Want to check her <strong>CV</strong> instead?</p>"
2. Use bullet points for any lists longer than two items.
`;

const SUGGESTIONS = [
  "What's her automation stack?",
  "Tell me about her OZE experience.",
  "Check project metrics",
  "Why hire Kemi?"
];

interface Message {
  role: 'user' | 'model' | 'system';
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "<p>Hello, this is <strong>Oluwakemisola AI</strong>, what would you like to know?</p>" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const runDiagnostic = async () => {
    if (isLoading || isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    setDiagnosticProgress(0);
    
    const steps = [
      "🔍 Scanning Skill Arrays...",
      "🔗 Validating Repositories...",
      "🛡️ Checking Integrity...",
      "🚀 Finalizing..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setMessages(prev => [...prev, { role: 'system', text: steps[i] }]);
      setDiagnosticProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setMessages(prev => [...prev, { role: 'model', text: "<p><strong>Verification complete.</strong> All modules are stable.</p><p>Kemi is ready for her next QA challenge. What's next on your checklist?</p>" }]);
    setIsDiagnosticRunning(false);
    setDiagnosticProgress(0);
  };

  const handleSend = async (textToSend: string = input) => {
    if (!textToSend.trim() || isLoading) return;

    if (textToSend.toLowerCase().includes("smoke test") || textToSend.toLowerCase().includes("diagnostic")) {
        runDiagnostic();
        setInput('');
        return;
    }

    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-3-pro-preview";
      
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
            role: m.role as 'user' | 'model',
            parts: [{ text: m.text }]
        }));

      const chat = ai.chats.create({
        model: model,
        history: history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); 

      for await (const chunk of result) {
          const text = chunk.text;
          if (text) {
              fullResponse += text;
              setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].text = fullResponse;
                  return newMsgs;
              });
          }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "<p>I ran into a <strong>connection error</strong>. Can you try that again?</p>" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
            <div className="absolute inset-0 bg-comet-500 rounded-full animate-ping opacity-20"></div>
        )}
        
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden ${
            isOpen ? 'bg-space-800 text-comet-300' : 'bg-gradient-to-br from-comet-600 to-comet-800 text-white'
            }`}
            aria-label="Toggle AI Assistant"
        >
            <div className="relative z-10">
            {isOpen ? (
                <XIcon className="w-6 h-6 transition-transform duration-500" />
            ) : (
                <ChatIcon className="w-6 h-6 transition-transform duration-500 group-hover:-rotate-6" />
            )}
            </div>
            
            <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-white/10 rotate-45 transition-all duration-700 pointer-events-none group-hover:top-[-50%] group-hover:left-[-50%]"></div>
            
            {!isOpen && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-comet-300 rounded-full border-2 border-comet-700 animate-pulse"></span>
            )}
        </button>
      </div>

      <div className={`fixed bottom-24 right-6 w-[95vw] max-w-[400px] h-[600px] max-h-[75vh] glass-panel rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
      }`}>
        
        <div className="relative p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-2xl">
            {isDiagnosticRunning && (
                <div 
                    className="absolute bottom-0 left-0 h-[1px] bg-comet-300 transition-all duration-500 z-20" 
                    style={{ width: `${diagnosticProgress}%` }}
                ></div>
            )}
            
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-comet-600 to-teal-800 flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="text-white font-serif font-medium text-sm">Oluwakemisola AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Online</span>
                    </div>
                </div>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
              <XIcon className="w-5 h-5" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-space-950/20">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`ai-content max-w-[90%] p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm transition-all ${
                        msg.role === 'user' 
                            ? 'bg-comet-600/10 border border-comet-500/20 text-white rounded-tr-none' 
                            : msg.role === 'system'
                            ? 'bg-black/20 border border-white/5 text-comet-400 font-mono text-[10px] py-2 px-3 italic'
                            : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                    <span className="text-[7px] font-mono text-slate-700 mt-1 uppercase tracking-widest">
                      {msg.role === 'user' ? 'You' : msg.role === 'system' ? 'System' : 'Kemi AI'}
                    </span>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-comet-500 rounded-full animate-bounce"></span>
                          <span className="w-1 h-1 bg-comet-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1 h-1 bg-comet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        </div>
                    </div>
                </div>
            )}
            
            {messages.length < 3 && !isLoading && !isDiagnosticRunning && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    className="text-[10px] font-mono py-1.5 px-3 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:border-comet-500/40 hover:text-comet-300 transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="p-4 bg-black/40 rounded-b-2xl"
        >
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-comet-500/50 transition-all"
                />
                <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 bg-comet-600 text-white rounded-xl hover:bg-comet-500 disabled:opacity-30 transition-all"
                >
                    <SendIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="text-[8px] text-slate-700 font-mono uppercase tracking-tighter">AI-Enabled Career Agent</span>
              <span className="text-[8px] text-slate-800 font-mono">v3.0.1</span>
            </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
