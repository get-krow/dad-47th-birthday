import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Heart,
  Car,
  Compass,
  Trophy,
  BarChart3,
  Image as ImageIcon,
  Gamepad2
} from 'lucide-react';
import { 
  saveCardContent, 
  resetCardContent, 
  exportCardJSON, 
  validateAndImportCardJSON, 
  getStorageMode 
} from '../services/storage';
import { playClick } from '../services/soundEffects';

export default function CardEditor({ content, onSave, onNavigateCard }) {
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState('opening');
  const [savedStatus, setSavedStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const [saveMessage, setSaveMessage] = useState('');
  const storageInfo = getStorageMode();

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(content)));
  }, [content]);

  const handleFieldChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    playClick();
    setSavedStatus('saving');
    try {
      const res = await saveCardContent(formData);
      onSave(formData);
      setSavedStatus('saved');
      setSaveMessage(res.cloudSuccess ? '✓ Saved to Cloud & Local Storage!' : '✓ Saved successfully!');
      setTimeout(() => {
        setSavedStatus(null);
      }, 3500);
    } catch (err) {
      setSavedStatus('error');
      setSaveMessage('Error saving changes: ' + err.message);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content back to the original heartfelt defaults?")) {
      playClick();
      const def = resetCardContent();
      setFormData(JSON.parse(JSON.stringify(def)));
      onSave(def);
      setSavedStatus('saved');
      setSaveMessage('✓ Reset to defaults!');
      setTimeout(() => setSavedStatus(null), 3000);
    }
  };

  const handleExport = () => {
    playClick();
    exportCardJSON(formData);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = validateAndImportCardJSON(event.target.result);
        setFormData(imported);
        onSave(imported);
        setSavedStatus('saved');
        setSaveMessage('✓ Card JSON imported successfully!');
        setTimeout(() => setSavedStatus(null), 3000);
      } catch (err) {
        alert(err.message);
      }
    };
    reader.readAsText(file);
  };

  // Photo handlers
  const handleAddPhoto = () => {
    playClick();
    const newPhoto = {
      id: 'photo-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80',
      caption: 'New unforgettable memory with Dad ❤️'
    };
    setFormData(prev => ({
      ...prev,
      photos: [...(prev.photos || []), newPhoto]
    }));
  };

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setFormData(prev => {
        const updated = [...prev.photos];
        updated[index] = { ...updated[index], url: base64 };
        return { ...prev, photos: updated };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (index) => {
    playClick();
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleMovePhoto = (index, dir) => {
    playClick();
    setFormData(prev => {
      const photos = [...prev.photos];
      const target = index + dir;
      if (target < 0 || target >= photos.length) return prev;
      const temp = photos[index];
      photos[index] = photos[target];
      photos[target] = temp;
      return { ...prev, photos };
    });
  };

  const tabs = [
    { id: 'opening', label: '1. Opening & Names', icon: Sparkles },
    { id: 'heartfelt', label: '2. Us & Differences', icon: Heart },
    { id: 'sevenYears', label: '3. 7 Years Driving', icon: Car },
    { id: 'preparing', label: '4. Preparing For World', icon: Compass },
    { id: 'likes', label: '5. Things He Likes', icon: Trophy },
    { id: 'stats', label: '6. Funny Stats', icon: BarChart3 },
    { id: 'photos', label: '7. Photo Slideshow', icon: ImageIcon },
    { id: 'minigames', label: '8. Mini-Games & Closing', icon: Gamepad2 }
  ];

  return (
    <div style={{ padding: '2rem 0 6rem 0', minHeight: '100vh', position: 'relative' }}>
      <div className="container">
        {/* Editor Header Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800 }}>
                Card Visual Editor
              </h1>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)'
              }}>
                {storageInfo.badge}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Customize words, photos, stories, and jokes. Hit <strong>SAVE CHANGES</strong> to immediately update the live card.
            </p>
          </div>

          {/* Top Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onNavigateCard}
              className="btn-secondary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.2rem' }}
            >
              <Eye size={16} />
              <span>Preview Card</span>
            </button>

            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={savedStatus === 'saving'}
              style={{
                fontSize: '1.05rem',
                padding: '0.85rem 1.8rem',
                background: savedStatus === 'saved' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                  : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #d97706 100%)',
                boxShadow: savedStatus === 'saved' 
                  ? '0 8px 25px rgba(16, 185, 129, 0.4)' 
                  : '0 8px 25px rgba(245, 158, 11, 0.35)'
              }}
            >
              {savedStatus === 'saved' ? <CheckCircle2 size={19} /> : <Save size={19} />}
              <span>{savedStatus === 'saved' ? '✓ Saved!' : (savedStatus === 'saving' ? 'Saving...' : 'SAVE CHANGES')}</span>
            </button>
          </div>
        </div>

        {/* Save Notification Toast */}
        {savedStatus === 'saved' && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10b981',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.2rem',
            color: '#34d399',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem',
            animation: 'floatGentle 0.3s ease'
          }}>
            <CheckCircle2 size={20} />
            <span>{saveMessage} The main card at `/` is updated!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.8rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none'
        }}>
          {tabs.map((t) => {
            const IconComp = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setActiveTab(t.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#0a0e17' : 'var(--text-muted)',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComp size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Opening & Basic Info */}
        {activeTab === 'opening' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Core Details & Opening Screen
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div className="form-group">
                <label className="form-label">Dad's Nickname / Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.dadName || ''}
                  onChange={(e) => setFormData(p => ({ ...p, dadName: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Birthday Age</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.birthdayAge || 47}
                  onChange={(e) => setFormData(p => ({ ...p, birthdayAge: parseInt(e.target.value) || 47 }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Opening Card Title</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.title || ''}
                onChange={(e) => handleFieldChange('opening', 'title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Funny Subtitle (e.g. "Yes, you're officially 47.")</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.funnySubtitle || ''}
                onChange={(e) => handleFieldChange('opening', 'funnySubtitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Opening Subtext</label>
              <textarea 
                className="form-textarea"
                value={formData.opening?.subtext || ''}
                onChange={(e) => handleFieldChange('opening', 'subtext', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Open Button Text</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.buttonText || ''}
                onChange={(e) => handleFieldChange('opening', 'buttonText', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Us & Differences */}
        {activeTab === 'heartfelt' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Heartfelt Message: Our Dynamic & Differences
            </h2>

            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.heartfelt?.title || ''}
                onChange={(e) => handleFieldChange('heartfelt', 'title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Section Subtitle</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.heartfelt?.subtitle || ''}
                onChange={(e) => handleFieldChange('heartfelt', 'subtitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paragraph 1 (Different personalities & quirks)</label>
              <textarea 
                className="form-textarea"
                value={formData.heartfelt?.paragraphs?.[0] || ''}
                onChange={(e) => {
                  const paras = [...(formData.heartfelt?.paragraphs || [])];
                  paras[0] = e.target.value;
                  handleFieldChange('heartfelt', 'paragraphs', paras);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paragraph 2 (How well we click & understanding)</label>
              <textarea 
                className="form-textarea"
                value={formData.heartfelt?.paragraphs?.[1] || ''}
                onChange={(e) => {
                  const paras = [...(formData.heartfelt?.paragraphs || [])];
                  paras[1] = e.target.value;
                  handleFieldChange('heartfelt', 'paragraphs', paras);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paragraph 3 (Appreciation for letting me be me)</label>
              <textarea 
                className="form-textarea"
                value={formData.heartfelt?.paragraphs?.[2] || ''}
                onChange={(e) => {
                  const paras = [...(formData.heartfelt?.paragraphs || [])];
                  paras[2] = e.target.value;
                  handleFieldChange('heartfelt', 'paragraphs', paras);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Summary Quote Banner</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.heartfelt?.quote || ''}
                onChange={(e) => handleFieldChange('heartfelt', 'quote', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tab 3: 7 Years Driving */}
        {activeTab === 'sevenYears' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              7 Years Driving Me to School
            </h2>

            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.sevenYears?.title || ''}
                onChange={(e) => handleFieldChange('sevenYears', 'title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Section Subtitle</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.sevenYears?.subtitle || ''}
                onChange={(e) => handleFieldChange('sevenYears', 'subtitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Intro Text</label>
              <textarea 
                className="form-textarea"
                value={formData.sevenYears?.intro || ''}
                onChange={(e) => handleFieldChange('sevenYears', 'intro', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Deep Reflection (The morning drives & conversations)</label>
              <textarea 
                className="form-textarea"
                value={formData.sevenYears?.reflection || ''}
                onChange={(e) => handleFieldChange('sevenYears', 'reflection', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tab 4: Preparing Me For The World */}
        {activeTab === 'preparing' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Preparing Me For The World
            </h2>

            <div className="form-group">
              <label className="form-label">Core Philosophy / Main Thought</label>
              <textarea 
                className="form-textarea"
                value={formData.preparingWorld?.mainThought || ''}
                onChange={(e) => handleFieldChange('preparingWorld', 'mainThought', e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
              {(formData.preparingWorld?.pillars || []).map((pillar, idx) => (
                <div key={idx} style={{
                  padding: '1.2rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div className="form-group" style={{ marginBottom: '0.6rem' }}>
                    <label className="form-label">Pillar {idx + 1} Title</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={pillar.title}
                      onChange={(e) => {
                        const updated = [...formData.preparingWorld.pillars];
                        updated[idx].title = e.target.value;
                        handleFieldChange('preparingWorld', 'pillars', updated);
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Pillar {idx + 1} Explanation</label>
                    <textarea 
                      className="form-textarea"
                      value={pillar.desc}
                      onChange={(e) => {
                        const updated = [...formData.preparingWorld.pillars];
                        updated[idx].desc = e.target.value;
                        handleFieldChange('preparingWorld', 'pillars', updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="form-label">Closing Philosophy Quote</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.preparingWorld?.closingQuote || ''}
                onChange={(e) => handleFieldChange('preparingWorld', 'closingQuote', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tab 5: Things He Likes */}
        {activeTab === 'likes' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Things Daddy Likes (6 Cards)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {(formData.thingsHeLikes?.items || []).map((item, idx) => (
                <div key={item.id} style={{
                  padding: '1.2rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${item.color || 'rgba(255,255,255,0.1)'}`
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.8rem' }}>
                    <div>
                      <label className="form-label">Card Title</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...formData.thingsHeLikes.items];
                          updated[idx].name = e.target.value;
                          handleFieldChange('thingsHeLikes', 'items', updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="form-label">Sub-Tagline</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={item.tagline}
                        onChange={(e) => {
                          const updated = [...formData.thingsHeLikes.items];
                          updated[idx].tagline = e.target.value;
                          handleFieldChange('thingsHeLikes', 'items', updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-textarea"
                      style={{ minHeight: '60px' }}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...formData.thingsHeLikes.items];
                        updated[idx].description = e.target.value;
                        handleFieldChange('thingsHeLikes', 'items', updated);
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Funny Dad Rating / Note (revealed on tap)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={item.funnyNote}
                      onChange={(e) => {
                        const updated = [...formData.thingsHeLikes.items];
                        updated[idx].funnyNote = e.target.value;
                        handleFieldChange('thingsHeLikes', 'items', updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Funny Stats */}
        {activeTab === 'stats' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Funny Dad Stats (47-Year Edition)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(formData.dadStats?.stats || []).map((stat, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '0.8rem',
                  alignItems: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Stat Label</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...formData.dadStats.stats];
                        updated[idx].label = e.target.value;
                        handleFieldChange('dadStats', 'stats', updated);
                      }}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Display Value</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...formData.dadStats.stats];
                        updated[idx].value = e.target.value;
                        handleFieldChange('dadStats', 'stats', updated);
                      }}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Bar % (0-100)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={stat.percent}
                      onChange={(e) => {
                        const updated = [...formData.dadStats.stats];
                        updated[idx].percent = parseInt(e.target.value) || 0;
                        handleFieldChange('dadStats', 'stats', updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Photos & Slideshow */}
        {activeTab === 'photos' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  Photo Slideshow Manager
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Upload local photos, paste image links, reorder, or update captions.
                </p>
              </div>

              <button
                onClick={handleAddPhoto}
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}
              >
                <Plus size={16} />
                <span>Add Photo</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {(formData.photos || []).map((photo, idx) => (
                <div key={photo.id || idx} style={{
                  padding: '1.2rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: 'clamp(100px, 20vw, 150px) 1fr auto',
                  gap: '1.2rem',
                  alignItems: 'center'
                }}>
                  {/* Photo Preview Thumbnail */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Photo Details */}
                  <div>
                    <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Image URL or File</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          className="form-input"
                          value={photo.url}
                          placeholder="https://..."
                          onChange={(e) => {
                            const updated = [...formData.photos];
                            updated[idx].url = e.target.value;
                            setFormData(p => ({ ...p, photos: updated }));
                          }}
                        />
                        <label className="btn-secondary" style={{
                          fontSize: '0.78rem',
                          padding: '0.5rem 0.8rem',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}>
                          <Upload size={14} />
                          <span>Upload</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={(e) => handlePhotoUpload(idx, e)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Photo Caption</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={photo.caption}
                        onChange={(e) => {
                          const updated = [...formData.photos];
                          updated[idx].caption = e.target.value;
                          setFormData(p => ({ ...p, photos: updated }));
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleMovePhoto(idx, -1)}
                      disabled={idx === 0}
                      title="Move up"
                      className="btn-secondary"
                      style={{ padding: '6px', borderRadius: '6px', opacity: idx === 0 ? 0.3 : 1 }}
                    >
                      <MoveUp size={15} />
                    </button>
                    <button
                      onClick={() => handleMovePhoto(idx, 1)}
                      disabled={idx === formData.photos.length - 1}
                      title="Move down"
                      className="btn-secondary"
                      style={{ padding: '6px', borderRadius: '6px', opacity: idx === formData.photos.length - 1 ? 0.3 : 1 }}
                    >
                      <MoveDown size={15} />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(idx)}
                      title="Delete photo"
                      className="btn-secondary"
                      style={{ padding: '6px', borderRadius: '6px', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Mini-Games & Closing */}
        {activeTab === 'minigames' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Mini-Games & Final Closing Section
            </h2>

            {/* Star Wars Quotes */}
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#38bdf8', marginBottom: '1rem' }}>
                Star Wars Alignment Quotes
              </h3>
              <div className="form-group">
                <label className="form-label">Light Side Reveal Quote</label>
                <textarea 
                  className="form-textarea"
                  value={formData.miniInteractions?.starWars?.lightSideQuote || ''}
                  onChange={(e) => {
                    setFormData(p => ({
                      ...p,
                      miniInteractions: {
                        ...p.miniInteractions,
                        starWars: {
                          ...p.miniInteractions.starWars,
                          lightSideQuote: e.target.value
                        }
                      }
                    }));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dad Side Reveal Quote</label>
                <textarea 
                  className="form-textarea"
                  value={formData.miniInteractions?.starWars?.darkSideQuote || ''}
                  onChange={(e) => {
                    setFormData(p => ({
                      ...p,
                      miniInteractions: {
                        ...p.miniInteractions,
                        starWars: {
                          ...p.miniInteractions.starWars,
                          darkSideQuote: e.target.value
                        }
                      }
                    }));
                  }}
                />
              </div>
            </div>

            {/* Hockey Goal message */}
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                Hockey Slap-Shot Reveal
              </h3>
              <div className="form-group">
                <label className="form-label">Goal Subtext Joke</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.miniInteractions?.hockey?.goalSubtext || ''}
                  onChange={(e) => {
                    setFormData(p => ({
                      ...p,
                      miniInteractions: {
                        ...p.miniInteractions,
                        hockey: {
                          ...p.miniInteractions.hockey,
                          goalSubtext: e.target.value
                        }
                      }
                    }));
                  }}
                />
              </div>
            </div>

            {/* Closing Message */}
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#f43f5e', marginBottom: '1rem' }}>
                Final Grand Finale Message
              </h3>
              <div className="form-group">
                <label className="form-label">Closing Section Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.closing?.title || ''}
                  onChange={(e) => handleFieldChange('closing', 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Final Message / Words of Love</label>
                <textarea 
                  className="form-textarea"
                  style={{ minHeight: '110px' }}
                  value={formData.closing?.finalMessage || ''}
                  onChange={(e) => handleFieldChange('closing', 'finalMessage', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Sign-Off</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.closing?.signOff || ''}
                    onChange={(e) => handleFieldChange('closing', 'signOff', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Signature</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.closing?.signature || ''}
                    onChange={(e) => handleFieldChange('closing', 'signature', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Utility Bar (Save, Export, Reset) */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Backup Tools */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleExport}
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <Download size={15} />
              <span>Backup (Export JSON)</span>
            </button>

            <label className="btn-secondary" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              <Upload size={15} />
              <span>Restore (Import JSON)</span>
              <input 
                type="file" 
                accept=".json" 
                style={{ display: 'none' }}
                onChange={handleImportFile}
              />
            </label>

            <button
              onClick={handleReset}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.2)' }}
            >
              <RotateCcw size={15} />
              <span>Reset to Defaults</span>
            </button>
          </div>

          {/* Big Save Button at bottom as well */}
          <button
            onClick={handleSave}
            className="btn-primary"
            disabled={savedStatus === 'saving'}
            style={{
              fontSize: '1.05rem',
              padding: '0.85rem 2rem'
            }}
          >
            <Save size={18} />
            <span>SAVE CHANGES</span>
          </button>
        </div>
      </div>
    </div>
  );
}
