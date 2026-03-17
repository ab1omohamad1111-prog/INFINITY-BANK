const members = {
    "levi": { pin: "1001", balance: 50000, rank: "الإمبراطور" },
    "dororo": { pin: "2423", balance: 1000, rank: "مؤسس" },
    "fang": { pin: "8046", balance: 1000, rank: "مستشار" }
};

let currentUser = "";

function login() {
    const userField = document.getElementById("username");
    const pinField = document.getElementById("userpin");

    const user = userField.value.toLowerCase().trim();
    const pin = pinField.value.trim();

    if (members[user] && members[user].pin === pin) {
        currentUser = user;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        updateUI();
    } else {
        alert("🛡️ الهوية غير صحيحة يا بطل!");
    }
}

function updateUI() {
    const data = members[currentUser];
    document.getElementById("display-name").innerText = currentUser.toUpperCase();
    document.getElementById("display-balance").innerText = data.balance + " INF";
    document.getElementById("display-rank").innerText = "RANK: " + data.rank;
}
