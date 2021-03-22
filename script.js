/* <div class="main-item">
    <div class="main-item-image"></div>
    <div class="main-item-middle">
        <h3 class="main-item-middle-header">Смартфон Honor 9</h3>
        <div class="main-item-middle-buttons">
            <button>В избранное</button>
            <button>Сравнить</button>
        </div>
    </div>
    <div class="main-item-price">
        <div class="main-item-price-num">20000</div>
        <button>Купить</button>
    </div>
</div> */
const url = "https://gist.githubusercontent.com/burn-user/59384159a39430ea83c09fc753912826/raw/2405bd841e8b3ba99efd1ba1e60a8b7a07981173/gistfile1.txt";
const items = document.getElementById("main-items-container");
let html = "";
function phones() {
    html = "";
    let responce = axios.get(url)
        .then(function(responce) {
            return responce.data;
        })
        .then(function(responce) {
            for(let i = 0; i < responce.length; i++) {
                if(responce[i].category == "phones") {
                    html += createItem(responce[i]);
                }
            }
            items.innerHTML = html;
        })
}
function labtops() {
    html = "";
    let responce = axios.get(url)
        .then(function(responce) {
            return responce.data;
        })
        .then(function(responce) {
            for(let i = 0; i < responce.length; i++) {
                if(responce[i].category == "labtops") {
                    html += createItem(responce[i]);
                }
            }
            items.innerHTML = html;
        })
        .catch(function(error) {
            console.error("somethimg went wrong!");
        });
}
function createItem(obj) {
    return `
    <div class="main-item">
    <div class="main-item-image" style="background-image: url(${obj.image});"></div>
    <div class="main-item-middle">
        <h3 class="main-item-middle-header">${obj.name}</h3>
        <div class="main-item-middle-buttons">
            <button>В избранное</button>
            <button>Сравнить</button>
        </div>
    </div>
    <div class="main-item-price">
        <div class="main-item-price-num">${obj.price}</div>
        <button onclick="addToCart(${obj.id})">Купить</button>
    </div>
    </div>
    `
}
function createCartItem(obj) {
    return `
    <div class="cart-item">
        <div class="cart-item-image" style="background-image: url(${obj.image});"></div>
        <div class="cart-item-middle">
            <div class="cart-item-header">${obj.name}</div>
            <button onclick="removeFromCart(${obj.id})">Удалить из корзины</button>
        </div>
        <div class="cart-item-price">${obj.price}</div>
    </div>
    `
}

const locateBlock = document.getElementById("chooselocation");
function locate() {
    locateBlock.style.display = "block";
    locateBlock.style.position = "fixed";
    locateBlock.style.width = "70%";
    locateBlock.style.height = "70vh";
    locateBlock.style.top = "100px";
    locateBlock.style.left = "200px";
    locateBlock.style.backgroundColor = "white";
    locateBlock.style.border = "3px solid black";
}
const towninp = document.getElementById("cl-inp");
const town = document.getElementById("top-location");
function dislocate() {
    town.innerText = `Ваш город: ${towninp.value}`;
    locateBlock.style.display = "none";
}

let idInCart = [];
function addToCart(id) {
    idInCart.push(id);
}
function removeFromCart(id) {
    for(let i = 0; i < idInCart.length; i++) {
        if(idInCart[i] == id) {
            idInCart.splice(i, 1);
        }
    }
}

const mainPart = document.getElementById("main");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartButton = document.getElementById("cart-button");
const cartHeader = document.getElementById("cart-header");
function checkCart() {
    mainPart.style.display = "none";
    cart.style.display = "block";
    html = "";
    cartHeader.innerText = "Ваша корзина";
    cartButton.innerText = "Оформить заказ";
    let responce = axios.get(url)
        .then(function(responce) {
            return responce.data;
        })
        .then(function(responce) {
            for(let j = 0; j < idInCart.length; j++) {
                for(let i = 0; i < responce.length; i++) {
                    if(responce[i].id == idInCart[j]) {
                        html += createCartItem(responce[i]);
                    }
                }
            }
            cartItems.innerHTML = html;
            if(html == "") {
                cartHeader.innerText = "Ваша корзина пуста!";
                cartButton.innerText = "Вернуться за покупками!";
            }
        })
}
function closeCart() {
    cart.style.display = "none";
    mainPart.style.display = "flex";
}

const searchField = document.getElementById("menu-search");
function search() {
    html = "";
    let responce = axios.get(url)
        .then(function(responce) {
            return responce.data;
        })
        .then(function(responce) {
            for(let i = 0; i < responce.length; i++) {
                if(responce[i].name == searchField.value) {
                    html += createItem(responce[i]);
                }
            }
            if(html == "") {
                html = "<div class='aaalert'>К сожалению, товара с таким именем не найдено.</div>"
            }
            items.innerHTML = html;
        })
}
function q() {
    html = "";
    let responce = axios.get(url)
        .then(function(responce) {
            return responce.data;
        })
        .then(function(responce) {
            for(let i = 0; i < responce.length; i++) {
                html += createItem(responce[i]);
            }
            items.innerHTML = html;
        })
        .catch(function(error) {
            console.error("somethimg went wrong!");
        });
}
q();