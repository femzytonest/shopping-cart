
let gridContainer = document.getElementById("grid-container");
let totalA=document.getElementById("total-amount")

let gridItemsData = [
    { id: 'one', name: 'Casual Shirt', price: 45, desc: 'This is a casual shirt', img: 'img/casual shirt.avif' },
    { id: 'two', name: 'Blazers Suite', price: 25, desc: 'We have different colors', img: 'img/blazers.avif' },
    { id: 'three', name: 'Casual Shirt', price: 15, desc: 'High quality casual shirt', img: 'img/casual shirt3.avif' },
    { id: 'four', name: 'Sketch', price: 55, desc: 'Hand-made design clothes', img: 'img/skirt.avif' },
    { id: 'five', name: 'Vintage Shirt', price: 13, desc: 'Made for the young and old', img: 'img/vintsge.avif' },
    { id: 'six', name: 'Long Skirt', price: 25, desc: 'Made for winter period', img: 'img/long skirt.avif' },
    { id: 'seven', name: 'Casual Shirt', price: 35, desc: 'Perfect for daily wear', img: 'img/casual shirt3.avif' },
    { id: 'eight', name: "90's Suite", price: 20, desc: 'Gives the old-money vibes', img: 'img/90s suit.avif' }
];

let cart = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    gridContainer.innerHTML = gridItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = cart.find((item) => item.id === id) || { item: 0 };
            return `
                <div class="grid grid1">
                    <figure>
                        <img class="img-fluid" src="${img}" alt="${name}" />
                        <figcaption>
                            <div class="count">
                                <div class="description">
                                    <h2 class="brand-name">${name}</h2>
                                    <p class="brand-content">${desc}</p>
                                </div>
                                <div class="count-container">
                                    <i onclick="decrement('${id}')" class="fa fa-minus"></i>
                                    <span id="${id}">${search.item}</span>
                                    <i onclick="increment('${id}')" class="fa fa-plus"></i>
                                </div>
                            </div>
                            <div class="heart"><i class="fa fa-heart"></i></div>
                            <div id="price">$<span id="amount">${price}</span></div>
                            <div class="btn-container">
                                <button onclick="addToCart('${id}')" id="btn">
                                    <i class="fa fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </figcaption>
                    </figure>
                </div>`;
        })
        .join(" ");
};

generateShop();

let increment = (id) => {
    let search = cart.find((item) => item.id === id);
    if (!search) {
        cart.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    let search = cart.find((item) => item.id === id);
    if (!search || search.item === 0) return;
    search.item -= 1;
    cart = cart.filter((item) => item.item !== 0);
    update(id);
    localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((item) => item.id === id);
    document.getElementById(id).innerHTML = search ? search.item : 0;
    calculation();
};

let addToCart = (id) => {
    // increment(id);
    generateCartItems();
};

let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((acc, item) => acc + item, 0);
};

let generateCartItems = () => {
    let cartContent = document.getElementById("cart-content");
    if (cart.length !== 0) {
        cartContent.innerHTML = cart
            .map((x) => {
                let { id, item } = x;
                let product = gridItemsData.find((y) => y.id === id);
                return `
                    <div class="cart-container">
                        <img class="cart-thumb" src="${product.img}" alt="${product.name}">
                        <div class="cart-price">
                            <span id="display-num">${item}</span>
                            <p id="amount"> $ ${product.price}</p>
                            <p id="total-amount">$ ${item *product.price}</P>
                        </div>
                        <span>${product.name}</span>
                        <i title="delete" onclick="removeItems('${id}')" class="fas fa-trash"></i>
                    </div>`;
            })
            .join("");
    } else {
        cartContent.innerHTML = `<p class="empty">Cart is Empty</p>`;
    }
};

let calculateTotalAmount = () => {
  let totalAmount = cart
      .map((x) => {
          let product = gridItemsData.find((item) => item.id === x.id);
          return x.item * product.price;
      })
      .reduce((acc, amount) => acc + amount, 0);
  
  totalA.innerHTML = `<h3>Total: $${totalAmount}</h3>`;
  localStorage.setItem("data", JSON.stringify(cart));

};
console.log(calculateTotalAmount())

let removeItems = (id) => {
    cart = cart.filter((item) => item.id !== id);
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(cart));
};

calculation();
generateCartItems();

// like event listener
const liked =document.querySelectorAll('.fa-heart')

liked.forEach(like =>{
    like.addEventListener('click', () =>{
        like.classList.toggle('show')
    })
})