// قاعدة بيانات الأعضاء
const members = {
    "levi": { pin: "1001", bal: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 8500, rank: "المستشار" }
};

// قائمة المنتجات في المتجر
const products = [
    { name: "رتبة قائد ⚔️", price: 10000, stock: 2, rarity: "epic" },
    { name: "بطاقة عفو 🎫", price: 5000, stock: 5, rarity: "rare" },
    { name: "تغيير الاسم 👤", price: 2500, stock: "∞", rarity: "common" },
    { name: "تثبيت رسالة 📌", price: 1500, stock: 15, rarity: "common" }
    { name: "رتبة فارس ⚔️", price: 9500, stock: 2, rarity: "epic" },
    { name: " (ادمن (مدة يومين ⚔️", price: 65000, stock: 0, rarity: "epic" },
    { name: " فترة راحة  لمدة ثلالث ايام(لا يعاقب اذا لم ينجز مهمه وله الحرية الكاملة في عدم التفاعل)", price: 65000, stock: 1, rarity: "epic" },      
      
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
        alert("🔒 الوصول مرفوض! تأكد من صحة البيانات.");
    }
}

function updateUI() {
    const data = members[currentUser];
    document.getElementById('acc-name').innerText = currentUser.toUpperCase();
    document.getElementById('acc-balance').innerText = data.bal.toLocaleString();
    document.getElementById('acc-rank').innerText = "الرتبة الحالية: " + data.rank;
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
        // تحديد اللون بناءً على الندرة
        const color = item.rarity === 'epic' ? '#ffd700' : (item.rarity === 'rare' ? '#9d00ff' : '#00f2ff');
        
        return `
            <div class="store-item" style="border-color: ${color}33;">
                <span class="rarity-tag" style="color: ${color};">${item.rarity.toUpperCase()}</span>
                <h3 style="margin-bottom:10px;">${item.name}</h3>
                <p style="color:${color}; font-family:'Orbitron'; font-size:1.2rem;">${item.price.toLocaleString()} INF</p>
                <div class="stock-info">المخزون المتوفر: ${item.stock}</div>
                <button class="action-btn" 
                        style="background:${color}; box-shadow: 0 0 15px ${color}66; color: ${item.rarity === 'epic' ? '#000' : '#fff'}" 
                        onclick="buy('${item.name}', ${item.price})">
                    إرسال طلب شراء
                </button>
            </div>
        `;
    }).join('');
}

function buy(itemName, price) {
    const data = members[currentUser];
    
    // صياغة الرسالة المتكتكة والمنظمة جداً
    const message = `💠 طلب شراء جديد من INFINITY SYSTEM 💠%0A%0A` +
                    `👤 المُرسل: ${currentUser.toUpperCase()}%0A` +
                    `🎖 الرتبة: ${data.rank}%0A` +
                    `🛒 المنتج المطلوب: ${itemName}%0A` +
                    `💰 المبلغ: ${price.toLocaleString()} INF%0A%0A` +
                    `----------------------------%0A` +
                    `⚠️ حالة الطلب: في انتظار موافقة الإدارة%0A` +
                    `----------------------------%0A%0A` +
                    `🌐 نرجو مراجعة العملية وتحديث الرصيد.`;

    window.open(`https://wa.me/212622201526?text=${message}`);
}
