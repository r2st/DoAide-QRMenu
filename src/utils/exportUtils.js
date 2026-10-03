import { themes } from '../data/themes';

function getSpicyDots(level) {
  return '🌶️'.repeat(level);
}

function generateMenuHTML(menuData) {
  const theme = themes.find(t => t.id === menuData.themeId) || themes[0];

  const categoriesHTML = menuData.categories.map(cat => `
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 20px; font-weight: 700; padding: 10px 16px; margin: 0 0 12px 0;
        background: ${theme.categoryBg}; border-radius: 8px; color: ${theme.accent};">
        ${escapeHtml(cat.name)}
      </h2>
      ${cat.items.map(item => `
        <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px;
          background: ${theme.cardBg}; border-radius: 8px; margin-bottom: 8px;">
          ${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}"
            style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" />` : ''}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid ${item.isVeg ? '#22c55e' : '#ef4444'};
                border-radius: 3px; position: relative;">
                <span style="display: block; width: 6px; height: 6px; border-radius: 50%;
                  background: ${item.isVeg ? '#22c55e' : '#ef4444'}; position: absolute; top: 50%; left: 50%;
                  transform: translate(-50%, -50%);"></span>
              </span>
              <span style="font-weight: 600; font-size: 15px; color: ${theme.text};">${escapeHtml(item.name)}</span>
              ${item.spicyLevel > 0 ? `<span style="font-size: 12px;">${getSpicyDots(item.spicyLevel)}</span>` : ''}
            </div>
            ${item.description ? `<p style="font-size: 13px; color: ${theme.text}; opacity: 0.7;
              margin: 0 0 4px 0;">${escapeHtml(item.description)}</p>` : ''}
          </div>
          <span style="font-weight: 700; font-size: 14px; padding: 4px 10px; border-radius: 6px;
            background: ${theme.priceBg}; color: ${theme.priceText}; white-space: nowrap; flex-shrink: 0;">
            ₹${item.price}
          </span>
        </div>
      `).join('')}
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(menuData.restaurantName)} — Menu</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: ${theme.fontFamily}; background: ${theme.bg}; color: ${theme.text};
      max-width: 480px; margin: 0 auto; min-height: 100vh; }
  </style>
</head>
<body>
  <div style="background: ${theme.headerBg}; padding: 24px 16px; text-align: center;">
    <h1 style="font-size: 24px; font-weight: 700; color: ${theme.accent}; margin: 0;">
      ${escapeHtml(menuData.restaurantName)}
    </h1>
  </div>
  ${menuData.showSpecialOffer && menuData.specialOffer ? `
    <div style="background: ${theme.accent}; color: ${theme.priceText}; padding: 10px 16px;
      text-align: center; font-weight: 600; font-size: 14px;">
      ⭐ ${escapeHtml(menuData.specialOffer)}
    </div>
  ` : ''}
  <div style="padding: 16px;">
    ${categoriesHTML}
  </div>
  <div style="text-align: center; padding: 16px; opacity: 0.5; font-size: 12px;">
    Powered by DoAide QRMenu
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

export function downloadHTML(menuData) {
  const html = generateMenuHTML(menuData);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${menuData.restaurantName.replace(/\s+/g, '_')}_menu.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadPDF(menuData) {
  const { default: jsPDF } = await import('jspdf');
  const theme = themes.find(t => t.id === menuData.themeId) || themes[0];

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
  }

  function checkPageBreak(needed) {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  }

  const bgColor = hexToRgb(theme.headerBg);
  doc.setFillColor(...bgColor);
  doc.rect(0, 0, pageWidth, 25, 'F');

  const accentColor = hexToRgb(theme.accent);
  doc.setTextColor(...accentColor);
  doc.setFontSize(20);
  doc.text(menuData.restaurantName, pageWidth / 2, 16, { align: 'center' });
  y = 30;

  if (menuData.showSpecialOffer && menuData.specialOffer) {
    doc.setFillColor(...accentColor);
    doc.rect(margin, y, contentWidth, 10, 'F');
    const priceColor = hexToRgb(theme.priceText);
    doc.setTextColor(...priceColor);
    doc.setFontSize(10);
    doc.text(`⭐ ${menuData.specialOffer}`, pageWidth / 2, y + 6.5, { align: 'center' });
    y += 15;
  }

  const textColor = hexToRgb(theme.text);

  for (const category of menuData.categories) {
    checkPageBreak(20);

    doc.setFillColor(...hexToRgb(theme.categoryBg));
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');
    doc.setTextColor(...accentColor);
    doc.setFontSize(13);
    doc.text(category.name, margin + 4, y + 5.5);
    y += 12;

    for (const item of category.items) {
      checkPageBreak(15);

      const vegColor = item.isVeg ? [34, 197, 94] : [239, 68, 68];
      doc.setDrawColor(...vegColor);
      doc.setFillColor(...vegColor);
      doc.rect(margin, y + 1, 3, 3, 'FD');

      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      const nameText = `${item.name}${item.spicyLevel > 0 ? ' ' + '🌶️'.repeat(item.spicyLevel) : ''}`;
      doc.text(nameText, margin + 6, y + 3.5);

      doc.setFillColor(...hexToRgb(theme.priceBg));
      const priceStr = `₹${item.price}`;
      const priceWidth = doc.getTextWidth(priceStr) + 6;
      doc.roundedRect(margin + contentWidth - priceWidth, y, priceWidth, 6, 1.5, 1.5, 'F');
      doc.setTextColor(...hexToRgb(theme.priceText));
      doc.setFontSize(9);
      doc.text(priceStr, margin + contentWidth - priceWidth + 3, y + 4);

      y += 6;

      if (item.description) {
        doc.setTextColor(...textColor);
        doc.setFontSize(8);
        const lines = doc.splitTextToSize(item.description, contentWidth - 10);
        doc.text(lines, margin + 6, y + 2);
        y += lines.length * 3.5;
      }

      y += 4;
    }

    y += 4;
  }

  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text('Powered by DoAide QRMenu', pageWidth / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });

  doc.save(`${menuData.restaurantName.replace(/\s+/g, '_')}_menu.pdf`);
}
