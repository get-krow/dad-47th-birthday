import React, { useState } from 'react';
import { Sparkles, Activity, Waves, Gauge, Cpu, BookOpen, ChevronRight, Eye, Check } from 'lucide-react';
import { playClick } from '../services/soundEffects';

const ICON_MAP = {
  Sparkles: Sparkles,
  Activity: Activity,
  Waves: Waves,
  Gauge: Gauge,
  Cpu: Cpu,
  BookOpen: BookOpen
};

export default function LikesSection({ content }) {
  const thingsHeLikes = content?.thingsHeLikes || {};
  const items = thingsHeLikes.items || [];
  const [revealedIds, setRevealedIds] = useState({});

  const toggleReveal = (id) => {
    playClick();
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="things-he-likes" className="section-spacer">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">
            <Sparkles size={14} />
            {thingsHeLikes.badge || "The Dad Hall of Fame 🏆"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            {thingsHeLikes.title || "Things Daddy Likes"}
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            {thingsHeLikes.subtitle || "A quick breakdown of your favorite obsessions and daily essentials. (Tap any card to reveal the secret rating!)"}
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.4rem'
        }}>
          {items.map((item) => {
            const IconComp = ICON_MAP[item.icon] || Sparkles;
            const isRevealed = !!revealedIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleReveal(item.id)}
                className="glass-card"
                style={{
                  padding: '1.6rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                  border: isRevealed ? `1px solid ${item.color || 'var(--accent-gold)'}` : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isRevealed ? 'linear-gradient(145deg, rgba(25, 35, 58, 0.95), rgba(15, 20, 35, 0.98))' : 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  boxShadow: isRevealed ? `0 10px 30px ${item.color}25` : 'var(--shadow-card)',
                  transition: 'all 0.28s ease'
                }}
              >
                <div>
                  {/* Top Header Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: `${item.color || '#fbbf24'}1a`,
                      color: item.color || 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={24} />
                    </div>

                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: isRevealed ? item.color : 'var(--text-subtle)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      {isRevealed ? "Rating Revealed" : "Tap to inspect"}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.35rem'
                  }}>
                    {item.name}
                  </h3>

                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: item.color || 'var(--accent-gold)',
                    marginBottom: '0.8rem',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {item.tagline}
                  </div>

                  <p style={{
                    fontSize: '0.94rem',
                    color: '#cbd5e1',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Funny Reveal Section */}
                <div style={{
                  marginTop: '0.8rem',
                  paddingTop: '0.8rem',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.1)'
                }}>
                  {isRevealed ? (
                    <div style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.85rem',
                      borderLeft: `3px solid ${item.color || 'var(--accent-gold)'}`,
                      animation: 'floatGentle 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: item.color || 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '0.2rem'
                      }}>
                        Dad Rating & Notes:
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#f8fafc',
                        fontStyle: 'italic'
                      }}>
                        “{item.funnyNote}”
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.84rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 600
                    }}>
                      <Eye size={15} />
                      <span>Tap to reveal the inside joke...</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
