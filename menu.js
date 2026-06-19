const items = [
  { name: "Cappuccino",       price: "$3.50", cat: "Coffee",      img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
  { name: "Latte",            price: "$3.50", cat: "Coffee",      img: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400" },
  { name: "Mocha",            price: "$4.00", cat: "Hot Drinks",  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { name: "Americano",        price: "$2.50", cat: "Coffee",      img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400" },
  { name: "Iced Coffee",      price: "$4.00", cat: "Cold Drinks", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400" },
  { name: "Caramel Frappé",   price: "$4.50", cat: "Cold Drinks", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
  { name: "Chocolate Cake",   price: "$3.75", cat: "Desserts",    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { name: "Blueberry Muffin", price: "$2.75", cat: "Food",        img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400" },
];


function render(cat) {
  const list = cat === "All" ? items : items.filter(i => i.cat === cat);

  document.getElementById("grid").innerHTML = list.map(i => `
    <div class="card">
      <div class="card-img-box">
        <img src="${i.img}" alt="${i.name}" />
      </div>
      <p>${i.name}</p>
      <span>${i.price}</span>
    </div>
  `).join("");
}

document.getElementById("tabs").addEventListener("click", function(e) {
  if (e.target.tagName !== "BUTTON") return;

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");

  render(e.target.dataset.cat);
});


render("All");