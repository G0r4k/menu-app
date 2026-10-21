import { MenuCategory, MenuItem, RestaurantInfo } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const restaurantMenus: Record<string, MenuCategory[]> = {
  restaurant: [
    {
      id: generateId(),
      name: 'Entradas',
      icon: '🥗',
      items: [
        { id: generateId(), name: 'Carpaccio de Res', description: 'Finas láminas de res con rúcula, parmesano y vinagreta de limón', price: '$4.500', badge: 'Popular' },
        { id: generateId(), name: 'Bruschetta Mediterránea', description: 'Pan artesanal con tomates confitados, albahaca fresca y mozzarella di bufala', price: '$3.800' },
        { id: generateId(), name: 'Tartar de Salmón', description: 'Salmón fresco cortado a cuchillo con aguacate, sésamo y salsa ponzu', price: '$5.200', badge: 'Chef' },
        { id: generateId(), name: 'Burrata con Prosciutto', description: 'Burrata cremosa con jamón de Parma, higos frescos y reducción de balsámico', price: '$5.800' },
      ],
    },
    {
      id: generateId(),
      name: 'Platos Principales',
      icon: '🍽️',
      items: [
        { id: generateId(), name: 'Ojo de Bife Angus', description: '350g de carne premium con puré trufado, espárragos grillados y salsa de vino tinto', price: '$12.500', badge: 'Signature' },
        { id: generateId(), name: 'Risotto de Hongos', description: 'Arroz carnaroli con mix de hongos silvestres, parmesano y aceite de trufa negra', price: '$8.900' },
        { id: generateId(), name: 'Salmón en Costra de Hierbas', description: 'Filet de salmón con costra de hierbas provenzales, quinoa y beurre blanc', price: '$9.800', badge: 'Nuevo' },
        { id: generateId(), name: 'Ravioles de Langosta', description: 'Pasta fresca rellena de langosta con salsa rosa y caviar de tobiko', price: '$14.200' },
      ],
    },
    {
      id: generateId(),
      name: 'Postres',
      icon: '🍰',
      items: [
        { id: generateId(), name: 'Fondant de Chocolate', description: 'Coulant de chocolate belga 70% con helado de vainilla de Madagascar', price: '$4.200', badge: 'Favorito' },
        { id: generateId(), name: 'Tiramisú Clásico', description: 'Receta tradicional italiana con mascarpone, café espresso y cacao', price: '$3.900' },
        { id: generateId(), name: 'Crème Brûlée', description: 'Crema de vainilla con costra de caramelo y frutos rojos frescos', price: '$3.500' },
      ],
    },
  ],
  bar: [
    {
      id: generateId(),
      name: 'Cócteles Clásicos',
      icon: '🍸',
      items: [
        { id: generateId(), name: 'Old Fashioned', description: 'Bourbon, angostura, azúcar y twist de naranja ahumada', price: '$4.800', badge: 'Clásico' },
        { id: generateId(), name: 'Negroni', description: 'Gin, Campari y vermut rojo con piel de naranja', price: '$4.500' },
        { id: generateId(), name: 'Mojito Premium', description: 'Ron añejo, hierbabuena fresca, lima, soda y un toque de chartreuse', price: '$4.200', badge: 'Popular' },
        { id: generateId(), name: 'Espresso Martini', description: 'Vodka, licor de café, espresso doble y espuma cremosa', price: '$5.200', badge: 'Trending' },
      ],
    },
    {
      id: generateId(),
      name: 'Cócteles de Autor',
      icon: '🧪',
      items: [
        { id: generateId(), name: 'Jardín Secreto', description: 'Gin de pepino, elderflower, albahaca, lima y tónica premium', price: '$5.800', badge: 'Signature' },
        { id: generateId(), name: 'Humo & Miel', description: 'Mezcal ahumado, miel de azahar, limón y sal de gusano', price: '$6.200' },
        { id: generateId(), name: 'Tropical Noir', description: 'Ron oscuro, maracuyá, ginger beer, angostura y espuma de coco', price: '$5.500', badge: 'Nuevo' },
        { id: generateId(), name: 'Sakura Spritz', description: 'Sake premium, licor de flor de cerezo, prosecco y soda', price: '$6.800' },
      ],
    },
    {
      id: generateId(),
      name: 'Cervezas Artesanales',
      icon: '🍺',
      items: [
        { id: generateId(), name: 'IPA Citra', description: 'Lúpulo Citra, notas cítricas y tropicales. IBU 65', price: '$3.200' },
        { id: generateId(), name: 'Stout Imperial', description: 'Cuerpo robusto con notas de café y chocolate. 9% ABV', price: '$3.800', badge: 'Fuerte' },
        { id: generateId(), name: 'Sour de Frutos Rojos', description: 'Ácida y refrescante con frambuesa, arándano y cereza', price: '$3.500' },
      ],
    },
  ],
  club: [
    {
      id: generateId(),
      name: 'Botellas Premium',
      icon: '🍾',
      items: [
        { id: generateId(), name: 'Moët & Chandon Imperial', description: 'Champagne Brut | 750ml', price: '$45.000', badge: 'Top' },
        { id: generateId(), name: 'Dom Pérignon Vintage', description: 'Champagne Millésime | 750ml', price: '$120.000', badge: 'VIP' },
        { id: generateId(), name: 'Grey Goose', description: 'Vodka Premium | 700ml', price: '$38.000' },
        { id: generateId(), name: 'Johnnie Walker Blue', description: 'Whisky Blended | 750ml', price: '$95.000', badge: 'Exclusive' },
        { id: generateId(), name: 'Hennessy X.O', description: 'Cognac | 700ml', price: '$85.000' },
      ],
    },
    {
      id: generateId(),
      name: 'Combos Noche',
      icon: '🎉',
      items: [
        { id: generateId(), name: 'Combo VIP', description: 'Botella premium + 4 mezcladores + hielo + frutillas', price: '$55.000', badge: '🔥 Hot' },
        { id: generateId(), name: 'Combo Gold', description: '2 Botellas + 6 mezcladores + hielo premium + snacks', price: '$85.000', badge: '⭐ Best' },
        { id: generateId(), name: 'Combo Ultra', description: '3 Botellas + mesa VIP + servicio prioritario + snacks premium', price: '$150.000', badge: '💎 Ultra' },
      ],
    },
    {
      id: generateId(),
      name: 'Tragos',
      icon: '🥃',
      items: [
        { id: generateId(), name: 'Jagger Bomb', description: 'Jägermeister + Red Bull', price: '$4.500', badge: 'Popular' },
        { id: generateId(), name: 'Gin Tonic Premium', description: 'Gin + tónica + botánicos frescos', price: '$5.200' },
        { id: generateId(), name: 'Whisky Cola', description: 'Whisky + Coca-Cola + hielo', price: '$4.800' },
        { id: generateId(), name: 'Vodka Energy', description: 'Vodka + Red Bull + lima', price: '$4.500' },
        { id: generateId(), name: 'Tequila Sunrise', description: 'Tequila + jugo de naranja + granadina', price: '$4.200' },
      ],
    },
  ],
};

const restaurantTaglines: Record<string, string[]> = {
  restaurant: [
    'Una experiencia gastronómica única',
    'Sabores que cuentan historias',
    'Donde la tradición encuentra la innovación',
    'Alta cocina, alma artesanal',
  ],
  bar: [
    'Cócteles de autor en un ambiente único',
    'El arte de la coctelería',
    'Mixología de vanguardia',
    'Donde cada trago es una experiencia',
  ],
  club: [
    'La noche es nuestra',
    'Viví la noche como nunca',
    'Tu noche, tus reglas',
    'Donde la música nunca para',
  ],
};

export function generateAIMenu(info: RestaurantInfo): MenuCategory[] {
  const baseMenu = restaurantMenus[info.type] || restaurantMenus.restaurant;
  
  // Deep clone to avoid mutations
  const menu = JSON.parse(JSON.stringify(baseMenu)) as MenuCategory[];
  
  // Regenerate IDs
  menu.forEach(category => {
    category.id = generateId();
    category.items.forEach(item => {
      item.id = generateId();
    });
  });
  
  return menu;
}

export function generateTagline(type: 'restaurant' | 'bar' | 'club'): string {
  const taglines = restaurantTaglines[type];
  return taglines[Math.floor(Math.random() * taglines.length)];
}

export function generateRestaurantName(type: 'restaurant' | 'bar' | 'club'): string {
  const names = {
    restaurant: ['La Maison', 'Olivo & Sal', 'Umami', 'Terraza Sur', 'Fuego & Tierra', 'Botánico'],
    bar: ['The Alchemist', 'Luna Bar', 'Spectro', 'Velvet', 'El Refugio', 'Noir'],
    club: ['NEON', 'PULSE', 'AURORA', 'ECLIPSE', 'ZENITH', 'PRISMA'],
  };
  const list = names[type];
  return list[Math.floor(Math.random() * list.length)];
}
