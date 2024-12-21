// Función para verificar los campos del formulario
function verificarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        console.log("Por favor, completa todos los campos del formulario.");
        return false; 
    }

    console.log("Todos los campos están completos.");
    return true; 
}

const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    if (verificarFormulario()) {
        console.log("Formulario enviado correctamente.");
        formulario.submit(); 
    }
});

function actualizarProductosEnConsola() {
    const productosHTML = document.querySelectorAll(".cajaa");
    console.clear(); 

    productosHTML.forEach((producto, index) => {
        const nombre = producto.querySelector("h3").textContent;
        const precio = producto.querySelector(".precio").textContent;

        console.log(`${index + 1}. Producto: ${nombre}, Precio: ${precio}`);
    });
}

actualizarProductosEnConsola();

const observer = new MutationObserver(actualizarProductosEnConsola);
observer.observe(document.querySelector(".productos-contenedor"), { childList: true });

// ==================== Punto 1 ====================
// Este código fue parte del Punto 1: Implementar evento click para mostrar la descripción ampliada.
// NOTA: Ahora es manejado dentro de la función modular, por eso Este bloque es redundante.
// const cajasProductos = document.querySelectorAll(".cajaa");
// cajasProductos.forEach((caja) => {
//     caja.addEventListener("click", () => {
//         const nombre = caja.querySelector("h3").textContent;
//         const precio = caja.querySelector(".precio").textContent;
//         alert(`Descripción del producto:\n\nNombre: ${nombre}\nPrecio: ${precio}`);
//     });
// });

// ==================== Punto 2 ====================
// Mejora: Crear un listado de productos dinámicamente con una función modular.

document.addEventListener("DOMContentLoaded", () => {
    
    // Array de productos inicial
    const productos = [
        { nombre: "Fruta orgánica fresca", descripcion: "Fruta 250gr", precio: 325, imagen: "img/durazno.png" },
        { nombre: "Orgánico de Granja", descripcion: "Pollo 500gr", precio: 1150, imagen: "img/pollo.png" },
        { nombre: "Mix Frutos Secos", descripcion: "Fruto 250gr", precio: 750, imagen: "img/mixed-nuts.jpg" },
        { nombre: "Filete de Salmón", descripcion: "Fresco 250gr", precio: 1550, imagen: "img/raw-salmon.jpg" },
        { nombre: "Smoothie Verde Detox", descripcion: "Bebida 500ml", precio: 150, imagen: "img/jugodetox.png" },
        { nombre: "Vegetales Orgánicos", descripcion: "Frescos 500gr", precio: 650, imagen: "img/vegetales.png" }
    ];

    // Función modular para generar productos dinámicamente
    function crearProductos(productos) {
        const contenedor = document.querySelector(".productos-contenedor");
        contenedor.innerHTML = ""; 
    
        productos.forEach((producto, index) => {
            const productoHTML = `
                <div class="cajaa">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <span>Fresh Item</span>
                    <h3>${producto.nombre}<br>${producto.descripcion}</h3>
                    <h4 class="precio">$${producto.precio} <span>/kg</span></h4>
                    <button 
                        class="btn agregar-carrito" 
                        data-id="${index}" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}">
                        🛒 Agregar al carrito
                    </button>
                </div>
            `;
    
            contenedor.insertAdjacentHTML("beforeend", productoHTML);
        });
    
    // Reasignar eventos a los botones recién generados
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

    // Función para agregar eventos de clic
    function agregarEventosClick() {
        const cajasProductos = document.querySelectorAll(".cajaa");

        cajasProductos.forEach((caja) => {
            caja.addEventListener("click", () => {
                const nombre = caja.querySelector("h3").textContent;
                const precio = caja.querySelector(".precio").textContent;
                alert(`Descripción del producto:\n\nNombre: ${nombre}\nPrecio: ${precio}`);
            });
        });
    }

    // Función para agregar un nuevo producto dinámicamente
    function agregarProductoNuevo(nuevoProducto) {
        productos.push(nuevoProducto); 
        crearProductos(productos); 
    }

    // Inicializar productos al cargar la página
    crearProductos(productos);

    // Ejemplo para agregar un nuevo producto al array y actualizar la página
    //agregarProductoNuevo({ 
    //    nombre: "Pan integral casero", 
    //    descripcion: "Pan fresco 500gr", 
    //    precio: 200, 
    //    imagen: "img/pan.png" 
    //});
});



async function obtenerDatosAPI() {
    try {

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const datos = await respuesta.json();

        console.log(datos); 

        const contenedor = document.getElementById("api-dynamic-reviews");

        datos.slice(0, 3).forEach(usuario => {
            const avatarURL = `https://ui-avatars.com/api/?name=${usuario.name}&size=60`;
            const reviewHTML = `
                <div class="caja">
                    <i class='bx bxs-quote-alt-left'></i>
                    <div class="estrellas">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>
                    <p>"Servicio excelente, me encanta la calidad de los productos."</p>
                    <div class="review-profile">
                        <img src="${avatarURL}" alt="${usuario.name}">
                        <h3>${usuario.name}</h3>
                    </div>
                </div>
            `;
            contenedor.insertAdjacentHTML("beforeend", reviewHTML);
        });
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
    }
}

obtenerDatosAPI();

// Variables del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoContenedor = document.getElementById('carrito-contenedor');
const carritoTotal = document.getElementById('carrito-total');
const badgeCarrito = document.querySelector('.carrito-icono .badge');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const carritoLateral = document.getElementById('carrito-lateral');
const overlay = document.getElementById('overlay');

// 👉 Abrir y cerrar el carrito lateral
document.getElementById('abrir-carrito').addEventListener('click', () => {
    carritoLateral.classList.add('activo');
    overlay.classList.add('activo');
});

document.getElementById('cerrar-carrito').addEventListener('click', cerrarCarrito);
overlay.addEventListener('click', cerrarCarrito);

function cerrarCarrito() {
    carritoLateral.classList.remove('activo');
    overlay.classList.remove('activo');
}

// 👉 Actualizar carrito
function actualizarCarrito() {
    carritoContenedor.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        carritoContenedor.innerHTML += `
            <div class="producto-carrito">
                <h6>${producto.nombre}</h6>
                <p>$${producto.precio} x ${producto.cantidad}</p>
                <input type="number" min="1" value="${producto.cantidad}" 
                    onchange="cambiarCantidad('${producto.id}', this.value)" 
                    class="form-control form-control-sm d-inline-block w-50">
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.id}')">🗑️</button>
            </div>
        `;
    });

    carritoTotal.textContent = total.toFixed(2);
    badgeCarrito.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0); // Actualizar el total de productos en el badge
    guardarCarrito();
}

//  Agregar producto al carrito
function agregarAlCarrito(event) {
    const boton = event.target;
    const id = boton.getAttribute('data-id');
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++; // Incrementar cantidad
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 }); // Agregar nuevo producto
    }

    actualizarCarrito();
}

// 👉 Cambiar cantidad
function cambiarCantidad(id, cantidad) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = cantidad > 0 ? parseInt(cantidad) : 1;
        actualizarCarrito();
    }
}

//  Eliminar producto (uno por uno)
function eliminarProducto(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad--; // Reducir la cantidad en 1
        if (producto.cantidad === 0) {
            // Si la cantidad es 0, eliminamos el producto del carrito
            carrito = carrito.filter(item => item.id !== id);
        }
        actualizarCarrito();
    }
}

//  Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

//  Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//  Listeners para agregar al carrito
document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

// Iniciar el carrito
actualizarCarrito();


























