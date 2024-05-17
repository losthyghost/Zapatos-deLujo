document.addEventListener("DOMContentLoaded", () => {
   const carritoProductos = document.querySelector("#carrito-productos");
   const carritoVacio = document.querySelector("#carrito-vacio");
   const carritoAcciones = document.querySelector("#carrito-acciones");
   const carritoComprado = document.querySelector("#carrito-comprado");
   const totalElement = document.querySelector("#total");
   const vaciarCarritoBtn = document.querySelector("#carrito-accion-vaciar");
   const comprarBtn = document.querySelector("#carrito-acciones-comprar");

   let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

   function actualizarCarrito() {
       carritoProductos.innerHTML = "";
       if (productosEnCarrito.length > 0) {
           carritoVacio.classList.add("disabled");
           carritoAcciones.classList.remove("disabled");

           productosEnCarrito.forEach(producto => {
               const div = document.createElement("div");
               div.classList.add("carrito-producto");
               div.innerHTML = `
                   <div class="carrito-producto-imagen">
                       <img src="${producto.imagen}" alt="${producto.titulo}">
                   </div>
                   <div class="carrito-producto-detalles">
                       <span>${producto.titulo}</span>
                       <span>Cantidad: ${producto.cantidad}</span>
                       <span>Precio: $${producto.precio}</span>
                       <span>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</span>
                   </div>
                   <button class="carrito-producto-eliminar" data-id="${producto.id}">Eliminar<i class="fa-solid fa-trash"></i></button>
               `;
               carritoProductos.append(div);
           });

           actualizarTotal();
       } else {
           carritoVacio.classList.remove("disabled");
           carritoAcciones.classList.add("disabled");
       }
   }

   function actualizarTotal() {
       const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
       totalElement.innerText = `$${total.toFixed(2)}`;
   }

   function eliminarProducto(e) {
       const id = e.target.dataset.id;
       productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
       localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
       actualizarCarrito();
   }

   function vaciarCarrito() {
       productosEnCarrito = [];
       localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
       actualizarCarrito();
   }

   function comprarProductos() {
       productosEnCarrito = [];
       localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
       carritoAcciones.classList.add("disabled");
       carritoComprado.classList.remove("disabled");
       actualizarCarrito();
   }

   carritoProductos.addEventListener("click", (e) => {
       if (e.target.classList.contains("carrito-producto-eliminar")) {
           eliminarProducto(e);
       }
   });

   vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
   comprarBtn.addEventListener("click", comprarProductos);

   actualizarCarrito();
});
