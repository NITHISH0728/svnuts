// Product Data
const defaultProducts = {
  nuts: [
    { id: 'cashew', name: 'Cashew Full W320', image: 'c1.png' },
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

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;

const defaultPrices = {
  cashew: { '50g': 50, '100g': 100, '250g': 250, '500g': 500, '1kg': 1000 },
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
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
  updateCartCount();
  setupAutoScroll();
}

// Global context menu protection for images
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG' && e.target.classList.contains('no-download')) {
    e.preventDefault();
  }
});

// Cart operations
function getCart() {
  return JSON.parse(localStorage.getItem('cart'));
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.qty);
    countEl.innerText = totalItems;
  }
}

function addToCart(item, qty = 1, skipNotification = false) {
  const cart = getCart();
  // Check if item with same id and weight already exists
  const existing = cart.find(i => i.id === item.id && i.weight === item.weight);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty: qty });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  if (!skipNotification) {
    showNotification(item, qty);
  }
}

function showNotification(item, qty) {
  let panel = document.getElementById('notification-panel');
  if (!panel) {
    // Create the panel if it doesn't exist
    panel = document.createElement('div');
    panel.id = 'notification-panel';
    panel.className = 'notification-panel';
    document.body.appendChild(panel);
  }

  const cart = getCart();
  let totalItems = 0;
  cart.forEach(i => totalItems += i.qty);

  panel.innerHTML = `
    <div class="notif-header">
      <span>
        <svg class="icon-svg" style="fill:#1da851;" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        Item added to your cart
      </span>
      <button class="close-notif" onclick="closeNotification()">✕</button>
    </div>
    <div class="notif-item">
      <img src="${item.image}" alt="${item.name}" class="no-download">
      <div>
        <p>${item.name} - ${item.weight}</p>
        <p>Rs. ${item.price}</p>
      </div>
    </div>
    <div class="notif-actions">
      <a href="checkout.html" class="btn-outline">View cart (${totalItems})</a>
      <a href="checkout.html" class="btn-solid">Check out</a>
      <a href="javascript:void(0)" class="continue-link" onclick="closeNotification()">Continue shopping</a>
    </div>
  `;

  // Show panel
  setTimeout(() => {
    panel.classList.add('show');
  }, 10);
}

function closeNotification() {
  const panel = document.getElementById('notification-panel');
  if (panel) {
    panel.classList.remove('show');
  }
}

function getPrices() {
  return JSON.parse(localStorage.getItem('prices'));
}

function getProductById(id) {
  for (const cat in products) {
    const found = products[cat].find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

// Auto-scroll logic for slider
function setupAutoScroll() {
  const slider = document.querySelector('.circular-slider');
  if (!slider) return;
  
  let scrollAmount = 0;
  const step = 1;
  const speed = 30; // ms
  
  function scroll() {
    if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
      slider.scrollLeft = 0;
    } else {
      slider.scrollLeft += step;
    }
  }
  
  let interval = setInterval(scroll, speed);
  
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => interval = setInterval(scroll, speed));
}

// Run init on load
window.addEventListener('DOMContentLoaded', initApp);
