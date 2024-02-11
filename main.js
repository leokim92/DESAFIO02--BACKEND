const express = require('express');
const GestorProducto = require('./productManager');
const app = express();
const port = 3000;

app.use(express.json());

const gestor = new GestorProducto("./productos.json");

app.get('/ping', (req, res) => {
    res.status(200).send("pong");
});

app.post('/productos', (req, res) => {
    const producto = gestor.addProduct(req.body);
    res.status(201).send(producto);
});

app.get('/productos', (req, res) => {
    res.send(gestor.getProductos());
});

app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = gestor.getProductById(id);
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = gestor.updateProduct(id, req.body);
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resultado = gestor.deleteProducto(id);
    if (resultado) {
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log("running");
});