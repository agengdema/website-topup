const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");

chatToggle.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});

function sendMessage() {
  const userInput = messageInput.value.trim();
  if (!userInput) return;

  const userBubble = document.createElement("div");
  userBubble.className = "message user-message";
  userBubble.innerText = userInput;
  chatMessages.appendChild(userBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  messageInput.value = "";

  const loadingBubble = document.createElement("div");
  loadingBubble.className = "typing-wrapper";
  loadingBubble.innerHTML = `
  <div class="typing">
    <span></span><span></span><span></span>
  </div>
`;

  chatMessages.appendChild(loadingBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    const botResponse = getBotResponse(userInput);
    chatMessages.removeChild(loadingBubble);

    const botBubble = document.createElement("div");
    botBubble.className = "message bot-message";
    botBubble.innerText = botResponse;
    chatMessages.appendChild(botBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1200);
}

function getBotResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("topup") || msg.includes("top up") || msg.includes("top-up") || msg.includes("Top-up") || msg.includes("Topup") || msg.includes("bingung cara topup") || msg.includes("cara order") || msg.includes("caraorder") || msg.includes("bagaimana cara topup") || msg.includes("cara topup") || msg.includes("cara-topup") || msg.includes("caratopup")) {
    return "Cara Top-up di Dream Store:\n1. Pilih game sesuai yang anda ingin topup\n2. Masukkan ID dan Server jika ada\n3. Pilih item yang diinginkan\n4. Pilih pembayaran yang sesuai\n5. Klik bayar dan konfirmasi\n6. Tunggu item masuk ke akun anda\n\nJika ada masalah, silakan hubungi CS kami.";
  } else if (msg.includes("gagal") || msg.includes("transaksi gagal") || msg.includes("gagal topup") || msg.includes("tidak bisa topup")) {
    return "Silakan pastikan ID dan Server benar dan saldo cukup. Jika masih gagal, hubungi kami melalui kontak yang tersedia.";
  } else if (msg.includes("bingung cara melakukan pembayaran") || msg.includes("bagaimana cara melakukan pembayaran") || msg.includes("carabayar") || msg.includes("cara bayar")) {
    return "Untuk melakukan pembayaran, pilih metode pembayaran yang diinginkan saat checkout seperti:\n1. Gopay\n2. Dana\n3. Transfer Bank\n\nKemudian ikuti instruksi yang diberikan untuk menyelesaikan transaksi. Jika sudah, konfirmasi kembali apakah Anda sudah melakukan pembayaran.";
  } else if (msg.includes("Kamu bisa ngapain aja") || msg.includes("apa yang bisa kamu lakukan") || msg.includes("kamu bisa apa") || msg.includes("kamu bisa ngapain")) {
    return "Saya bisa membantu menjawab pertanyaan seputar top-up, masalah transaksi, dan memberikan informasi tentang game yang tersedia di Dream Store.";
  } else if (msg.includes("halo") || msg.includes("tes") || msg.includes("hi")) {
    return "Halo! Ada yang bisa kami bantu?";
  } else {
    return "Maaf, saya tidak mengerti.\nCoba tanyakan tentang:\n- Cara top-up\n- Masalah gagal top-up\n- Masalah transaksi\n- Sapaan seperti 'halo'";
  }
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

document.addEventListener("click", function (event) {
  const isClickInsideChat = chatBox.contains(event.target) || chatToggle.contains(event.target);

  if (!isClickInsideChat && chatBox.style.display === "flex") {
    chatBox.style.display = "none";
  }
});