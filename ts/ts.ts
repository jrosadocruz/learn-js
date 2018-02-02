// Variable Declaration
// ===========================

var number = 1;
let count1 = 2;

// El keyword `var` define el valor de manera global o de manera local dentrol del scope de la función. Por tanto, en el `for` loop, `var i = 0` cambia el valor de `i` y permite que `i` sea llamado mediante `console.log(i)`.
function doSomething(){
  for(var i = 0 ; i < 5 ; i++) {
    console.log(i);
  }
  console.log('Finally:' + i);
}

doSomething();

// En cambio, el keyword `let`, limita el valor de la variable al scope del bloque de código, statement o expresión.
function doSome(){
  for(let i = 0 ; i < 5 ; i++) {
    console.log(i);
  }
  // Typescript lanzará un error en este caso, ya que el valor de `i` no cambia. No obstante, TS compilará un código JS que funciona. La consola dirá `error TS2304: Cannot find name 'i'.`
  let i = 0
  console.log('Finally:' + i);
}

doSome();


// # Types
//  TS da error cuando trato de redeclarar una variable. TS compila el JS, pero es buena práctica no redeclarar la varibale para evitar problemas en un futuro.
let count = 5; /* count = 'a'; */

// ## type annotations
// Las anotaciones me permiten limitar el tipo de valor que le puedo asignar a la varible.
// En TS existens tres tipos básicos.
let a: number; /* Solo puedo asignar valores numéricos a esta varible */
let b: boolean;
let c: string;

// Estas anotaciones me permeten definir "limitantes" a las variables.
let d: any;
let e: number[] = [1,2,3];
let f: any[] = [1,true,'a',false]; /* Cuando se imposible saber el valor de la varible, puedes usar `:any` */

// ### Enum
// En JS, puedo hacer esto para "enmuerar".
const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

// En TS, puedo usar `enum` para facilitarme la vida.
/* Esto es lo mismo que `enum Color {Red = 0, Green = 1, Blue = 2};`  */
enum Color {Red, Green, Blue}; /* TS asigna los valor por defecto y lo hace de manera incremental +1 iniciando en 0. */
let backgroundColor = Color.Red; /* => `backgroundColor = 0`  */

//# Type Assertions
// Cuando no conozco el valor de una variable, utilizo `type assertions` para poder acceder al inteliscense del editor de texto. Esto no cambiará nada en el código compilado de JS. Es solo para saber que tipo de variable es.
let message;
message = 'abc';

// Esto no me deja acceder al intelisence en el editor de texto.
// let endsWith = message.endsWith('c');

// Esto sí me deja acceder al intelisence en el editor de texto.
// let endsWith2 = (<string>message).endsWith('c');

// Otra manera de usar `type assertion`
// let alternativeWay = (message as string).endsWith('c');

//# Arrow Functions
// Normal way to declare a function
let log = function(message) {
  console.log(message);
}

// TS way to declare a function
let doLog = (message) => {
  console.log(message);
}

// Use when function is short
let doLog2 = (message) => console.log(message);

//# Interfaces
// Los `interfaces` sirven para organizar mejor los objetos que pretendes pasar por una función.
// Tenenmos la siguiente función, que sirve para dibujar un punto.
let drawPoint = (point) => {
  /* ... */
}

// Luego llamamos la función de la siguente manera.
drawPoint({
  x: 1,
  y: 2
});

// En este caso, no es del todo malo programar de esta manera, ya que la persona podrá no solo asignarle cualquier tipo de valores al objeto que le pases a la función, sino que también será muy tedioso pasarle un objeto con más valores. Eg: `drawPoint({x: 1, y:3, 'jose': 'sabe mucho});`.

// Una manera de solucionar el problema de pasarles todo tipo de valores al objeto es usando los `type annotation`. Mira el siguiente ejemplo.
let drawPoint2 = (point:{x: number, y: number}) => {
  /* ... */
}
drawPoint({
  x: 1,
  y: 2,
});

// Ahora bien, cuando el objeto que pases tenga muchos valores, este código será muy dificil de leer, entender y mantener. Y aquí es donde entran los `interfaces`.
/* Creamos la `interface` */
interface Point {
  x: number,
  y: number
};

let drawPoint3 = (point: Point) => {
  /* agrega tu código */
}

drawPoint3({
  x: 1,
  y: 2
});

// Es importante destacar que las `interfaces` no permiten que se le pasen funciones.
interface Point2 {
  x: number,
  y: number,
  /* Esto no sirve, ya que cuando pases el objeto en la función donde deseas user el `interface`, tendrás que declarar el método, que sobreescribirá el que agregaste en la `interface`. */
  draw: () => void
}

//# Classes
// Así se crean las clases en TS.
class PointClass {
  x: number;
  y: number;

  draw() {
    console.log("X: " + this.x + ", Y: " + this.y);
  }

  getDistance(another: Point) {
    /* codigo */
  }
}

let point = new PointClass(); /* esto es un objeto. Un objeto es una instacia de una Clase. */
point.x = 1;
point.y = 2;
point.draw();

//## Contructores
// Qué hacer si deseas que a la hora de crear tus objetos tengas que asigarles valores? Pues usas constructores.
class Punto {
  x: number;
  y: number;
  /* El símbolo ? declara que los valores son opcionales. */
  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log("Punto X: " + this.x + ", Y: " + this.y);
  }
}
// A la hora de crear el objeto, TS te pedirá que le pases los valores.
let punto = new Punto(1,2);
punto.draw();

//## Access modifier
// Usarás esto cuando quieras que los valores no puedan cambiarse usando `punto.x = 1` después de haberse inicializado el objeto. En TS tenemos tres tipos: `public`, `private` y `protected`. Por defecto, todo los miembros son `public`.

// Puedo asignar `access modifier` a las propiedades y métodos de la clase.
class PuntoAlt {
  /* Aquí agrego los `access modifiers` */
  private x: number;
  private y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log("Punto X: " + this.x + ", Y: " + this.y);
  }
}
// A la hora de crear el objeto, TS te pedirá que le pases los valores.
let puntoAlt = new PuntoAlt(1,2);
/* Esto no es posible cuando el miembro es `private. `punto2.x = 3;`*/
puntoAlt.draw();

// Otra forma más rápida de crear los `access modifiers` es la siguiente.
class PuntoAlt2 {
  /* Quito esto
    private x: number;
    private y: number;
 */
  constructor(private x?: number, private y?: number) {
  }
  /* Quité esto.
      this.x = x;
      this.y = y;
  */
  draw() {
    console.log("Punto X: " + this.x + ", Y: " + this.y);
  }
}

//## Getter & Setter
class PuntoClass {
  /* Ponemos el `_` para evitar que el parámetro choque con el nombre de los métodos `get` y `set`. */
  constructor(private _x?: number, private _y?: number) {
  }

  draw() {
    console.log("Punto X: " + this._x + ", Y: " + this._y);
  }

  /* Aquí podemos usas `x` porque en el constructor usamos `_x`.
  Set es para asignar valores */
  set x(value) {
    if (value < 0)
      throw new Error('Value cannot be less than 0');
    this._x = value;
  }

  /* Get es para buscar valores. */
  get x() {
    return this._x;
  }

}

let newPunto = new PuntoClass(1, 2);
newPunto.x = 20;
let valor = newPunto.x;
console.log(valor);

//# Import / Export classes
// Para codear de manera modular, lo ideal es que guardes tus clases en archivos distintos. Si deseas expotar una clase, agrega el metodo `export` delante.
/*export*/ class NuevaClase {
  constructor(private _x?:number, private _y?:number) {}
  dibujar(){
    console.log('dibujar x: ' + this._x + ", dibujar y: " + this._y);
  }
}
// Para importar la clase, agrega `import { NombreDeClase } from 'path/to/file'. En nuestro caso sería `import { NuevaClase } from './point'.

//# Exercise
class LikeBtn {

  constructor( private _highlighted = false, private _likeCount = 10  ) {}

  onClick() {
    this._likeCount += (this._highlighted) ?  - 1 : + 1;
    this._highlighted = !this._highlighted;
  }

  get likesCount() {
    return this._likeCount;
  }

}

let newLike = new LikeBtn();
console.log(newLike.likesCount);

newLike.onClick();
console.log(newLike.likesCount);

