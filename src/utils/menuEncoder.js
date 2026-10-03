export function encodeMenuToHash(menuData) {
  const compressed = {
    n: menuData.restaurantName,
    t: menuData.themeId,
    s: menuData.showSpecialOffer ? menuData.specialOffer : '',
    c: menuData.categories.map(cat => ({
      n: cat.name,
      i: cat.items.map(item => ({
        n: item.name,
        p: item.price,
        d: item.description,
        v: item.isVeg ? 1 : 0,
        s: item.spicyLevel,
        m: item.imageUrl || '',
      })),
    })),
  };
  const json = JSON.stringify(compressed);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeMenuFromHash(hash) {
  try {
    const json = decodeURIComponent(escape(atob(hash)));
    const compressed = JSON.parse(json);
    return {
      restaurantName: compressed.n,
      themeId: compressed.t,
      specialOffer: compressed.s || '',
      showSpecialOffer: !!compressed.s,
      categories: compressed.c.map(cat => ({
        id: crypto.randomUUID(),
        name: cat.n,
        items: cat.i.map(item => ({
          id: crypto.randomUUID(),
          name: item.n,
          price: item.p,
          description: item.d,
          isVeg: !!item.v,
          spicyLevel: item.s,
          imageUrl: item.m || '',
        })),
      })),
    };
  } catch {
    return null;
  }
}

export function getShareableUrl(menuData) {
  const hash = encodeMenuToHash(menuData);
  return `${window.location.origin}${window.location.pathname}#menu=${hash}`;
}
