// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree
} = require('./DS.js');

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]

var isAncestor = function(genealogyTree, ancestor, descendant){
  // Tu código aca:

  //Si no hay ancestros
  if (genealogyTree[ancestor].length <= 0) return false;

  //Recorro el objeto de genealogyTree
  for (let i = 0; i < genealogyTree[ancestor].length; i++){
    //Guardo ancestro actual en aux
    var aux = genealogyTree[ancestor][i]

    // Si ancestro es igual a descendiente
    if (aux === descendant){
      return true;
    }

    // Si existen objetos en el árbol, llamamos a la función desde la pos. actual
    if (genealogyTree[aux].length > 0){
      return isAncestor(genealogyTree, aux, descendant)
    }
  }
  //Si no encuetra nada
  return false;
}


// EJERCICIO 2
// Secuencia inventada: f(n) = f(n-1) x f(n-2) - f(n-2)
// Siendo f, secuenciaHenry.
// Donde las primeras dos posiciones son dadas por el parametro recibidos y a partir de
// la siguiente se calcula como la multiplicación de los 2 números anteriores restados al número anterior.
// object es un objeto del cual debemos obtener f(0) y f(1) siguiendo la siguiente lógica:
// f(0) será el valor de la propiedad llamada 'first'
// f(1) será un número igual a la cantidad de propiedades de obj
// Por ejemplo si recibimos: 
// var obj = {
//   1: true,
//   first: 2,
//   7: ['F','r','a','n','c','o!'],
//   h: {a: 1},
//   z: [],
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// deberíamos tener los siguientes 2 valores iniciales
// secuenciaHenry(0) = 2 y secuenciaHenry(1) = 9
// A partir de ahí la tercera posición sería  9 x 2 - 2 = 16 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el objeto
// antes mencionado:
// secuencia: 2, 9, 16, 135, 2144, 289305
// secuenciaHenry(0) // 2  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 9 ya que el elemento de la posición 1 es 1
// secuenciaHenry(5) // 289305 ya que el elemento de la posición 5 es 289305
// Para números negativos de n debe devolver null
// PISTA: Pueden utilizar el método Object.keys() para f(1)

function secuenciaHenry(obj, n) {
  // Tu código aca:


}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function(){
  // Tu código aca:

  // Creo contador
  var aux = 0;

  // Si no hay 'head' significa que la lista esta vacia. Se devuelve '0'
  if (this.head === null){
    return 0;
  } else {
    // Si existe 'head'. Creo un puntero apuntando a 'head'
    var current = this.head;

    // Recorro la lista
    while (current.next){
      aux++;
      current = current.next;
    }

    // Devuelvo el contador sumado el último nodo que su 'next' tiene valor 'null' porque no se tiene en cuenta durante el while
    return (aux + 1);
  }
}


// EJERCICIO 4
// Implementar el método switchPos dentro del prototype de LinkedList que deberá intercambiar
// el elemento que se encuentre en pos1 con el elemento en pos2
// En el caso de que alguna de las dos posiciones no sea válida (Supere el tamaño de la lista actual 
// o sea un número negativo) debe devolver false.
// Si los nodos fueron removidos correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4] --> [5]
//    lista.switchPos(1,3);
//    Ahora la lista quedaría: Head --> [1] --> [4] --> [3] --> [2] --> [5]
//    y la función debería haber devuelto true
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.switchPos = function(pos1, pos2){
  // Tu código aca:

  // Creo 2 punteros. Uno para cada posición
  var current = this.head;
  var current2 = this.head;

  // Si pos1 o pos2 son mayorres al tamaño de la lista o menores a 0 devuelvo 'false'
  if (pos1 > this.size() || pos1 < 0 || pos2 > this.size() || pos2 < 0) return false;

  // Si no hay 'head'
  else if (this.head === null) return false;
  else {
    // Recorro con el primer puntero
    for (let i = 0; i < pos1; i++){
      current = current.next;
    }

    // Guardo el valor de current
    var aux = current.value;

    // Recorro con el segundo puntero
    for (let i = 0; i < pos2; i++){
      current2 = current2.next;
    }

    // Guardo el valor de current2
    var aux2 = current2.value;

    // Cambio de posición los valores
    current.value = aux2;
    current2.value = aux;

    // Devuelvo 'true'
    return true;
  }

}

// EJERCICIO 5
// Implementar la función mergeLinkedLists que, a partir de dos listas simplemente enlazadas 
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> 1 --> 7 --> 20 --> null
//    Lista 2: Head --> 4 --> 13 --> 2 --> null
//    Lista nueva luego de aplicar mergeLinkedLists:
//             Head --> 1 --> 4 --> 7 --> 13 --> 20 --> 2 --> null
// Nota: las listas enlazadas mergeadas intercalandose.
// El nodo 1 de la lista 1, se conecta con el nodo 1 de la lista 2.
// Continuando con el nodo 2 de la lista 2, conectandose con el nodo 2 de la lista 2.
var mergeLinkedLists = function(linkedListOne, linkedListTwo){
  // Tu código aca:

  //Creo una nueva lista
  var lista = new LinkedList();

  // Creo dos punteros, uno para cada lista.
  var current = linkedListOne.head;
  var current2 =linkedListTwo.head;

  // Mientras haya 'current' y 'current2'
  while (current && current2){

    // Agrego el valor actual a la nueva lista
    lista.add(current.value)
    lista.add(current2.value)

    // Asigno el valor del siguiente nodo
    current = current.next;
    current2 = current2.next;
  }

  // Devuelvo la nueva lista
  return lista;
}


// ----------------------


// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA): 
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA): 
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1 
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.


var cardGame = function(playerOneCards, playerTwoCards){
  // Tu código aca:

}

// ---------------


// ----- BST -----

// EJERCICIO 7
// Implementar la función height dentro del prototype de BinarySearchTree que debe devolver la "altura"
// máxima del arbol recibido por parámetro.
// Ejemplo:
//             16             ---> Nivel 1
//          /      \
//        6         23        ---> Nivel 2
//      /  \       /   \
//     2    14    17    31    ---> Nivel 3
//      \
//       5                    ---> Nivel 4
// Este arbol tiene una altura de 4
// PISTA: Una forma de resolverlo es pensarlo recursivamente y usando Math.max

BinarySearchTree.prototype.height = function(){
  // Tu código aca:

  // Si no hay nodos
  if (!this.value) return 0;

  // Si no hay nodos a la izquierda ni derecha, solo tengo un nivel
  if (this.left === null && this.right === null) return 1;

  // Recorro rama izquierda hasta el final
  if (this.left === null) return 1 + this.right.height();

  // Recorro rama derecha hasta el final
  if (this.right === null) return 1 + this.left.height();

  // Comparo altura izquierda y derecha. Devuelve el mas grande sumado el primer nodo.
  return 1 + Math.max(this.left.height(), this.right.height())
}


// ---------------


// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]


var binarySearch = function (array, target) {
  // Tu código aca:

}

// EJERCICIO 9
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar (array) la función va a recibir como parámetro una función
// que va a ser quien va a determinar si un elemento es "mayor" al otro para determinar su
// posición final
// Ejemplo:
// var array = [
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Leo', age: 40, height: 1.83}
// ]
//
// orderFunction(array[0], array[1]) --> Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
// Suponiendo que la orderFunction devuelve -1 si la edad del segundo elemento es menor que la del primero
// specialSort(array, orderFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Leo', age: 40, height: 1.83}
// ]

var specialSort = function(array, orderFunction) {
  // Tu código aca:

  //Creo una condición con valor 'true'
  var swap = true;

  //Mientras 'swap' sea verdadero
  while(swap) {
    // Condición de corte
    swap = false;

    // Recorro el array
    for (let i = 0; i < array.length - 1; i++) {

      // Si la edad del segundo elemento es menor
      if (orderFunction(array[i], array[i+1]) === -1) {

        // Aplico bubbleSort
        var aux = array[i];
        array[i] = array[i+1];
        array[i+1] = aux;

        // Cambiamos a true para continuar recorriendo
        swap = true;
      }
    }
  }
  return array;


}

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
//   var personOne = {
//     name: 'Franco',
//     age: 26,
//     symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
//   }
//
//   var personTwo = {
//     name: 'Toni',
//     age: 30,
//     symptoms: ['congestion', 'tiredness']
//   }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:

  // Creo el closure
  return function(persona) {
    
    // Creo contador de síntomas
    var sintomas = 0;

    // Recorro array 'symptoms'
    for (let i = 0; i < symptoms.length; i++) {

      // Si incluye algún valor del array 'symptoms', síntomas aumenta
      if (symptoms.includes(persona.symptoms[i])) {
        sintomas++;
      }
    }

    // Si 'sintomas' es mayor a 'min', tiene covid
    if (sintomas >= min) return true;
    else return false;
  }
}

// -------------------

module.exports = {
  isAncestor,
  secuenciaHenry,
  LinkedList,
  Queue,
  cardGame,
  binarySearch,
  specialSort,
  closureDetect,
  BinarySearchTree,
  mergeLinkedLists
}
