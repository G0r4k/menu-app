import { Theme, MenuCategory, RestaurantInfo, SelectedElement } from '../types';

interface LeftSidebarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  themes: Theme[];
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  categories: MenuCategory[];
  selectedElement: SelectedElement | null;
  onSelectElement: (el: SelectedElement | null) => void;
  restaurantInfo: RestaurantInfo;
  onUpdateRestaurantInfo: (info: RestaurantInfo) => void;
}

export default function LeftSidebar({
  activePanel,
  onPanelChange,
  themes,
  selectedTheme,
  onSelectTheme,
  categories,
  selectedElement,
  onSelectElement,
  restaurantInfo,
}: LeftSidebarProps) {
  const tabs = [
    { id: 'design', icon: 'fa-palette', label: 'Diseño' },
    { id: 'themes', icon: 'fa-swatchbook', label: 'Temas' },
    { id: 'layers', icon: 'fa-layer-group', label: 'Capas' },
    { id: 'typography', icon: 'fa-font', label: 'Tipos' },
  ];

  return (
    <div className="w-64 bg-[#141414] border-r border-white/5 flex flex-col">
      {/* Tab Icons */}
      <div className="flex border-b border-white/5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onPanelChange(tab.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${
              activePanel === tab.id
                ? 'text-fuchsia-400 bg-white/5 border-b-2 border-fuchsia-400'
                : 'text-white/30 hover:text-white/60 hover:bg-white/3'
            }`}
            title={tab.label}
          >
            <i className={`fas ${tab.icon} text-sm`}></i>
            <span className="text-[9px]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'design' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Información</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Nombre</label>
                  <div className="text-white/80 text-sm font-medium bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                    {restaurantInfo.name || 'Sin nombre'}
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Eslogan</label>
                  <div className="text-white/60 text-xs bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                    {restaurantInfo.tagline || 'Sin eslogan'}
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Tipo</label>
                  <div className="flex items-center gap-2 text-white/70 text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                    <span>{restaurantInfo.type === 'restaurant' ? '🍽️' : restaurantInfo.type === 'bar' ? '🍸' : '🪩'}</span>
                    <span className="capitalize">{restaurantInfo.type === 'club' ? 'Boliche' : restaurantInfo.type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Estadísticas</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <p className="text-white/40 text-[10px] uppercase">Categorías</p>
                  <p className="text-white text-lg font-bold">{categories.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <p className="text-white/40 text-[10px] uppercase">Items</p>
                  <p className="text-white text-lg font-bold">
                    {categories.reduce((acc, cat) => acc + cat.items.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'themes' && (
          <div className="space-y-3">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Temas disponibles</h3>
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`w-full p-3 rounded-xl text-left transition-all group ${
                  selectedTheme.id === theme.id
                    ? 'bg-fuchsia-500/10 border border-fuchsia-500/30 ring-1 ring-fuchsia-500/20'
                    : 'bg-white/3 border border-white/5 hover:border-white/15 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: theme.id === 'neon-club' ? 'linear-gradient(135deg, #7c3aed, #000)' :
                        theme.id === 'elegant-dark' ? 'linear-gradient(135deg, #1f2937, #000)' :
                        theme.id === 'minimal-white' ? 'linear-gradient(135deg, #fafaf9, #e7e5e4)' :
                        theme.id === 'warm-rustic' ? 'linear-gradient(135deg, #78350f, #7c2d12)' :
                        theme.id === 'tropical' ? 'linear-gradient(135deg, #134e4a, #065f46)' :
                        'linear-gradient(135deg, #000, #1f2937)',
                    }}
                  >
                    {theme.preview}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${selectedTheme.id === theme.id ? 'text-fuchsia-300' : 'text-white/80'}`}>
                      {theme.name}
                    </p>
                    <p className="text-[10px] text-white/30">{theme.description}</p>
                  </div>
                  {selectedTheme.id === theme.id && (
                    <i className="fas fa-check text-fuchsia-400 text-xs ml-auto"></i>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {activePanel === 'layers' && (
          <div className="space-y-2">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Estructura del menú</h3>
            
            {/* Header Layer */}
            <button
              onClick={() => onSelectElement({ type: 'header' })}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                selectedElement?.type === 'header'
                  ? 'bg-fuchsia-500/15 border border-fuchsia-500/30'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <i className="fas fa-heading text-white/30 text-xs w-4"></i>
              <span className="text-white/70 text-xs">Header / Título</span>
            </button>

            {/* Category Layers */}
            {categories.map(cat => (
              <div key={cat.id}>
                <button
                  onClick={() => onSelectElement({ type: 'category', categoryId: cat.id })}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                    selectedElement?.categoryId === cat.id && selectedElement?.type === 'category'
                      ? 'bg-fuchsia-500/15 border border-fuchsia-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <i className="fas fa-folder text-white/30 text-xs w-4"></i>
                  <span className="text-white/70 text-xs">{cat.icon} {cat.name}</span>
                  <span className="text-white/20 text-[10px] ml-auto">{cat.items.length}</span>
                </button>
                {/* Item sublayers */}
                <div className="ml-6 space-y-0.5 mt-0.5">
                  {cat.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onSelectElement({ type: 'item', categoryId: cat.id, itemId: item.id })}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-all ${
                        selectedElement?.itemId === item.id
                          ? 'bg-fuchsia-500/15 border border-fuchsia-500/30'
                          : 'hover:bg-white/3 border border-transparent'
                      }`}
                    >
                      <i className="fas fa-utensils text-white/20 text-[9px] w-3"></i>
                      <span className="text-white/50 text-[11px] truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activePanel === 'typography' && (
          <div className="space-y-5">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Tipografía</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-white/40 text-xs mb-2 block">Títulos</label>
                <div className={`p-3 rounded-lg bg-white/5 border border-white/5 ${selectedTheme.headerFont}`}>
                  <p className={`text-lg ${selectedTheme.textColor}`}>Aa Bb Cc</p>
                  <p className="text-white/30 text-[10px] mt-1">
                    {selectedTheme.headerFont === 'font-playfair' ? 'Playfair Display' :
                     selectedTheme.headerFont === 'font-cormorant' ? 'Cormorant Garamond' :
                     'Montserrat'}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs mb-2 block">Cuerpo</label>
                <div className={`p-3 rounded-lg bg-white/5 border border-white/5 ${selectedTheme.bodyFont}`}>
                  <p className={`text-sm ${selectedTheme.textColor}`}>The quick brown fox jumps over the lazy dog</p>
                  <p className="text-white/30 text-[10px] mt-1">Inter</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-white/40 text-xs mb-2 block">Escala de tamaños</label>
              <div className="space-y-2 bg-white/5 rounded-lg p-3 border border-white/5">
                <p className={`${selectedTheme.headerFont} text-2xl ${selectedTheme.textColor}`}>Título H1</p>
                <p className={`${selectedTheme.headerFont} text-lg ${selectedTheme.textColor}`}>Subtítulo H2</p>
                <p className={`${selectedTheme.bodyFont} text-sm ${selectedTheme.textColor}`}>Texto de cuerpo</p>
                <p className={`${selectedTheme.bodyFont} text-xs ${selectedTheme.textColor} opacity-50`}>Caption small</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
