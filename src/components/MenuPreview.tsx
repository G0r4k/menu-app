import { useState } from 'react';
import { RestaurantInfo, MenuCategory, MenuItem, Theme } from '../types';

interface MenuPreviewProps {
  restaurantInfo: RestaurantInfo;
  categories: MenuCategory[];
  theme: Theme;
  setCategories: (categories: MenuCategory[]) => void;
}

export default function MenuPreview({ restaurantInfo, categories, theme, setCategories }: MenuPreviewProps) {
  const [editingItem, setEditingItem] = useState<{ categoryId: string; itemId: string } | null>(null);
  const [showAddItem, setShowAddItem] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showShareModal, setShowShareModal] = useState(false);

  const updateItem = (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => {
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          ),
        };
      }
      return cat;
    });
    setCategories(updated);
  };

  const addItem = (categoryId: string) => {
    if (!newItem.name || !newItem.price) return;
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: [...cat.items, {
            id: Math.random().toString(36).substring(2, 9),
            name: newItem.name || '',
            description: newItem.description || '',
            price: newItem.price || '',
            badge: newItem.badge || '',
          }],
        };
      }
      return cat;
    });
    setCategories(updated);
    setNewItem({});
    setShowAddItem(null);
  };

  const removeItem = (categoryId: string, itemId: string) => {
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId),
        };
      }
      return cat;
    });
    setCategories(updated);
  };

  const typeIcon = restaurantInfo.type === 'restaurant' ? '🍽️' : restaurantInfo.type === 'bar' ? '🍸' : '🪩';

  return (
    <div className={`min-h-screen pt-20 pb-16 ${theme.bgGradient}`}>
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-8 text-center relative z-10">
          {/* Decorative elements */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-fuchsia-500/5 blur-3xl"></div>
          
          <div className="mb-4">
            <span className="text-5xl">{typeIcon}</span>
          </div>
          <h1 className={`${theme.headerFont} text-5xl md:text-6xl font-bold ${theme.textColor} mb-3 tracking-tight`}>
            {restaurantInfo.name}
          </h1>
          <p className={`${theme.bodyFont} text-lg ${theme.textColor} opacity-60 italic`}>
            {restaurantInfo.tagline}
          </p>
          <div className={`mt-6 w-24 h-[2px] mx-auto ${theme.divider.replace('border', 'bg').replace('/20', '/40')}`}></div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {categories.map((category, catIndex) => (
          <div
            key={category.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${catIndex * 150}ms` }}
          >
            {/* Category Header */}
            <div className={`flex items-center gap-3 mb-6 ${theme.categoryStyle}`}>
              <span className="text-2xl">{category.icon}</span>
              <h2 className={`${theme.headerFont} text-2xl md:text-3xl font-bold ${theme.textColor}`}>
                {category.name}
              </h2>
            </div>

            {/* Items */}
            <div className="space-y-1">
              {category.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`group relative py-4 ${theme.itemStyle} hover:bg-white/5 rounded-lg px-3 -mx-3 transition-all duration-300`}
                  style={{ animationDelay: `${(catIndex * 150) + (itemIndex * 80)}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`${theme.bodyFont} text-base md:text-lg font-semibold ${theme.textColor}`}>
                          {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(category.id, item.id, 'name', e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm w-full max-w-xs"
                              autoFocus
                            />
                          ) : (
                            item.name
                          )}
                        </h3>
                        {item.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${theme.badgeStyle}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`${theme.bodyFont} text-sm ${theme.textColor} opacity-50 mt-1 leading-relaxed`}>
                        {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(category.id, item.id, 'description', e.target.value)}
                            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm w-full max-w-md resize-none"
                            rows={2}
                          />
                        ) : (
                          item.description
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${theme.headerFont} text-lg font-bold ${theme.accentColor} whitespace-nowrap`}>
                        {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => updateItem(category.id, item.id, 'price', e.target.value)}
                            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm w-24 text-right"
                          />
                        ) : (
                          item.price
                        )}
                      </span>
                      
                      {/* Action buttons */}
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button
                          onClick={() => setEditingItem(
                            editingItem?.itemId === item.id ? null : { categoryId: category.id, itemId: item.id }
                          )}
                          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all text-xs"
                          title="Editar"
                        >
                          <i className="fas fa-pen text-[10px]"></i>
                        </button>
                        <button
                          onClick={() => removeItem(category.id, item.id)}
                          className="w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all text-xs"
                          title="Eliminar"
                        >
                          <i className="fas fa-trash text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Button */}
            {showAddItem === category.id ? (
              <div className={`mt-4 p-4 rounded-xl ${theme.cardBg}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre del plato/trago"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Precio"
                    value={newItem.price || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={newItem.description || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/40 md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Badge (ej: Popular, Nuevo)"
                    value={newItem.badge || ''}
                    onChange={(e) => setNewItem(prev => ({ ...prev, badge: e.target.value }))}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/40"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => addItem(category.id)}
                      className="px-4 py-2 rounded-lg bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-sm hover:bg-fuchsia-500/30 transition-all"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => { setShowAddItem(null); setNewItem({}); }}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddItem(category.id)}
                className={`mt-3 flex items-center gap-2 text-sm ${theme.textColor} opacity-30 hover:opacity-60 transition-opacity`}
              >
                <i className="fas fa-plus text-xs"></i>
                Agregar item
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-3xl mx-auto px-6 mt-16 pt-8 border-t border-white/10">
        <div className="text-center">
          <p className={`${theme.bodyFont} text-sm ${theme.textColor} opacity-30`}>
            Generado con ✨ MenuAI — Menús virtuales inteligentes
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <span className={`${theme.textColor} opacity-30 text-xs`}>
              <i className="fas fa-map-marker-alt mr-1"></i> Tu dirección aquí
            </span>
            <span className={`${theme.textColor} opacity-30 text-xs`}>
              <i className="fas fa-phone mr-1"></i> Tu teléfono
            </span>
            <span className={`${theme.textColor} opacity-30 text-xs`}>
              <i className="fas fa-instagram mr-1"></i> @tucuenta
            </span>
          </div>
        </div>
      </div>

      {/* Preview Mode Toggle - Fixed */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowShareModal(true)}
          className="w-12 h-12 rounded-full bg-fuchsia-500/20 backdrop-blur-md border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-300 hover:bg-fuchsia-500/30 transition-all shadow-lg"
          title="Compartir menú"
        >
          <i className="fas fa-share-nodes"></i>
        </button>
        <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 overflow-hidden">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`px-3 py-2 text-sm transition-all ${
              previewMode === 'desktop' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
            }`}
            title="Vista desktop"
          >
            <i className="fas fa-desktop"></i>
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`px-3 py-2 text-sm transition-all ${
              previewMode === 'mobile' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
            }`}
            title="Vista mobile"
          >
            <i className="fas fa-mobile-screen"></i>
          </button>
        </div>
      </div>

      {/* Mobile Preview Frame */}
      {previewMode === 'mobile' && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setPreviewMode('desktop')}>
          <div className="w-[375px] h-[812px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>
            {/* Screen content */}
            <div className="w-full h-full overflow-y-auto pt-8">
              <div className={`${theme.bgGradient} min-h-full`}>
                {/* Mini header */}
                <div className="px-4 pt-6 pb-4 text-center">
                  <span className="text-3xl">{typeIcon}</span>
                  <h1 className={`${theme.headerFont} text-2xl font-bold ${theme.textColor} mt-2`}>
                    {restaurantInfo.name}
                  </h1>
                  <p className={`${theme.bodyFont} text-xs ${theme.textColor} opacity-60 italic mt-1`}>
                    {restaurantInfo.tagline}
                  </p>
                </div>
                {/* Mini categories */}
                <div className="px-4 space-y-6 pb-8">
                  {categories.map(category => (
                    <div key={category.id}>
                      <div className={`flex items-center gap-2 mb-3 ${theme.categoryStyle}`}>
                        <span className="text-lg">{category.icon}</span>
                        <h2 className={`${theme.headerFont} text-lg font-bold ${theme.textColor}`}>
                          {category.name}
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {category.items.map(item => (
                          <div key={item.id} className={`py-2 ${theme.itemStyle}`}>
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h3 className={`${theme.bodyFont} text-sm font-semibold ${theme.textColor}`}>{item.name}</h3>
                                  {item.badge && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${theme.badgeStyle}`}>{item.badge}</span>
                                  )}
                                </div>
                                <p className={`${theme.bodyFont} text-[11px] ${theme.textColor} opacity-50 mt-0.5 leading-relaxed`}>
                                  {item.description}
                                </p>
                              </div>
                              <span className={`${theme.headerFont} text-sm font-bold ${theme.accentColor} whitespace-nowrap`}>
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/20 flex items-center justify-center mb-3">
                <i className="fas fa-qrcode text-fuchsia-400 text-2xl"></i>
              </div>
              <h3 className="text-white font-bold text-lg">Compartir Menú</h3>
              <p className="text-white/50 text-sm mt-1">Escaneá el QR o compartí el link</p>
            </div>
            
            {/* QR Placeholder */}
            <div className="w-48 h-48 mx-auto bg-white rounded-xl p-3 mb-6">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5 w-32 h-32">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[1px] ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <i className="fas fa-link text-white/40"></i>
                <span className="text-white/60 text-sm flex-1 truncate">menu.ai/{restaurantInfo.name.toLowerCase().replace(/\s+/g, '-')}</span>
                <button className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <i className="fab fa-whatsapp text-green-400 text-lg"></i>
                  <span className="text-white/50 text-[10px]">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <i className="fab fa-instagram text-pink-400 text-lg"></i>
                  <span className="text-white/50 text-[10px]">Instagram</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <i className="fas fa-envelope text-blue-400 text-lg"></i>
                  <span className="text-white/50 text-[10px]">Email</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
