// 1. نظام جلب البيانات من "خزانة المتصفح" أو استخدام البيانات الافتراضية
let members = JSON.parse(localStorage.getItem('infinity_members')) || {
    "levi": { pin: "1001", bal: 1000000000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 8500, rank: "المستشار" }
    "fong": { pin: "1111", bal: 8500, rank: "ولا شي" }
};

let products = JSON.parse(localStorage.getItem('infinity_products')) || [
    { name: "رتبة فارس ⚔️", price: 9500, stock: 2, rarity: "rare" },
    { name: "أدمن (يومين) 🛡️", price: 65000, stock: 0, rarity: "epic" },
    { name: "فترة راحة (3 أيام) 💤", price: 65000, stock: 1, rarity: "epic" }
    { name: "صندوق الحظ 🎁", price: 3500, stock: 10, rarity: "common" },
    { name: "تغيير لون الرتبة 🎨", price: 12000, stock: 3, rarity: "rare" },
    { name: "تصفير العقوبات 🧹", price: 15000, stock: 5, rarity: "common" }
];

let currentUser = "";

// 2. دالة حفظ البيانات (تستدعى عند أي تغيير)
function saveData() {
    localStorage.setItem('infinity_members', JSON.stringify(members));
    localStorage.setItem('infinity_products', JSON.stringify(products));
}

// 3. نظام الدخول المصحح
function handleLogin() {
    const uInput = document.getElementById('username-input').value.toLowerCase().trim();
    const pInput = document.getElementById('pin-input').value.trim();

    if (members[uInput] && members[uInput].pin === pInput) {
        currentUser = uInput;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        updateUI();
        renderStore();
    } else {
        alert("🔒 البيانات خاطئة أو العضو غير مسجل!");
    }
}

// 4. تحديث الواجهة
function updateUI() {
    const data = members[currentUser];
    document.getElementById('acc-name').innerText = currentUser.toUpperCase();
    document.getElementById('acc-balance').innerText = data.bal.toLocaleString();
    document.getElementById('acc-rank').innerText = "الرتبة: " + data.rank;
}

// 5. دالة إضافة عضو جديد (يمكنك تجربتها من الـ Console)
function addMember(name, pin, balance, rank) {
    members[name.toLowerCase()] = { pin: pin, bal: balance, rank: rank };
    saveData();
    console.log(`تمت إضافة العضو ${name} بنجاح!`);
}

function renderStore() {
    const grid = document.getElementById('store-items');
    grid.innerHTML = products.map(item => `
        <div class="store-item" style="border:1px solid #222; padding:20px; border-radius:15px; text-align:center;">
            <h3>${item.name}</h3>
            <p style="color:#00f2ff">${item.price.toLocaleString()} INF</p>
            <button class="action-btn" style="margin-top:10px; padding:8px;" onclick="buy('${item.name}', ${item.price})">شراء</button>
        </div>
    `).join('');
}

function buy(itemName, price) {
    const data = members[currentUser];
    const rawMsg = `💠 طلب شراء جديد 💠\nالمستخدم: ${currentUser}\nالمنتج: ${itemName}`;
    window.open(`https://wa.me/212622201526?text=${encodeURIComponent(rawMsg)}`, '_blank');
}

function showTab(tab) {
    document.getElementById('tab-home').style.display = tab === 'home' ? 'block' : 'none';
    document.getElementById('tab-store').style.display = tab === 'store' ? 'block' : 'none';
    document.getElementById('btn-home').classList.toggle('active', tab === 'home');
    document.getElementById('btn-store').classList.toggle('active', tab === 'store');
}
