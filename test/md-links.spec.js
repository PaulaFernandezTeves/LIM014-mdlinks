/*import { sumar, restar, multiplicar, dividir } from '../src/app.js';

describe('Operaciones matemáticas', () => {
    test('Realizamos la suma', () => {
        expect(sumar(1,1)).toBe(2);
    });
    test('Realizamos la resta', () => {
        expect(restar(1,1)).toBe(0);
    });
    test('Realizamos la multiplicacion', () => {
        expect(multiplicar(1,1)).toBe(1);
    });
    test('Realizamos la division', () => {
        expect(dividir(1,1)).toBe(1);
    });
});
describe('Common matchers', () => {
    const datos = {
        nombre: 'Persona 1',
        edad: 10
    }
    const datos2 = {
        nombre: 'Persona 1',
        edad: 10
    }
    test('Comprobamos que los objectos son iguales', () => {
        expect(datos).toEqual(datos2);
    });
});
*/


//const {mdLinks} = require("./src/md-links.js");

const {
  directory,
  //fileExist,
  //isMdFile,
  //searchLinks,
  //validateLinks,

} = require ("../src/index.js");


describe('Operaciones matemáticas', () => {
    test('Directory es una función', () => {
        expect(typeof directory).toBe('function');
    });
});


