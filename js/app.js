import { valida } from "./validaciones.js";


//Agrear el event listener que mandara a llamar la funcion valida cada ves que el usuario salga del input de fecha

//regresar un arreglo de todos los inputs
const inputs = document.querySelectorAll("input");

//interar el arreglos
inputs.forEach( input =>{
  //Se le agrega el la funcion addEventLister de tipo blur 
  input.addEventListener('blur',(input) =>{
    valida(input.target);
  });
});