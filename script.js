const members = {
"levi": { pin: "1001", balance: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", balance: 1000, rank: "مؤسس" }
    "fang": { pin: "8046", balance: 1000, rank: "مستشار" }
};

let currentUser = "";
const myNumber = "212622201526"; // رقمك لاستلام الطلبات

function login() {
    const user = document.getElementById("username").value.toLowerCase().trim();
    const pin = document.getElementById("userpin").value;
    if (members[user] && members[user].pin === pin) {
        currentUser = user;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        updateUI();
    } else { alert("🛡️ الهوية غير صحيحة!"); }
}

function updateUI() {
    document.getElementById("display-name").innerText = currentUser.toUpperCase();
    document.getElementById("display-balance").innerText = members[currentUser].balance + " INF";
    document.getElementById("display-rank").innerText = "RANK: " + members[currentUser].rank;

    const list = document.getElementById("top-members-list");
    list.innerHTML = "";
    const sorted = Object.keys(members)
        .map(name => ({ name, ...members[name] }))
        .sort((a, b) => b.balance - a.balance).slice(0, 3);

    sorted.forEach((m, i) => {
        list.innerHTML += `<div class="top-member rank-${i+1}"><span>#${i+1} ${m.name.toUpperCase()}</span><span>${m.balance} INF</span></div>`;
    });
}

function switchSection(name) {
    document.getElementById("section-home").style.display = name === 'home' ? 'block' : 'none';
    document.getElementById("section-store").style.display = name === 'store' ? 'block' : 'none';
    document.getElementById("nav-home").classList.toggle('active', name === 'home');
    document.getElementById("nav-store").classList.toggle('active', name === 'store');
}

function buy(item, price) {
    if (members[currentUser].balance < price) { alert("رصيدك ناقص!"); return; }
    const msg = `🛡️ طلب شراء جديد%0A👤 العضو: ${currentUser}%0A🎁 الغرض: ${item}%0A💰 السعر: ${price} INF`;
    window.open(`https://wa.me/${myNumber}?text=${msg}`);
}
