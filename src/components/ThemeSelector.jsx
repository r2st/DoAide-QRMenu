import { themes } from '../data/themes';

export default function ThemeSelector({ selectedTheme, onSelectTheme, t, lang }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.selectTheme}</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className={`relative rounded-lg p-2 text-xs font-medium transition-all border-2 ${
              selectedTheme === theme.id
                ? 'border-brand ring-2 ring-brand/30'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ background: theme.bg }}
          >
            <div
              className="h-6 rounded mb-1"
              style={{ background: theme.headerBg }}
            />
            <div className="flex gap-1 mb-1">
              <div className="h-2 flex-1 rounded" style={{ background: theme.categoryBg }} />
              <div className="h-2 w-4 rounded" style={{ background: theme.priceBg }} />
            </div>
            <span style={{ color: theme.text }}>
              {lang === 'hi' ? theme.nameHi : theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
