class graficas{
    constructor(modelo, precio, img, tipoDeMemoria, velocidadMemoria, categoria, id){
        this.modelo=modelo;
        this.precio=precio;
        this.img=img;
        this.tipoDeMemoria=tipoDeMemoria;
        this.velocidadMemoria=velocidadMemoria;
        this.especificaciones=`
        -Memoria VRam: ${tipoDeMemoria}
        -Velocidad de memoria: ${velocidadMemoria}`
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
        -Tipo de socket: ${socket}
        -Tamaño: ${tamanio}
        -Memoria ram: ${memoriaRam}`
        this.categoria=categoria;
        this.id=id;
    }
}
class procesadores{
    constructor(modelo, cantHilos, cantNucleos, frecuencia, img, precio, id, categoria){
        this.modelo=modelo;
        this.cantHilos=cantHilos;
        this.cantNucleos=cantNucleos;
        this.frecuencia=frecuencia;
        this.img=img;
        this.precio=precio;
        this.especificaciones=`
        -Cantidad de nucleos: ${cantNucleos}
        -Cantidad de hilos: ${cantHilos}
        -Frecuencia base: ${frecuencia}`
        this.id=id;
        this.categoria=categoria;
    }
}

const listaDeProductos= [];

let carrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

let precioFinal = parseInt(localStorage.getItem('precioFinal')) || 0;

const body = document.body;

const darkModeButton = document.getElementById("botonDarkmode");

renderCarrito();

function obtenerProductosJSON(){

    return new Promise((resolve, reject) =>{
        fetch('productos.json')
        .then( (response)=>{
            return response.json();
        })
        .then( (responseJson)=>{
            for(const producto of responseJson){
                if(producto.categoria==="Tarjetas Graficas"){
                    listaDeProductos.push(new graficas(producto.modelo, producto.precio, producto.img, producto.tipoDeMemoria, producto.velocidadMemoria, producto.categoria, producto.id));
                }else if(producto.categoria==="Motherboard"){
                    listaDeProductos.push(new mothers(producto.modelo, producto.socket, producto.tamanio, producto.memoriaRam, producto.precio, producto.img, producto.categoria, producto.id));
                }else if(producto.categoria==="Procesadores"){
                    listaDeProductos.push(new procesadores(producto.modelo, producto.cantHilos, producto.cantNucleos, producto.frecuencia, producto.img, producto.precio, producto.id, producto.categoria));
                }
            }
            resolve();
        });
    });
    
}

function renderProductos(productos){

    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML = "";
    for(const producto of productos){
        const precioFormateado = producto.precio.toLocaleString("es-AR", {style: "currency", currency:"ARS", minimumFractionDigits: 0});
        
        const divPadre= document.createElement("div");
        divPadre.className = "card estilos-cards";

        const img = document.createElement("img");
        img.src = producto.img;
        img.className = "card-img-top";

        const divHijo = document.createElement("div");
        divHijo.className = "card-body";

        const h5 = document.createElement("h5");
        h5.className = "card.title tituloCard";
        h5.innerText = `${producto.modelo}`;

        const p1 = document.createElement("p");
        p1.className = "card-text parrafoCard";
        p1.innerText = producto.especificaciones;

        const p2 = document.createElement("p");
        p2.className = "card-text precioCard";
        p2.innerText=`Precio: ${precioFormateado}`

        const button = document.createElement("button");
        button.className = "btn";
        button.innerText = "Agregar al carrito";

        divHijo.append(h5, p1, p2, button);
        divPadre.append(img, divHijo);
        contenedor.append(divPadre);

        button.addEventListener("click", ()=>{
            carrito.push(producto);
            precioFinal += producto.precio;
            localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
            localStorage.setItem('precioFinal', precioFinal.toString());
            if(body.classList.value==="dark-mode"){
                Toastify({
                    text: `${producto.modelo} agregado con exito`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #2B214B, #10082C)",
                    },
                }).showToast();
            }else{
                Toastify({
                    text: `${producto.modelo} agregado con exito`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, white, rgb(197, 197, 197))",
                        color:"black",
                    },
                }).showToast();
            }
            

            renderCarrito();
        });
    }
    if(body.classList.value==="dark-mode"){
        cardsDarkMode();
    }
    if(contenedor.innerHTML===""){
        body.classList.add("contVacio");
    }else{
        body.classList.remove("contVacio");
    }
}

function renderCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const precioTotal = document.getElementById("totalPrecioProductos");
    const precioTotalFormateado = precioFinal.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });

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
        h5.className = "card.title tituloCard";
        h5.innerText = `${producto.modelo}`;

        const p = document.createElement("p");
        p.className = "card-text precioCard";
        p.innerText = `Precio: ${preciosFormateados}`;

        const button = document.createElement("button");
        button.className = "btn eliminarProducto";
        button.innerText = "Eliminar producto";

        divHijo.append(h5, p, button);
        divPadre.append(img, divHijo);
        contenedorCarrito.append(divPadre);

        button.addEventListener("click", () => eliminarDelCarrito(producto.id));
    }
    precioTotal.innerHTML = precioTotalFormateado;
    if(body.classList.value==="dark-mode"){
        cardsDarkMode();
    }
}

function eliminarDelCarrito(id) {
    const indice = carrito.findIndex(producto => producto.id === id);

    if (indice !== -1) {
        const productoEliminado = carrito.splice(indice, 1)[0];

        precioFinal -= productoEliminado.precio;

        localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
        localStorage.setItem("precioFinal", precioFinal.toString());

        if(body.classList.value==="dark-mode"){
            Toastify({
                text: `${productoEliminado.modelo} eliminado`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                background: "linear-gradient(to right, #2B214B, #10082C)",
                },
            }).showToast();
        }else{
            Toastify({
                text: `${productoEliminado.modelo} eliminado`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, white, rgb(197, 197, 197))",
                    color:"black",
                },
            }).showToast();
        }

        renderCarrito();
    }
}

function cardsDarkMode(){
    const cardDarkMode = document.querySelectorAll(".card");

    cardDarkMode.forEach( clasesCards => {
        if(clasesCards.classList.value==="card estilos-cards"){
            clasesCards.classList.add("card-dark-mode");
        }else if(body.classList.value!=="dark-mode"){
            clasesCards.classList.remove("card-dark-mode");
        }
    });
}

function darkMode(){
    darkModeButton.addEventListener("click", ()=>{
        body.classList.toggle("dark-mode");
        cardsDarkMode();
        if(body.classList.value==="dark-mode"){
            darkModeButton.innerHTML = '<img src="img/light-mode.png" alt=""></img>';
        }
        else{
            darkModeButton.innerHTML = '<img src="img/dark-mode.png" alt=""></img>';
        }
        
        if(body.classList.contains("dark-mode")){
            localStorage.setItem("darkMode", "true");
        }else{
            localStorage.setItem("darkMode", "false");
        }
    });
    if(localStorage.getItem("darkMode")==="true"){
        body.classList.add("dark-mode");
        cardsDarkMode();
        darkModeButton.innerHTML = '<img src="img/light-mode.png" alt=""></img>';
    }else{
        body.classList.remove("dark-mode");
        darkModeButton.innerHTML = '<img src="img/dark-mode.png" alt=""></img>';
    }
}

function ordenarPorNombreZA(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>(a.modelo < b.modelo ? 1 : -1));
    renderProductos(productosOrdenados);
}

function ordenarPorNombreAZ(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>(a.modelo > b.modelo ? 1: -1));
    
    renderProductos(productosOrdenados);
}

function ordenarPorPrecioMayor(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>(a.precio < b.precio ? 1 : -1));
    renderProductos(productosOrdenados);
}

function ordenarPorPrecioMenor(){
    const productosOrdenados = listaDeProductos.sort( (a,b)=>(a.precio > b.precio ? 1 : -1));
    renderProductos(productosOrdenados);
}

function ordenarProductos(){
    const ordenador = document.getElementById("selectOrder");

    ordenador.addEventListener("change", ()=>{
        const value = ordenador.value;

        switch(value){
            case "precioMayor":
                ordenarPorPrecioMayor();
                if(body.classList.value==="dark-mode"){
                    cardsDarkMode();
                }
                break;
            case "precioMenor":
                ordenarPorPrecioMenor();
                if(body.classList.value==="dark-mode"){
                    cardsDarkMode();
                }
                break;
            case "alfabAZ":
                ordenarPorNombreAZ();
                if(body.classList.value==="dark-mode"){
                    cardsDarkMode();
                }
                break;
            case "alfabZA":
                ordenarPorNombreZA();
                if(body.classList.value==="dark-mode"){
                    cardsDarkMode();
                }
                break;
        }
    });
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

obtenerProductosJSON().then(()=>{
    renderProductos(listaDeProductos);

    ordenarProductos();

    filtroDeProductos();
});

darkMode();