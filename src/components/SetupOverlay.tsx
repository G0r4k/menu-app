import { RestaurantInfo } from '../types';

interface SetupOverlayProps {
  restaurantInfo: RestaurantInfo;
  onTypeSelect: (type: 'restaurant' | 'bar' | 'club') => void;
  onNameChange: (name: string) => void;
  onTaglineChange: (tagline: string) => void;
  onRegenerate: () => void;
  onGenerate: () => void;
  onQuickStart: () => void;
  isGenerating: boolean;
  aiSuggestion: string;
}

export default function SetupOverlay({
  restaurantInfo,
  onTypeSelect,
  onNameChange,
  onTaglineChange,
  onRegenerate,
  onGenerate,
  onQuickStart,
  isGenerating,
  aiSuggestion,
}: SetupOverlayProps) {
  const types = [
    { type: 'restaurant' as const, icon: '🍽️', label: 'Restaurante', desc: 'Alta cocina, bistró, parrilla' },
    { type: 'bar' as const, icon: '🍸', label: 'Bar', desc: 'Cócteles, cervecería, lounge' },
    { type: 'club' as const, icon: '🪩', label: 'Boliche', desc: 'Discoteca, club nocturno' },
  ];

  const hasName = restaurantInfo.name.length > 0;

  return (
    <div className="flex-1 flex items-center justify-center relative z-10 overflow-auto py-8">
      {/* Generating Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto rounded-2xl border-2 border-fuchsia-500/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl border-2 border-t-fuchsia-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-fuchsia-500/5 animate-pulse"></div>
            </div>
            <p className="text-white text-base font-light animate-pulse">{aiSuggestion}</p>
            <div className="flex items-center gap-1 mt-3 justify-center">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl px-6">
        {/* Welcome Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-5">
            <i className="fas fa-wand-magic-sparkles text-fuchsia-400 text-xs"></i>
            <span className="text-fuchsia-300 text-xs font-medium">Potenciado por IA</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Creá tu menú virtual
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Diseñá menús profesionales para tu negocio en minutos con inteligencia artificial
          </p>
        </div>

        {/* Step 1: Type Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center">
              <span className="text-fuchsia-400 text-[9px] font-bold">1</span>
            </div>
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Tipo de negocio</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {types.map(({ type, icon, label, desc }) => (
              <button
                key={type}
                onClick={() => onTypeSelect(type)}
                className={`p-4 rounded-xl text-center transition-all group ${
                  restaurantInfo.type === type
                    ? 'bg-fuchsia-500/10 border border-fuchsia-500/30 ring-1 ring-fuchsia-500/10'
                    : 'bg-white/3 border border-white/5 hover:border-white/15 hover:bg-white/5'
                }`}
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{icon}</span>
                <p className={`text-sm font-medium ${restaurantInfo.type === type ? 'text-fuchsia-300' : 'text-white/70'}`}>
                  {label}
                </p>
                <p className="text-[10px] text-white/30 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Name & Tagline */}
        {hasName && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center">
                <span className="text-fuchsia-400 text-[9px] font-bold">2</span>
              </div>
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Personalizá</span>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={restaurantInfo.name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Nombre de tu negocio"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-semibold placeholder-white/20 focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
                />
                <button
                  onClick={onRegenerate}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-all"
                  title="Regenerar nombre"
                >
                  <i className="fas fa-rotate text-xs"></i>
                </button>
              </div>
              <input
                type="text"
                value={restaurantInfo.tagline}
                onChange={(e) => onTaglineChange(e.target.value)}
                placeholder="Eslogan o descripción breve"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm placeholder-white/20 focus:outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {hasName && (
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <button
              onClick={onQuickStart}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <i className="fas fa-bolt mr-2 text-yellow-400"></i>
              Inicio rápido
            </button>
            <button
              onClick={onGenerate}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <i className="fas fa-wand-magic-sparkles"></i>
              Generar con IA
            </button>
          </div>
        )}

        {/* Preview card */}
        {hasName && (
          <div className="mt-8 animate-fade-in">
            <div className="p-4 rounded-xl bg-white/3 border border-white/5">
              <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">Vista previa</p>
              <div className="text-center py-3">
                <span className="text-2xl">
                  {restaurantInfo.type === 'restaurant' ? '🍽️' : restaurantInfo.type === 'bar' ? '🍸' : '🪩'}
                </span>
                <p className="text-white font-bold text-lg mt-1 font-playfair">{restaurantInfo.name}</p>
                <p className="text-white/40 text-xs italic">{restaurantInfo.tagline}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
