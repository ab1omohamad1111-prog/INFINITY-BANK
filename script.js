const members = {
    "levi": { pin: "1001", bal: 100000000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 8500, rank: "المستشار" },
    "fong": { pin: "1111", bal: 8500, rank: "المستشار" },
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
        alert("🔒 بيانات خاطئة! تأكد من اسم المستخدم والرمز السري.");
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
        const color = item.rarity === 'epic' ? '#ffd700' : (item.rarity === 'rare
