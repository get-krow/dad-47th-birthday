import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

export default function BigCardLetter({ content }) {
  const dadName = content?.dadName || "Daddy";
  const letter = content?.letter || {};
  
  // Default letter text with all of user's personal details
  const defaultParagraphs = [
    "Happy 47th Birthday, Daddy! Yes, you are officially 47, and I wanted to put together something special just for you.",
    "Looking back, one of the things I appreciate most is that for 7 straight years—every single morning since middle school—you were the one driving me to school. Rain, snow, freezing mornings, or sleepy Mondays, you never missed a day. Those rides weren’t just commutes; they were quiet moments, car debates, early morning music, and subtle lessons that I’ll remember for the rest of my life.",
    "Anyone looking at us knows that we are very different people with different personalities, quirks, and interests. But somehow, we get along so well and make the absolute best team. You’ve never forced me to be a copy of you, and you always respect and support who I am.",
    "Most of all, I have so much respect for how you raised me. Instead of simply trying to bubble-wrap and protect me from the world, you focused on preparing me for the world. You taught me how to think, how to face reality with honesty, and how to have the confidence to handle whatever comes my way.",
    "Whether it’s debating Star Wars lore, hearing about hockey rinks, admiring fish and aquariums, dreaming about the open road on a motorcycle, tinkering with the latest tech, or your mysterious, classified 'studying' sessions—you make life so much more fun and memorable.",
    "Thank you for everything you do and everything you’ve sacrificed for me. I love you, I appreciate you, and I’m so proud to call you my dad."
  ];

  const paragraphs = (letter.paragraphs && letter.paragraphs.length > 0) ? letter.paragraphs : defaultParagraphs;

  return (
    <section id="the-card" className="section-spacer" style={{ paddingTop: '1rem' }}>
      <div className="container">
        {/* Decorative Badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <span className="badge crimson">
            <Heart size={14} fill="#f43f5e" />
            {letter.badge || "A Letter From The Heart"}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.4rem'
          }}>
            {letter.title || "Happy 47th Birthday, Daddy ❤️"}
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            {letter.subtitle || "To the best dad in the galaxy."}
          </p>
        </div>

        {/* The Big Card / Letter Box */}
        <div 
          className="glass-card"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: 'clamp(2rem, 5vw, 3.8rem) clamp(1.5rem, 4.5vw, 3.2rem)',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(150deg, rgba(22, 30, 48, 0.92) 0%, rgba(12, 17, 29, 0.98) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.35)',
            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.65), 0 0 45px rgba(251, 191, 36, 0.15)',
            position: 'relative'
          }}
        >
          {/* Subtle Top Corner Accent */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            opacity: 0.25,
            color: 'var(--accent-gold)',
            pointerEvents: 'none'
          }}>
            <Feather size={32} />
          </div>

          {/* Salutation */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
            fontWeight: 800,
            color: 'var(--accent-gold)',
            marginBottom: '1.8rem',
            letterSpacing: '-0.01em'
          }}>
            {letter.salutation || `Dear ${dadName},`}
          </div>

          {/* Letter Body Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {paragraphs.map((p, idx) => (
              <p 
                key={idx}
                style={{
                  fontSize: 'clamp(1.05rem, 2.2vw, 1.18rem)',
                  lineHeight: 1.85,
                  color: '#e2e8f0',
                  fontWeight: 400
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Sign-Off Block */}
          <div style={{
            marginTop: '2.8rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            <div style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              {letter.signOff || "With all my love and respect,"}
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}>
              {letter.signature || "Your Kid ❤️"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
