//FORMULARIO DE RESERVAS//
const formReserva = document.querySelector("#formReserva"),
nombre = document.querySelector("#userName"),
mail = document.querySelector("#email"),
tel = document.querySelector("#numTel"),
fecha = document.querySelector("#fechaRes"),
horario = document.querySelector("#horaRes");
let reservas=[];
let formSubmitted = false;

//fechas delimitadas con Luxon
const DateTime = luxon.DateTime;
let fechaRes = document.querySelectorAll(`input[type="date"]`);
let inicio = DateTime.now().toISODate();
let fin = DateTime.now().plus({months:2}).toISODate();

fechaRes.forEach((element) =>{
    element.setAttribute("min", inicio);
    element.setAttribute("max", fin);
})
//fechas delimitadas con Luxon

//toma de datos al usuario
class reserva {
    constructor(nombre,mail,tel,fecha,horario){
        this.nombreUser =nombre;
        this.mailUser = mail;
        this.telUser =tel;
        this.fechaUser =fecha;
        this.horarioUser =horario;
    }}
//FIN toma de datos al usuario

//cargar datos en el array
function guardaUser (reserva){
    return reservas.push(reserva)
}
//cargar datos en el array

//carga en storage
function cargaSt(arr) {
    return localStorage.setItem(`reserva`,JSON.stringify(arr));
}
//carga en storage

//evento
formReserva.addEventListener(`submit`,(e)=>{
e.preventDefault();
//evento

//evita que el formulario se envie dos veces
if (formSubmitted) {
    Toastify({
    text: "Tu reserva ya ha sido confirmada",
    duration: 3000
    }).showToast();
    return;}
//evita que el formulario se envie dos veces

//valida campos de nombre y telefono
if (nombre.value.length > 30 || /[^a-zA-Z\s]/.test(nombre.value)) {
    Toastify({
        text: "El nombre solo puede contener hasta 30 caracteres y solo puede incluir letras y espacios",
        duration: 3000
        }).showToast();
    return;}
    if (tel.value.length !== 10) {
        Toastify({
        text: "El número de teléfono debe tener 10 dígitos",
        duration: 3000
        }).showToast();
        return;}
//valida campos de nombre y telefono

//envia el array con datos ingresados
const newUser = new reserva(nombre.value, mail.value, tel.value, fecha.value, horario.value);
guardaUser(newUser);
cargaSt(reservas);
fetch('https://jsonplaceholder.typicode.com/posts/', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
})
.then(res => res.json())
//envia el array con datos ingresados

//mensaje confirmacion
.then(response => {
    Swal.fire(
    'Felicitaciones!',
    'Tu reserva fue confirmada exitosamente',
    'success');
//mensaje confirmacion

//muestra los datos ingresados al usuario
document.getElementById("confirmaRes").innerHTML = "Tu reserva se confirmó correctamente con los siguientes datos";
    let table = document.querySelector("#tabla");

    let filaEncabezados = document.createElement("tr");

    let celdaNombreEncabezado = document.createElement("th");
    celdaNombreEncabezado.textContent = "Nombre";

    let celdaMailEncabezado = document.createElement("th");
    celdaMailEncabezado.textContent = "Email";

    let celdaTelEncabezado = document.createElement("th");
    celdaTelEncabezado.textContent = "Teléfono";

    let celdaFechaEncabezado = document.createElement("th");
    celdaFechaEncabezado.textContent = "Fecha";

    let celdaHorarioEncabezado = document.createElement("th");
    celdaHorarioEncabezado.textContent = "Horario";

    filaEncabezados.appendChild(celdaNombreEncabezado);
    filaEncabezados.appendChild(celdaMailEncabezado);
    filaEncabezados.appendChild(celdaTelEncabezado);
    filaEncabezados.appendChild(celdaFechaEncabezado);
    filaEncabezados.appendChild(celdaHorarioEncabezado);
    table.appendChild(filaEncabezados);

    let fila = document.createElement("tr");
    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombre.value;
    let celdaMail = document.createElement("td");
    celdaMail.textContent = mail.value;
    let celdaTel = document.createElement("td");
    celdaTel.textContent = tel.value;
    let celdaFecha = document.createElement("td");
    celdaFecha.textContent = fecha.value;
    let celdaHorario = document.createElement("td");
    celdaHorario.textContent = horario.value;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaMail);
    fila.appendChild(celdaTel);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaHorario);
    table.appendChild(fila);
})
//muestra los datos ingresados al usuario
//mensaje error si no se puede enviar el formulario
.catch(error => {
    Swal.fire({
        icon: 'error',
        title: 'Error al confirmar tu reserva',
        text: 'Por favor intenta nuevamente mas tarde',
        footer: 'También puedes contactarnos por nuestras redes sociales al final de la página'});
//mensaje error si no se puede enviar el formulario
})
formSubmitted = true;
}
)
//FIN evento//