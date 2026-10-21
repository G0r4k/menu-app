import { useState, useEffect } from 'react';
import { SelectedElement, MenuCategory, Theme, RestaurantInfo, MenuItem } from '../types';

interface RightPanelProps {
  selectedElement: SelectedElement | null;
  categories: MenuCategory[];
  theme: Theme;
  restaurantInfo: RestaurantInfo;
  onUpdateCategories: (categories: MenuCategory[]) => void;
  onUpdateRestaurantInfo: (info: RestaurantInfo) => void;
  onDeselect: () => void;
}

export default function RightPanel({
  selectedElement,
  categories,
  theme,
  restaurantInfo,
  onUpdateCategories,
  onUpdateRestaurantInfo,
  onDeselect,
}: RightPanelProps) {
  const [localItem, setLocalItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (selectedElement?.type === 'item' && selectedElement.categoryId && selectedElement.itemId) {
      const cat = categories.find(c => c.id === selectedElement.categoryId);
      const item = cat?.items.find(i => i.id === selectedElement.itemId);
      if (item) setLocalItem({ ...item });
    } else {
      setLocalItem(null);
    }
  }, [selectedElement, categories]);

  const saveItem = () => {
    if (!localItem || !selectedElement?.categoryId) return;
    const updated = categories.map(cat => {
      if (cat.id === selectedElement.categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => item.id === localItem.id ? localItem : item),
        };
      }
      return cat;
    });
    onUpdateCategories(updated);
  };

  const deleteItem = () => {
    if (!selectedElement?.categoryId || !selectedElement?.itemId) return;
    const updated = categories.map(cat => {
      if (cat.id === selectedElement.categoryId) {
        return { ...cat, items: cat.items.filter(i => i.id !== selectedElement.itemId) };
      }
      return cat;
    });
    onUpdateCategories(updated);
    onDeselect();
  };

  const addNewItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: 'Nuevo item',
      description: 'Descripción del item',
      price: '$0',
    };
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: [...cat.items, newItem] };
      }
      return cat;
    });
    onUpdateCategories(updated);
  };

  if (!selectedElement) {
    return (
      <div className="w-72 bg-[#141414] border-l border-white/5 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4">
            <i className="fas fa-mouse-pointer text-white/20 text-xl"></i>
          </div>
          <p className="text-white/30 text-sm">Seleccioná un elemento</p>
          <p className="text-white/15 text-xs mt-1">en el canvas o en las capas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-[#141414] border-l border-white/5 flex flex-col overflow-hidden">
      {/* Panel Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className={`fas ${
            selectedElement.type === 'header' ? 'fa-heading' :
            selectedElement.type === 'category' ? 'fa-folder' : 'fa-utensils'
          } text-fuchsia-400 text-xs`}></i>
          <span className="text-white/70 text-sm font-medium">
            {selectedElement.type === 'header' ? 'Header' :
             selectedElement.type === 'category' ? 'Categoría' : 'Item'}
          </span>
        </div>
        <button
          onClick={onDeselect}
          className="w-6 h-6 rounded flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
        >
          <i className="fas fa-times text-[10px]"></i>
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Header Properties */}
        {selectedElement.type === 'header' && (
          <>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Nombre del negocio</label>
              <input
                type="text"
                value={restaurantInfo.name}
                onChange={(e) => onUpdateRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Eslogan</label>
              <textarea
                value={restaurantInfo.tagline}
                onChange={(e) => onUpdateRestaurantInfo({ ...restaurantInfo, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Tipo de negocio</label>
              <div className="grid grid-cols-3 gap-2">
                {(['restaurant', 'bar', 'club'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => onUpdateRestaurantInfo({ ...restaurantInfo, type })}
                    className={`p-2 rounded-lg text-center transition-all ${
                      restaurantInfo.type === type
                        ? 'bg-fuchsia-500/15 border border-fuchsia-500/30'
                        : 'bg-white/5 border border-white/5 hover:border-white/15'
                    }`}
                  >
                    <span className="text-lg block">
                      {type === 'restaurant' ? '🍽️' : type === 'bar' ? '🍸' : '🪩'}
                    </span>
                    <span className="text-white/50 text-[9px] capitalize">
                      {type === 'club' ? 'Boliche' : type === 'restaurant' ? 'Resto' : 'Bar'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Tema actual</label>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="text-lg">{theme.preview}</span>
                <span className="text-white/70 text-sm">{theme.name}</span>
              </div>
            </div>
          </>
        )}

        {/* Category Properties */}
        {selectedElement.type === 'category' && (() => {
          const category = categories.find(c => c.id === selectedElement.categoryId);
          if (!category) return null;
          return (
            <>
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Nombre de categoría</label>
                <input
                  type="text"
                  defaultValue={category.name}
                  onBlur={(e) => {
                    const updated = categories.map(cat =>
                      cat.id === category.id ? { ...cat, name: e.target.value } : cat
                    );
                    onUpdateCategories(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Ícono (emoji)</label>
                <input
                  type="text"
                  defaultValue={category.icon}
                  onBlur={(e) => {
                    const updated = categories.map(cat =>
                      cat.id === category.id ? { ...cat, icon: e.target.value } : cat
                    );
                    onUpdateCategories(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-center text-xl focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-2 block">Items ({category.items.length})</label>
                <div className="space-y-1.5">
                  {category.items.map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-white/3 border border-white/5">
                      <span className="text-white/60 text-xs flex-1 truncate">{item.name}</span>
                      <span className="text-white/30 text-[10px]">{item.price}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addNewItem(category.id)}
                  className="w-full mt-3 py-2 rounded-lg border border-dashed border-white/10 text-white/30 text-xs hover:border-fuchsia-500/30 hover:text-fuchsia-400 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-plus text-[9px]"></i>
                  Agregar item
                </button>
              </div>
            </>
          );
        })()}

        {/* Item Properties */}
        {selectedElement.type === 'item' && localItem && (
          <>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Nombre</label>
              <input
                type="text"
                value={localItem.name}
                onChange={(e) => setLocalItem({ ...localItem, name: e.target.value })}
                onBlur={saveItem}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Descripción</label>
              <textarea
                value={localItem.description}
                onChange={(e) => setLocalItem({ ...localItem, description: e.target.value })}
                onBlur={saveItem}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Precio</label>
              <input
                type="text"
                value={localItem.price}
                onChange={(e) => setLocalItem({ ...localItem, price: e.target.value })}
                onBlur={saveItem}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Badge / Etiqueta</label>
              <input
                type="text"
                value={localItem.badge || ''}
                onChange={(e) => setLocalItem({ ...localItem, badge: e.target.value })}
                onBlur={saveItem}
                placeholder="Ej: Popular, Nuevo, Chef..."
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              />
              {localItem.badge && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${theme.badgeStyle}`}>{localItem.badge}</span>
                  <span className="text-white/20 text-[10px]">Vista previa</span>
                </div>
              )}
            </div>

            {/* AI Suggestions */}
            <div>
              <label className="text-white/40 text-xs mb-2 block flex items-center gap-1.5">
                <i className="fas fa-wand-magic-sparkles text-fuchsia-400 text-[10px]"></i>
                Sugerencias IA
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    const descriptions = [
                      'Preparación artesanal con ingredientes frescos de estación',
                      'Receta exclusiva del chef con toques contemporáneos',
                      'Elaboración tradicional con técnica moderna',
                      'Combinación única de sabores con presentación cuidada',
                    ];
                    setLocalItem({ ...localItem, description: descriptions[Math.floor(Math.random() * descriptions.length)] });
                    saveItem();
                  }}
                  className="w-full py-2 rounded-lg bg-fuchsia-500/5 border border-fuchsia-500/10 text-fuchsia-300/70 text-[11px] hover:bg-fuchsia-500/10 hover:text-fuchsia-300 transition-all text-left px-3"
                >
                  ✨ Generar descripción
                </button>
                <button
                  onClick={() => {
                    const badges = ['Popular', 'Nuevo', 'Chef', 'Vegano', 'Sin TACC', 'Picante', 'Signature'];
                    setLocalItem({ ...localItem, badge: badges[Math.floor(Math.random() * badges.length)] });
                    saveItem();
                  }}
                  className="w-full py-2 rounded-lg bg-fuchsia-500/5 border border-fuchsia-500/10 text-fuchsia-300/70 text-[11px] hover:bg-fuchsia-500/10 hover:text-fuchsia-300 transition-all text-left px-3"
                >
                  ✨ Sugerir badge
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="pt-3 border-t border-white/5">
              <button
                onClick={deleteItem}
                className="w-full py-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400/60 text-xs hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-trash text-[10px]"></i>
                Eliminar item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
