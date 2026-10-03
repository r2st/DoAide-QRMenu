import { themes } from '../data/themes';

function SpicyDots({ level }) {
  if (level === 0) return null;
  return <span className="text-xs">{'🌶️'.repeat(level)}</span>;
}

function VegBadge({ isVeg }) {
  const color = isVeg ? '#22c55e' : '#ef4444';
  return (
    <span
      className="inline-block w-3.5 h-3.5 border-2 rounded-sm relative flex-shrink-0"
      style={{ borderColor: color }}
    >
      <span
        className="absolute rounded-full"
        style={{
          background: color,
          width: '6px',
          height: '6px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </span>
  );
}

export default function LivePreview({ menuData, t }) {
  const theme = themes.find(th => th.id === menuData.themeId) || themes[0];

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[360px] max-w-full rounded-[2rem] border-4 border-gray-800 overflow-hidden shadow-2xl"
        style={{ background: theme.bg, fontFamily: theme.fontFamily }}
      >
        {/* Phone notch */}
        <div className="bg-gray-800 h-6 flex justify-center">
          <div className="w-24 h-4 bg-gray-900 rounded-b-xl" />
        </div>

        <div className="max-h-[600px] overflow-y-auto" id="menu-preview-content">
          {/* Header */}
          <div className="px-4 py-5 text-center" style={{ background: theme.headerBg }}>
            <h2 className="text-xl font-bold" style={{ color: theme.accent }}>
              {menuData.restaurantName || 'Your Restaurant'}
            </h2>
          </div>

          {/* Special Offer */}
          {menuData.showSpecialOffer && menuData.specialOffer && (
            <div
              className="px-4 py-2.5 text-center text-sm font-semibold"
              style={{ background: theme.accent, color: theme.priceText }}
            >
              ⭐ {menuData.specialOffer}
            </div>
          )}

          {/* Menu Items */}
          <div className="p-4 space-y-5">
            {menuData.categories.length === 0 && (
              <p className="text-center py-8 opacity-50" style={{ color: theme.text }}>
                {t.noItems}
              </p>
            )}

            {menuData.categories.map(category => (
              <div key={category.id}>
                <h3
                  className="text-base font-bold px-3 py-2 rounded-lg mb-2"
                  style={{ background: theme.categoryBg, color: theme.accent }}
                >
                  {category.name}
                </h3>

                <div className="space-y-2">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg"
                      style={{ background: theme.cardBg }}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <VegBadge isVeg={item.isVeg} />
                          <span
                            className="font-semibold text-sm truncate"
                            style={{ color: theme.text }}
                          >
                            {item.name || 'Item Name'}
                          </span>
                          <SpicyDots level={item.spicyLevel} />
                        </div>
                        {item.description && (
                          <p
                            className="text-xs leading-relaxed opacity-70"
                            style={{ color: theme.text }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-md flex-shrink-0"
                        style={{ background: theme.priceBg, color: theme.priceText }}
                      >
                        ₹{item.price || 0}
                      </span>
                    </div>
                  ))}

                  {category.items.length === 0 && (
                    <p className="text-xs text-center py-3 opacity-40" style={{ color: theme.text }}>
                      {t.noItems}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-3 text-xs opacity-40" style={{ color: theme.text }}>
            {t.poweredBy}
          </div>
        </div>

        {/* Phone bottom bar */}
        <div className="bg-gray-800 h-4 flex justify-center">
          <div className="w-28 h-1 bg-gray-600 rounded-full mt-1.5" />
        </div>
      </div>
    </div>
  );
}
