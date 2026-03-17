const members = {
    "levi": { pin: "1001", bal: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 8500, rank: "المستشار" }
};

const products = [
    { name: "رتبة فارس ⚔️", price: 9500, stock: 2, rarity: "rare" },
    { name: "أدمن (يومين) 🛡️", price: 65000, stock: 0, rarity: "epic" },
    { name: "فترة راحة (3 أيام) 💤", price: 65000, stock: 1, rarity: "epic" },
    { name: "صندوق الحظ 🎁", price: 3500, stock: 10, rarity: "common" },
    { name: "تغيير لون الرتبة 🎨", price: 12000, stock: 3, rarity: "rare" },
    { name: "تصفير العقوبات 🧹", price: 15000, stock: 5, rarity: "common" }
];

let currentUser = "";

function handleLogin() {
    const u = document.getElementById('user').value.toLowerCase().trim();
    const p = document.getElementById('pin').value;

    if (members[u] && members[u].pin === p) {
        currentUser = u;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        updateUI();
        renderStore();
    } else {
        alert("🔒 بيانات خاطئة!");
    }
}

function updateUI() {
    const data = members[currentUser];
    document.getElementById('acc-name').innerText = currentUser.toUpperCase();
    document.getElementById('acc-balance').innerText = data.bal.toLocaleString();
    document.getElementById('acc-rank').innerText = "الرتبة: " + data.rank;
}

function showTab(tab) {
    document.getElementById('tab-home').style.display = tab === 'home' ? 'block' : 'none';
    document.getElementById('tab-store').style.display = tab === 'store' ? 'block' : 'none';
    document.getElementById('btn-home').classList.toggle('active', tab === 'home');
    document.getElementById('btn-store').classList.toggle('active', tab === 'store');
}

function renderStore() {
    const grid = document.getElementById('store-items');
    grid.innerHTML = products.map(item => {
        const color = item.rarity === 'epic' ? '#ffd700' : (item.rarity === 'rare' ? '#9d00ff' : '#00f2ff');
        const isOut = item.stock === 0;
        
        return `
            <div class="store-item" style="border-color: ${color}33; opacity: ${isOut ? '0.5' : '1'}">
                <span class="rarity-tag" style="color: ${color};">${item.rarity.toUpperCase()}</span>
                <h3>${item.name}</h3>
                <p style="color:${color}; font-family:'Orbitron'; font-size:1.2rem; margin:10px 0;">${item.price.toLocaleString()} INF</p>
                <div style="font-size:0.7rem; margin-bottom:15px;">المخزون: ${item.stock}</div>
                <button class="action-btn" 
                        style="background:${isOut ? '#333' : color}; box-shadow: none;" 
                        onclick="${isOut ? '' : `buy('${item.name}', ${item.price})`}"
                        ${isOut ? 'disabled' : ''}>
                    ${isOut ? 'نفد' : 'طلب شراء'}
                </button>
            </div>
        `;
    }).join('');
}

function buy(itemName, price) {
    const data = members[currentUser];
    const message = `💠 طلب شراء جديد من INFINITY SYSTEM 💠%0A%0A` +
                    `👤 المُرسل: ${currentUser.toUpperCase()}%0A` +
                    `🎖 الرتبة: ${data.rank}%0A` +
                    `🛒 المنتج: ${itemName}%0A` +
                    `💰 السعر: ${price.toLocaleString()} INF%0A%0A` +
                    `⚠️ في انتظار الموافقة...`;

    window.open(`https://wa.me/212622201526?text=${message}`);
}
