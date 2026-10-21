import { MenuCategory, Theme, RestaurantInfo, SelectedElement } from '../types';

interface CanvasProps {
  categories: MenuCategory[];
  theme: Theme;
  restaurantInfo: RestaurantInfo;
  zoom: number;
  selectedElement: SelectedElement | null;
  onSelectElement: (el: SelectedElement | null) => void;
  onUpdateCategories: (categories: MenuCategory[]) => void;
}

export default function Canvas({
  categories,
  theme,
  restaurantInfo,
  zoom,
  selectedElement,
  onSelectElement,
}: CanvasProps) {
  const typeIcon = restaurantInfo.type === 'restaurant' ? '🍽️' : restaurantInfo.type === 'bar' ? '🍸' : '🪩';

  return (
    <div className="flex-1 overflow-auto bg-[#0a0a0a] relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Canvas Container */}
      <div className="min-h-full flex items-start justify-center py-12 px-8">
        <div
          className="relative transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Page Shadow */}
          <div className="absolute -inset-4 bg-black/50 rounded-2xl blur-xl"></div>
          
          {/* The "Page" */}
          <div className={`relative w-[680px] min-h-[900px] rounded-lg overflow-hidden shadow-2xl ${theme.bgGradient}`}>
            {/* Selection overlay for header */}
            {selectedElement?.type === 'header' && (
              <div className="absolute top-0 left-0 right-0 h-48 border-2 border-fuchsia-500 rounded-t-lg z-20 pointer-events-none">
                <div className="absolute -top-3 -left-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                <div className="absolute -top-3 -right-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                <div className="absolute top-1/2 -left-16 bg-fuchsia-500 text-white text-[9px] px-1.5 py-0.5 rounded">
                  Header
                </div>
              </div>
            )}

            {/* Header Section */}
            <div
              className="px-12 pt-14 pb-8 text-center cursor-pointer relative"
              onClick={() => onSelectElement({ type: 'header' })}
            >
              <div className="mb-3">
                <span className="text-5xl">{typeIcon}</span>
              </div>
              <h1 className={`${theme.headerFont} text-5xl font-bold ${theme.textColor} mb-2 tracking-tight`}>
                {restaurantInfo.name}
              </h1>
              <p className={`${theme.bodyFont} text-base ${theme.textColor} opacity-50 italic`}>
                {restaurantInfo.tagline}
              </p>
              <div className="mt-5 w-16 h-[1px] mx-auto bg-current opacity-20"></div>
            </div>

            {/* Menu Content */}
            <div className="px-12 pb-16 space-y-10">
              {categories.map((category, catIndex) => (
                <div
                  key={category.id}
                  className="relative"
                >
                  {/* Category selection */}
                  {selectedElement?.type === 'category' && selectedElement?.categoryId === category.id && (
                    <div className="absolute -inset-3 border-2 border-fuchsia-500 rounded-lg z-10 pointer-events-none">
                      <div className="absolute -top-3 -left-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                      <div className="absolute -top-3 -right-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                      <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                      <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                      <div className="absolute top-1/2 -left-14 bg-fuchsia-500 text-white text-[9px] px-1.5 py-0.5 rounded">
                        {category.name}
                      </div>
                    </div>
                  )}

                  {/* Category Header */}
                  <div
                    className={`flex items-center gap-3 mb-5 ${theme.categoryStyle} cursor-pointer`}
                    onClick={() => onSelectElement({ type: 'category', categoryId: category.id })}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <h2 className={`${theme.headerFont} text-2xl font-bold ${theme.textColor}`}>
                      {category.name}
                    </h2>
                  </div>

                  {/* Items */}
                  <div className="space-y-0">
                    {category.items.map((item) => {
                      const isSelected = selectedElement?.type === 'item' && selectedElement?.itemId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`group relative py-3.5 ${theme.itemStyle} cursor-pointer transition-all duration-200 rounded-lg px-2 -mx-2 ${
                            isSelected ? 'bg-white/5' : 'hover:bg-white/3'
                          }`}
                          onClick={() => onSelectElement({ type: 'item', categoryId: category.id, itemId: item.id })}
                        >
                          {/* Item selection */}
                          {isSelected && (
                            <div className="absolute inset-0 border border-fuchsia-500/60 rounded-lg pointer-events-none">
                              <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                              <div className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                              <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                              <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`${theme.bodyFont} text-[15px] font-semibold ${theme.textColor}`}>
                                  {item.name}
                                </h3>
                                {item.badge && (
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${theme.badgeStyle}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className={`${theme.bodyFont} text-xs ${theme.textColor} opacity-40 mt-1 leading-relaxed`}>
                                {item.description}
                              </p>
                            </div>
                            <span className={`${theme.headerFont} text-base font-bold ${theme.accentColor} whitespace-nowrap`}>
                              {item.price}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-12 py-8 border-t border-white/5">
              <div className="text-center">
                <p className={`${theme.bodyFont} text-[10px] ${theme.textColor} opacity-20 uppercase tracking-widest`}>
                  Generado con MenuAI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rulers */}
      <div className="absolute top-0 left-0 right-0 h-5 bg-[#111] border-b border-white/5 z-20 flex items-end">
        <div className="w-5"></div>
        <div className="flex-1 relative h-3 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="absolute top-0 flex flex-col items-center" style={{ left: `${i * 50}px` }}>
              <div className="w-px h-2 bg-white/10"></div>
              <span className="text-[7px] text-white/15 mt-0.5">{i * 50}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-5 left-0 bottom-0 w-5 bg-[#111] border-r border-white/5 z-20">
        <div className="h-5"></div>
        <div className="relative w-3 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute left-0 flex items-center" style={{ top: `${i * 50}px` }}>
              <div className="h-px w-2 bg-white/10"></div>
              <span className="text-[7px] text-white/15 ml-0.5">{i * 50}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas bottom info */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/5 rounded-full px-4 py-1.5 flex items-center gap-3 text-white/30 text-[10px] z-30">
        <span>680 × 900px</span>
        <span className="w-px h-3 bg-white/10"></span>
        <span>{zoom}%</span>
        <span className="w-px h-3 bg-white/10"></span>
        <span className="flex items-center gap-1">
          <i className="fas fa-mouse text-[8px]"></i>
          Click para seleccionar
        </span>
      </div>
    </div>
  );
}
