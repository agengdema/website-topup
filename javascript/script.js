document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenContainer = document.querySelector(".hidden-container");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");

  const games = [
    { name: "Mobile Legends", keywords: ["mobile legends", "ml"], icon: "/website-topup/icon/mole-icon.png", link: "/website-topup/html/moba-payment.html" },
    { name: "Free Fire", keywords: ["free fire", "ff"], icon: "/website-topup/icon/ff-icon.png", link: "/website-topup/html/ff-payment.html" },
    { name: "Free Fire Max", keywords: ["free fire max"], icon: "/website-topup/icon/ffmax-icon.png", link: "/website-topup/html/ffmax-payment.html" },
    { name: "PUBG Mobile", keywords: ["pubg mobile", "pubg"], icon: "/website-topup/icon/pubg-icon.png", link: "/website-topup/html/pubg-payment.html" },
    { name: "Honkai: Star Rail", keywords: ["honkai star rail", "hsr"], icon: "/website-topup/icon/hsr-icon.png", link: "/website-topup/html/hsr-payment.html" },
    { name: "Wuthering Waves", keywords: ["wuthering waves", "wuwa"], icon: "/website-topup/icon/wuwa-icon.png", link: "/website-topup/html/wuwa-payment.html" },
    { name: "Zenless Zone Zero", keywords: ["zenless zone zero", "zzz"], icon: "/website-topup/icon/zzz-icon.png", link: "/website-topup/html/zzz-payment.html" },
    { name: "Valorant", keywords: ["valorant"], icon: "/website-topup/icon/valo-icon.png", link: "/website-topup/html/valo-payment.html" },
    { name: "Call of Duty: Mobile", keywords: ["codm", "call of duty"], icon: "/website-topup/icon/codm-icon.png", link: "/website-topup/html/codm-payment.html" },
    { name: "Genshin Impact", keywords: ["genshin impact", "genshin"], icon: "/website-topup/icon/genshin-icon.png", link: "/website-topup/html/genshin-payment.html" },
    { name: "Honkai Impact 3rd", keywords: ["honkai impact 3rd", "hi3rd"], icon: "/website-topup/icon/hi-icon.png", link: "/website-topup/html/hi-payment.html" },
    { name: "Roblox", keywords: ["Roblox", "rblx"], icon: "/website-topup/icon/roblox-icon.png", link: "/website-topup/html/roblox-payment.html" },
    { name: "Magic Chess: Go Go", keywords: ["Magic Chess", "mc"], icon: "/website-topup/icon/mc-icon.png", link: "/website-topup/html/mc-payment.html" },
    { name: "Delta Force", keywords: ["Delta Force", "df"], icon: "/website-topup/icon/delta-icon.png", link: "/website-topup/html/delta-payment.html" },
    { name: "Blood Strike", keywords: ["Blood Strike", "bs"], icon: "/website-topup/icon/bs-icon.png", link: "/website-topup/html/bs-payment.html" },
    { name: "League Of Legends: Wild Rift", keywords: ["League Of Legends", "lol"], icon: "/website-topup/icon/lol-icon.png", link: "/website-topup/html/lol-payment.html" },
    { name: "Honor of King", keywords: ["honor of king", "hok"], icon: "/website-topup/icon/hok-icon.png", link: "/website-topup/html/hok-payment.html" }
  ];

  if (showMoreBtn && hiddenContainer) {
    showMoreBtn.addEventListener("click", function () {
      hiddenContainer.style.display = "flex";
      setTimeout(function () {
        hiddenContainer.classList.add("show");
      }, 10);
      showMoreBtn.style.display = "none";
    });
  }

  searchInput.addEventListener("input", function () {
    const input = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (input === "") {
      suggestionsBox.style.display = "none";
      return;
    }

    const matched = games.filter(game =>
      game.keywords.some(keyword => keyword.includes(input))
    );

    if (matched.length > 0) {
      matched.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerHTML = `
          <img src="${game.icon}" alt="${game.name}" class="suggestion-icon">
          <span>${game.name}</span>
        `;
        div.addEventListener("click", function () {
          window.location.href = game.link;
        });
        suggestionsBox.appendChild(div);
      });
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value.toLowerCase().trim();
      const found = games.find(game =>
        game.keywords.includes(query)
      );
      if (found) {
        window.location.href = found.link;
      } else {
        alert("Game tidak ditemukan.");
      }
    }
  });

  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
