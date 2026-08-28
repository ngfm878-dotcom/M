// محصولات فروشگاه
const products = [
    {
        id: 1,
        name: "مانتو کلاسیک آبی",
        price: 890000,
        icon: "👗"
    },
    {
        id: 2,
        name: "مانتو اسپرت مشکی",
        price: 750000,
        icon: "🧥"
    },
    {
        id: 3,
        name: "مانتو تابستانی سفید",
        price: 680000,
        icon: "👚"
    },
    {
        id: 4,
        name: "مانتو مدرن آبی",
        price: 990000,
        icon: "🥻"
    }
];

let cart = [];

// انتخاب عناصر
const productsContainer = document.getElementById("productsContainer");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

// نمایش محصولات
function renderProducts() {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>

                <button
                    class="primary-btn add-btn"
                    onclick="addToCart(${product.id})">
                    افزودن به سبد خرید
                </button>
            </div>
        `;

        productsContainer.appendChild(div);
    });
}

// فرمت قیمت
function formatPrice(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

// اضافه کردن به سبد
function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    showToast("محصول به سبد خرید اضافه شد ✓");
}

// کم کردن محصول
function decreaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// افزایش محصول
function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
}

// حذف محصول
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

    showToast("محصول حذف شد");
}

// بروزرسانی سبد
function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = count.toLocaleString("fa-IR");

    renderCart();
}

// نمایش سبد
function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px">
                سبد خرید شما خالی است.
            </p>
        `;

        cartTotal.textContent = "۰ تومان";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div>${formatPrice(item.price)}</div>
            </div>

            <div class="cart-actions">

                <button onclick="decreaseQuantity(${item.id})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

                <button onclick="removeFromCart(${item.id})">
                    🗑️
                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = formatPrice(total);
}

// نمایش پیام
function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// باز کردن سبد
document.getElementById("cartBtn").addEventListener("click", () => {
    cartModal.classList.add("active");
});

// بستن سبد
document.getElementById("closeCart").addEventListener("click", () => {
    cartModal.classList.remove("active");
});

// ثبت خرید
document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {
        showToast("سبد خرید شما خالی است!");
        return;
    }

    cartModal.classList.remove("active");
    checkoutModal.classList.add("active");
});

// بستن فرم خرید
document.getElementById("closeCheckout").addEventListener("click", () => {
    checkoutModal.classList.remove("active");
});

// ثبت نهایی سفارش
document.getElementById("checkoutForm").addEventListener("submit", event => {

    event.preventDefault();

    checkoutModal.classList.remove("active");

    showToast("سفارش شما با موفقیت ثبت شد ✓");

    cart = [];

    updateCart();

    event.target.reset();
});

// فرم تماس
document.getElementById("contactForm").addEventListener("submit", event => {

    event.preventDefault();

    showToast("پیام شما با موفقیت ارسال شد ✓");

    event.target.reset();
});

// منوی موبایل
document.getElementById("menuBtn").addEventListener("click", () => {

    document.getElementById("navMenu")
        .classList.toggle("active");
});

// بستن مودال با کلیک بیرون
window.addEventListener("click", event => {

    if (event.target === cartModal) {
        cartModal.classList.remove("active");
    }

    if (event.target === checkoutModal) {
        checkoutModal.classList.remove("active");
    }
});

// اجرای اولیه
renderProducts();
updateCart();