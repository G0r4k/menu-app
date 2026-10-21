import { useState, useCallback } from 'react';
import { RestaurantInfo, MenuCategory, Theme, ViewMode, SelectedElement } from './types';
import { themes } from './data/themes';
import { generateAIMenu, generateTagline, generateRestaurantName } from './data/menuGenerator';
import Canvas from './components/Canvas';
import LeftSidebar from './components/LeftSidebar';
import RightPanel from './components/RightPanel';
import TopBar from './components/TopBar';
import SetupOverlay from './components/SetupOverlay';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: '',
    tagline: '',
    type: 'restaurant',
  });
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [zoom, setZoom] = useState(100);
  const [leftPanel, setLeftPanel] = useState<string>('themes');
  const [history, setHistory] = useState<MenuCategory[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const aiSuggestions = [
    'Analizando tendencias gastronómicas...',
    'Optimizando composición visual...',
    'Seleccionando tipografía armónica...',
    'Aplicando principios de diseño...',
    'Generando descripciones apetitosas...',
    'Renderizando diseño final...',
  ];

  const pushHistory = useCallback((newCategories: MenuCategory[]) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newCategories]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setMenuCategories(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setMenuCategories(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const updateCategories = useCallback((newCategories: MenuCategory[]) => {
    setMenuCategories(newCategories);
    pushHistory(newCategories);
  }, [pushHistory]);

  const handleGenerateMenu = useCallback(async () => {
    setIsGenerating(true);
    setViewMode('preview');

    for (let i = 0; i < aiSuggestions.length; i++) {
      setAiSuggestion(aiSuggestions[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const menu = generateAIMenu(restaurantInfo);
    setMenuCategories(menu);
    setHistory([menu]);
    setHistoryIndex(0);
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
  };

  const handleStartDesign = () => {
    setViewMode('preview');
    const menu = generateAIMenu(restaurantInfo);
    setMenuCategories(menu);
    setHistory([menu]);
    setHistoryIndex(0);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0d0d0d] flex flex-col select-none">
      {/* Animated BG only on setup */}
      {viewMode === 'setup' && <AnimatedBackground />}

      {/* Top Bar */}
      <TopBar
        viewMode={viewMode}
        restaurantInfo={restaurantInfo}
        zoom={zoom}
        setZoom={setZoom}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={undo}
        onRedo={redo}
        onBackToSetup={() => { setViewMode('setup'); setSelectedElement(null); }}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {viewMode === 'setup' ? (
          <SetupOverlay
            restaurantInfo={restaurantInfo}
            onTypeSelect={handleTypeSelect}
            onNameChange={(name: string) => setRestaurantInfo(prev => ({ ...prev, name }))}
            onTaglineChange={(tagline: string) => setRestaurantInfo(prev => ({ ...prev, tagline }))}
            onRegenerate={() => {
              setRestaurantInfo(prev => ({
                ...prev,
                name: generateRestaurantName(prev.type),
                tagline: generateTagline(prev.type),
              }));
            }}
            onGenerate={handleGenerateMenu}
            onQuickStart={handleStartDesign}
            isGenerating={isGenerating}
            aiSuggestion={aiSuggestion}
          />
        ) : (
          <>
            {/* Left Sidebar */}
            <LeftSidebar
              activePanel={leftPanel}
              onPanelChange={setLeftPanel}
              themes={themes}
              selectedTheme={selectedTheme}
              onSelectTheme={setSelectedTheme}
              categories={menuCategories}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              restaurantInfo={restaurantInfo}
              onUpdateRestaurantInfo={setRestaurantInfo}
            />

            {/* Canvas Area */}
            <Canvas
              categories={menuCategories}
              theme={selectedTheme}
              restaurantInfo={restaurantInfo}
              zoom={zoom}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateCategories={updateCategories}
            />

            {/* Right Panel */}
            <RightPanel
              selectedElement={selectedElement}
              categories={menuCategories}
              theme={selectedTheme}
              restaurantInfo={restaurantInfo}
              onUpdateCategories={updateCategories}
              onUpdateRestaurantInfo={setRestaurantInfo}
              onDeselect={() => setSelectedElement(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
