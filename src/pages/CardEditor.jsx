import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  Image as ImageIcon,
  Camera,
  Layers
} from 'lucide-react';
import { 
  saveCardContent, 
  resetCardContent, 
  exportCardJSON, 
  validateAndImportCardJSON, 
  getStorageMode 
} from '../services/storage';
import { playClick } from '../services/soundEffects';

// Helper to compress images so they never exceed browser LocalStorage quota
function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export default function CardEditor({ content, onSave, onNavigateCard }) {
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'opening'
  const [savedStatus, setSavedStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingCount, setUploadingCount] = useState(0);
  const multiFileInputRef = useRef(null);
  const storageInfo = getStorageMode();

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(content)));
  }, [content]);

  // Synchronize and auto-save helper
  const updateAndAutoSave = async (updatedData, message = '✓ Saved!') => {
    setFormData(updatedData);
    onSave(updatedData);
    try {
      await saveCardContent(updatedData);
      setSavedStatus('saved');
      setSaveMessage(message);
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (err) {
      console.error('Auto-save error:', err);
    }
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

  // Preview button: always saves before navigating to ensure card has latest edits!
  const handlePreview = async () => {
    playClick();
    await saveCardContent(formData);
    onSave(formData);
    if (onNavigateCard) {
      onNavigateCard();
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all photos and settings back to the initial defaults?")) {
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

  // -------------------------------------------------------------
  // Multi-Photo Batch Upload Handler
  // -------------------------------------------------------------
  const handleMultiPhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    playClick();
    setSavedStatus('saving');
    setUploadingCount(files.length);

    try {
      const compressedPhotos = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await compressImageFile(file);
        compressedPhotos.push({
          id: `photo-${Date.now()}-${i}`,
          url: base64,
          caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        });
      }

      const updatedPhotos = [...(formData.photos || []), ...compressedPhotos];
      const updated = { ...formData, photos: updatedPhotos };
      updateAndAutoSave(updated, `✓ Added ${files.length} new photo${files.length > 1 ? 's' : ''}!`);
    } catch (err) {
      alert('Error uploading photos: ' + err.message);
      setSavedStatus(null);
    } finally {
      setUploadingCount(0);
      if (multiFileInputRef.current) multiFileInputRef.current.value = '';
    }
  };

  const handleAddBlankPhoto = () => {
    playClick();
    const newPhoto = {
      id: 'photo-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
      caption: 'Family moment with Dad ❤️'
    };
    const updatedPhotos = [...(formData.photos || []), newPhoto];
    const updated = { ...formData, photos: updatedPhotos };
    updateAndAutoSave(updated, '✓ New photo added and saved to card!');
  };

  const handlePhotoUploadForIndex = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      playClick();
      setSavedStatus('saving');
      const base64 = await compressImageFile(file);
      const updatedPhotos = [...(formData.photos || [])];
      updatedPhotos[index] = { ...updatedPhotos[index], url: base64 };
      const updated = { ...formData, photos: updatedPhotos };
      updateAndAutoSave(updated, '✓ Photo replaced and saved!');
    } catch (err) {
      alert('Error uploading photo: ' + err.message);
      setSavedStatus(null);
    }
  };

  const handleDeletePhoto = (index) => {
    if (formData.photos.length <= 1) {
      alert("Please keep at least 1 photo!");
      return;
    }
    playClick();
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    const updated = { ...formData, photos: updatedPhotos };
    updateAndAutoSave(updated, '✓ Photo removed from card!');
  };

  const handleMovePhoto = (index, dir) => {
    playClick();
    const photos = [...(formData.photos || [])];
    const target = index + dir;
    if (target < 0 || target >= photos.length) return;
    const temp = photos[index];
    photos[index] = photos[target];
    photos[target] = temp;
    const updated = { ...formData, photos };
    updateAndAutoSave(updated, '✓ Photos reordered!');
  };

  const handlePhotoCaptionChange = (index, newCaption) => {
    const updatedPhotos = [...(formData.photos || [])];
    updatedPhotos[index] = { ...updatedPhotos[index], caption: newCaption };
    const updated = { ...formData, photos: updatedPhotos };
    setFormData(updated);
    onSave(updated);
  };

  const handlePhotoUrlChange = (index, newUrl) => {
    const updatedPhotos = [...(formData.photos || [])];
    updatedPhotos[index] = { ...updatedPhotos[index], url: newUrl };
    const updated = { ...formData, photos: updatedPhotos };
    setFormData(updated);
    onSave(updated);
  };

  const tabs = [
    { id: 'photos', label: `📸 Photos & Images (${formData.photos?.length || 0})`, icon: ImageIcon },
    { id: 'opening', label: '✨ Opening Card Settings', icon: Sparkles }
  ];

  return (
    <div style={{ padding: '2rem 0 6rem 0', minHeight: '100vh', position: 'relative' }}>
      <div className="container">
        {/* Editor Header */}
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
                Photo & Card Editor
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
              Upload your photos, reorder them, and customize captions. Everything auto-syncs live to the card!
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePreview}
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
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          paddingBottom: '0.8rem',
          marginBottom: '2rem'
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
                  gap: '0.5rem',
                  padding: '0.7rem 1.3rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#0a0e17' : 'var(--text-muted)',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComp size={17} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Photo Slideshow & Wall Manager */}
        {activeTab === 'photos' && (
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
                  Photo Showcase Manager ({formData.photos?.length || 0} Photos)
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Upload photos from your computer or phone. Select multiple photos at once to add them in one go!
                </p>
              </div>

              {/* Add & Upload Buttons */}
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {/* Upload Photos Button */}
                <label 
                  className="btn-primary"
                  style={{ fontSize: '0.92rem', padding: '0.65rem 1.3rem', cursor: 'pointer' }}
                >
                  <Camera size={17} />
                  <span>{uploadingCount > 0 ? `Uploading (${uploadingCount})...` : 'Upload Photos (Select Multiple)'}</span>
                  <input 
                    ref={multiFileInputRef}
                    type="file" 
                    accept="image/*" 
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleMultiPhotoUpload}
                  />
                </label>

                {/* Add Photo with URL */}
                <button
                  onClick={handleAddBlankPhoto}
                  className="btn-secondary"
                  style={{ fontSize: '0.92rem', padding: '0.65rem 1.2rem' }}
                >
                  <Plus size={17} />
                  <span>Add by URL</span>
                </button>
              </div>
            </div>

            {/* List of Photos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {(formData.photos || []).map((photo, idx) => (
                <div key={photo.id || idx} style={{
                  padding: '1.4rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: 'clamp(110px, 22vw, 160px) 1fr auto',
                  gap: '1.4rem',
                  alignItems: 'center'
                }}>
                  {/* Photo Thumbnail */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#050810',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    position: 'relative'
                  }}>
                    <img 
                      src={photo.url} 
                      alt={photo.caption || "Thumbnail"} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      #{idx + 1}
                    </div>
                  </div>

                  {/* Photo Controls */}
                  <div>
                    <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>
                        Image Source (URL or Upload replacement)
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          className="form-input"
                          value={photo.url.startsWith('data:image') ? '[Uploaded Photo]' : photo.url}
                          placeholder="https://..."
                          onChange={(e) => handlePhotoUrlChange(idx, e.target.value)}
                        />
                        <label className="btn-secondary" style={{
                          fontSize: '0.8rem',
                          padding: '0.5rem 0.85rem',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}>
                          <Upload size={14} />
                          <span>Replace</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={(e) => handlePhotoUploadForIndex(idx, e)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Photo Caption / Label (Optional)</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={photo.caption || ''}
                        placeholder="e.g. Birthday memory with Dad ❤️"
                        onChange={(e) => handlePhotoCaptionChange(idx, e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Order & Delete Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleMovePhoto(idx, -1)}
                      disabled={idx === 0}
                      title="Move earlier"
                      className="btn-secondary"
                      style={{ padding: '6px', borderRadius: '6px', opacity: idx === 0 ? 0.3 : 1 }}
                    >
                      <MoveUp size={15} />
                    </button>
                    <button
                      onClick={() => handleMovePhoto(idx, 1)}
                      disabled={idx === formData.photos.length - 1}
                      title="Move later"
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

        {/* TAB 2: Opening Card Details */}
        {activeTab === 'opening' && (
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Opening Card Screen
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div className="form-group">
                <label className="form-label">Dad's Nickname</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.dadName || ''}
                  onChange={(e) => {
                    const updated = { ...formData, dadName: e.target.value };
                    setFormData(updated);
                    onSave(updated);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Birthday Age</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.birthdayAge || 47}
                  onChange={(e) => {
                    const updated = { ...formData, birthdayAge: parseInt(e.target.value) || 47 };
                    setFormData(updated);
                    onSave(updated);
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Opening Card Title</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.title || ''}
                onChange={(e) => {
                  const updated = {
                    ...formData,
                    opening: { ...(formData.opening || {}), title: e.target.value }
                  };
                  setFormData(updated);
                  onSave(updated);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Funny Subtitle</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.funnySubtitle || ''}
                onChange={(e) => {
                  const updated = {
                    ...formData,
                    opening: { ...(formData.opening || {}), funnySubtitle: e.target.value }
                  };
                  setFormData(updated);
                  onSave(updated);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Button Text</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.opening?.buttonText || ''}
                onChange={(e) => {
                  const updated = {
                    ...formData,
                    opening: { ...(formData.opening || {}), buttonText: e.target.value }
                  };
                  setFormData(updated);
                  onSave(updated);
                }}
              />
            </div>
          </div>
        )}

        {/* Bottom Utility Bar */}
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
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Big Save Button */}
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
