AOS.init();

// পুরো মেনু ডাটাবেজ
const menuData = {
    "BURGER": [
        { name: "Chicken Cheese Burger", price: 80, img: "https://via.placeholder.com/100?text=Burger" },
        { name: "BBQ Chicken Burger", price: 60, img: "https://via.placeholder.com/100?text=BBQ" },
        { name: "Naga Chicken Burger", price: 50, img: "https://via.placeholder.com/100?text=Naga" },
        { name: "Mixed Burger", price: 40, img: "https://via.placeholder.com/100?text=Mixed" },
        { name: "Egg Vegetables Burger", price: 30, img: "https://via.placeholder.com/100?text=Egg" }
    ],
    "SANDWICH": [
        { name: "Chicken Cheese Sandwich", price: 70, img: "https://via.placeholder.com/100?text=Sandwich" },
        { name: "BBQ Chicken Sandwich", price: 50, img: "https://via.placeholder.com/100?text=BBQ" },
        { name: "Naga Chicken Sandwich", price: 50, img: "https://via.placeholder.com/100?text=Naga" },
        { name: "Egg Vegetables Sandwich", price: 40, img: "https://via.placeholder.com/100?text=Egg" }
    ],
    "PASTA": [
        { name: "Oven Baked Pasta", price: 120, img: "https://via.placeholder.com/100?text=Pasta" },
        { name: "Naga Pasta", price: 60, img: "https://via.placeholder.com/100?text=Naga" },
        { name: "Regular Pasta", price: 50, img: "https://via.placeholder.com/100?text=Regular" }
    ],
    "OTHERS": [
        { name: "Chicken Shawarma", price: 110, img: "https://via.placeholder.com/100?text=Shawarma" },
        { name: "Meetbox", price: 90, img: "https://via.placeholder.com/100?text=Meetbox" },
        { name: "Large Pizza", price: 250, img: "https://via.placeholder.com/100?text=Pizza" },
        { name: "Medium Pizza", price: 150, img: "https://via.placeholder.com/100?text=Pizza" }
    ]
};

let cart = [];
let userLocation = null;

// মেনু রেন্ডার করা
const container = document.getElementById('menu-container');
for (const category in menuData) {
    let html = `<h2 class="text-xl font-bold text-orange-500 mt-8 mb-4 border-l-4 border-orange-500 pl-2 uppercase">${category}</h2>`;
    menuData[category].forEach(item => {
        html += `
        <div class="flex items-center justify-between bg-zinc-800 p-3 rounded-2xl mb-3 shadow-lg border border-zinc-700/50" data-aos="fade-up">
            <div class="flex items-center gap-4">
                <img src="${item.img}" class="w-16 h-16 rounded-xl object-cover border border-zinc-600">
                <div>
                    <h3 class="font-bold text-sm">${item.name}</h3>
                    <p class="text-orange-400 font-bold">৳${item.price}</p>
                </div>
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})" class="bg-zinc-700 p-2 px-4 rounded-xl hover:bg-orange-600 transition">+</button>
        </div>`;
    });
    container.innerHTML += html;
}

function addToCart(name, price) {
    cart.push({name, price});
    document.getElementById('total-count').innerText = cart.length;
}

function openOrderModal() { document.getElementById('orderModal').classList.remove('hidden'); }
function closeOrderModal() { document.getElementById('orderModal').classList.add('hidden'); }

// লোকেশন ডিটেকশন
function getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
        userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        document.getElementById('locationStatus').innerText = "✅ লোকেশন সেট হয়েছে!";
    });
}

// ফোনে অর্ডার পাঠানো (Telegram)
function sendToTelegram() {
    const name = document.getElementById('custName').value;
    if(!name || !userLocation) return alert("নাম এবং লোকেশন দিন!");

    const items = cart.map(i => i.name).join(', ');
    const total = cart.reduce((s, i) => s + i.price, 0);

    const botToken = "YOUR_BOT_TOKEN"; // এখানে আপনার বট টোকেন দিন
    const chatId = "YOUR_CHAT_ID";     // এখানে আপনার চ্যাট আইডি দিন

    const msg = `🔔 *New Order!*%0A👤 Name: ${name}%0A🍕 Items: ${items}%0A💰 Total: ${total} TK%0A📍 Location: https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${msg}&parse_mode=Markdown`)
    .then(() => {
        alert("অর্ডার কিচেনে পাঠানো হয়েছে!");
        location.reload();
    });
}