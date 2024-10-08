// Clase Producto
class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    // Método para agregar productos
    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    // Método para calcular el total
    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }

    // Método para mostrar los detalles del carrito
    mostrarDetalles() {
        const carritoDiv = document.getElementById('detalle-carrito');
        carritoDiv.innerHTML = '';
        this.productos.forEach(item => {
            carritoDiv.innerHTML += `<p>${item.cantidad} x ${item.producto.nombre} - $${item.producto.precio * item.cantidad}</p>`;
        });
        carritoDiv.innerHTML += `<h4>Total: $${this.calcularTotal()}</h4>`;
    }
}

// Productos disponibles con fotos
const productosDisponibles = [
    new Producto("Leche", 1000, "./assets/img/leche.webp"),
    new Producto("Pan de Molde", 2000, "./assets/img/pan-molde.webp"),
    new Producto("Queso", 1200, "./assets/img/queso.webp"),
    new Producto("Mermelada", 890, "./assets/img/mermelada.webp"),
    new Producto("Azúcar", 1300, "./assets/img/azucar.webp")
];

// Inicializar carrito
const carrito = new Carrito();

// Cargar productos en la página
const productosDiv = document.getElementById('productos');
productosDisponibles.forEach((producto, index) => {
    productosDiv.innerHTML += `
        <div class="col-md-3">
            <div class="card my-2">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <label for="cantidad-${index}">Cant:</label>
                    <input type="number" id="cantidad-${index}" value="1" min="1" class="form-control mb-2">
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `;
});

// Función para agregar productos al carrito
function agregarAlCarrito(index) {
    const cantidad = document.getElementById(`cantidad-${index}`).value;
    const productoSeleccionado = productosDisponibles[index];
    
    carrito.agregarProducto(productoSeleccionado, parseInt(cantidad));

    // Mostrar detalles del carrito
    carrito.mostrarDetalles();

    // Mostrar popup
    const productoPopupMensaje = document.getElementById('productoPopupMensaje');
    productoPopupMensaje.textContent = `${cantidad} x ${productoSeleccionado.nombre} agregado(s) al carrito.`;
    const productoPopup = new bootstrap.Modal(document.getElementById('productoPopup'));
    productoPopup.show();
}

// Botón de pagar
document.getElementById('pagar-btn').addEventListener('click', function() {
    const finalizarPopup = new bootstrap.Modal(document.getElementById('finalizarPopup'));
    finalizarPopup.show();
});

// Finalizar compra
document.getElementById('finalizarCompraBtn').addEventListener('click', function() {
    alert(`Gracias por tu compra! Total a pagar: $${carrito.calcularTotal()}`);
    carrito.productos = []; // Vaciar carrito
    carrito.mostrarDetalles();
    const finalizarPopup = bootstrap.Modal.getInstance(document.getElementById('finalizarPopup'));
    finalizarPopup.hide();
});
