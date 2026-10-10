export type MenuCategory = 'food' | 'drink';

export type MenuSection =
  | 'starter'
  | 'western'
  | 'add-on western'
  | 'pasta'
  | 'signature pasta'
  | 'asian'
  | 'add-on asian'
  | 'pizza'
  | 'coffee'
  | 'signature drinks'
  | 'refreshments';

export type MenuItem = {
  id: string;
  category: MenuCategory;
  section: MenuSection;
  name: string;
  description: string;
  price: number;
};

export const menu: MenuItem[] = [
  { id: 'chicken-skin-ekado', category: 'food', section: 'starter', name: 'CHICKEN SKIN EKADO', description: 'Chicken skin with ground chicken filling.', price: 50000 },
  { id: 'crispy-baby-calamari', category: 'food', section: 'starter', name: 'CRISPY BABY CALAMARI', description: 'Fried crispy calamari, tartar sauce, togarashi, spring onion, and lemon.', price: 54000 },
  { id: 'crispy-herbs-chicken-wing', category: 'food', section: 'starter', name: 'CRISPY HERBS CHICKEN WING', description: 'Chicken wings, lemon herb coating, and tartar sauce.', price: 55000 },
  { id: 'popcorn-chicken', category: 'food', section: 'starter', name: 'POPCORN CHICKEN', description: 'Crispy chicken tight, herbs, basil, sriracha sauce.', price: 55000 },
  { id: 'mushroom-melt-sourdough', category: 'food', section: 'starter', name: 'MUSHROOM MELT SOURDOUGH', description: 'Grilled sandwich stuffed with champignon mushroom, mozzarela, red cheddarr and bacon jam (served with potato chips).', price: 75000 },
  { id: 'nashville-chicken-burger', category: 'food', section: 'western', name: 'NASHVILLE CHICKEN BURGER', description: 'Spicy fried chicken, brioche bun, pickles, fresh romaine, slice tomato, ranch dressing, butter Nasvhile sauce and French fries.', price: 65000 },
  { id: 'chicken-confit', category: 'food', section: 'western', name: 'CHICKEN CONFIT', description: 'Chicken leg, baby potatoes, caramelized onions, and chicken gravy sauce.', price: 70000 },
  { id: 'grilled-peri-peri-chicken', category: 'food', section: 'western', name: 'GRILLED PERI PERI CHICKEN', description: 'Grilled chicken, peri-peri dressing, mixed salad, and French fries.', price: 85000 },
  { id: 'classic-beef-burger', category: 'food', section: 'western', name: 'CLASSIC BEEF BURGER', description: 'Ground beef, brioche bun, pickles, fresh romaine, sliced tomato, aioli dressing, mixed salad, and French fries.', price: 99000 },
  { id: 'african-chicken', category: 'food', section: 'western', name: 'AFRICAN CHICKEN', description: 'Half grilled chicken, green sauce, fried banana, choice of French fries or steamed rice.', price: 99000 },
  { id: 'chicken-crispy-butter-milk-half', category: 'food', section: 'western', name: 'CHICKEN CRISPY BUTTER MILK — Half', description: 'Half a chicken marinated in buttermilk, then fried until crispy.', price: 89000 },
  { id: 'mixed-salad', category: 'food', section: 'add-on western', name: 'MIXED SALAD', description: '', price: 20000 },
  { id: 'mashed-potato-western', category: 'food', section: 'add-on western', name: 'MASHED POTATO', description: '', price: 25000 },
  { id: 'creamy-spinach', category: 'food', section: 'add-on western', name: 'CREAMY SPINACH', description: '', price: 30000 },
  { id: 'french-fries', category: 'food', section: 'add-on western', name: 'FRENCH FRIES', description: '', price: 30000 },
  { id: 'red-spaghetti-prawn-aglio-olio', category: 'food', section: 'pasta', name: 'RED SPAGHETTI PRAWN AGLIO OLIO', description: 'Spaghetti pasta, prawns, butter Cajun sauce, cherry tomatoes, and Parmesan cheese.', price: 69000 },
  { id: 'spaghetti-prawn-nori-mentaiko', category: 'food', section: 'pasta', name: 'SPAGHETTI PRAWN NORI MENTAIKO', description: 'Spaghetti pasta, prawns, mentai sauce, tobiko, nori wakame.', price: 79000 },
  { id: 'house-baked-lasagna', category: 'food', section: 'pasta', name: 'HOUSE BAKED LASAGNA', description: 'Lasagna pasta, bolognaise sauce, bechamel sauce, mix salad and pesto dressing.', price: 85000 },
  { id: 'creamy-penne-butter-chicken-pasta', category: 'food', section: 'pasta', name: 'CREAMY PENNE & BUTTER CHICKEN PASTA', description: 'Penne with butter chicken sauce, grilled chicken, oyster mushroom, cherry tomatoes, pickled onion, and Grana Padano.', price: 89000 },
  { id: 'brown-butter-chicken-breast-fettuccine', category: 'food', section: 'pasta', name: 'BROWN BUTTER CHICKEN BREAST FETTUCCINE', description: 'Brown butter sauce, garlic, shallot, fettuccine, herbs chicken breast and Grana Padano.', price: 89000 },
  { id: 'tagilatelle-bolognese', category: 'food', section: 'pasta', name: 'TAGILATELLE BOLOGNESE', description: 'Fresh made tagliatelle pasta, beef ragù, Grana Padano.', price: 90000 },
  { id: 'spaghetti-pesto-salmon', category: 'food', section: 'pasta', name: 'SPAGHETTI PESTO SALMON', description: 'Salmon slices, spaghetti pasta, pesto dressing, Parmesan cheese, and red sorrel.', price: 110000 },
  { id: 'butter-bacon-fettuccine', category: 'food', section: 'signature pasta', name: 'BUTTER BACON FETTUCCINE', description: 'Butter sauce, fettuccine, slice homemade beef bacon.', price: 75000 },
  { id: 'buccatini-chicken-breast-alfredo', category: 'food', section: 'signature pasta', name: 'BUCCATINI CHICKEN BREAST ALFREDO', description: 'Seared chicken breast, buccatini pasta and Alfredo sauce.', price: 85000 },
  { id: 'spaghetti-carbonara-bacon', category: 'food', section: 'signature pasta', name: 'SPAGHETTI CARBONARA BACON', description: 'Cured egg yolk, carbonara sauce, beef bacon.', price: 110000 },
  { id: 'sate-ayam-maranggi', category: 'food', section: 'asian', name: 'SATE AYAM MARANGGI', description: 'Marinated chicken satay, mixed salad, steamed rice, sambal dabu-dabu, and sambal maranggi.', price: 59000 },
  { id: 'sei-sapi-sambal-matah', category: 'food', section: 'asian', name: 'SEI SAPI SAMBAL MATAH', description: 'Sei sapi, potato chips, pakchoy, and sambal matah.', price: 69000 },
  { id: 'tongseng-sate-sengkel', category: 'food', section: 'asian', name: 'TONGSENG SATE SENGKEL', description: 'Beef shank satay, beef stock, vegetables, steamed rice, melinjo crackers, and sambal.', price: 74000 },
  { id: 'nasi-goreng-udang-special', category: 'food', section: 'asian', name: 'NASI GORENG UDANG SPECIAL', description: 'Fried rice, vannamei prawns, sunny-side-up egg, sate lilit, sambal merah, pickles, and crackers.', price: 78000 },
  { id: 'hainan-chicken-rice', category: 'food', section: 'asian', name: 'HAINAN CHICKEN RICE', description: 'Aromatic rice, Hainanese chicken, char siu chicken, chicken stock, pickles, and sambal.', price: 85000 },
  { id: 'nasi-goreng-buntut-cabe-ijo', category: 'food', section: 'asian', name: 'NASI GORENG BUNTUT CABE IJO', description: 'Beef oxtail, sambal hijau, sunny-side-up egg, and melinjo crackers.', price: 98000 },
  { id: 'nasi-campur-bali', category: 'food', section: 'asian', name: 'NASI CAMPUR BALI', description: 'Lime leaf rice, telur balado, chicken genep, sate lilit, vegetable urab, crackers, and sambal matah.', price: 85000 },
  { id: 'potato-chips', category: 'food', section: 'add-on asian', name: 'POTATO CHIPS', description: '', price: 25000 },
  { id: 'mashed-potato-asian', category: 'food', section: 'add-on asian', name: 'MASHED POTATO', description: '', price: 25000 },
  { id: 'classic-margherita', category: 'food', section: 'pizza', name: 'CLASSIC MARGHERITA', description: 'Tomato sauce, basil, Grana Padano.', price: 80000 },
  { id: 'chicken-diavola', category: 'food', section: 'pizza', name: 'CHICKEN DIAVOLA', description: 'Chipotle mayo, chicken, caramelized onion.', price: 110000 },
  { id: 'americano', category: 'drink', section: 'coffee', name: 'AMERICANO', description: 'Pilihan: Honey / Peach / Orange.', price: 32000 },
  { id: 'espresso-tonic', category: 'drink', section: 'coffee', name: 'ESPRESSO TONIC', description: '', price: 32000 },
  { id: 'black-coffee', category: 'drink', section: 'coffee', name: 'BLACK COFFEE', description: 'Pilihan: Espresso / Long Black.', price: 32000 },
  { id: 'pok-ka-green-tea', category: 'drink', section: 'refreshments', name: 'POKKA GREEN TEA', description: '', price: 30000 },
  { id: 'white-coffee', category: 'drink', section: 'coffee', name: 'WHITE COFFEE', description: 'Pilihan: Cappuccino / Latte / Flat White.', price: 36000 },
  { id: 'flavored-latte', category: 'drink', section: 'coffee', name: 'FLAVORED LATTE', description: 'Pilihan: Sea Salt / Butterscotch / Salted Caramel.', price: 38000 },
  { id: 'matcha-yuzu', category: 'drink', section: 'signature drinks', name: 'MATCHA YUZU', description: '', price: 37000 },
  { id: 'sparkling-earl-grey', category: 'drink', section: 'signature drinks', name: 'SPARKLING EARL GREY', description: '', price: 38000 },
  { id: 'ceremonial-matcha-strawberry', category: 'drink', section: 'signature drinks', name: 'CEREMONIAL MATCHA STRAWBERRY', description: '', price: 39000 },
  { id: 'ceremonial-matcha-coconut', category: 'drink', section: 'signature drinks', name: 'CEREMONIAL MATCHA COCONUT', description: '', price: 39000 },
  { id: 'dirty-latte', category: 'drink', section: 'signature drinks', name: 'DIRTY LATTE', description: '', price: 39000 },
  { id: 'apple-pie-hojicha', category: 'drink', section: 'signature drinks', name: 'APPLE PIE HOJICHA', description: '', price: 39000 },
  { id: 'matcha-espresso-latte', category: 'drink', section: 'signature drinks', name: 'MATCHA ESPRESSO LATTE', description: '', price: 39000 },
  { id: 'ceremonial-matcha-latte', category: 'drink', section: 'signature drinks', name: 'CEREMONIAL MATCHA LATTE', description: '', price: 39000 },
  { id: 'honey-lemon-sole', category: 'drink', section: 'signature drinks', name: 'HONEY LEMON SOLE', description: '', price: 40000 },
  { id: 'amore-guava-soda', category: 'drink', section: 'signature drinks', name: 'AMORE GUAVA SODA', description: '', price: 40000 },
  { id: 'mont-blanc', category: 'drink', section: 'signature drinks', name: 'MONT BLANC', description: '', price: 45000 },
  { id: 'klepon-latte', category: 'drink', section: 'signature drinks', name: 'KLEPON LATTE', description: '', price: 45000 },
  { id: 'hot-tea', category: 'drink', section: 'refreshments', name: 'HOT TEA', description: 'Pilihan: Chamomile / Earl Grey / Mint / Black.', price: 26000 },
  { id: 'iced-tea', category: 'drink', section: 'refreshments', name: 'ICED TEA', description: 'Pilihan: Original / Lychee / Peach / Lemon.', price: 29000 },
  { id: 'soft-drink', category: 'drink', section: 'refreshments', name: 'SOFT DRINK', description: 'Pilihan: Coke / Coke Zero / Sprite / Tonic Water.', price: 30000 },
  { id: 'cleo-glass-330ml', category: 'drink', section: 'refreshments', name: 'CLEO GLASS (330ml)', description: '', price: 30000 },
  { id: 'thai-tea', category: 'drink', section: 'refreshments', name: 'THAI TEA', description: '', price: 32000 },
  { id: 'golden-jasmine-tea', category: 'drink', section: 'refreshments', name: 'GOLDEN JASMINE TEA', description: '', price: 32000 },
  { id: 'equil-mineral-water-380ml', category: 'drink', section: 'refreshments', name: 'EQUIL MINERAL WATER (380ml)', description: 'Pilihan: Still / Sparkling.', price: 35000 },
  { id: 'earl-grey-milk-tea', category: 'drink', section: 'refreshments', name: 'EARL GREY MILK TEA', description: '', price: 35000 },
  { id: 'lychee-chamomile', category: 'drink', section: 'refreshments', name: 'LYCHEE CHAMOMILE', description: '', price: 35000 },
  { id: 'pineapple-lemon-spice', category: 'drink', section: 'refreshments', name: 'PINEAPPLE LEMON SPICE', description: '', price: 35000 },
  { id: 'fresh-juice', category: 'drink', section: 'refreshments', name: 'FRESH JUICE', description: 'Pilihan: Watermelon / Honeydew / Strawberry / Avocado / Orange / Vegetables.', price: 36000 },
  { id: 'chocolate', category: 'drink', section: 'refreshments', name: 'CHOCOLATE', description: '', price: 36000 },
  { id: 'milkshakes', category: 'drink', section: 'refreshments', name: 'MILKSHAKES', description: 'Pilihan: Chocolate / Strawberry / Vanilla.', price: 39000 },
  { id: 'cookies-cream', category: 'drink', section: 'refreshments', name: 'COOKIES & CREAM', description: '', price: 39000 },
  { id: 'minty-sparkling-apple', category: 'drink', section: 'refreshments', name: 'MINTY SPARKLING APPLE', description: '', price: 40000 },
  { id: 'red-bull', category: 'drink', section: 'refreshments', name: 'RED BULL', description: '', price: 40000 },
  { id: 'smoothies', category: 'drink', section: 'refreshments', name: 'SMOOTHIES', description: 'Pilihan: Banana / Mango / Berry.', price: 48000 },
  { id: 'equil-still-mineral-water-760ml', category: 'drink', section: 'refreshments', name: 'EQUIL STILL MINERAL WATER (760ml)', description: '', price: 50000 },
];
