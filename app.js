const productos = [
  { id: 0, nombre: "Perro", precio: 800, img: "./img/perro.jpg" },
  { id: 1, nombre: "Gatito", precio: 600, img: "./img/gatito.jpg" },
  { id: 2, nombre: "Peluqueria", precio: 900, img: "./img/peluqueria.jpg" },
  { id: 3, nombre: "Perro", precio: 500, img: "./img/perro.jpg" },
  { id: 4, nombre: "Peluqueria", precio: 400, img: "./img/peluqueria.jpg" },
  { id: 5, nombre: "Peluqueria", precio: 700, img: "./img/peluqueria.jpg" },
];

let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

let cards = document.getElementById("container-items");
let botones = document.getElementsByClassName("botonAgregar");
const btnIcon = document.querySelector(".container-icon");
const containerCartProducts = document.querySelector( ".container-cart-products");

renderizarCarrito();

//DOM

for (const producto of productos) {
  let content = document.createElement("div");
  content.className = "container-items";
  content.innerHTML = `
  <div class="item">
  <figure>
  <img src=${producto.img}>
  </figure>
  <div class="info-product">
  <h2>${producto.nombre}</h2>
  <p class="price">$${producto.precio}</p>
  <button id=${producto.id} class="botonAgregar">Añadir al carrito</button> 
  </div>
  </div>
  </div>
  </div>
   `;
  cards.append(content);
}

for (const boton of botones) {
  boton.onclick = (e) => {
    let productoAgregado = productos.find(
      (producto) => producto.id == e.target.id
    );
    let posicionCarrito = carrito.findIndex(
      (producto) => producto.id == productoAgregado.id
    );

    if (posicionCarrito != -1) {
      carrito[posicionCarrito].unidades++;
      carrito[posicionCarrito].subtotal =
        carrito[posicionCarrito].precioprod * carrito[posicionCarrito].unidades;
    } else {
      carrito.push({
        id: productoAgregado.id,
        nombre: productoAgregado.nombre,
        precioprod: productoAgregado.precio,
        unidades: 1,
        subtotal: productoAgregado.precio,
      });
    }
    swal("Producto Agregado", "❤", "success", {
      button: "Ok",
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  };
}

function renderizarCarrito() {
  containerCartProducts.innerHTML = `
  <div class="cart-product">
  <div class="info-cart-product">
  <p class="titulo-producto-carrito"></p>
  <span class="precio-producto-carrito"></span>
  <span class="cantidad-producto-carrito"></span>
  <div class="cart-total">
  <h3>Total:</h3>
  <span class="total-pagar"></span>
  </div>
  <svg class="icon-close">
  </svg>
  </div>
  </div>`;

  let total = 0;
  for (const item of carrito) {
    total += item.subtotal;
    containerCartProducts.innerHTML += `
  <div class="cart-product">
  <div class="info-cart-product">
  <p class="titulo-producto-carrito"> ${item.nombre}</p>
  <span class="precio-producto-carrito">$${item.precioprod}</span>
  <span class="cantidad-producto-carrito">${item.unidades}</span>
  <span class="total-pagar">${item.subtotal}</span>
  </div>
  </div>`;
  }
  containerCartProducts.innerHTML += `
 <div class="cart-total">
  <h3>Total:</h3>
  <span class="total-pagar">${total}</span>
  </div>
  <svg class="icon-close">
  </svg>`;
}

btnIcon.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});
