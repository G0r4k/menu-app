import { useState } from 'react';
import { RestaurantInfo } from '../types';

interface SetupWizardProps {
  currentStep: number;
  restaurantInfo: RestaurantInfo;
  onTypeSelect: (type: 'restaurant' | 'bar' | 'club') => void;
  onNameChange: (name: string) => void;
  onTaglineChange: (tagline: string) => void;
  onRegenerate: () => void;
  onNext: () => void;
  onGenerate: () => void;
  onBack: () => void;
}

export default function SetupWizard({
  currentStep,
  restaurantInfo,
  onTypeSelect,
  onNameChange,
  onTaglineChange,
  onRegenerate,
  onNext,
  onGenerate,
  onBack,
}: SetupWizardProps) {
  const [nameInput, setNameInput] = useState(restaurantInfo.name);

  const types = [
    { type: 'restaurant' as const, icon: '🍽️', label: 'Restaurante', desc: 'Alta cocina, bistró, parrilla' },
    { type: 'bar' as const, icon: '🍸', label: 'Bar', desc: 'Cócteles, cervecería, lounge' },
    { type: 'club' as const, icon: '🪩', label: 'Boliche', desc: 'Discoteca, club nocturno' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo / Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <i className="fas fa-wand-magic-sparkles text-white text-xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-white font-playfair">MenuAI</h1>
          </div>
          <p className="text-white/60 text-lg">Generá menús virtuales espectaculares con inteligencia artificial</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map(step => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-500 ${
                step === currentStep ? 'w-8 bg-fuchsia-500' :
                step < currentStep ? 'w-8 bg-fuchsia-500/50' :
                'w-8 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          {currentStep === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2 font-playfair">¿Qué tipo de negocio tenés?</h2>
              <p className="text-white/50 mb-8">La IA adaptará el diseño y contenido a tu tipo de local</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {types.map(({ type, icon, label, desc }) => (
                  <button
                    key={type}
                    onClick={() => onTypeSelect(type)}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-fuchsia-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/10"
                  >
                    <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{icon}</span>
                    <p className="text-white font-semibold text-lg">{label}</p>
                    <p className="text-white/40 text-sm mt-1">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2 font-playfair">Personalizá tu negocio</h2>
              <p className="text-white/50 mb-8">La IA generó sugerencias, podés editarlas</p>
              
              <div className="space-y-6 max-w-md mx-auto">
                <div className="relative">
                  <label className="block text-white/60 text-sm mb-2 text-left">Nombre del local</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      onNameChange(e.target.value);
                    }}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-semibold text-center placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                    placeholder="Nombre de tu negocio"
                  />
                </div>
                
                <div className="relative">
                  <label className="block text-white/60 text-sm mb-2 text-left">Eslogan / Descripción</label>
                  <input
                    type="text"
                    value={restaurantInfo.tagline}
                    onChange={(e) => onTaglineChange(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-center placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
                    placeholder="Una frase que describa tu negocio"
                  />
                </div>

                <button
                  onClick={onRegenerate}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  <i className="fas fa-rotate"></i>
                  Generar nuevas sugerencias
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl text-white/60 hover:text-white transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>Atrás
                </button>
                <button
                  onClick={onNext}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all"
                >
                  Siguiente<i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2 font-playfair">¡Todo listo!</h2>
              <p className="text-white/50 mb-8">La IA generará un menú estéticamente perfecto para tu negocio</p>
              
              <div className="max-w-sm mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                <p className="text-4xl mb-3">
                  {restaurantInfo.type === 'restaurant' ? '🍽️' : restaurantInfo.type === 'bar' ? '🍸' : '🪩'}
                </p>
                <p className="text-white font-bold text-xl">{restaurantInfo.name || 'Tu Negocio'}</p>
                <p className="text-white/50 text-sm mt-1">{restaurantInfo.tagline}</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl text-white/60 hover:text-white transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>Atrás
                </button>
                <button
                  onClick={onGenerate}
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <i className="fas fa-wand-magic-sparkles group-hover:animate-bounce"></i>
                    Generar Menú con IA
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
