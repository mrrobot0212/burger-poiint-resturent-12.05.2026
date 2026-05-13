let cart = [];

function addToCart(name, price) {
  let item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach((i, index) => {
    total += i.price * i.qty;

    html += `
      <div class="border p-2">
        <b>${i.name}</b>
        <p>$${i.price} x ${i.qty}</p>
        <button onclick="changeQty(${index},-1)">-</button>
        <button onclick="changeQty(${index},1)">+</button>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total.toFixed(2);
}

function changeQty(i, v) {
  cart[i].qty += v;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function filterFood(type) {
  document.querySelectorAll(".food-card").forEach(el => {
    el.style.display = (type === "all" || el.classList.contains(type)) ? "block" : "none";
  });
}

// smooth review slider
let index = 0;

function getStep() {
  if (window.innerWidth < 640) return 100;   // mobile = 1 card
  if (window.innerWidth < 1024) return 50;   // tablet = 2 cards
  return 33.33;                              // desktop = 3 cards
}

setInterval(() => {
  const track = document.getElementById("reviewTrack");

  index++;

  let step = getStep();
  track.style.transform = `translateX(-${index * step}%)`;

  // reset loop safely
  if (index >= 3) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0%)";

      setTimeout(() => {
        track.style.transition = "transform 1s ease-in-out";
      }, 50);

    }, 1000);
  }

}, 2500);

function checkout() {
  let msg = "Order:%0A";
  cart.forEach(i => {
    msg += `${i.name} x ${i.qty} = $${i.price * i.qty}%0A`;
  });

  window.open("https://wa.me/01328339865?text=" + msg, "_blank");
}