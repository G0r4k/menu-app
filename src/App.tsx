import { useState, useCallback } from 'react';
import { RestaurantInfo, MenuCategory, Theme, ViewMode } from './types';
import { themes } from './data/themes';
import { generateAIMenu, generateTagline, generateRestaurantName } from './data/menuGenerator';
import MenuPreview from './components/MenuPreview';
import SetupWizard from './components/SetupWizard';
import ThemeSelector from './components/ThemeSelector';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [currentStep, setCurrentStep] = useState(0);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: '',
    tagline: '',
    type: 'restaurant',
  });
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const aiSuggestions = [
    'Analizando tendencias gastronómicas actuales...',
    'Optimizando disposición visual del menú...',
    'Seleccionando paleta de colores armónica...',
    'Aplicando principios de diseño neurológico...',
    'Generando descripciones apetitosas...',
    'Finalizando diseño estético...',
  ];

  const handleGenerateMenu = useCallback(async () => {
    setIsGenerating(true);
    setViewMode('preview');
    
    for (let i = 0; i < aiSuggestions.length; i++) {
      setAiSuggestion(aiSuggestions[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    const menu = generateAIMenu(restaurantInfo);
    setMenuCategories(menu);
    setIsGenerating(false);
    setAiSuggestion('');
  }, [restaurantInfo]);

  const handleTypeSelect = (type: 'restaurant' | 'bar' | 'club') => {
    setRestaurantInfo(prev => ({
      ...prev,
      type,
      name: generateRestaurantName(type),
      tagline: generateTagline(type),
    }));
    setCurrentStep(1);
  };

  const handleNameChange = (name: string) => {
    setRestaurantInfo(prev => ({ ...prev, name }));
  };

  const handleTaglineChange = (tagline: string) => {
    setRestaurantInfo(prev => ({ ...prev, tagline }));
  };

  const handleRegenerate = () => {
    const newName = generateRestaurantName(restaurantInfo.type);
    const newTagline = generateTagline(restaurantInfo.type);
    setRestaurantInfo(prev => ({ ...prev, name: newName, tagline: newTagline }));
  };

  const handleBackToSetup = () => {
    setViewMode('setup');
    setCurrentStep(0);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${selectedTheme.bgGradient}`}>
      {viewMode === 'setup' && <AnimatedBackground />}
      {viewMode === 'setup' ? (
        <SetupWizard
          currentStep={currentStep}
          restaurantInfo={restaurantInfo}
          onTypeSelect={handleTypeSelect}
          onNameChange={handleNameChange}
          onTaglineChange={handleTaglineChange}
          onRegenerate={handleRegenerate}
          onNext={() => setCurrentStep(2)}
          onGenerate={handleGenerateMenu}
          onBack={() => setCurrentStep(Math.max(0, currentStep - 1))}
        />
      ) : (
        <div className="min-h-screen">
          {/* Top Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <button
                onClick={handleBackToSetup}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
                <span className="text-sm">Editar</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">Tema:</span>
                <ThemeSelector
                  themes={themes}
                  selectedTheme={selectedTheme}
                  onSelectTheme={setSelectedTheme}
                  compact
                />
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all"
              >
                <i className="fas fa-download"></i>
                <span>Exportar</span>
              </button>
            </div>
          </div>

          {/* AI Generation Overlay */}
          {isGenerating && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-4 border-t-fuchsia-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-fuchsia-500/10 animate-ping"></div>
                </div>
                <p className="text-white text-lg font-light animate-pulse">{aiSuggestion}</p>
                <p className="text-white/40 text-sm mt-2">MenuAI está trabajando...</p>
              </div>
            </div>
          )}

          {/* Menu Preview */}
          {!isGenerating && (
            <MenuPreview
              restaurantInfo={restaurantInfo}
              categories={menuCategories}
              theme={selectedTheme}
              setCategories={setMenuCategories}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
