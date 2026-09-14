import React, { useState } from 'react';
import { BarChart3, Plus, Smile, Award } from 'lucide-react';
import { playClick } from '../services/soundEffects';

export default function DadStatsSection({ content }) {
  const dadStats = content?.dadStats || {};
  const stats = dadStats.stats || [];
  const [extraJokes, setExtraJokes] = useState(0);

  const handleAddJoke = () => {
    playClick();
    setExtraJokes(prev => prev + 1);
  };

  return (
    <section id="dad-stats" className="section-spacer">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge emerald">
            <BarChart3 size={14} />
            {dadStats.badge || "Official Diagnostics 📊"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            {dadStats.title || "Funny Dad Stats (47-Year Edition)"}
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            {dadStats.subtitle || "Scientifically calibrated using 100% subjective family data."}
          </p>
        </div>

        {/* Stats Container */}
        <div 
          className="glass-card"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.8rem)',
            maxWidth: '780px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {stats.map((item, idx) => (
              <div key={idx}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.45rem'
                }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: item.barColor || 'var(--accent-gold)'
                  }}>
                    {item.label.toLowerCase().includes('joke') && extraJokes > 0 ? (
                      `∞ + ${extraJokes} fresh ones`
                    ) : (
                      item.value
                    )}
                  </div>
                </div>

                {/* Meter Bar */}
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${Math.min(item.percent || 90, 100)}%`,
                    height: '100%',
                    backgroundColor: item.barColor || 'var(--accent-gold)',
                    borderRadius: '9999px',
                    boxShadow: `0 0 12px ${item.barColor || '#fbbf24'}88`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Mini Interactive Dad Joke Generator / Counter */}
          <div style={{
            marginTop: '2.5rem',
            paddingTop: '1.6rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Smile size={20} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                Need another terrible dad joke right now?
              </span>
            </div>

            <button
              onClick={handleAddJoke}
              className="btn-secondary"
              style={{
                fontSize: '0.86rem',
                padding: '0.55rem 1.1rem',
                borderColor: 'rgba(251, 191, 36, 0.3)',
                color: 'var(--accent-gold)'
              }}
            >
              <Plus size={15} />
              <span>Tap for +1 Dad Joke</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
