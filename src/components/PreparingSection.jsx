import React from 'react';
import { Compass, ShieldCheck, Award, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function PreparingSection({ content }) {
  const preparing = content?.preparingWorld || {};

  return (
    <section id="preparing-for-world" className="section-spacer">
      <div className="container">
        {/* Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">
            <Compass size={14} />
            {preparing.badge || "The Greatest Gift You Gave Me 🧭"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            {preparing.title || "Preparing Me For The World"}
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            {preparing.subtitle || "Instead of simply protecting me from it."}
          </p>
        </div>

        {/* Core Philosophy Callout */}
        <div 
          className="glass-card"
          style={{
            padding: 'clamp(1.6rem, 4vw, 2.8rem)',
            marginBottom: '2rem',
            border: '1px solid rgba(251, 191, 36, 0.28)',
            background: 'linear-gradient(135deg, rgba(28, 22, 13, 0.7) 0%, rgba(13, 19, 34, 0.95) 100%)',
            position: 'relative'
          }}
        >
          <div style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.28rem)',
            lineHeight: 1.75,
            color: '#f1f5f9',
            textAlign: 'center',
            maxWidth: '740px',
            margin: '0 auto',
            fontStyle: 'normal'
          }}>
            {preparing.mainThought || "A lot of parents try to build a bubble around their kids so the world never hurts them. You did something far harder and far more valuable: you prepared me to navigate it on my own."}
          </div>
        </div>

        {/* 3 Key Pillars Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.4rem',
          marginBottom: '2.5rem'
        }}>
          {(preparing.pillars || []).map((pillar, idx) => (
            <div 
              key={idx}
              className="glass-card"
              style={{
                padding: '1.8rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 21, 37, 0.75)'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(251, 191, 36, 0.12)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {idx === 0 && <ShieldCheck size={24} />}
                {idx === 1 && <Compass size={24} />}
                {idx === 2 && <Award size={24} />}
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.25
              }}>
                {pillar.title}
              </h3>

              <p style={{
                fontSize: '0.96rem',
                lineHeight: 1.65,
                color: '#cbd5e1'
              }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Quote Banner */}
        <div style={{
          textAlign: 'center',
          padding: '1.6rem 1.2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(251, 191, 36, 0.06)',
          border: '1px dashed rgba(251, 191, 36, 0.35)',
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            letterSpacing: '-0.01em'
          }}>
            {preparing.closingQuote || "“To protect is to guard for a day. To prepare is to empower for a lifetime.”"}
          </div>
        </div>
      </div>
    </section>
  );
}
