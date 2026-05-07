import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const sessionIcons = {
  physical: { icon: "🏢", label: "Physical",    color: "#7C3AED" },
  online:   { icon: "📞", label: "Phone Call",  color: "#0369A1" },
  video:    { icon: "📹", label: "Video Call",  color: "#0F766E" },
  both:     { icon: "🌐", label: "Online",      color: "#0369A1" },
  all:      { icon: "✨", label: "All Modes",   color: "#B45309" },
};

const RandomMentorPicker = ({ products = [], img_url = "" }) => {
  const [spinning, setSpinning]         = useState(false);
  const [picked, setPicked]             = useState(null);
  const [cycleIndex, setCycleIndex]     = useState(0);
  const [showResult, setShowResult]     = useState(false);
  const [showPrompt, setShowPrompt]     = useState(false);
  const intervalRef                     = useRef(null);
  const navigate                        = useNavigate();
  const { user }                        = useAuth();

  // Only pick from available mentors
  const available = products.filter(p => p.is_available === 1 || p.is_available === true);

  const handleSpin = () => {
    if (spinning || available.length === 0) return;
    setShowResult(false);
    setPicked(null);
    setSpinning(true);

    let count = 0;
    const totalCycles = 18 + Math.floor(Math.random() * 10); // 18–28 flips

    intervalRef.current = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % available.length);
      count++;

      if (count >= totalCycles) {
        clearInterval(intervalRef.current);
        const winner = available[Math.floor(Math.random() * available.length)];
        setPicked(winner);
        setSpinning(false);
        setShowResult(true);
      }
    }, 100);
  };

  const handleApply = () => {
    if (!picked) return;
    if (user) {
      navigate('/makepayment', { state: { product: picked } });
    } else {
      setShowPrompt(true);
    }
  };

  if (products.length === 0) return null;

  const current = spinning ? available[cycleIndex % available.length] : null;

  return (
    <>
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        borderRadius: "20px",
        padding: "28px 24px",
        marginBottom: "28px",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
        <div style={{ position:"absolute", bottom:-20, left:-20, width:80,  height:80,  borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />

        <p style={{ fontSize:"12px", letterSpacing:"2px", textTransform:"uppercase", color:"#A5B4FC", marginBottom:"4px" }}>
          Can't decide?
        </p>
        <h4 style={{ fontWeight:"700", fontSize:"20px", marginBottom:"4px" }}>
          🎲 Random Mentor Picker
        </h4>
        <p style={{ fontSize:"13px", color:"#C7D2FE", marginBottom:"20px" }}>
          Let us find the perfect mentor for you!
        </p>

        {/* Spinning card display */}
        <div style={{
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}>
          <AnimatePresence mode="wait">
            {/* Idle state */}
            {!spinning && !showResult && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  width: "100px", height: "100px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "2px dashed rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "40px",
                }}
              >
                🎯
              </motion.div>
            )}

            {/* Spinning: flash through mentors */}
            {spinning && current && (
              <motion.div
                key={cycleIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}
              >
                <img
                  src={img_url + current.product_photo}
                  alt={current.product_name}
                  style={{ width:"72px", height:"72px", borderRadius:"50%", objectFit:"cover", border:"3px solid #818CF8" }}
                />
                <span style={{ fontSize:"13px", fontWeight:"600", color:"#E0E7FF" }}>
                  {current.product_name}
                </span>
              </motion.div>
            )}

            {/* Result card */}
            {showResult && picked && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "16px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(6px)",
                  minWidth: "220px",
                }}
              >
                <div style={{ position:"relative" }}>
                  <img
                    src={img_url + picked.product_photo}
                    alt={picked.product_name}
                    style={{ width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover", border:"3px solid #818CF8" }}
                  />
                  <span style={{
                    position:"absolute", bottom:0, right:0,
                    background:"#22C55E", borderRadius:"50%",
                    width:"20px", height:"20px",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"11px", border:"2px solid #1e1b4b",
                  }}>✓</span>
                </div>

                <div>
                  <p style={{ margin:0, fontWeight:"700", fontSize:"15px" }}>{picked.product_name}</p>
                  <p style={{ margin:0, fontSize:"12px", color:"#C7D2FE" }}>
                    KES {picked.product_cost}/Hour
                  </p>
                </div>

                {/* Session type badge */}
                {picked.session_type && (() => {
                  const s = sessionIcons[picked.session_type] || sessionIcons.both;
                  return (
                    <span style={{
                      background:"rgba(255,255,255,0.15)",
                      borderRadius:"20px", padding:"3px 10px",
                      fontSize:"11px", color:"#E0E7FF",
                    }}>
                      {s.icon} {s.label}
                    </span>
                  );
                })()}

                {/* Action buttons */}
                <div style={{ display:"flex", gap:"8px", marginTop:"4px" }}>
                  <button
                    style={{
                      background:"#4F46E5", color:"#fff", border:"none",
                      borderRadius:"8px", padding:"7px 14px",
                      fontSize:"12px", cursor:"pointer", fontWeight:"600",
                    }}
                    onClick={handleApply}
                  >
                    Apply Now 🚀
                  </button>
                  <button
                    style={{
                      background:"rgba(255,255,255,0.12)", color:"#E0E7FF",
                      border:"1px solid rgba(255,255,255,0.2)",
                      borderRadius:"8px", padding:"7px 14px",
                      fontSize:"12px", cursor:"pointer",
                    }}
                    onClick={() => { setShowResult(false); setPicked(null); }}
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spin button */}
        {!showResult && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSpin}
            disabled={spinning || available.length === 0}
            style={{
              background: spinning ? "rgba(255,255,255,0.1)" : "#4F46E5",
              color: "#fff", border: "none",
              borderRadius: "50px",
              padding: "12px 32px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: spinning ? "default" : "pointer",
              transition: "background 0.2s",
              letterSpacing: "0.5px",
            }}
          >
            {spinning ? "🎲 Finding your mentor..." : "🎲 Pick a Mentor for Me!"}
          </motion.button>
        )}

        {available.length === 0 && (
          <p style={{ color:"#FCA5A5", fontSize:"13px", marginTop:"8px" }}>
            No mentors are currently available. Check back soon!
          </p>
        )}
      </div>

      {/* Sign-in prompt */}
      <AnimatePresence>
        {showPrompt && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setShowPrompt(false)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:1055, backdropFilter:"blur(3px)" }}
            />
            <motion.div
              key="md"
              initial={{ opacity:0, scale:0.85, y:40 }}
              animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.85, y:40 }}
              transition={{ type:"spring", stiffness:300, damping:25 }}
              style={{
                position:"fixed", top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                zIndex:1060, background:"#fff",
                borderRadius:"16px", padding:"32px 28px",
                maxWidth:"380px", width:"90%",
                textAlign:"center",
                boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ width:"60px",height:"60px",borderRadius:"50%",background:"#EEF2FF",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px" }}>🔐</div>
              <h5 style={{ fontWeight:"700", marginBottom:"6px" }}>Sign in to continue</h5>
              <p style={{ fontSize:"13px", color:"#6B7280", marginBottom:"20px" }}>
                You need to be logged in to book a session with <strong>{picked?.product_name}</strong>.
              </p>
              <button className="btn btn-primary w-100 mb-2" onClick={() => { setShowPrompt(false); navigate("/signin"); }}>🔑 Sign In</button>
              <button className="btn btn-outline-secondary w-100 mb-2" onClick={() => { setShowPrompt(false); navigate("/signup"); }}>✍️ Create an Account</button>
              <button className="btn btn-link text-muted w-100" style={{ fontSize:"13px" }} onClick={() => setShowPrompt(false)}>Cancel</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RandomMentorPicker;