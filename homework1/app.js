const products = [
    { id: 'notebook', name: 'Sổ bìa vải', price: 79000, category: 'Sổ & giấy', image: 'notebook' },
    { id: 'sticky-notes', name: 'Giấy ghi chú pastel', price: 29000, category: 'Sổ & giấy', image: 'sticky-notes' },
    { id: 'fountain-pen', name: 'Bút máy xanh rêu', price: 129000, category: 'Bút viết', image: 'fountain-pen' },
    { id: 'highlighters', name: 'Bộ ba bút dạ quang', price: 59000, category: 'Bút viết', image: 'highlighters' },
    { id: 'scissors', name: 'Kéo thủ công', price: 49000, category: 'Phụ kiện', image: 'scissors' },
    { id: 'binder-clips', name: 'Kẹp giấy màu vàng', price: 35000, category: 'Phụ kiện', image: 'binder-clips' },
];

const STORAGE_KEY = 'lab03-cart';
const ALL_CATEGORIES = 'Tất cả';
const filters = document.querySelector('#category-filters');
const search = document.querySelector('#product-search');
const grid = document.querySelector('#product-grid');
const emptyResults = document.querySelector('#empty-results');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const clearCart = document.querySelector('#clear-cart');

let activeCategory = ALL_CATEGORIES;
let cart = loadCart();

function loadCart() {
    let savedCart;

    try {
        savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        return {};
    }

    const restoredCart = {};
    for (const { id } of products) {
        const quantity = savedCart?.[id];
        if (Number.isSafeInteger(quantity) && quantity > 0) {
            restoredCart[id] = quantity;
        }
    }
    return restoredCart;
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function renderCart() {
    let count = 0;
    let total = 0;

    for (const { id, price } of products) {
        const quantity = cart[id] ?? 0;
        count += quantity;
        total += quantity * price;
    }

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
    clearCart.disabled = count === 0;
}

function renderProducts() {
    const query = search.value.trim().toLocaleLowerCase('vi-VN');
    const visibleProducts = products.filter(product => {
        const matchesCategory = activeCategory === ALL_CATEGORIES || product.category === activeCategory;
        return matchesCategory && product.name.toLocaleLowerCase('vi-VN').includes(query);
    });

    // The cards use only the fixed catalog data above.
    grid.innerHTML = visibleProducts.map(product => `
        <article class="product-card" data-id="${product.id}">
            <div class="product-photo ${product.image}">
                <img src="./images/stationery.jpg" alt="" width="1536" height="1024">
            </div>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <h2>${product.name}</h2>
                <div class="product-actions">
                    <strong>${formatPrice(product.price)}</strong>
                    <button type="button" aria-label="Thêm ${product.name} vào giỏ">
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    emptyResults.hidden = visibleProducts.length > 0;
}

function updateFilters() {
    for (const button of filters.querySelectorAll('button')) {
        const selected = button.dataset.category === activeCategory;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', selected);
    }
}

const categories = [ALL_CATEGORIES, ...new Set(products.map(product => product.category))];
for (const category of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.category = category;
    button.textContent = category;
    filters.append(button);
}

filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;

    activeCategory = button.dataset.category;
    updateFilters();
    renderProducts();
});

search.addEventListener('input', renderProducts);

grid.addEventListener('click', event => {
    if (!event.target.closest('button')) return;

    const card = event.target.closest('.product-card');
    if (!card) return;

    const { id } = card.dataset;
    cart[id] = (cart[id] ?? 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
});

clearCart.addEventListener('click', () => {
    cart = {};
    localStorage.removeItem(STORAGE_KEY);
    renderCart();
});

updateFilters();
renderProducts();
renderCart();
