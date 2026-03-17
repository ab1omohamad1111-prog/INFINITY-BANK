const users = {
    "levi": { pin: "1001", bal: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", bal: 12500, rank: "المؤسس" },
    "fang": { pin: "8046", bal: 8500, rank: "المستشار" }
};

let activeUser = "";

function handleLogin() {
    const u = document.getElementById('user').value.toLowerCase().trim();
    const p = document.getElementById('pin').value;

    if (users[u] && users[u].pin === p) {
        activeUser = u;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        updateUI();
        loadStore();
    } else { alert("❌ بيانات خاطئة!"); }
}

function updateUI() {
    const d = users[activeUser];
    document.getElementById('acc-name').innerText = activeUser.toUpperCase();
    document.getElementById('acc-balance').innerText = d.bal.toLocaleString();
    document.getElementById('acc-rank').innerText = "الرتبة: " + d.rank;
}

function showTab(t) {
    document.getElementById('tab-home').style.display = t === 'home' ? 'block' : 'none';
    document.getElementById('tab-store').style.display = t === 'store' ? 'block' : 'none';
    document.getElementById('btn-home').classList.toggle('active', t === 'home');
    document.getElementById('btn-store').classList.toggle('active', t === 'store');
}

function loadStore() {
    const items = [{n: "رتبة الفارس", p: 10000}, {n: "بطاقة عفو", p: 5000}];
    const g = document.getElementById('store-items');
    g.innerHTML = items.map(i => `
        <div class="item">
            <h3>${i.n}</h3>
            <p style="color:var(--neon); margin:15px 0;">${i.p} INF</p>
            <button class="main-btn" style="padding:10px" onclick="buy('${i.n}')">شراء</button>
        </div>
    `).join('');
}

function buy(item) { window.open(`https://wa.me/212622201526?text=طلب: ${item} من ${activeUser}`); }