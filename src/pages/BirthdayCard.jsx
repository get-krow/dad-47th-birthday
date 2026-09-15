import React from 'react';
import OpeningCard from '../components/OpeningCard';
import BigCardLetter from '../components/BigCardLetter';
import PhotoGallery from '../components/PhotoGallery';
import ClosingSection from '../components/ClosingSection';

export default function BirthdayCard({ content }) {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Subtle Background Glow Orbs */}
      <div className="bg-ambient-orb orb-1" />
      <div className="bg-ambient-orb orb-2" />
      <div className="bg-ambient-orb orb-3" />

      {/* 1. Interactive Opening Digital Card */}
      <OpeningCard content={content} />

      {/* 2. Really Big Textbox / Card Letter */}
      <BigCardLetter content={content} />

      {/* 3. Photo Slideshow */}
      <PhotoGallery content={content} />

      {/* 4. Grand Finale with Send Love Button */}
      <ClosingSection content={content} />

      {/* Clean Footer (No Edit Buttons) */}
      <footer style={{
        padding: '3rem 0 4rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Made with all my heart for Daddy's 47th Birthday ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
