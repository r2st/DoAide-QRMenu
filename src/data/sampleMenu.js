export function createSampleMenu(lang = 'en') {
  const isHindi = lang === 'hi';
  return {
    restaurantName: isHindi ? 'मेरा रेस्तरां' : 'My Restaurant',
    themeId: 'elegant',
    specialOffer: isHindi ? 'आज का विशेष: सभी स्टार्टर्स पर 20% छूट!' : "Today's Special: 20% off on all starters!",
    showSpecialOffer: false,
    categories: [
      {
        id: crypto.randomUUID(),
        name: isHindi ? 'स्टार्टर्स' : 'Starters',
        items: [
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'पनीर टिक्का' : 'Paneer Tikka',
            price: 249,
            description: isHindi ? 'मसालेदार पनीर तंदूर में भुना हुआ' : 'Spiced cottage cheese grilled in tandoor',
            isVeg: true,
            spicyLevel: 1,
            imageUrl: '',
          },
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'चिकन 65' : 'Chicken 65',
            price: 299,
            description: isHindi ? 'दक्षिण भारतीय शैली का तला हुआ चिकन' : 'South Indian style spicy fried chicken',
            isVeg: false,
            spicyLevel: 2,
            imageUrl: '',
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: isHindi ? 'मुख्य व्यंजन' : 'Main Course',
        items: [
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'दाल मखनी' : 'Dal Makhani',
            price: 199,
            description: isHindi ? 'मक्खन और क्रीम के साथ काली दाल' : 'Black lentils simmered with butter and cream',
            isVeg: true,
            spicyLevel: 0,
            imageUrl: '',
          },
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'बटर चिकन' : 'Butter Chicken',
            price: 349,
            description: isHindi ? 'मलाईदार टमाटर की ग्रेवी में चिकन' : 'Chicken in rich creamy tomato gravy',
            isVeg: false,
            spicyLevel: 1,
            imageUrl: '',
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: isHindi ? 'मिठाइयाँ' : 'Desserts',
        items: [
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'गुलाब जामुन' : 'Gulab Jamun',
            price: 99,
            description: isHindi ? 'चीनी की चाशनी में गुलाब जामुन' : 'Deep-fried milk dumplings in sugar syrup',
            isVeg: true,
            spicyLevel: 0,
            imageUrl: '',
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: isHindi ? 'पेय' : 'Drinks',
        items: [
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'मसाला चाय' : 'Masala Chai',
            price: 49,
            description: isHindi ? 'भारतीय मसालों वाली चाय' : 'Indian spiced tea',
            isVeg: true,
            spicyLevel: 0,
            imageUrl: '',
          },
          {
            id: crypto.randomUUID(),
            name: isHindi ? 'मैंगो लस्सी' : 'Mango Lassi',
            price: 79,
            description: isHindi ? 'आम और दही का ठंडा पेय' : 'Refreshing mango yogurt drink',
            isVeg: true,
            spicyLevel: 0,
            imageUrl: '',
          },
        ],
      },
    ],
  };
}
