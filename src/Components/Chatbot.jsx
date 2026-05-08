import React, { useState, useEffect, useRef } from 'react';

const rules = [
  { keys: /hello|hi|hey|greet/i,
    reply: "👋 Hello! I'm your MentorConnect assistant. Whether you're looking for a mentor or want to become one, I'm here to help!" },
  { keys: /find|search|look.*mentor|mentor.*find/i,
    reply: "🔍 To find the right mentor, visit our <a href='/'>Browse Mentors</a> page and filter by skill, industry, or availability. Take time to read profiles carefully!" },
  { keys: /become.*mentor|mentor.*become|apply.*mentor/i,
    reply: "🌟 Becoming a mentor is rewarding! I am afraid we don't have this right now. We are planning on making adjustments. Please keep in touch" },
  { keys: /session|book|schedul|appointment/i,
    reply: "📅 Booking a session is easy! Visit a mentor's profile and click 'Apply for a Session'. You can choose your preferred date, time, and session type — video, chat, or call." },
  { keys: /pay|payment|price|cost|fee|charge/i,
    reply: "💳 Session fees vary by mentor. Check the <a href='/makepayment'>Payments page</a> for details. We support secure card payments and mobile money options." },
  { keys: /career|job|profession|path|growth/i,
    reply: "🚀 A great mentor can fast-track your career! Explore our <a href='/'>mentor directory</a> to find professionals in your desired field who can guide your journey." },
  { keys: /skill|learn|improve|develop/i,
    reply: "📚 Learning a new skill? Find a mentor who specialises in it! Visit <a href='/'>Browse Mentors</a> and filter by skill category like coding, design, leadership, or business." },
  { keys: /signup|register|account|join/i,
    reply: "✍️ Joining is free and quick! Go to <a href='/signup'>Sign Up</a>, fill in your details, pick your role (Mentee or Mentor), and you're ready to go!" },
  { keys: /signin|login|log in|access/i,
    reply: "🔐 Already have an account? Head to the <a href='/signin'>Sign In</a> page and log in with your email and password." },
  { keys: /contact|support|help|issue|problem/i,
    reply: "📬 Need help? Reach out via our <a href='/contact'>Contact Us</a> page and our support team will respond within 24 hours." },
  { keys: /about|who.*you|platform|mentorconnect/i,
    reply: "🏫 MentorConnect is a platform that connects ambitious learners with experienced mentors across industries. Learn more on our <a href='/about'>About Us</a> page." },
  { keys: /review|rating|feedback|testimonial/i,
    reply: "⭐ After each session you can rate your mentor and leave feedback. Honest reviews help the whole community grow and improve!" },
  { keys: /goal|target|plan|objective/i,
    reply: "🎯 Before your first session, write down your top 3 goals. Share them with your mentor so they can tailor guidance specifically for you!" },
  { keys: /confidence|shy|nervous|afraid/i,
    reply: "💪 It's normal to feel nervous reaching out. Remember — every mentor was once a mentee. Take that first step, you've got this! 🙌" },
  { keys: /time|busy|schedule|availability/i,
    reply: "⏰ Mentors set their own availability. Use the filter on the <a href='/'>Mentors page</a> to find someone who matches your free hours." },
  { keys: /industry|sector|field|niche|industries/i,
    reply: "🏭 We have mentors across tech, finance, healthcare, design, education, and more! Browse by industry on the <a href='/mentors'>Mentors page</a>." },
  { keys: /tip|advice|recommend|suggest/i,
    reply: "💡 Pro tip: Come prepared to every session with specific questions. The more focused you are, the more value you'll get from your mentor's time!" },
  { keys: /network|connect|community/i,
    reply: "🤝 Mentorship is also about building your network. After sessions, stay in touch with your mentor — many lasting professional relationships start here!" },
  { keys: /thanks|thank you|appreciate|thanks alot|bye/i,
    reply: "😊You are very welcome!🙏🏿 I'm always here to help you grow. Keep up the amazing work!👍🏿" },
  { keys: /idea|quote/i,
    reply: "💡Don't optimize for being impressive early-optimize for being consistently useful." },
  { keys: /racism|discrimination|equality|justice/i,
    reply: "Education is the foundation of change. Visit https://www.raceforward.org or https://www.tolerance.org for free resources. For a global perspective on equity and human rights, explore https://www.amnesty.org/en/human-rights." },    
  { keys: /no|never|I don't want it|Cannot/i,
    reply: "Oooh! I am sorry😔. Do you mind asking else then maybe I can help in advance." }
];

const SUGGESTIONS = [
  "How do I find a mentor?",
  "How do I become a mentor?",
  "How do I book a session?",
  "What are the payment options?",
  "How can a mentor help my career?",
  "What industries are available?",
];

const getReply = (text) => {
  for (const rule of rules) {
    if (rule.keys.test(text)) return rule.reply;
  }
  return "🤔 I'm not sure about that one. Try visiting our <a href='/contact'>Contact page</a> — our team is happy to help!";
};

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    {
      who: 'bot',
      text: "👋 Hello! I'm your <strong>MentorConnect</strong> assistant. I can help you find mentors, book sessions, or learn about our platform. What would you like to know?",
      id: 0,
    },
  ]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef             = useRef(null);
  const inputRef                   = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    setInput('');
    setShowChips(false);
    setMessages(prev => [...prev, { who: 'user', text: trimmed, id: Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { who: 'bot', text: getReply(trimmed), id: Date.now() + 1 }]);
    }, 750);
  };

  const handleKey = (e) => { if (e.key === 'Enter') send(); };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1055,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Chat panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '360px', maxWidth: '95vw', height: '100vh',
        background: '#fff', zIndex: 1060,
        display: 'flex', flexDirection: 'column',
        boxShadow: '6px 0 32px rgba(0,0,0,0.18)',
        animation: 'slideInLeft 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #3B5BDB 0%, #5C7CFA 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
          }}>
            🎓
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '15px' }}>MentorConnect Assistant</p>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>
              <span style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%', background: '#7fff9a',
                marginRight: '5px', verticalAlign: 'middle',
              }} />
              Online
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.18)', border: 'none',
              color: '#fff', borderRadius: '50%', width: '32px', height: '32px',
              cursor: 'pointer', fontSize: '18px', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          background: '#f0f4ff',
        }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.who === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end', gap: '8px',
              }}
            >
              {msg.who === 'bot' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#3B5BDB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', flexShrink: 0,
                }}>🎓</div>
              )}
              <div
                style={{
                  maxWidth: '78%', padding: '10px 14px',
                  borderRadius: msg.who === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.who === 'user' ? '#3B5BDB' : '#fff',
                  color: msg.who === 'user' ? '#fff' : '#1a1a1a',
                  fontSize: '14px', lineHeight: 1.55,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              {msg.who === 'user' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#3B5BDB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0,
                }}>U</div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', background: '#3B5BDB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', flexShrink: 0,
              }}>🎓</div>
              <div style={{
                padding: '12px 16px', background: '#fff',
                borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#3B5BDB', display: 'inline-block',
                    animation: `typingBounce 1.2s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Suggestion chips */}
          {showChips && (
            <div style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                Quick suggestions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      padding: '5px 11px', borderRadius: '14px',
                      border: '1px solid #3B5BDB', background: '#fff',
                      color: '#3B5BDB', fontSize: '12px',
                      cursor: 'pointer', fontWeight: 500, transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input row */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #e8e8e8',
          background: '#fff', display: 'flex', gap: '8px',
          alignItems: 'center', flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a mentorship question..."
            style={{
              flex: 1, padding: '10px 16px', borderRadius: '22px',
              border: '1.5px solid #d0d0d0', fontSize: '14px',
              outline: 'none', color: '#1a1a1a', background: '#f0f4ff',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#3B5BDB'; }}
            onBlur={e => { e.target.style.borderColor = '#d0d0d0'; }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: input.trim() ? '#3B5BDB' : '#ccc',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, transform 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { if (input.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
};

export default Chatbot;