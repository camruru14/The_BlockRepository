//Coloca tu endpoint de Retool API
const API_URL = 'https://685ac7499f6ef9611157c107.mockapi.io/moduloapi/schema';

//Coloca tu endpoint de ImgBB
const IMG_API_URL = 'https://api.imgbb.com/1/uploadec6d90b127a9d24e41b79135d578135a';

const form = document.getElementById('persona-form'); // Formulario principal
const nombreEl = document.getElementById('nombre'); // Campo de nombre
const telefonoEl = document.getElementById('telefono'); // Campo de teléfono
const imagenFileEl = document.getElementById('imagen-file'); // Input de archivo (imagen)
const imagenUrlEl = document.getElementById('imagen-url'); // Campo oculto con URL de la imagen
const idEl = document.getElementById('persona-id'); // Campo oculto con ID de la persona
const cancelBtn = document.getElementById('btn-cancel'); // Botón para cancelar edición
const submitBtn = document.getElementById('btn-submit'); // Botón para agregar/actualizar
const tbody = document.getElementById('personas-tbody'); // Cuerpo de la tabla de registros


async function CargarPersonas( ) {
 const res = await fetch(API_URL);
 const data =  await res.json();
 CargarTabla(data);
}

function CargarTabla(personas){
    tbody.innerHTML = '';
    personas.forEach(persona  => {
        tbody.innerHTML += `
        <tr>
        <td><img src= "${persona.imgropa} alt= "Foto de ${persona.nombreropa}" /></td>
        <td>${persona.nombreropa}<td>
        <td>${persona.telefono}</td>
        <td>
        <button onclick= "CargarparaEditar('${persona.id}')">Editar</button>
        <button onclick= "BorrarPersona('${persona.id}')">Eliminar</button>
        </td>
        </tr>
        `;
    });
}

window.addEventListener('DOMContentLoaded',  CargarPersonas);

async function BorrarPersona(id) {
    const  confirmacion = confirm ('¿Eliminar esta persona?')

    if (confirmacion){
        await fetch(`${API_URL}/${id}`,{ method: 'DELETE'});
        CargarPersonas();
        alert("El registro fue eliminado");
    }
        else{
            alert("Se cancelo la accion");
            return;
        }
    }

    async function CargarparaEditar(id) {
        const res = await fetch(`${API_URL}/${id}`);
        const p = await res.json();

        nombreEl.value = p.nombreropa;
        telefonoEl.value = p.telefono;
        imagenUrlEl.value = p.imgropa;
        imagenFileEl.value = '';
        idEl.value = p.id;

        submitBtn.textContent = 'Actualizar';
        cancelBtn.hidden = false;
    }

    cancelBtn.addEventListener('click', () => {
        form.requestFullscreen();
        idEl.value = '';
        submitBtn.textContent = 'Agregar';
        cancelBtn.hidden = true;
    });