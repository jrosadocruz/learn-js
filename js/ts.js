var number = 1;
var count1 = 2;
function doSomething() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('Finally:' + i);
}
doSomething();
function doSome() {
    for (var i_1 = 0; i_1 < 5; i_1++) {
        console.log(i_1);
    }
    var i = 0;
    console.log('Finally:' + i);
}
doSome();
var count = 5;
var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'a', false];
var ColorRed = 0;
var ColorGreen = 1;
var ColorBlue = 2;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var backgroundColor = Color.Red;
var message;
message = 'abc';
var log = function (message) {
    console.log(message);
};
var doLog = function (message) {
    console.log(message);
};
var doLog2 = function (message) { return console.log(message); };
var drawPoint = function (point) {
};
drawPoint({
    x: 1,
    y: 2
});
var drawPoint2 = function (point) {
};
drawPoint({
    x: 1,
    y: 2,
});
;
var drawPoint3 = function (point) {
};
drawPoint3({
    x: 1,
    y: 2
});
var PointClass = (function () {
    function PointClass() {
    }
    PointClass.prototype.draw = function () {
        console.log("X: " + this.x + ", Y: " + this.y);
    };
    PointClass.prototype.getDistance = function (another) {
    };
    return PointClass;
}());
var point = new PointClass();
point.x = 1;
point.y = 2;
point.draw();
var Punto = (function () {
    function Punto(x, y) {
        this.x = x;
        this.y = y;
    }
    Punto.prototype.draw = function () {
        console.log("Punto X: " + this.x + ", Y: " + this.y);
    };
    return Punto;
}());
var punto = new Punto(1, 2);
punto.draw();
var PuntoAlt = (function () {
    function PuntoAlt(x, y) {
        this.x = x;
        this.y = y;
    }
    PuntoAlt.prototype.draw = function () {
        console.log("Punto X: " + this.x + ", Y: " + this.y);
    };
    return PuntoAlt;
}());
var puntoAlt = new PuntoAlt(1, 2);
puntoAlt.draw();
var PuntoAlt2 = (function () {
    function PuntoAlt2(x, y) {
        this.x = x;
        this.y = y;
    }
    PuntoAlt2.prototype.draw = function () {
        console.log("Punto X: " + this.x + ", Y: " + this.y);
    };
    return PuntoAlt2;
}());
var PuntoClass = (function () {
    function PuntoClass(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    PuntoClass.prototype.draw = function () {
        console.log("Punto X: " + this._x + ", Y: " + this._y);
    };
    Object.defineProperty(PuntoClass.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value < 0)
                throw new Error('Value cannot be less than 0');
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    return PuntoClass;
}());
var newPunto = new PuntoClass(1, 2);
newPunto.x = 20;
var valor = newPunto.x;
console.log(valor);
var NuevaClase = (function () {
    function NuevaClase(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    NuevaClase.prototype.dibujar = function () {
        console.log('dibujar x: ' + this._x + ", dibujar y: " + this._y);
    };
    return NuevaClase;
}());
var LikeBtn = (function () {
    function LikeBtn(_highlighted, _likeCount) {
        if (_highlighted === void 0) { _highlighted = false; }
        if (_likeCount === void 0) { _likeCount = 10; }
        this._highlighted = _highlighted;
        this._likeCount = _likeCount;
    }
    LikeBtn.prototype.onClick = function () {
        this._likeCount += (this._highlighted) ? -1 : +1;
        this._highlighted = !this._highlighted;
    };
    Object.defineProperty(LikeBtn.prototype, "likesCount", {
        get: function () {
            return this._likeCount;
        },
        enumerable: true,
        configurable: true
    });
    return LikeBtn;
}());
var newLike = new LikeBtn();
console.log(newLike.likesCount);
newLike.onClick();
console.log(newLike.likesCount);
