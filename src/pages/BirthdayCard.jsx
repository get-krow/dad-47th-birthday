import React from 'react';
import OpeningCard from '../components/OpeningCard';
import HeartfeltSection from '../components/HeartfeltSection';
import SevenYearsSection from '../components/SevenYearsSection';
import PreparingSection from '../components/PreparingSection';
import LikesSection from '../components/LikesSection';
import DadStatsSection from '../components/DadStatsSection';
import PhotoGallery from '../components/PhotoGallery';
import MiniGames from '../components/MiniGames';
import ClosingSection from '../components/ClosingSection';
import { Edit3 } from 'lucide-react';

export default function BirthdayCard({ content, onNavigateEdit }) {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Subtle Background Glow Orbs */}
      <div className="bg-ambient-orb orb-1" />
      <div className="bg-ambient-orb orb-2" />
      <div className="bg-ambient-orb orb-3" />

      {/* Main Sections */}
      <OpeningCard content={content} />
      <HeartfeltSection content={content} />
      <SevenYearsSection content={content} />
      <PreparingSection content={content} />
      <LikesSection content={content} />
      <DadStatsSection content={content} />
      <PhotoGallery content={content} />
      <MiniGames content={content} />
      <ClosingSection content={content} />

      {/* Discreet Footer with Edit Link */}
      <footer style={{
        padding: '2.5rem 0 3.5rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginBottom: '0.8rem' }}>
            Built with all my heart for Daddy's 47th Birthday • 60% heartfelt, 40% funny.
          </p>
          <button
            onClick={onNavigateEdit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              color: 'var(--accent-gold)',
              opacity: 0.85,
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <Edit3 size={13} />
            <span>Customize this card at /edit</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
