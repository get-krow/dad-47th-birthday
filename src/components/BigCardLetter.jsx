import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

export default function BigCardLetter({ content }) {
  const dadName = content?.dadName || "Daddy";
  const letter = content?.letter || {};
  
  // Zachary's exact default letter text
  const defaultParagraphs = [
    "HAPPY 47TH BIRTHDAY!",
    "My big ol man. 47 years old. And 17 years of those 47 were just wiping diapers, poop digging with chopsticks, driving me to hockey and school, running with me, teaching me the most valuable life lessons, and most important of all, preparing me for what's coming in this world today.",
    "We've always been two different people, or what we like to call it, the \"daddy\" or \"mommy\" side. Yes, we like the same things, do the same things, but in the end we act and think differently, which I think makes us, and this family, so unique. Without you, this family wouldn't be the same. Who would teach us to catch our own fish? Have our own responsibilities? Know what's going on in this world today? Who would aid us and take care of us like no other parent has in this world today? And most importantly of all...who would bring us to get BUBBLE TEA? :). My point is, this family, our lives, wouldn't be the same without you, because you make us complete, make us who we are today. Though me, Nat, and Ellie disagree with you sometimes, fight with you sometimes, it isn't because we think you're a bad dad or we don't disrespect or don't appreciate you. It's the complete opposite. We are so, so comfortable around you and mommy to have the urge to argue, disagree, and just being ourselves because you are our home, our comfort. We know that no matter what happens, you're always going to be there for us at the end of the day, and your family will be there for you too. And I hope you know that.",
    "For the past 17 years, especially the last, I don't think anyone has ever experienced the commit, the drive, the love that you show every single day in anything you do. Studying was something that I had trouble with, and should be delt with myself. But you thought differently. You were there for me when I needed and when I was too deep in the hole. Though we sometimes had trouble cooperating with each other, we pushed through together, EVEN THOUGH you never had to, but you did it anyway. Because that is a dad that will do anything to see his children succeed and have a good life in the end, and I cannot express how much I appreciate and love you for that. That is something that I think no dad would ever go that far for, and that's what makes you so unique.",
    "As you say, time is the most valuable thing in this world today. Time is the thing that people fear the most. But I know that I will never regret the time we spent together doing anything and everything. From talking Physics in the car (I swear I'm not annoyed, just Monday morning tiredness) and studying together, to running and telling me all your amazing army stories. The time we have together everyday is something that I will cherish forever, and will always be reminded of you when meeting an obstacle, because you always had the right advice for it no matter what. I hope that we will keep on laughing, talking Economics, and running together, because that is something I will definitely miss in the future. With you. With this family.",
    "Happy 47th Birthday Daddy, and I hope you get that motorcycle :)"
  ];

  const paragraphs = (letter.paragraphs && letter.paragraphs.length > 0) ? letter.paragraphs : defaultParagraphs;

  return (
    <section id="the-card" className="section-spacer" style={{ paddingTop: '1.5rem' }}>
      <div className="container">
        {/* Decorative Badge */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge crimson">
            <Heart size={14} fill="#f43f5e" />
            {letter.badge || "A Letter From The Heart ✉️"}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.4rem'
          }}>
            {letter.title || "HAPPY 47TH BIRTHDAY!"}
          </h2>
          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            {letter.subtitle || "From your \"100%\" Dogwood student."}
          </p>
        </div>

        {/* Fun Themed Stickers Row Above Letter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {/* Motorcycle Sticker */}
          <div className="sticker-badge" style={{ transform: 'rotate(-2deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=140&q=80" 
              alt="Motorcycle"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24' }}>That Motorcycle</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Someday soon! 🏍️</div>
            </div>
          </div>

          {/* Hockey Sticker */}
          <div className="sticker-badge" style={{ transform: 'rotate(1.5deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=140&q=80" 
              alt="Hockey"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>Hockey Rides</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>17 years on the ice 🏒</div>
            </div>
          </div>

          {/* Star Wars Sticker */}
          <div className="sticker-badge" style={{ transform: 'rotate(-1deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=140&q=80" 
              alt="Star Wars"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa' }}>Star Wars Master</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>The Force is strong ⚔️</div>
            </div>
          </div>

          {/* Bubble Tea Sticker */}
          <div className="sticker-badge" style={{ transform: 'rotate(2deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1558857563-b371f31ca704?auto=format&fit=crop&w=140&q=80" 
              alt="Bubble Tea"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f472b6' }}>Bubble Tea Runs</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Most important of all 🧋</div>
            </div>
          </div>
        </div>

        {/* The Big Card / Letter Box */}
        <div 
          className="glass-card"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4.5vw, 3.4rem)',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(150deg, rgba(22, 30, 48, 0.94) 0%, rgba(12, 17, 29, 0.98) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.35)',
            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.7), 0 0 45px rgba(251, 191, 36, 0.18)',
            position: 'relative'
          }}
        >
          {/* Subtle Top Corner Accent */}
          <div style={{
            position: 'absolute',
            top: '22px',
            right: '25px',
            opacity: 0.3,
            color: 'var(--accent-gold)',
            pointerEvents: 'none'
          }}>
            <Feather size={32} />
          </div>

          {/* Salutation */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3.8vw, 2rem)',
            fontWeight: 800,
            color: 'var(--accent-gold)',
            marginBottom: '1.8rem',
            letterSpacing: '-0.01em'
          }}>
            {letter.salutation || `Dear ${dadName},`}
          </div>

          {/* Letter Body Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {paragraphs.map((p, idx) => (
              <p 
                key={idx}
                style={{
                  fontSize: idx === 0 ? 'clamp(1.2rem, 2.8vw, 1.45rem)' : 'clamp(1.05rem, 2.2vw, 1.18rem)',
                  fontWeight: idx === 0 ? 800 : 400,
                  color: idx === 0 ? 'var(--accent-gold)' : '#f1f5f9',
                  lineHeight: 1.85,
                  letterSpacing: idx === 0 ? '0.02em' : 'normal'
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Sign-Off Block */}
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            <div style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              {letter.signOff || "Love, your \"100%\" Dogwood student,"}
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}>
              {letter.signature || "Zachary Tan"}
            </div>
          </div>
        </div>

        {/* Fun Themed Stickers Row Below Letter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem',
          marginTop: '2.5rem'
        }}>
          {/* Fish / Catch Your Own Fish */}
          <div className="sticker-badge" style={{ transform: 'rotate(-1.5deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=140&q=80" 
              alt="Fish"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2dd4bf' }}>Catch Your Own Fish</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Teaching us responsibility 🎣</div>
            </div>
          </div>

          {/* Physics & Army Stories */}
          <div className="sticker-badge" style={{ transform: 'rotate(2deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=140&q=80" 
              alt="Physics & Stories"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#a78bfa' }}>Car Physics & Army Stories</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Cherished memories forever 📚</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
