// Product Data
const products = {
  nuts: [
    { id: 'cashew', name: 'Premium Cashew', image: 'c1.png' },
    { id: 'almond', name: 'California Almonds', image: 'b1.png' },
    { id: 'pista', name: 'Roasted Pista', image: 'p1.png' },
    { id: 'walnut', name: 'Kashmiri Walnut', image: 'w1.png' }
  ],
  seeds: [
    { id: 'pumpkin', name: 'Pumpkin Seeds', image: 'pum.png' },
    { id: 'chia', name: 'Chia Seeds', image: 'chia.png' },
    { id: 'sunflower', name: 'Sunflower Seeds', image: 'sun.png' },
    { id: 'flax', name: 'Flax Seeds', image: 'flex.png' }
  ],
  combos: [
    { id: 'mixed', name: 'Mixed Dry Fruits', image: 'nut.png' },
    { id: 'millet', name: 'Millet Combos', image: 'mill.png' },
    { id: 'seedcombo', name: 'Seeds Combos', image: 'seed.png' }
  ]
};

const defaultPrices = {
  cashew: { '50g': 50, '100g': 95, '250g': 230, '500g': 450, '1kg': 880 },
  almond: { '50g': 45, '100g': 85, '250g': 200, '500g': 390, '1kg': 750 },
  pista: { '50g': 60, '100g': 115, '250g': 280, '500g': 550, '1kg': 1050 },
  walnut: { '50g': 55, '100g': 105, '250g': 250, '500g': 490, '1kg': 950 },
  pumpkin: { '50g': 30, '100g': 55, '250g': 130, '500g': 250, '1kg': 480 },
  chia: { '50g': 35, '100g': 65, '250g': 150, '500g': 290, '1kg': 550 },
  sunflower: { '50g': 25, '100g': 45, '250g': 110, '500g': 210, '1kg': 400 },
  flax: { '50g': 20, '100g': 35, '250g': 80, '500g': 150, '1kg': 280 },
  mixed: { '50g': 65, '100g': 120, '250g': 290, '500g': 570, '1kg': 1100 },
  millet: { '50g': 40, '100g': 75, '250g': 180, '500g': 350, '1kg': 680 },
  seedcombo: { '50g': 45, '100g': 85, '250g': 200, '500g': 390, '1kg': 750 }
};

// Initialize app
function initApp() {
  if (!localStorage.getItem('prices')) {
    localStorage.setItem('prices', JSON.stringify(defaultPrices));
  }
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  updateCartCount();
}

// Cart operations
function getCart() {
  return JSON.parse(localStorage.getItem('cart'));
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.innerText = cart.length;
  }
}

function addToCart(item) {
  const cart = getCart();
  // item should be { id, name, weight, price, image }
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} (${item.weight}) added to cart!`);
}

function getPrices() {
  return JSON.parse(localStorage.getItem('prices'));
}

// Get product details by ID
function getProductById(id) {
  for (const cat in products) {
    const found = products[cat].find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

// Run init on load
window.addEventListener('DOMContentLoaded', initApp);
