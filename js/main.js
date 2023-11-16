class graficas{
    constructor(modelo, precio, img, categoria, id){
        this.modelo=modelo;
        this.precio=precio;
        this.img=img;
        this.categoria=categoria;
        this.id=id;
    }
}
class mothers{
    constructor(modelo, socket, tamanio, memoriaRam, precio, img, categoria,id){
        this.modelo=modelo;
        this.socket=socket;
        this.tamanio=tamanio;
        this.memoriaRam=memoriaRam;
        this.precio=precio;
        this.img=img;
        this.especificaciones=`
        -${socket}
        -${tamanio}
        -${memoriaRam}`
        this.categoria=categoria;
        this.id=id;
    }
}

let precioFinal = 0;

function ordenarPorNombreZA(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>{
        if(a.modelo < b.modelo){
            return 1;
        }else if(a.modelo > b.modelo){
            return -1;
        }
        return 0;
    });

    renderProductos(productosOrdenados);
}

function eliminarDelCarrito(id) {
    const indice = carrito.findIndex(producto => producto.id === id);

    if (indice !== -1) {
        const productoEliminado = carrito.splice(indice, 1)[0];

        precioFinal -= productoEliminado.precio;

        renderCarrito();
    }
}

function renderCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const precioTotal = document.getElementById("totalPrecioProductos");

    contenedorCarrito.innerHTML = "";

    for (const producto of carrito) {
        const preciosFormateados = producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });

        const divPadre = document.createElement("div");
        divPadre.className = "card estilos-cards";

        const img = document.createElement("img");
        img.src = producto.img;
        img.className = "card-img-top";

        const divHijo = document.createElement("div");
        divHijo.className = "card-body";

        const h5 = document.createElement("h5");
        h5.className = "card.title";
        h5.innerText = `${producto.modelo}`;

        const p = document.createElement("p");
        p.className = "card-text";
        p.innerText = `Precio: ${preciosFormateados}`;

        const button = document.createElement("button");
        button.className = "btn btn-primary eliminarProducto";
        button.innerText = "Eliminar producto";

        divHijo.append(h5, p, button);
        divPadre.append(img, divHijo);
        contenedorCarrito.append(divPadre);

        

        button.addEventListener("click", () => eliminarDelCarrito(producto.id));
    }
    precioTotal.innerHTML = `$${precioFinal}`;
}

function ordenarPorNombreAZ(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>{
        if(a.modelo > b.modelo){
            return 1;
        }else if(a.modelo < b.modelo){
            return -1;
        }
        return 0;
    });

    
    renderProductos(productosOrdenados);

}

function ordenarPorPrecioMayor(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>{
        if(a.precio < b.precio){
            return 1;
        }else if(a.precio > b.precio){
            return -1;
        }
        return 0;
    });

    renderProductos(productosOrdenados);
}

function ordenarPorPrecioMenor(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>{
        if(a.precio > b.precio){
            return 1;
        }else if(a.precio < b.precio){
            return -1;
        }
        return 0;
    });

    renderProductos(productosOrdenados);
}

function ordenarProductos(){
    const ordenador = document.getElementById("selectOrder");

    ordenador.addEventListener("change", ()=>{
        const value = ordenador.value;

        switch(value){
            case "precioMayor":
                ordenarPorPrecioMayor();
                break;
            case "precioMenor":
                ordenarPorPrecioMenor();
                break;
            case "alfabAZ":
                ordenarPorNombreAZ();
                break;
            case "alfabZA":
                ordenarPorNombreZA();
                break;
        }
    });
}

function renderProductos(productos){

    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML = "";
    for(const producto of productos){
        const preciosFormateados = producto.precio.toLocaleString("es-AR", {style: "currency", currency:"ARS", minimumFractionDigits: 0});
        if(producto.categoria==="Tarjetas Graficas"){
            const divPadre= document.createElement("div");
            divPadre.className = "card estilos-cards";

            const img = document.createElement("img");
            img.src = producto.img;
            img.className = "card-img-top";

            const divHijo = document.createElement("div");
            divHijo.className = "card-body";

            const h5 = document.createElement("h5");
            h5.className = "card.title";
            h5.innerText = `${producto.modelo}`;

            const p = document.createElement("p");
            p.className = "card-text";
            p.innerText=`Precio: ${preciosFormateados}`

            const button = document.createElement("button");
            button.className = "btn btn-primary";
            button.innerText = "Agregar al carrito";

            divHijo.append(h5, p, button);
            divPadre.append(img, divHijo);
            contenedor.append(divPadre);

            button.addEventListener("click", ()=>{
                carrito.push(producto);
                precioFinal += producto.precio;

                renderCarrito();
            });
        }else if(producto.categoria==="Motherboard"){
            const divPadre= document.createElement("div");
            divPadre.className = "card estilos-cards";

            const img = document.createElement("img");
            img.src = producto.img;
            img.className = "card-img-top";

            const divHijo = document.createElement("div");
            divHijo.className = "card-body";

            const h5 = document.createElement("h5");
            h5.className = "card.title";
            h5.innerText = `${producto.modelo}`;

            const p1=document.createElement("p");
            p1.innerText = producto.especificaciones;
                
            const p2 = document.createElement("p");
            p2.className = "card-text";
            p2.innerText=`Precio: ${preciosFormateados}`

            const button = document.createElement("button");
            button.className = "btn btn-primary";
            button.innerText = "Agregar al carrito";

            divHijo.append(h5, p1, p2, button);
            divPadre.append(img, divHijo);
            contenedor.append(divPadre);

            button.addEventListener("click", ()=>{
                carrito.push(producto);
                precioFinal += producto.precio;

                renderCarrito();
            });
        }
    }
}

function filtroDeProductos(){
    const filtro = document.getElementById("filtro");
    
    filtro.addEventListener("keyup", ()=>{
        
        const value = filtro.value;
        const productosFiltrados = listaDeProductos.filter( (producto)=>{
            return producto.modelo.toLowerCase().includes(value.toLowerCase());
        });

        renderProductos(productosFiltrados);
    });
}

const listaDeProductos= [
    //Graficas Nvidia
    new graficas("GeForce Nvidia MSI GTX 1650 4GB GDDR6 Ventus XS OC", 205000, "img/placas-de-video/gtx-1650-4gb-msi.jpg", "Tarjetas Graficas", 1),
    new graficas("GeForce Nvidia Asus RTX 3050 8GB GDDR6 ROG STRIX OC", 508000, "img/placas-de-video/rtx-3050-8gb-rogStrix.jpg", "Tarjetas Graficas", 2),
    new graficas("GeForce Nvidia Zotac RTX 4080 16GB GGDR6X Trinity OC", 1225000, "img/placas-de-video/rtx-4080-16gb-zotac.jpg", "Tarjetas Graficas", 3),

    //Graficas AMD
    new graficas("Radeon AMD Asrock RX 550 2GB GDDR5 Phantom Gaming", 98000, "img/placas-de-video/radeon-rx550-2gb-asrock.jpg", "Tarjetas Graficas", 4),
    new graficas("Radeon AMD Asrock RX 7600 8GB GDDR6 PHANTOM GAMING OC", 380000, "img/placas-de-video/radeon-rx7600-8gb-asrock.jpg", "Tarjetas Graficas", 5),
    new graficas("Radeon AMD XFX RX 7900 XTX 24GB GDDR6 SPEEDSTER MERC 310", 1330000, "img/placas-de-video/radeon-rx7900-24gb-xfx.jpg", "Tarjetas Graficas",6),

    // Mothers Intel
    new mothers("Asrock H610M-HVS", "1700 Alder Lake-S", "Mini ATX", "2 Slots de memorias DDR4", 70500, "img/motherboards/intel-lga1700-h610m-asrock.jpg", "Motherboard", 7),
];

let carrito = [];



renderProductos(listaDeProductos, carrito);

ordenarProductos();

filtroDeProductos();

