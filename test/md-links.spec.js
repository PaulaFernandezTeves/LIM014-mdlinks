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
  relativeToAbsolute,
  fileExist,
  //isMdFile,
  searchLinks,
  //validateLinks,

} = require ("../src/index.js");


describe('Si es directorio o no', () => {
    test('Directory es una función', () => {
        expect(typeof directory).toBe('function');
    });
});


describe('Función Relativa a Absoluta', () => {
  test('relativeToAbsolute es una función', () => {
    expect(typeof relativeToAbsolute).toBe('function');
  });
  test('relativeToAbsolute es una función', () => {
    expect(relativeToAbsolute("")).toEqual('La ruta no existe');
  });
  test('relativeToAbsolute debe devolver la extension de la ruta y obtener los archivos md', () => {
    expect(relativeToAbsolute('README.md')).toEqual(
      'C:\\Users\\user\\LIM014-mdlinks\\README.md'
    );
  });
});


describe('Función si es archivo o directorio', () => {
  test('fileExist es una función', () => {
    expect(typeof fileExist).toBe('function');
  });
  test('fileExist es una función', () => {
    expect(fileExist('C:\\Users\\user\\LIM014-mdlinks\\README.md')).toEqual('La ruta es un archivo:' + ' ' + 'C:\\Users\\user\\LIM014-mdlinks\\README.md');
  });
  test('fileExist debe devolver si es un archivo o directorio', () => {
    expect(fileExist('C:\\Users\\user\\LIM014-mdlinks')).toEqual('La ruta es un directorio:' + ' ' + 'C:\\Users\\user\\LIM014-mdlinks');
  });
});

describe("Función para trabjar con HTML y extraer links ", () => {
  test("debería retornar los links de los enlace ", () => {
    expect(searchLinks("C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md")).toEqual([
      {
        file: "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md",
        href: 'https://www.geeksforgeeks.org/nodejs-web-crawling-using-cheerio/',
        text: '"GeeksforGeeks, using cheerio  - Articulo"',
      },
    ]);
  });
});


/*describe('validar links de array', () => {
  it('is a function', () => {
    expect(typeof md.validateLinks).toBe('function');
  });
  it('return status "Internal Server Error"', (done) => {
    md.validateLinks(arraylinkInValid)
      .then((element) => {
        expect(element[0].message).toBe('Internal Server Error');
        done();
      });
  });
  it('return status 200', (done) => {
    md.validateLinks(arraylinkValid)
      .then((element) => {
        expect(element[0].status).toEqual(200);
        done();
      });
  });
});*/
