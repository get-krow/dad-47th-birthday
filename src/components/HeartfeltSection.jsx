import React from 'react';
import { Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeartfeltSection({ content }) {
  const heartfelt = content?.heartfelt || {};
  const dadName = content?.dadName || "Daddy";

  return (
    <section id="heartfelt" className="section-spacer">
      <div className="container">
        {/* Section Badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <span className="badge crimson">
            <Heart size={14} fill="currentColor" />
            {heartfelt.badge || "Us & Our Dynamic"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.7rem)',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            {heartfelt.title || "We Might Be Very Different People..."}
          </h2>
          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            {heartfelt.subtitle || "...but somehow, we make the absolute best team."}
          </p>
        </div>

        {/* Narrative Card */}
        <div 
          className="glass-card"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.6rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Accent Glow */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem',
            alignItems: 'center'
          }}>
            <div>
              {(heartfelt.paragraphs || []).map((p, idx) => (
                <p 
                  key={idx} 
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    marginBottom: idx === (heartfelt.paragraphs.length - 1) ? 0 : '1.2rem',
                    color: '#e2e8f0'
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Quick Contrast / Humor Box */}
            <div style={{
              background: 'rgba(11, 15, 25, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)',
              padding: '1.4rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                <Users size={18} />
                <span>Our Formula:</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                    <strong>Different interests:</strong> You have Star Wars & hockey rinks, I have mine.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                    <strong>Zero pressure:</strong> You never tried to turn me into a replica of you.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                    <strong>Unconditional support:</strong> Always in my corner, 100% of the time.
                  </span>
                </div>
              </div>

              <div style={{
                marginTop: '1.2rem',
                paddingTop: '0.9rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontStyle: 'italic',
                fontSize: '0.88rem',
                color: 'var(--accent-gold)',
                textAlign: 'center'
              }}>
                “{heartfelt.quote || "Different frequencies, perfect harmony."}”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
