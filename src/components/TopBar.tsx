import { ViewMode, RestaurantInfo } from '../types';

interface TopBarProps {
  viewMode: ViewMode;
  restaurantInfo: RestaurantInfo;
  zoom: number;
  setZoom: (zoom: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onBackToSetup: () => void;
}

export default function TopBar({
  viewMode,
  restaurantInfo,
  zoom,
  setZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onBackToSetup,
}: TopBarProps) {
  return (
    <div className="h-12 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-4 z-50">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToSetup}
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
            <i className="fas fa-wand-magic-sparkles text-white text-xs"></i>
          </div>
          <span className="text-white/80 font-semibold text-sm group-hover:text-white transition-colors">MenuAI</span>
        </button>

        {viewMode === 'preview' && (
          <>
            <div className="w-px h-5 bg-white/10"></div>
            <input
              type="text"
              defaultValue={restaurantInfo.name || 'Sin título'}
              className="bg-transparent text-white/70 text-sm font-medium border-none outline-none hover:text-white focus:text-white transition-colors max-w-[200px]"
            />
          </>
        )}
      </div>

      {/* Center - Actions */}
      {viewMode === 'preview' && (
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
            title="Deshacer"
          >
            <i className="fas fa-undo text-xs"></i>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
            title="Rehacer"
          >
            <i className="fas fa-redo text-xs"></i>
          </button>

          <div className="w-px h-5 bg-white/10 mx-2"></div>

          {/* Zoom */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="text-white/50 hover:text-white transition-colors"
            >
              <i className="fas fa-minus text-[10px]"></i>
            </button>
            <span className="text-white/70 text-xs font-mono w-8 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              className="text-white/50 hover:text-white transition-colors"
            >
              <i className="fas fa-plus text-[10px]"></i>
            </button>
          </div>
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-2">
        {viewMode === 'preview' && (
          <>
            <button className="px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm transition-all flex items-center gap-2">
              <i className="fas fa-eye text-xs"></i>
              <span>Vista previa</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2">
              <i className="fas fa-share-nodes text-xs"></i>
              <span>Compartir</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
