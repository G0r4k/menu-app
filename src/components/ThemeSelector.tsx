import { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  compact?: boolean;
}

export default function ThemeSelector({ themes, selectedTheme, onSelectTheme, compact }: ThemeSelectorProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              selectedTheme.id === theme.id
                ? 'ring-2 ring-white scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              background: theme.id === 'neon-club' ? 'linear-gradient(135deg, #7c3aed, #000)' :
                theme.id === 'elegant-dark' ? 'linear-gradient(135deg, #1f2937, #000)' :
                theme.id === 'minimal-white' ? 'linear-gradient(135deg, #fafaf9, #e7e5e4)' :
                theme.id === 'warm-rustic' ? 'linear-gradient(135deg, #78350f, #7c2d12)' :
                theme.id === 'tropical' ? 'linear-gradient(135deg, #134e4a, #065f46)' :
                'linear-gradient(135deg, #000, #1f2937)',
            }}
            title={theme.name}
          >
            {theme.preview}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => onSelectTheme(theme)}
          className={`relative group p-4 rounded-2xl transition-all duration-300 text-left ${
            selectedTheme.id === theme.id
              ? 'ring-2 ring-white/60 scale-[1.02] shadow-xl'
              : 'hover:scale-[1.02] hover:shadow-lg'
          } ${theme.cardBg}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{theme.preview}</span>
            <div>
              <p className={`font-semibold text-sm ${theme.textColor}`}>{theme.name}</p>
              <p className={`text-xs opacity-60 ${theme.textColor}`}>{theme.description}</p>
            </div>
          </div>
          {selectedTheme.id === theme.id && (
            <div className="absolute top-2 right-2">
              <i className="fas fa-check-circle text-white text-lg"></i>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
