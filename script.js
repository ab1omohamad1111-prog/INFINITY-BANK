const members = {
    "levi": { pin: "1001", bal: 100000000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 10500, rank: "المستشار" }
};

const products = [
    { name: "رتبة فارس ⚔️", price: 9500, stock: 2, rarity: "rare" },
    { name: "أدمن (يومين) 🛡️", price: 65000, stock: 0, rarity: "epic" },
    { name: "فترة راحة (3 أيام) 💤", price: 65000, stock: 1, rarity: "epic" }
];

let currentUser = "";

function handleLogin() {
    // جلب العناصر
    const userField = document.getElementById('username-input');
    const pinField = document.getElementById('pin-input');

    if (!userField || !pinField) {
        alert("خطأ تقني: لم يتم العثور على خانات الإدخال في HTML!");
        return;
    }

    const uInput = userField.value.toLowerCase().trim();
    const pInput = pinField.value.trim();

    console.log("محاولة دخول بـ:", uInput, pInput);

    // التحقق من البيانات
    if (members[uInput]) {
        if (members[uInput].pin === pInput) {
            currentUser = uInput;
            
            // إخفاء شاشة الدخول وإظهار البنك
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
            
            updateUI();
            renderStore();
        } else {
            alert("❌ الرمز السري (PIN) غير صحيح لهذا المستخدم!");
        }
    } else {
        alert("❌ اسم المستخدم غير موجود في النظام!");
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
}

function renderStore() {
    const grid = document.getElementById('store-items');
    grid.innerHTML = products.map(item => `
        <div class="store-item" style="border:1px solid #222; padding:20px; border-radius:15px; text-align:center;">
            <h3>${item.name}</h3>
            <p style="color:#00f2ff">${item.price.toLocaleString()} INF</p>
            <button class="action-btn" style="margin-top:10px; padding:10px;" onclick="buy('${item.name}', ${item.price})">شراء</button>
        </div>
    `).join('');
}

function buy(itemName, price) {
    const data = members[currentUser];
    const rawMsg = `💠 طلب شراء جديد 💠\nالمستخدم: ${currentUser}\nالمنتج: ${itemName}`;
    window.open(`https://wa.me/212622201526?text=${encodeURIComponent(rawMsg)}`, '_blank');
}
