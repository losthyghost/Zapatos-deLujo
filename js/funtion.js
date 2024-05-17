// PRODUCTOS
const productos = [
    {
        id: "Zapato-01",
        titulo: "Mocasines Eloa negro para mujer",
        imagen: "./IMG/zapato1.1.png",
        categoria: {
            nombre: "Zapato",
            id: "adulto"
        },
        precio: 89.99 
    },
    {
        id: "Zapato-02",
        titulo: "Mocasines Andretti negro para Hombre",
        imagen: "./IMG/zapatohombre1.png",
        categoria: {
            nombre: "Zapato",
            id: "adulto"
        },
        precio: 69.99 
    },
    {
        id: "Zapato-03",
        titulo: "Mocasines Andreti 2.0 cafe para Hombre",
        imagen: "./IMG/zaptohombre2.png",
        categoria: {
            nombre: "Zapato",
            id: "adulto"
        },
        precio: 59.99
    },
    {
        id: "Zapato-04",
        titulo: "Mocasines Eloa taupe para mujer",
        imagen: "./IMG/zapato2.1.png",
        categoria: {
            nombre: "Zapato",
            id: "adulto"
        },
        precio: 89.99 
    },
    {
        id: "Zapato-05",
        titulo: "Botas Enigma negro para Niña",
        imagen: "./IMG/niña1.1.png",
        categoria: {
            nombre: "Zapato",
            id: "niños"
        },
        precio: 49.99 
    },
    {
        id: "Zapato-06",
        titulo: "Zapatos escolares Luka oxford negro para Niños",
        imagen: "./IMG/niño1.png",
        categoria: {
            nombre: "Zapato",
            id: "niños"
        },
        precio: 39.99
    },
    {
        id: "Zapato-07",
        titulo: "Zapatos escolares Luka slip negro para Niños",
        imagen: "./IMG/niño2.png",
        categoria: {
            nombre: "Zapato",
            id: "niños"
        },
        precio: 39.99 
    },
    {
        id: "Zapato-08",
        titulo: "Sandalias Issadora rosa para niña",
        imagen: "./IMG/niña2.1.png",
        categoria: {
            nombre: "Zapato",
            id: "niños"
        },
        precio: 39.99 
    },
  ];
  
  const contenedorProductos = document.querySelector(".box");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".btn"); // Actualiza la clase a la que corresponde a los botones
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card", "product");
        div.innerHTML = `
            <div class="small_card">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-share"></i>
            </div>
            <div class="image">
                <img src="${producto.imagen}" alt="${producto.titulo}">
            </div>
            <div class="products_text">
                <h3>${producto.titulo}</h3>
                <p>${producto.descripcion}</p>
                <h3>$${producto.precio}</h3>
                <div class="products_star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <button class="btn" id="${producto.id}">Add To Cart</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "sin") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".btn");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlcarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlcarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    Swal.fire({
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: false,
        timer: 1000 // Duración en milisegundos (en este caso, 1.5 segundos)
    });
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}