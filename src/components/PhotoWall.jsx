import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Heart } from 'lucide-react';
import { playClick } from '../services/soundEffects';

export default function PhotoWall({ content }) {
  const photos = content?.photos || [];
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos.length) return null;

  return (
    <section id="photo-wall" className="section-spacer" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">
            <Sparkles size={14} />
            Photo Wall & Memories 📸
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '0.4rem',
            background: 'linear-gradient(135deg, #ffffff 40%, #fbbf24 80%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Happy 47th Birthday, Daddy!
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            All our favorite moments, passions & memories in one place.
          </p>
        </div>

        {/* Themed Stickers Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem',
          marginBottom: '2.5rem'
        }}>
          {/* Star Wars */}
          <div className="sticker-badge" style={{ transform: 'rotate(-2deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=140&q=80" 
              alt="Star Wars"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa' }}>Star Wars Master</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>May the 47th be with you ⚔️</div>
            </div>
          </div>

          {/* Motorcycle */}
          <div className="sticker-badge" style={{ transform: 'rotate(2deg)' }}>
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

          {/* Hockey */}
          <div className="sticker-badge" style={{ transform: 'rotate(-1.5deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=140&q=80" 
              alt="Hockey"
              className="sticker-img"
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>Hockey Drop-Offs</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>17 years on the ice 🏒</div>
            </div>
          </div>

          {/* Bubble Tea */}
          <div className="sticker-badge" style={{ transform: 'rotate(1.5deg)' }}>
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

        {/* Mosaic / Photo Collage Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.4rem',
          margin: '0 auto'
        }}>
          {photos.map((photo, idx) => {
            // Subtle rotation tilt for photo scrapbook feel
            const rotation = idx % 3 === 0 ? '-1deg' : idx % 3 === 1 ? '1.2deg' : '-0.5deg';
            return (
              <div
                key={photo.id || idx}
                onClick={() => {
                  playClick();
                  setSelectedPhoto(photo);
                }}
                className="glass-card"
                style={{
                  padding: '0.75rem',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(17, 24, 42, 0.88)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                  transform: `rotate(${rotation})`,
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.zIndex = '5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rotation})`;
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.zIndex = '1';
                }}
              >
                {/* Photo Image Frame */}
                <div style={{
                  width: '100%',
                  aspectRatio: idx % 4 === 0 ? '16 / 11' : idx % 4 === 1 ? '1 / 1' : '4 / 3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#070b14',
                  position: 'relative'
                }}>
                  <img 
                    src={photo.url} 
                    alt={photo.caption || "Photo memory"} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Zoom indicator icon */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    borderRadius: '6px',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(6px)'
                  }}>
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Optional Caption */}
                {photo.caption && (
                  <div style={{
                    padding: '0.65rem 0.4rem 0.2rem 0.4rem',
                    textAlign: 'center',
                    fontSize: '0.88rem',
                    color: '#cbd5e1',
                    fontWeight: 500,
                    lineHeight: 1.4
                  }}>
                    {photo.caption}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.94)',
              zIndex: 999999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption || "Full view"} 
              style={{
                maxWidth: '92vw',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 15px 50px rgba(0,0,0,0.85)'
              }}
            />

            {selectedPhoto.caption && (
              <p style={{
                color: '#ffffff',
                fontSize: '1.05rem',
                marginTop: '1.2rem',
                textAlign: 'center',
                maxWidth: '650px',
                fontWeight: 500
              }}>
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
