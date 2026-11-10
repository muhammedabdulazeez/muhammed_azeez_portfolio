import { useState } from 'react';
import { Music, Youtube, ExternalLink, Volume2, Radio, Play, Sparkles } from 'lucide-react';
import { PLAYLISTS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function PlaylistsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'spotify' | 'youtube'>('spotify');

  return (
    <section id="media-stream" className="py-20 relative z-10 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('AUDIO & SECURITY STREAM', 'AUDIO & STREAM KEAMANAN')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Workstation Soundtracks & Security Labs Stream', 'Soundtrack Kerja & Stream Lab Keamanan')}
          </h2>
          <p className="text-slate-400 mt-3 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t(
              'Tune into my coding focus playlist on Spotify or stream curated cloud security & ethical hacking lab walkthroughs on YouTube while exploring.',
              'Dengarkan playlist fokus koding saya di Spotify atau putar video panduan keamanan cloud & ethical hacking di YouTube sambil menjelajah.'
            )}
          </p>

          {/* Media Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('spotify')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'spotify'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-105'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Music className="w-4 h-4 text-emerald-300" />
              <span>Spotify Focus Playlist</span>
            </button>

            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'youtube'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 scale-105'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Youtube className="w-4 h-4 text-red-300" />
              <span>YouTube Security Stream</span>
            </button>
          </div>
        </div>

        {/* Media Frame Container */}
        <div className="shiny-border rounded-2xl overflow-hidden bg-slate-900/80 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          
          {activeTab === 'spotify' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{PLAYLISTS.spotify.title}</span>
                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/60">
                        LIVE
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{PLAYLISTS.spotify.subtitle}</p>
                  </div>
                </div>

                <a
                  href={PLAYLISTS.spotify.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 rounded-lg transition-colors self-start sm:self-auto"
                >
                  <span>{t('Open in Spotify App', 'Buka di Spotify')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Spotify Player */}
              <div className="relative w-full rounded-xl overflow-hidden shadow-inner bg-slate-950">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={PLAYLISTS.spotify.embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Focus Playlist"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{PLAYLISTS.youtube.title}</span>
                      <span className="text-[10px] font-mono bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-800/60">
                        HD 1080p
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{PLAYLISTS.youtube.subtitle}</p>
                  </div>
                </div>

                <a
                  href={PLAYLISTS.youtube.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/60 border border-red-800/60 rounded-lg transition-colors self-start sm:self-auto"
                >
                  <span>{t('Open YouTube Playlist', 'Buka di YouTube')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded YouTube Player */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <iframe
                  className="w-full h-full"
                  src={PLAYLISTS.youtube.embedUrl}
                  title="YouTube Playlist Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
