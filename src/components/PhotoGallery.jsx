import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { playClick } from '../services/soundEffects';

export default function PhotoGallery({ content }) {
  const photos = content?.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbRefs = useRef([]);

  useEffect(() => {
    if (thumbRefs.current[currentIndex]) {
      thumbRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentIndex]);

  if (!photos.length) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    playClick();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Touch swipe support for iPhone
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45; // min px swipe threshold
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="photo-memories" className="section-spacer">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">
            <ImageIcon size={14} />
            Memories & Moments 📸
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            Photo Highlights
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Swipe or tap arrows to journey through our favorite memories together.
          </p>
        </div>

        {/* Carousel Card */}
        <div 
          className="glass-card"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Photo Area */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            maxHeight: '480px',
            backgroundColor: '#070b14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src={currentPhoto.url} 
              alt={currentPhoto.alt || currentPhoto.caption || "Family memory"}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.35s ease',
                userSelect: 'none'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80';
              }}
            />

            {/* Lightbox Trigger */}
            <button
              onClick={() => setLightboxOpen(true)}
              title="View full screen"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Maximize2 size={17} />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 23, 0.7)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 23, 0.7)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Photo Caption & Indicator Dots */}
          <div style={{ padding: '1.4rem 1.6rem', textAlign: 'center' }}>
            <p style={{
              fontSize: '1.05rem',
              color: '#f1f5f9',
              fontWeight: 500,
              lineHeight: 1.6,
              marginBottom: '1.2rem',
              minHeight: '48px'
            }}>
              {currentPhoto.caption}
            </p>

            {/* Thumbnail Navigation Row */}
            <div style={{
              display: 'flex',
              justifyContent: photos.length > 6 ? 'flex-start' : 'center',
              alignItems: 'center',
              gap: '0.6rem',
              overflowX: 'auto',
              padding: '0.5rem 0.5rem 0.8rem 0.5rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}>
              {photos.map((p, idx) => (
                <button
                  key={p.id || idx}
                  ref={(el) => (thumbRefs.current[idx] = el)}
                  onClick={() => {
                    playClick();
                    setCurrentIndex(idx);
                  }}
                  title={`View photo ${idx + 1}`}
                  style={{
                    width: '60px',
                    height: '44px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: idx === currentIndex ? '2.5px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.2)',
                    opacity: idx === currentIndex ? 1 : 0.5,
                    cursor: 'pointer',
                    padding: 0,
                    backgroundColor: '#000000',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    transform: idx === currentIndex ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: idx === currentIndex ? '0 0 12px rgba(245, 158, 11, 0.5)' : 'none'
                  }}
                >
                  <img 
                    src={p.url} 
                    alt="" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Dots */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.35rem',
              flexWrap: 'wrap',
              maxWidth: '380px',
              margin: '0 auto'
            }}>
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playClick();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to photo ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    backgroundColor: idx === currentIndex ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0
                  }}
                />
              ))}
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.6rem' }}>
              Photo {currentIndex + 1} of {photos.length} • Tap thumbnails or swipe to view
            </div>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxOpen && (
          <div 
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.94)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
              src={currentPhoto.url} 
              alt={currentPhoto.caption}
              style={{
                maxWidth: '92vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
              }}
            />
            <p style={{
              color: '#ffffff',
              fontSize: '1rem',
              marginTop: '1.2rem',
              textAlign: 'center',
              maxWidth: '650px'
            }}>
              {currentPhoto.caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
