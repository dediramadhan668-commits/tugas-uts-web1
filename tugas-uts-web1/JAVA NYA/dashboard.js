// === DASHBOARD ===

// Cek login
const user = JSON.parse(sessionStorage.getItem("loginUser"));
if (!user) {
  alert("Anda belum login!");
  window.location.href = "login.html";
}

// Greeting waktu
const jam = new Date().getHours();
let sapa = "Selamat malam";
if (jam >= 5 && jam < 11) sapa = "Selamat pagi";
else if (jam >= 11 && jam < 15) sapa = "Selamat siang";
else if (jam >= 15 && jam < 18) sapa = "Selamat sore";

document.getElementById("greeting").innerHTML = `${sapa}, <b>${user.nama}</b>!`;

// Tombol logout
document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "login.html";
});
