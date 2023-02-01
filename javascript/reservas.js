//FORMULARIO DE RESERVAS//
const formReserva = document.querySelector("#formReserva"),
nombre = document.querySelector("#userName"),
mail = document.querySelector("#email"),
tel = document.querySelector("#numTel"),
fecha = document.querySelector("#fechaRes"),
horario = document.querySelector("#horaRes");
let reservas=[]

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

//toma de datos al usuario//
class reserva {
    constructor(nombre,mail,tel,fecha,horario){
        this.nombreUser =nombre;
        this.mailUser = mail;
        this.telUser =tel;
        this.fechaUser =fecha;
        this.horarioUser =horario;
    }}
//FIN toma de datos al usuario//

//cargar datos en el array//
function guardaUser (reserva){
    return reservas.push(reserva)
}
//FIN cargar datos en el array//

//carga en storage//
function cargaSt(arr) {
    return localStorage.setItem(`reserva`,JSON.stringify(arr));
}
//FIN carga en storage//

//evento//
formReserva.addEventListener(`submit`,(e)=>{
e.preventDefault();
const newUser = new reserva(nombre.value, mail.value, tel.value, fecha.value, horario.value);
guardaUser(newUser);
cargaSt(reservas);
fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
})
.then(res => res.json())
.then(response => {
    Swal.fire(
    'Felicitaciones!',
    'Tu reserva fue confirmada exitosamente',
    'success'
);
    let table = document.querySelector("#tabla");
    let fila = document.createElement("tr");
    let celdaNombre = document.createElement("td");
    let celdaMail = document.createElement("td");
    let celdaTel = document.createElement("td");
    let celdaFecha = document.createElement("td");
    let celdaHorario = document.createElement("td");

    celdaNombre.textContent = nombre.value;
    celdaMail.textContent = mail.value;
    celdaTel.textContent = tel.value;
    celdaFecha.textContent = fecha.value;
    celdaHorario.textContent = horario.value;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaMail);
    fila.appendChild(celdaTel);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaHorario);

table.appendChild(fila);;
})
.catch(error => {
    console.error("Error:", error);
})
})
//FIN evento//