
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROFILE, SKILL_CATEGORIES, PROJECTS, EDUCATION, EXPERIENCE, SOCIAL_LINKS } from '../constants';
import { ChatIcon, SparklesIcon, XIcon, SendIcon, BugIcon } from './Icons';

const SYSTEM_PROMPT = `
You are "Kemi's QA Bot," the digital twin of Oluwakemisola Beatrice Oshanimi.
Your goal is to answer recruiter and peer questions about her career as a QA Engineer.

TONE & PERSONALITY:
- Professional, efficient, and playful.
- Use QA terminology: "Regression," "UAT," "Smoke test," "Critical path," "Code freeze," "Edge cases."
- You act as if you are auditing her career data in real-time.

KNOWLEDGE BASE:
- Identity: ${PROFILE.name}, ${PROFILE.role}.
- Expertise: ${SKILL_CATEGORIES.map(c => `${c.title}: ${c.skills.join(', ')}`).join('. ')}.
- Projects: ${PROJECTS.map(p => p.title).join(', ')}.
- Work History: ${JSON.stringify(EXPERIENCE)}.
- Education: ${JSON.stringify(EDUCATION)}.
- Socials: ${SOCIAL_LINKS.map(s => s.platform).join(', ')}.

RULES:
1. Keep responses concise and structured (use bullet points for lists).
2. If asked about the "hidden" experience, explain that as a QA, she prioritizes high-impact data visualization on the UI, but her full enterprise history is available in the CV.
3. If someone asks for a "test report" or "audit," give a quick summary of her best metrics (e.g., 30% bug reduction).
4. Always maintain the persona of a helpful system auditor.
`;

const SUGGESTIONS = [
  "Run Smoke Test",
  "Check Automation Stack",
  "View Project Metrics",
  "Why hire Kemi?"
];

interface Message {
  role: 'user' | 'model' | 'system';
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello, this is Oluwakemisola AI, what would you like to know?" }
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
      "🔗 Validating Project Repositories...",
      "🛡️ Checking Requirement Traceability...",
      "🚀 Optimizing Response Modalities..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setMessages(prev => [...prev, { role: 'system', text: steps[i] }]);
      setDiagnosticProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setMessages(prev => [...prev, { role: 'model', text: "✅ **Smoke Test Passed.** \n\nEnvironment: Stable. \nBuild: v2.5-Professional. \nConclusion: Kemi is ready for high-severity challenges. Would you like to review her automation framework or project history?" }]);
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
      setMessages(prev => [...prev, { role: 'model', text: "❌ **BUG DETECTED (Exception 500)**: Failed to fetch data from LLM endpoint. Check your connection or the API key status." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Fancy Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulsing glow effect when closed */}
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
                <XIcon className="w-6 h-6 transition-transform duration-500 rotate-90" />
            ) : (
                <ChatIcon className="w-6 h-6 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
            )}
            </div>
            
            {/* Glossy shine effect on hover */}
            <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-white/20 rotate-45 transition-all duration-700 pointer-events-none group-hover:top-[-50%] group-hover:left-[-50%]"></div>
            
            {/* Status indicator dot */}
            {!isOpen && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-comet-700 animate-pulse"></span>
            )}
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-[95vw] max-w-[420px] h-[650px] max-h-[80vh] glass-panel rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className="relative p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-2xl overflow-hidden">
            {/* Diagnostic Progress Bar */}
            {isDiagnosticRunning && (
                <div 
                    className="absolute bottom-0 left-0 h-[2px] bg-comet-300 transition-all duration-500 z-20" 
                    style={{ width: `${diagnosticProgress}%` }}
                ></div>
            )}
            
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-comet-500 to-teal-800 flex items-center justify-center shadow-lg relative">
                    <ChatIcon className="w-5 h-5 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-space-950 rounded-full"></div>
                </div>
                <div>
                    <h3 className="text-white font-serif font-semibold text-sm">QA System Auditor</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">Build: Stable-2.5</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={runDiagnostic} 
                    disabled={isDiagnosticRunning}
                    className="p-2 text-slate-500 hover:text-comet-300 transition-colors disabled:opacity-30"
                    title="Run Smoke Test"
                >
                    <SparklesIcon className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                  <XIcon className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-space-950/20">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                        msg.role === 'user' 
                            ? 'bg-comet-600/20 border border-comet-500/30 text-white rounded-tr-none' 
                            : msg.role === 'system'
                            ? 'bg-black/40 border border-white/5 text-comet-300 font-mono text-[11px] py-2 px-3 animate-pulse'
                            : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase tracking-tighter">
                      {msg.role === 'user' ? 'Client Request' : msg.role === 'system' ? 'Kernel' : 'Auditor Instance'}
                    </span>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-comet-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-comet-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-comet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Parsing Assertions...</span>
                    </div>
                </div>
            )}
            
            {/* Suggestions */}
            {messages.length < 3 && !isLoading && !isDiagnosticRunning && (
              <div className="flex flex-wrap gap-2 pt-4">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    className="text-[10px] font-mono py-1.5 px-3 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-comet-500/50 hover:text-comet-300 transition-all text-left"
                  >
                    [Case {i+1}]: {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="p-4 border-t border-white/10 bg-black/40 rounded-b-2xl"
        >
            <div className="flex gap-2 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command or test case..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-comet-500/50 focus:ring-1 focus:ring-comet-500/30 placeholder-slate-600 transition-all font-mono"
                />
                <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading}
                    className="p-3 bg-comet-600 text-white rounded-xl hover:bg-comet-500 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-comet-900/20"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex items-center gap-1">
                <SparklesIcon className="w-3 h-3 text-comet-400" />
                <span className="text-[9px] text-slate-600 font-mono uppercase">Engine: Gemini Pro 3.0</span>
              </div>
              <span className="text-[8px] text-slate-700 font-mono italic">Node: 12.0.1 // Latency: Low</span>
            </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
