// 1. قاعدة بيانات الأعضاء
const members = {
    "levi":    { pin: "1001", balance: 50000, rank: "الإمبراطور" },
    "amine":   { pin: "2026", balance: 15000, rank: "مستشار" },
    "dororo":  { pin: "2423", balance: 10000, rank: "مؤسس" },
    "fang":    { pin: "8046", balance: 5000,  rank: "نخبة" }
};

// 2. محرك النظام
let currentUser = "";
const myWhatsApp = "212622201526";

function processLogin() {
    const userField = document.getElementById("username");
    const pinField = document.getElementById("userpin");

    const user = userField.value.toLowerCase().trim();
    const pin = pinField.value.trim();

    if (members[user] && members[user].pin === pin) {
        currentUser = user;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        updateUI();
        loadStore();
    } else {
        alert("🛡️ عذراً! الهوية غير مطابقة لسجلاتنا.");
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
            <p style="font-size:0.8rem; opacity:0.7;">${item.desc}</p>
            <span style="color:#00ffcc; display:block; margin:10px 0; font-family:Orbitron;">${item.price.toLocaleString()} INF</span>
            <button class="main-btn" style="padding:8px; font-size:0.8rem;" onclick="buy('${item.name}', ${item.price})">طلب شراء</button>
        </div>
    `).join('');
}

function buy(item, price) {
    if (members[currentUser].balance < price) {
        alert("⚠️ رصيدك لا يكفي!");
        return;
    }
    const msg = `🛡️ طلب شراء جديد%0A👤 العضو: ${currentUser}%0A🎁 الغرض: ${item}%0A💰 السعر: ${price} INF`;
    window.open(`https://wa.me/${myWhatsApp}?text=${msg}`);
}
