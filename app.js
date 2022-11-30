let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let cards = document.getElementById("container-items");
let botones = document.getElementsByClassName("botonAgregar");
const btnIcon = document.querySelector(".container-icon");
const containerCartProducts = document.querySelector(".container-cart-products");
const contador = document.getElementById("count-products");
const contadorProducto = document.getElementById("contador-productos");

fetch("./data.json")
  .then((response) => response.json())
  .then((arrayProductos) => renderProductos(arrayProductos));

//DOM
function renderProductos(arrayProductos) {
  cards.innerHTML = "";
  for (const { id, nombre, precio, img } of arrayProductos) {
    let content = document.createElement("div");
    content.className = "container-items";
    content.innerHTML = `
  <div class="item">
  <figure>
  <img src=${img}>
  </figure>
  <div class="info-product">
  <h2>${nombre}</h2>
  <p class="price">$${precio}</p>
  <button id=${id} class="botonAgregar">Añadir al carrito</button> 
  </div>
  </div>
  </div>
  </div>
   `;
    cards.append(content);
  }
// Boton agregar productos
  for (const boton of botones) {
    boton.onclick = (e) => {
      let productoAgregado = arrayProductos.find(
        (producto) => producto.id == e.target.id
      );
      let posicionCarrito = carrito.findIndex(
        (producto) => producto.id == productoAgregado.id
      );

      if (posicionCarrito != -1) {
        carrito[posicionCarrito].unidades++;
        carrito[posicionCarrito].subtotal =
          carrito[posicionCarrito].precioprod *
          carrito[posicionCarrito].unidades;
      } else {
        carrito.push({
          id: productoAgregado.id,
          nombre: productoAgregado.nombre,
          precioprod: productoAgregado.precio,
          unidades: 1,
          subtotal: productoAgregado.precio,
        });
      }
      Toastify({
        text: "Producto Agregado ♡",

        duration: 3000,
      }).showToast();

      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    };
  }
}

//modal carrito
function renderizarCarrito() {
  containerCartProducts.innerHTML = "";
  let total = 0;
  for (const item of carrito) {
    total += item.subtotal;
    containerCartProducts.innerHTML += `
  <div class="cart-product">
  <div class="info-cart-product">
  <p class="titulo-producto-carrito">${item.nombre}</p>
  <span class="precio-producto-carrito">$${item.precioprod}</span>
  <span class="cantidad-producto-carrito">U:${item.unidades}</span>
  </div>
  </div>`;
  }

  containerCartProducts.innerHTML += `
  <div class="cart-total">
  <h3>Total:</h3>
  <span class="total-pagar">$${total}</span> 
  <button id="vaciar-carrito">Vaciar</button>
  <button id="compra" >Comprar</button>
  </div>`;

  contador.innerText = carrito.length;
  contadorProducto.innerText = carrito.reduce(
    (acc, prod) => acc + prod.precio,
    0
  );
  const btnCompra = document.getElementById("compra");
  btnCompra.addEventListener('click', () =>{
    Toastify({

      text: "Gracias por su compra, Pronto recibira su pedido",
      
      duration: 3000
      
      }).showToast();
  })
  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    renderizarCarrito();
    localStorage.clear();
  });
}

// botones modal
btnIcon.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

btnIcon.addEventListener("click", () => {
  renderizarCarrito();
});

const btnCompra = document.getElementById("compra");
btnCompra.addEventListener('click', () =>{
 
})