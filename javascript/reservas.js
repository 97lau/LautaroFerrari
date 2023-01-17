//FORMULARIO DE RESERVAS//
const formReserva = document.querySelector("#formReserva"),
    nombre = document.querySelector("#userName"),
    mail = document.querySelector("#email"),
    tel = document.querySelector("#numTel"),
    fecha = document.querySelector("#fechaRes"),
    horario = document.querySelector("#horaRes");
let reservas=[]

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
})
//FIN evento//