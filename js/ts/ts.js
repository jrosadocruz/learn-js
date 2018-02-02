var number = 1;
let count1 = 2;
function doSomething() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('Finally:' + i);
}
doSomething();
function doSome() {
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
    let i = 0;
    console.log('Finally:' + i);
}
doSome();
let count = 5;
let a;
let b;
let c;
let d;
let e = [1, 2, 3];
let f = [1, true, 'a', false];
const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
let backgroundColor = Color.Red;
let message;
message = 'abc';
let endsWith = message.endsWith('c');
let endsWith2 = message.endsWith('c');
let alternativeWay = message.endsWith('c');
let log = function (message) {
    console.log(message);
};
let doLog = (message) => {
    console.log(message);
};
let doLog2 = (message) => console.log(message);
//# sourceMappingURL=ts.js.map