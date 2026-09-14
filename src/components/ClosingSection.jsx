import React, { useState } from 'react';
import { Heart, Sparkles, Send } from 'lucide-react';
import { fireHeartConfetti } from '../services/confetti';
import { playChime, playClick } from '../services/soundEffects';

export default function ClosingSection({ content }) {
  const closing = content?.closing || {};
  const dadName = content?.dadName || "Daddy";
  const [loveCount, setLoveCount] = useState(47);

  const handleSendLove = () => {
    playClick();
    playChime();
    fireHeartConfetti();
    setLoveCount(prev => prev + 1);
  };

  return (
    <section id="closing" className="section-spacer" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <div 
          className="glass-card animate-pulse-glow"
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 2.8rem)',
            textAlign: 'center',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid rgba(251, 191, 36, 0.4)',
            background: 'linear-gradient(150deg, rgba(28, 38, 64, 0.9) 0%, rgba(14, 19, 33, 0.98) 100%)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(251, 191, 36, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <span className="badge crimson">
              <Heart size={14} fill="#f43f5e" />
              {closing.badge || "Final Whistle & Warmest Wishes 💖"}
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '0.8rem',
            background: 'linear-gradient(135deg, #ffffff 40%, #fbbf24 80%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {closing.title || `HAPPY BIRTHDAY, ${dadName.toUpperCase()} ❤️`}
          </h2>

          <div style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
            color: 'var(--accent-gold)',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.8rem'
          }}>
            {closing.subtitle || "You're not just 47 — you're 47 years of excellence."}
          </div>

          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#e2e8f0',
            maxWidth: '620px',
            margin: '0 auto 2.2rem auto'
          }}>
            {closing.finalMessage || "Thank you for the sacrifices, the early mornings, the laughs, the guidance, and for constantly showing up for me. No matter how much older we both get, I will always be thankful to have you in my corner."}
          </p>

          {/* Love Button */}
          <div style={{ marginBottom: '2.5rem' }}>
            <button
              onClick={handleSendLove}
              className="btn-primary"
              style={{
                fontSize: '1.1rem',
                padding: '1rem 2.2rem',
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                boxShadow: '0 10px 30px rgba(244, 63, 94, 0.4)',
                color: '#ffffff'
              }}
            >
              <Heart size={20} fill="#ffffff" />
              <span>Send Birthday Love ({loveCount})</span>
            </button>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '0.6rem' }}>
              Tap for celebratory heart sparks & chime
            </div>
          </div>

          {/* Signature Block */}
          <div style={{
            paddingTop: '1.8rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              {closing.signOff || "With all my love and respect,"}
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}>
              {closing.signature || "Your Kid ❤️"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
