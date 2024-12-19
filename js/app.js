const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnAsados = document.querySelector('.asados');
const btnPicadaalaparrilla = document.querySelector('.picadaalaparrilla');
const btnCarnealallanera = document.querySelector('.carnealallanera');
const btnPicada = document.querySelector('.picada');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);
    const asados = platillosArreglo.filter(asados=> asados.getAttribute('data-platillo')=== 'asados')
    const picadaalaparrilla = platillosArreglo.filter(picadaalaparrilla => picadaalaparrilla.getAttribute('data-platillo') === 'picadaalaparrilla');
    const carnealallanera = platillosArreglo.filter(carnealallanera => carnealallanera.getAttribute('data-platillo') === 'carnealallanera');
    const picada = platillosArreglo.filter(picada=> picada.getAttribute('data-platillo') === 'picada');

    mostrarPlatillos(asados, picadaalaparrilla, carnealallanera, picada, platillosArreglo);

}

const mostrarPlatillos = (asados, picadaalaparrilla, carnealallanera, picada, todos) =>{
    btnAsados.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        asados.forEach(asados=> contenedorPlatillos.appendChild(asados));
    });

    btnPicadaalaparrilla.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         picadaalaparrilla.forEach(picadaalaparrilla=> contenedorPlatillos.appendChild(picadaalaparrilla));
    });

    btnCarnealallanera.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        carnealallanera.forEach(carnealallanera=> contenedorPlatillos.appendChild(carnealallanera));
    });
    btnPicada.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        picada.forEach(picada=> contenedorPlatillos.appendChild(picada));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}