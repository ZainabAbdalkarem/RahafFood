// ===========================
// إضافة عنصر إلى السلة
// ===========================
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("تمت الإضافة إلى السلة!");
}

// ===========================
// تحميل الصفحة
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    // أزرار المنيو
    const addButtons = document.querySelectorAll(".add-to-cart-btn");

    addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement;
            const name = parent.querySelector(".item-name").textContent;
            const price = parent.querySelector(".item-price").textContent;

            const item = {
                name: name,
                price: Number(price)
            };

            addToCart(item);
        });
    });

    // تحميل السلة
    loadCartItems();

    // زر إتمام الطلب
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", completeOrder);
});

// ===========================
// عرض السلة
// ===========================
function loadCartItems() {
    const container = document.getElementById("cart-items-display");
    const emptyMsg = document.getElementById("empty-cart-msg");
    const totalPriceField = document.getElementById("cart-total-price-page");

    if (!container) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    container.innerHTML = ""; // تنظيف

    if (cart.length === 0) {
        emptyMsg.innerText = "السلة فارغة. عد إلى القائمة لإضافة عناصر!";
        totalPriceField.textContent = "0 ريال";
        return;
    }

    emptyMsg.innerText = "";

    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p>🍔 ${item.name}</p>
            <p>${item.price} ريال</p>
            <hr>
        `;

        container.appendChild(div);
        total += item.price;
    });

    totalPriceField.textContent = total + " ريال";
}

// ===========================
// إتمام الطلب (واتساب + تفريغ السلة)
// ===========================
function completeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    const confirmOrder = confirm("هل تريد إتمام الطلب؟");
    if (!confirmOrder) return;

    let message = "مرحبًا، أريد طلب:\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} (${item.price} ريال)\n`;
        total += item.price;
    });

    message += `\nالإجمالي: ${total} ريال`;

    // فتح واتساب
    const phone = "775989285";
    const url = `https://wa.me/967${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // تفريغ السلة
    localStorage.removeItem("cart");

    alert("تم إرسال الطلب بنجاح!");
    loadCartItems();
}