document.getElementById("sendBtn").addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
        alert("❗ يرجى تعبئة جميع الحقول قبل الإرسال");
        return;
    }

    let finalMsg = `اقتراح جديد:\n\nالاسم: ${name}\nالاقتراح:\n${message}`;
    
    const phone = "775989285";  // رقمكم
    const url = `https://wa.me/967${phone}?text=${encodeURIComponent(finalMsg)}`;

    window.open(url, "_blank");

    alert("✔️ تم إرسال اقتراحك. شكرًا لمشاركتك!");
});