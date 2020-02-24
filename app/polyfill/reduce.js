// Etapas de produção para o ECMA-262, Edition 5, 15.4.4.21
// Referencia: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback /*, valorInicial*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.reduce chamado é nulo (null) ou indefinido (undefined)');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' não é uma função')
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce possui um array vazio sem um valor inicial');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}