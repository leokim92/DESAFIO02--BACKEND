const fs = require('fs');
const Producto = require('./Producto');
class GestorProducto {
    constructor(path) {
        this.path = path;
        this.productos = [];
        this.cargarProductosDesdeArchivo();
    }

    cargarProductosDesdeArchivo() {
        if (fs.existsSync(this.path)) {
            const contenido = fs.readFileSync(this.path, 'utf8');
            this.productos = JSON.parse(contenido);
        }
    }

    guardarProductosEnArchivo() {
        const contenido = JSON.stringify(this.productos, null, 2);
        fs.writeFileSync(this.path, contenido, 'utf8');
    }
    addProduct(producto) {
        let ultimoId = this.productos.reduce((max, productoActual) => productoActual.id > max ? productoActual.id : max, 0);

        producto.id = ultimoId + 1;

        this.productos.push(producto);

        this.guardarProductosEnArchivo();

        return producto;
    }

    getProductos() {
        return this.productos;
    }
    getProductById(id) {
        return this.productos.find(producto => producto.id === id);
    }

    updateProduct(id, productoActualizado) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...productoActualizado };
            this.guardarProductosEnArchivo();
            return this.productos[index];
        }
        return null;
    }
    deleteProducto(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.guardarProductosEnArchivo();
            return true;
        }
        return false;
    }
}

module.exports = GestorProducto;