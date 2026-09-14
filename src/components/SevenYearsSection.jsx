import React from 'react';
import { Car, Clock, Coffee, ShieldCheck, MapPin } from 'lucide-react';

export default function SevenYearsSection({ content }) {
  const sevenYears = content?.sevenYears || {};

  return (
    <section id="seven-years" className="section-spacer">
      <div className="container">
        {/* Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge blue">
            <Car size={14} />
            {sevenYears.badge || "Seven Years on the Road 🚗"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 2.9rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            {sevenYears.title || "7 Years of School Morning Rides"}
          </h2>
          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            color: 'var(--accent-blue)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            {sevenYears.subtitle || "Every single morning since middle school. That's real dedication."}
          </p>
        </div>

        {/* Highlight Card */}
        <div 
          className="glass-card"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.8rem)',
            position: 'relative',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(145deg, rgba(17, 26, 46, 0.85) 0%, rgba(10, 15, 27, 0.95) 100%)'
          }}
        >
          {/* Top Intro text */}
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            lineHeight: 1.7,
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto 2.2rem auto'
          }}>
            {sevenYears.intro || "Rain, snow, freezing winter mornings, or sleepy Mondays—for seven consecutive years, you were the one behind the wheel making sure I got to school safe and ready."}
          </p>

          {/* 4 Stat Boxes (Odometer Style) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2.4rem'
          }}>
            {(sevenYears.stats || []).map((stat, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(8, 12, 22, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.18)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.2rem 1rem',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.35rem',
                  textShadow: '0 0 20px rgba(56, 189, 248, 0.35)'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  marginBottom: '0.2rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-subtle)'
                }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Reflection Box */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.06)',
            borderLeft: '4px solid var(--accent-blue)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            padding: '1.2rem 1.5rem',
            fontSize: '1.02rem',
            lineHeight: 1.7,
            color: '#e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-blue)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              <MapPin size={16} />
              <span>More Than Just Miles</span>
            </div>
            {sevenYears.reflection || "Those drives weren't just about getting from point A to point B. They were morning debates, quiet car moments when I wasn't fully awake yet, random music on the stereo, and subtle life lessons tucked between red lights. Thank you for never missing a day."}
          </div>
        </div>
      </div>
    </section>
  );
}
