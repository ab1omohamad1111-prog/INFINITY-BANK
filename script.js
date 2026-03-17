// ==========================================
// 1. قائمة الأعضاء والأموال (إدارة البيانات)
// ==========================================
const members = {
    "levi":    { pin: "1001", balance: 50000, rank: "الإمبراطور" },
    "dororo":  { pin: "2423", balance: 12500, rank: "المؤسس" },
    "fang":    { pin: "8046", balance: 8500,  rank: "المستشار" },
    "amine":   { pin: "2026", balance: 15000, rank: "عضو نخبة" }
    "test":   { pin: "1111", balance: 10000000, rank: "عضو نخبة" }
    // تقدر تضيف أي عضو جديد هنا بنفس الطريقة
};

// ==========================================
// 2. محرك النظام (لا تغير شيء هنا إلا للضرورة)
// ==========================================
let currentUser = "";
const myWhatsApp = "212622201526";

function processLogin() {
    const user = document.getElementById("username").value.toLowerCase().trim();
    const pin = document.getElementById("userpin").value.trim();

    if (members[user] && members[user].pin === pin) {
        currentUser = user;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        updateUI();
        loadStore(); // تحميل المتجر عند الدخول
    } else {
        alert("🛡️ عذراً! الاسم أو الرمز غير صحيح.");
    }
}

function updateUI() {
    const data = members[currentUser];
    document.getElementById("display-name").innerText = currentUser.toUpperCase();
    document.getElementById("display-balance").innerText = data.balance.toLocaleString() + " INF";
    document.getElementById("display-rank").innerText = "الرتبة: " + data.rank;
}

function showTab(tab) {
    document.getElementById('tab-home').style.display = tab === 'home' ? 'block' : 'none';
    document.getElementById('tab-store').style.display = tab === 'store' ? 'block' : 'none';
    document.getElementById('btn-home').classList.toggle('active', tab === 'home');
    document.getElementById('btn-store').classList.toggle('active', tab === 'store');
}

function loadStore() {
    const storeGrid = document.getElementById('store-items');
    const items = [
        { name: "رتبة قائد ⚔️", price: 10000, desc: "صلاحيات إدارية كاملة" },
        { name: "بطاقة عفو 🎫", price: 5000, desc: "إلغاء عقوبة طرد واحدة" },
        { name: "تغيير اسم 🛡️", price: 2000, desc: "تغيير اسمك في القاعدة" }
    ];
    
    storeGrid.innerHTML = items.map(item => `
        <div class="item-card">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="price">${item.price.toLocaleString()} INF</span>
            <button class="buy-btn" onclick="buy('${item.name}', ${item.price})">طلب شراء</button>
        </div>
    `).join('');
}

function buy(item, price) {
    if (members[currentUser].balance < price) {
        alert("⚠️ رصيدك لا يكفي لشراء " + item);
        return;
    }
    const msg = `🛡️ طلب شراء جديد%0A👤 العضو: ${currentUser}%0A🎁 الغرض: ${item}%0A💰 السعر: ${price} INF`;
    window.open(`https://wa.me/${myWhatsApp}?text=${msg}`);
}
