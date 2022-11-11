

/*
//obtener la etiqueta html a manipular 
const iniputNacimiento = document.querySelector("#birth");
//Tipo de evento a escuchar = blur ="Cuando se quite el espacio del input"
iniputNacimiento.addEventListener("blur", (evento) => {
  validarNacimiento(evento.target);
});
*/

//Esta funcion se manda a llamar cada ves que el usuario sale de un ipunt que estaba rellenando
//Exporta la funcion valida, para utilizarlo en otros archivos
export function valida(input){
  //Obtenemos la coleccion de todos los datas attributes input.dataset y seleccionamos el .tipo defeinido en la etiqueta html
  const tipoDeInput = input.dataset.tipo;
  //verificar si dentro de validadores existe el tipoDeInput
  if(validadores[tipoDeInput]){
    //pasar como parametro inpunt
    validadores[tipoDeInput](input);
  };
  console.log(input.parentElement)
  //Verificar si la funcion validity esta en true, quitar la clase de los contrario poner la clase css
  if(input.validity.valid){
    //si validity es true, se quita la clase
    input.parentElement.classList.remove("input-container--invalid");
    //Si es valido, se selecciona el span y dejarlo vacio
    input.parentElement.querySelector(".input-message-error").innerHTML="";

  } else {
    //Si  validity es false, se pone la clase
    input.parentElement.classList.add("input-container--invalid");
    //En caso de error, mostrar mensaje de error
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
  };

};

//Aggreto de tipo de erroes
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]
//Se creara un objeto de tipo mensaje, para los tipos de errores
//Son los valores que se reciben de tipoDeInput
const mensajesDeError = {
  //objectos
  nombre:{
    valueMissing: "El campo nombre no puede estar vacio"
  },
  email:{
    valueMissing: "El campo email no puede estar vacio",
    //Hace referencia que es correo electronico
    typeMismatch: "El correo no es valido"
  },
  password:{
    valueMissing: "El campo contraseña no puede estar vacio",
    patternMismatch: "Almenos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales."
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
  },
  estado: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
  }


};


//Hacer coincidir el nombre del tipo con la llave dentro del sujeto, nacimiento
const validadores = {

  nacimiento: (input) => validarNacimiento(input),
};

//Funcion mensaje de error
function mostrarMensajeDeError(tipoDeInput,input){
  //acceder a los diferentes mensaje declarados en mensajeDeError
  let mensaje=  "";
  //Se recorre el arreglo recibiendo cada tipode errores
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error])
      //Acceder al tipo de input y mostrar el error corespondiente
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

//Funcion que valida fecha de nacimiento 
//Recbe inputNacimiento 
function validarNacimiento(input){
  //acceder al valor del input, creando una nueva instancia
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  //Si es false
  if (!mayorDeEdad(fechaCliente)){
    mensaje = "Debes tener al menos 18 años de edad";
  };
  //es una funcion que recibira un mensaje 
  input.setCustomValidity(mensaje);
};

//Verficiar que sea mayor de edad obtenida de la funcion validarNacimiento
function mayorDeEdad(fecha){
  //comparar fecha actual y la fecha que ingrasa el usuario
  //Crear una nuva instancia de la clase date
  const fechaActual = new Date();
  //Fecha que increga usuario y se le agrega 18años para validar
  const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate())
  //Fecha de usuario es meno o igual a la diferecniaFechas
  return diferenciaFechas  <= fechaActual;

};
