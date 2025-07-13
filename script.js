// Fake database
const restaurants = [
  {
    id: 1,
    name: "Pizzeria Bella",
    menu: [
      { name: "Margherita", price: 8 },
      { name: "Hawaii", price: 10 }
    ]
  }
];

// Load restaurant menu dynamically
if (window.location.pathname.includes("restaurant.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const restaurant = restaurants.find(r => r.id == id);
  
  document.getElementById("menu").innerHTML = restaurant.menu
    .map(item => `<div>${item.name} - $${item.price} <button onclick="addToCart(${item.price})">+</button></div>`)
    .join("");
}
let cart = [];

function addToCart(price) {
  cart.push(price);
  alert(`Added! Total: $${cart.reduce((a, b) => a + b, 0)}`);
}
