'use strict';
var dinero = require('./convertir_dinero')
  // var drive = require('./googledrive')
var brain = require('./brain.js')

var oraciones = [ // Array
  "52.5 dolares en mercado", // 0
  "20usd en entradas al cine", // 1
  "alquiler en 300 dolares", // 2
  "1200 grivnas en estacionamiento", // 3
  "300 grivnas en gimnasio" // 4
]

dinero.cuandoTerminaDeCargarMoney(function() {
  oraciones.forEach(function(oracion, i) {
    brain.procesar_oracion(oracion, i, undefined, false)
  })
})