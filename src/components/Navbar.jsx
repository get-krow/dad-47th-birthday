import React, { useState } from 'react';
import { Volume2, VolumeX, Edit3, Heart, Eye } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClick } from '../services/soundEffects';

export default function Navbar({ currentView = 'card', onViewChange }) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playClick();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      backgroundColor: 'rgba(10, 14, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.75rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo / Badge */}
        <div 
          onClick={() => onViewChange && onViewChange('card')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>🎂</span>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.05rem',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1
            }}>
              Daddy's 47th
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--accent-gold)',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}>
              OFFICIAL BIRTHDAY CARD
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: soundOn ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              color: soundOn ? 'var(--accent-gold)' : 'var(--text-muted)',
              border: soundOn ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
