//Coloca tu endpoint de Retool API
const API_URL = 'https://685ac7499f6ef9611157c107.mockapi.io/moduloapi/schema'; 

const container = document.getElementById('cards-container');

async function CargarPersonas() {
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        CargarTarjetas(data);
    }catch(err) {
        console.error('Error al cargar datos: ', err);
        container.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

function CargarTarjetas(personas){
    container.innerHTML = '';

    if(personas.lenght == 0){
        container.innerHTML = "<p>No hay productos registrados</p>";
        return; // Evita que el codigo se siga ejecutando
    }

    personas.forEach(persona => {
        container.innerHTML += `
        <div class="card">
        <img src="${persona.imagen}" alt="Foto de perfil">
        <h2>${persona.nombre}</h2>
        <p>${persona.telefono}</p>
       </div> 
      `;
    });
}

//Al cargar la pagina:
window.addEventListener('DOMContentLoaded', CargarPersonas);