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

let carrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

let precioFinal = parseInt(localStorage.getItem('precioFinal')) || 0;

const body = document.body;

const darkModeButton = document.getElementById("botonDarkmode");

renderCarrito();

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

const listaDeProductos= [
    //Graficas Nvidia
    new graficas("GeForce Nvidia MSI GTX 1650 Ventus XS OC", 205000, "img/placas-de-video/gtx-1650-4gb-msi.png", "4GB GDDR6", "12.000 mhz", "Tarjetas Graficas", 1),
    new graficas("GeForce Nvidia Asus RTX 3050 ROG STRIX OC", 508000, "img/placas-de-video/rtx-3050-8gb-rogStrix.png", "8GB GDDR6", "14.000 mhz", "Tarjetas Graficas", 2),
    new graficas("GeForce Nvidia Zotac RTX 3070 Ti Trinity", 552300, "img/placas-de-video/rtx-3070ti-8gb-zotac.png", "8GB GDDR6X", "19.000 mhz", "Tarjetas Graficas", 3),
    new graficas("GeForce Nvidia Zotac RTX 4080  Trinity OC", 1225000, "img/placas-de-video/rtx-4080-16gb-zotac.png", "16GB GGDR6X", "22.400 mhz", "Tarjetas Graficas", 4),

    //Graficas AMD
    new graficas("Radeon AMD Asrock RX 550 Phantom Gaming", 98000, "img/placas-de-video/radeon-rx550-2gb-asrock.png", "2GB GDDR5", "6.000 mhz", "Tarjetas Graficas", 5),
    new graficas("Radeon AMD XFX RX 6650 XT ULTRA SPEEDSTER QICK 308", 325000, "img/placas-de-video/radeon-rx6650-8gb-xfx.png", "8GB GDDR6", "17.500 mhz", "Tarjetas Graficas", 6),
    new graficas("Radeon AMD XFX RX 6750 XT ULTRA Speedster", 450000, "img/placas-de-video/radeon-rx6750-15gb-xfx.png", "12GB GDDR6", "18.000 mhz", "Tarjetas Graficas", 7),
    new graficas("Radeon AMD Asrock RX 7600 PHANTOM GAMING OC", 380000, "img/placas-de-video/radeon-rx7600-8gb-asrock.png", "8GB GDDR6", "18.000 mhz", "Tarjetas Graficas", 8),
    new graficas("Radeon AMD XFX RX 7900 XTX SPEEDSTER MERC 310", 1330000, "img/placas-de-video/radeon-rx7900-24gb-xfx.png", "24GB GDDR6", "20.000 mhz", "Tarjetas Graficas",9),

    // Mothers Intel
    new mothers("Mother Intel Asrock H610M-HVS", "1700 Alder Lake-S", "Mini ATX", "2 Slots de memorias DDR4", 70500, "img/motherboards/intel-lga1700-h610m-asrock.png", "Motherboard", 10),
    new mothers("Mother Intel MSI PRO H410M-B", "1200 Comet Lake","Mini ATX", "2 Slots de memorias DDR4", 88000, "img/motherboards/intel-s1200-h410m-msi.png", "Motherboard", 11),
    new mothers("Mother Intel Gigabyte H470M-H", "1200 Rocket Lake-S", "Mini ATX", "2 Slots de memorias DDR4", 100000, "img/motherboards/intel-s1200-h470m-gigabyte.png", "Motherboard", 12),
    new mothers("Mother Intel Asus PRIME Z790-P D4", "1700 Alder Lake-S, 1700 Raptor Lake", "ATX", "4 Slots de memorias DDR4", 216000, "img/motherboards/intel-1700-z790p-asus.png", "Motherboard", 13),

    // Mothers AMD
    new mothers ("Mother AMD Gigabyte A520M-K V2", "AM4 Ryzen 1th Gen A AM4 Ryzen 4th Gen", "Mini ATX", "2 Slots de memorias DDR4", 80000, "img/motherboards/amd-am4-a520m-gigabyte.png", "Motherboard", 14),
    new mothers ("Mother AMD Asus TUF B650M-PLUS WIFI", "AM5 Ryzen 7000", "Mini ATX", "4 Slots de memorias DDR4", 230000, "img/motherboards/amd-am5-b650m-asus.png", "Motherboard", 15),
    new mothers ("Mother AMD MSI X670-P PRO WIFI", "AM5 Ryzen 7000", "ATX", "4 Slots de memorias DDR5", 375000, "img/motherboards/amd-am5-x670p-msi.png", "Motherboard", 16),

    //Procesadores Intel
    new procesadores("Intel Core I3 12100f", "8 hilos", "4 nucleos", "3.30Ghz", "img/procesadores/intel-i3-12100f.png", 140000, 17, "Procesadores"),
    new procesadores("Intel Core I5 13400f", "16 hilos", "10 nucleos", "2.50Ghz", "img/procesadores/intel-i5-13400f.png", 285000, 18, "Procesadores"),
    new procesadores("Intel Core I7 13700k", "24 hilos", "16 nucleos", "3.40Ghz", "img/procesadores/intel-i7-13700k.png", 600000, 19, "Procesadores"),
    new procesadores("Intel Core I9 12900k", "24 hilos", "16 nucleos", "3.20Ghz", "img/procesadores/intel-i9-12900k.png", 700000, 20, "Procesadores"),

    //Procesadores AMD
    new procesadores("AMD Ryzen 3 4100 AM4", "8 hilos", "4 nucleos", "3.20Ghz", "img/procesadores/amd-ryzen3-4100.png", 84000, 21, "Procesadores"),
    new procesadores("AMD Ryzen 5 7600 AM5", "12 hilos", "6 nucleos", "3.50Ghz", "img/procesadores/amd-ryzen5-7600.png", 295000, 22, "Procesadores"),
    new procesadores("AMD Ryzen 7 7700x AM5", "16 hilos", "8 nucleos", "4.50Ghz", "img/procesadores/amd-ryzen7-7700x.png", 440000, 23, "Procesadores"),
    new procesadores("AMD Ryzen 9 7900x AM5", "24 hilos", "12 nucleos", "4.40Ghz", "img/procesadores/amd-ryzen9-7900x.png", 790000, 24, "Procesadores"),
];

renderProductos(listaDeProductos);

ordenarProductos();

filtroDeProductos();

darkMode();