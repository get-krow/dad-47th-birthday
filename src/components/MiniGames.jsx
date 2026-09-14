import React, { useState } from 'react';
import { Gamepad2, Shield, Flame, Activity, Trophy, Sparkles } from 'lucide-react';
import { playSaberHum, playGoalHorn, playClick } from '../services/soundEffects';
import { fireGrandConfetti } from '../services/confetti';

export default function MiniGames({ content }) {
  const mini = content?.miniInteractions || {};
  const starWars = mini.starWars || {};
  const hockey = mini.hockey || {};

  // Star Wars State
  const [saberSide, setSaberSide] = useState('light'); // 'light' or 'dark'

  // Hockey State
  const [puckShot, setPuckShot] = useState(false);
  const [goalScored, setGoalScored] = useState(false);

  const handleSaberToggle = (side) => {
    setSaberSide(side);
    playSaberHum(side === 'dark');
  };

  const handleSlapShot = () => {
    if (puckShot) return;
    playClick();
    setPuckShot(true);

    setTimeout(() => {
      setGoalScored(true);
      playGoalHorn();
      fireGrandConfetti();
    }, 450);
  };

  const handleResetHockey = () => {
    setPuckShot(false);
    setGoalScored(false);
    playClick();
  };

  return (
    <section id="mini-games" className="section-spacer">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">
            <Gamepad2 size={14} />
            {mini.badge || "Interactive Arcade 🎮"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            {mini.title || "Daddy's Mini-Games"}
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            {mini.subtitle || "Two quick interactive surprises crafted specifically for you."}
          </p>
        </div>

        {/* 2 Mini Games Side by Side / Stacked */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {/* 1. Star Wars Force Alignment */}
          <div 
            className="glass-card"
            style={{
              padding: '2rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: saberSide === 'light' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
              background: saberSide === 'light' 
                ? 'linear-gradient(145deg, rgba(14, 27, 48, 0.9), rgba(9, 14, 25, 0.95))' 
                : 'linear-gradient(145deg, rgba(40, 16, 26, 0.9), rgba(15, 10, 18, 0.95))',
              transition: 'all 0.35s ease'
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: saberSide === 'light' ? '#38bdf8' : '#f43f5e',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem'
              }}>
                <Sparkles size={16} />
                <span>Star Wars Mini-Interaction</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                {starWars.title || "The Force Alignment Test"}
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                {starWars.description || "Pick a side to reveal your Dad Force Archetype:"}
              </p>

              {/* Side Switcher Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.6rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: '0.35rem',
                borderRadius: '9999px',
                marginBottom: '1.8rem'
              }}>
                <button
                  onClick={() => handleSaberToggle('light')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: saberSide === 'light' ? '#38bdf8' : 'transparent',
                    color: saberSide === 'light' ? '#0b1120' : '#94a3b8',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Shield size={16} />
                  <span>Light Side</span>
                </button>

                <button
                  onClick={() => handleSaberToggle('dark')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: saberSide === 'dark' ? '#f43f5e' : 'transparent',
                    color: saberSide === 'dark' ? '#ffffff' : '#94a3b8',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Flame size={16} />
                  <span>Dad Side</span>
                </button>
              </div>

              {/* Graphical Lightsaber Blade */}
              <div style={{
                width: '100%',
                height: '14px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                boxShadow: saberSide === 'light' 
                  ? '0 0 15px #38bdf8, 0 0 30px #0284c7' 
                  : '0 0 15px #f43f5e, 0 0 30px #e11d48',
                marginBottom: '1.5rem',
                transition: 'box-shadow 0.3s ease'
              }} />

              {/* Reveal Quote Card */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: saberSide === 'light' ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem',
                minHeight: '110px'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: saberSide === 'light' ? '#38bdf8' : '#f43f5e',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {saberSide === 'light' ? starWars.lightSideTitle : starWars.darkSideTitle}
                </div>
                <div style={{
                  fontSize: '0.98rem',
                  color: '#ffffff',
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}>
                  {saberSide === 'light' ? starWars.lightSideQuote : starWars.darkSideQuote}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '1.2rem', textAlign: 'center' }}>
              Tap either side to switch saber frequencies
            </div>
          </div>

          {/* 2. Hockey Overtime Slap-Shot Game */}
          <div 
            className="glass-card"
            style={{
              padding: '2rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: goalScored ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(145deg, rgba(16, 24, 40, 0.9), rgba(10, 14, 24, 0.95))'
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem'
              }}>
                <Activity size={16} />
                <span>Hockey Slap-Shot Game</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                {hockey.title || "The Overtime Slap-Shot 🏒"}
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#cbd5e1', marginBottom: '1.2rem' }}>
                {hockey.prompt || "Take the shot to beat the buzzer for your 47th birthday!"}
              </p>

              {/* Interactive Ice Rink Simulation */}
              <div style={{
                width: '100%',
                height: '140px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#0c1626',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6)'
              }}>
                {/* Rink Lines */}
                <div style={{
                  position: 'absolute',
                  width: '2px',
                  height: '100%',
                  backgroundColor: 'rgba(244, 63, 94, 0.4)',
                  left: '50%'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  left: 'calc(50% - 30px)'
                }} />

                {/* Hockey Net Goal at the right */}
                <div style={{
                  position: 'absolute',
                  right: '12px',
                  width: '28px',
                  height: '64px',
                  border: '3px solid #ef4444',
                  borderLeft: 'none',
                  borderRadius: '0 8px 8px 0',
                  backgroundColor: goalScored ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 800 }}>NET</div>
                </div>

                {/* The Puck */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.8)',
                  position: 'absolute',
                  left: puckShot ? 'calc(100% - 38px)' : '25px',
                  transition: 'left 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: 5
                }} />

                {/* Goal Alarm Indicator */}
                {goalScored && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '12px',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    animation: 'pulseGlow 0.5s infinite'
                  }}>
                    SIREN 🚨
                  </div>
                )}
              </div>

              {/* Goal Reveal or Shoot Button */}
              {goalScored ? (
                <div style={{
                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  textAlign: 'center',
                  animation: 'floatGentle 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: 'var(--accent-gold)',
                    marginBottom: '0.3rem'
                  }}>
                    {hockey.goalMessage || "🚨 GOOOAAALLL! 🚨"}
                  </div>
                  <div style={{
                    fontSize: '0.92rem',
                    color: '#f8fafc',
                    marginBottom: '0.8rem'
                  }}>
                    {hockey.goalSubtext || "Top shelf where grandma keeps the peanut butter! Happy 47th!"}
                  </div>
                  <button
                    onClick={handleResetHockey}
                    className="btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
                  >
                    Shoot Again
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSlapShot}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    fontSize: '1.05rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Trophy size={18} />
                  <span>{hockey.buttonText || "SHOOT THE PUCK!"}</span>
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '1.2rem', textAlign: 'center' }}>
              Sound on for the official arena goal horn!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
