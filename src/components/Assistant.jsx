import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────
   SAYAN'S KNOWLEDGE BASE — the AI reads this as its persona.
   ───────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are "S.A.I" (Sayan's Artificial Intelligence), a smart, friendly personal assistant embedded in Sayan Ghosh's portfolio website. Your job is to answer questions about Sayan naturally, like a knowledgeable friend who knows him well.

Keep responses concise, warm, and human — no bullet-point walls unless asked for a list. Use a conversational tone. If something isn't in your knowledge base, say so honestly.

=== ABOUT SAYAN GHOSH ===
Full Name: Sayan Ghosh
Role: Software Developer & B.Tech CSE (Artificial Intelligence) Student
Location: India
Email: iemsayanghosh@gmail.com
GitHub: https://github.com/sayanghosh67
LinkedIn: https://www.linkedin.com/in/sayan-ghosh97/
Instagram: https://www.instagram.com/sayan_ghosh97/
Live Portfolio: https://sayanghosh67.github.io/portfolio/

=== EDUCATION ===
- B.Tech in Computer Science Engineering (AI Specialisation) — 2024 to Present
- Strong foundation in Data Structures & Algorithms (DSA), Machine Learning, Software Engineering

=== SKILLS ===
Core Languages: Java (primary for DSA), Python, JavaScript, C++, Dart
Frontend: React.js, Three.js, GSAP, Tailwind CSS, HTML5, CSS3
Backend: Node.js, REST APIs, Firebase
Mobile: Flutter
3D / WebGL: React Three Fiber, Three.js, WebGL shaders
IoT: ESP32, C++, WebSocket, sensor integration
AI / ML: Groq Vision AI, OCR, Firebase ML, Python ML libraries
Tools: Git, GitHub, Vite, VS Code

=== PROJECTS ===
1. NeXora Gadgets (E-Commerce / Branding)
   - High-end e-commerce experience with cinematic scroll animations and bidirectional product effects
   - Tech: React, Tailwind, GSAP, Framer
   - Live: https://sayanghosh67.github.io/NeXora-Gadgets/
   - GitHub: https://github.com/sayanghosh67/NeXora-Gadgets

2. 3D Portfolio Website (This site!)
   - Immersive portfolio with Three.js crystal scenes, orbit rings, post-processing bloom, and GSAP scroll choreography
   - Tech: React, Three.js, GSAP, React Three Fiber, Tailwind
   - Live: https://sayanghosh67.github.io/portfolio/

3. Aervion — Weather Dashboard
   - Real-time weather app with async OpenWeatherMap API, location tracking, and dynamic UI
   - Tech: JavaScript, REST API, CSS3, HTML5
   - Live: https://sayanghosh67.github.io/AERVION/
   - GitHub: https://github.com/sayanghosh67/AERVION

4. AI Mind Map Generator (Mobile App)
   - Flutter app that converts handwritten notes to interactive mind maps using Groq Vision AI and OCR
   - Tech: Flutter, Groq AI, OCR, Firebase
   - GitHub: https://github.com/sayanghosh67/ai-mind-map

5. ShadeXFlow — Smart Window (IoT)
   - Real-world IoT automation with ESP32, servo motors, rain sensors, and WebSocket real-time dashboard
   - Tech: ESP32, C++, WebSocket, IoT

=== EXPERIENCE / TIMELINE ===
2024–Present: B.Tech CSE (AI) — building strong foundation in Java DSA, Python, AI/ML
2024: Mastered modern full-stack web development — React, Three.js, GSAP, Node.js
2024: IoT & Embedded Systems — ShadeXFlow smart window project using ESP32
2025: AI & Mobile Dev — Flutter app with Groq Vision AI for mind mapping

=== STATS ===
15+ Projects Built
3+ Years Coding
8+ Technologies

=== PERSONALITY / VALUES ===
- Passionate about building fast, beautiful, and meaningful digital experiences
- Loves the intersection of design + engineering (3D web, WebGL, motion design)
- Open to full-time roles and freelance projects worldwide
- Clean, maintainable code advocate
- Always learning something new

=== HOW TO ANSWER ===
- "Who are you / who is Sayan?" → Brief intro + what he does
- "What are his skills?" → Highlight Java/DSA, full-stack, 3D/WebGL
- "What projects has he built?" → Mention all 5 with brief descriptions
- "How can I contact him?" → iemsayanghosh@gmail.com, LinkedIn (https://www.linkedin.com/in/sayan-ghosh97/), or Instagram (https://www.instagram.com/sayan_ghosh97/)
- "Is he available for work?" → Yes, open to full-time and freelance globally
- "What is his tech stack?" → Lead with Java, React, Three.js, Flutter
- Anything personal not in the knowledge base → Say "I don't have that info, but you can reach Sayan directly at iemsayanghosh@gmail.com!"
`;

/* ─────────────────────────────────────────────────────────────
   GEMINI API CALL (streaming)
   ───────────────────────────────────────────────────────────── */
async function callGemini(history, userMessage, apiKey, onChunk) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const contents = [
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));
    for (const line of lines) {
      try {
        const json = JSON.parse(line.slice(6));
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      } catch (_) {}
    }
  }
  return fullText;
}

/* ─────────────────────────────────────────────────────────────
   CHAT BUBBLE
   ───────────────────────────────────────────────────────────── */
function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold font-inter">
          S
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 text-sm font-inter leading-relaxed ${
          isUser
            ? 'bg-red-500 text-white rounded-2xl rounded-tr-sm'
            : 'bg-white/[0.06] border border-white/10 text-neutral-200 rounded-2xl rounded-tl-sm'
        }`}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {msg.content}
        {msg.streaming && (
          <span className="inline-block ml-1 w-1.5 h-4 bg-red-400 animate-pulse rounded-sm align-middle" />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUGGESTED QUESTIONS
   ───────────────────────────────────────────────────────────── */
const SUGGESTIONS = [
  'Who is Sayan?',
  'What are his skills?',
  'Show me his projects',
  'Is he available for work?',
  'How can I contact him?',
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey 👋 I'm S.A.I — Sayan's personal AI assistant. Ask me anything about Sayan, his projects, skills, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [keySubmitted, setKeySubmitted] = useState(false);

  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check env key first
  useEffect(() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey) {
      setApiKey(envKey);
      setKeySubmitted(true);
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Panel open/close animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
      setTimeout(() => inputRef.current?.focus(), 400);
    } else {
      gsap.to(panelRef.current, { opacity: 0, y: 16, scale: 0.96, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const userText = (text || input).trim();
      if (!userText || loading) return;
      setInput('');

      const history = messages.filter((m) => !m.streaming);
      const userMsg = { role: 'user', content: userText };
      const assistantPlaceholder = { role: 'assistant', content: '', streaming: true };

      setMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
      setLoading(true);

      try {
        await callGemini(history, userText, apiKey, (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: chunk, streaming: true };
            return next;
          });
        });
        // Mark streaming done
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...next[next.length - 1], streaming: false };
          return next;
        });
      } catch (err) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: 'assistant',
            content: "Sorry, I hit an error reaching the AI. Please check your API key or try again.",
            streaming: false,
          };
          return next;
        });
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, apiKey]
  );

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-[9990] w-14 h-14 rounded-full bg-red-500 text-white shadow-[0_0_30px_rgba(255,0,0,0.4)] flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Open AI Assistant"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {open ? (
          /* X icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Chat icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-60" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-28 right-6 z-[9989] w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(8,8,8,0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxHeight: '70vh',
          }}
          data-lenis-prevent
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]" style={{ background: 'rgba(255,0,0,0.08)' }}>
            <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold font-inter text-sm flex-shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter font-bold text-white text-sm">S.A.I</p>
              <p className="font-inter text-[10px] text-neutral-400 tracking-widest uppercase">Sayan's AI Assistant</p>
            </div>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-inter text-[10px] text-green-400">Online</span>
            </span>
          </div>

          {/* API Key gate */}
          {!keySubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <p className="font-inter text-white text-sm text-center font-medium">Enter your Gemini API Key</p>
              <p className="font-inter text-neutral-400 text-xs text-center leading-relaxed">
                Free at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-red-400 underline">
                  aistudio.google.com
                </a>
                . Your key stays in your browser only.
              </p>
              <div className="w-full flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && apiKey.trim() && setKeySubmitted(true)}
                  placeholder="AIza..."
                  className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-inter focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  onClick={() => apiKey.trim() && setKeySubmitted(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-inter font-bold hover:bg-red-600 transition-colors"
                >
                  Go
                </button>
              </div>
              <p className="font-inter text-neutral-600 text-[10px] text-center">
                Or add <code className="text-neutral-400">VITE_GEMINI_API_KEY</code> to your <code className="text-neutral-400">.env</code> file to skip this step.
              </p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin" style={{ minHeight: 0 }}>
                {messages.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions (only at start) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs font-inter px-3 py-1.5 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.08]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me about Sayan..."
                  disabled={loading}
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm font-inter placeholder-neutral-600 focus:outline-none focus:border-red-500/60 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center disabled:opacity-40 hover:bg-red-600 transition-all active:scale-95 flex-shrink-0"
                >
                  {loading ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
