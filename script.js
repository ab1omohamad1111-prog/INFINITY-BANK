// 1. قاعدة البيانات
const members = {
    "levi": { pin: "FFIGVPW3YZ", balance: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", balance: 1000, rank: "مؤسس" }
    "fang": { pin: "8046", balance: 1000, rank: "مستشار" }
};

let currentUser = "";
const myNumber = "212622201526"; // رقمك تم تثبيته هنا

// 2. دالة الدخول
function login() {
    const user = document.getElementById("username").value.toLowerCase();
    const pin = document.getElementById("userpin").value;

    if (members[user] && members[user].pin === pin) {
        currentUser = user;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        updateUI();
    } else {
        alert("🛡️ هوية غير معروفة!");
    }
}

// 3. تحديث الواجهة
function updateUI() {
    document.getElementById("display-name").innerText = currentUser.toUpperCase();
    document.getElementById("display-balance").innerText = members[currentUser].balance + " INF";
    document.getElementById("display-rank").innerText = "RANK: " + members[currentUser].rank;
}

// 4. تبديل الأقسام
function switchSection(name) {
    document.getElementById("section-home").style.display = name === 'home' ? 'block' : 'none';
    document.getElementById("section-store").style.display = name === 'store' ? 'block' : 'none';
    document.getElementById("page-title").innerText = name === 'home' ? "مرحباً بالقائد!" : "المتجر المالي";
}

// 5. الشراء عبر واتساب
function buy(item, price) {
    if (members[currentUser].balance < price) {
        alert("رصيدك غير كافٍ!");
        return;
    }
    const msg = `🛡️ طـلـب شـراء%0A👤 العضو: ${currentUser}%0A🎁 العنصر: ${item}%0A💰 السعر: ${price} INF`;
    window.open(`https://wa.me/${myNumber}?text=${msg}`);
}
