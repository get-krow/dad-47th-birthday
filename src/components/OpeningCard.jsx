import React, { useState } from 'react';
import { Sparkles, Heart, ChevronDown, Gift, RefreshCw } from 'lucide-react';
import { fireGrandConfetti } from '../services/confetti';
import { playChime, playClick } from '../services/soundEffects';

export default function OpeningCard({ content, onCardOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  const handleOpen = () => {
    playChime();
    fireGrandConfetti();
    setIsOpen(true);
    setOpenCount(prev => prev + 1);
    if (onCardOpen) onCardOpen();
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    fireGrandConfetti();
  };

  const opening = content?.opening || {};
  const dadName = content?.dadName || "Daddy";
  const age = content?.birthdayAge || 47;

  return (
    <section style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2.5rem 1rem',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Decorative Floating Sparkles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        opacity: 0.7,
        animation: 'floatGentle 4s ease-in-out infinite',
        pointerEvents: 'none'
      }}>
        <Sparkles size={28} color="#fbbf24" />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '12%',
        opacity: 0.6,
        animation: 'floatGentle 3.5s ease-in-out infinite 1s',
        pointerEvents: 'none'
      }}>
        <Heart size={24} color="#f43f5e" fill="#f43f5e" />
      </div>

      {/* Main Interactive Card Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '640px',
          perspective: '1200px',
          margin: '0 auto'
        }}
      >
        <div 
          className="glass-card animate-pulse-glow"
          style={{
            position: 'relative',
            borderRadius: '28px',
            padding: '2.5rem 1.8rem',
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(26, 36, 60, 0.9) 0%, rgba(13, 19, 34, 0.95) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(251, 191, 36, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Top Badge */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="badge">
              <Gift size={14} />
              {opening.badge || "Special Delivery 💌"}
            </span>
          </div>

          {/* Big Opening Header */}
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            margin: '1rem 0 0.8rem 0',
            background: 'linear-gradient(135deg, #ffffff 30%, #fbbf24 80%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 10px rgba(251, 191, 36, 0.25))'
          }}>
            {opening.title || `HAPPY ${age}TH BIRTHDAY, ${dadName.toUpperCase()} ❤️`}
          </h1>

          {/* Funny Subtitle */}
          <div style={{
            fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em'
          }}>
            “{opening.funnySubtitle || `Yes, you're officially ${age}.`}”
          </div>

          <p style={{
            fontSize: '1.02rem',
            maxWidth: '480px',
            margin: '0 auto 1.8rem auto',
            color: '#cbd5e1',
            lineHeight: 1.6
          }}>
            {opening.subtext || "Made with love, gratitude, and just the right amount of teasing."}
          </p>

          {/* Card State: Unopened vs Opened */}
          {!isOpen ? (
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={handleOpen}
                className="btn-primary animate-float"
                style={{
                  fontSize: '1.15rem',
                  padding: '1.1rem 2.4rem',
                  cursor: 'pointer',
                  borderRadius: '9999px',
                  boxShadow: '0 10px 35px rgba(245, 158, 11, 0.45)'
                }}
              >
                <Gift size={22} />
                <span>{opening.buttonText || "OPEN YOUR CARD 🎁"}</span>
              </button>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '0.75rem' }}>
                Tap to unwrap with sound & confetti
              </div>
            </div>
          ) : (
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed rgba(251, 191, 36, 0.3)',
              animation: 'floatGentle 0.4s ease-out'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '1.2rem'
              }}>
                <span>🎉 Card Opened! Scroll down for your journey</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleReplay}
                  className="btn-secondary"
                  style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem' }}
                >
                  <RefreshCw size={16} />
                  <span>More Confetti! ({openCount})</span>
                </button>

                <a 
                  href="#the-card"
                  className="btn-primary"
                  style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem' }}
                >
                  <span>Read Your Card</span>
                  <ChevronDown size={18} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div style={{
        marginTop: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        opacity: isOpen ? 0.9 : 0.4,
        transition: 'opacity 0.3s ease'
      }}>
        <span style={{ fontSize: '0.78rem', letterSpacing: '0.06em', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
          Explore Your Card Below
        </span>
        <ChevronDown size={20} color="var(--accent-gold)" style={{ animation: 'floatGentle 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
