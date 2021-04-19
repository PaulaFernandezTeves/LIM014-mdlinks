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
  searchLinks,
  recursiveDirectory,
  validateLinks,
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

describe('Función recursiveDirectory para leer recursivamente el directorio', () => {
  test('recursiveDirectory es una función', () => {
    expect(typeof recursiveDirectory).toBe('function');
  });
  test('recursiveDirectory debe leer recursivamente el directorio y obtener solo los archivos .md', () => {
    expect(recursiveDirectory("C:\\Users\\user\\LIM014-mdlinks\\pruebas")).toEqual([
  "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba.md",
  "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba2\\prueba4.md",
  "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba2.md",
  "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3\\prueba5.md",
  "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md"]);
  });
});

describe(" Función para extraer los links", () => {
  test("debería retornar los links de los enlaces", () => {
    expect(typeof searchLinks).toBe("function");
  });
  test("searchLinks debe retornar archivos .md y obtener los links de las 3 propiedades", () => {
    expect(searchLinks(["C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md"])).toEqual([
      {
        file: "C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md",
        href: 'https://www.geeksforgeeks.org/nodejs-web-crawling-using-cheerio/',
        text: '"GeeksforGeeks, using cheerio  - Articulo"',
      }
    ]);
  });
});

describe("validateLinks es una función", () => {
  test("debería validar los links", () => {
    expect(typeof validateLinks).toBe("function");
  });
  test('validateLinks debería retornar los stats de los links', () => {
    return validateLinks(['C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md']).then((error) => {
      expect(error).toEqual([{
             "0": "C",
             "1": ":",
             "10": "s",
             "11": "e",
             "12": "r",
             "13": "\\",
             "14": "L",
            "15": "I",
             "16": "M",
             "17": "0",
             "18": "1",
             "19": "4",
             "2": "\\",
             "20": "-",
             "21": "m",
             "22": "d",
             "23": "l",
            "24": "i",
             "25": "n",
             "26": "k",
             "27": "s",
             "28": "\\",
             "29": "p",
             "3": "U",
             "30": "r",
             "31": "u",
             "32": "e",
             "33": "b",
             "34": "a",
             "35": "s",
             "36": "\\",
             "37": "p",
             "38": "r",
             "39": "u",
             "4": "s",
             "40": "e",
             "41": "b",
             "42": "a",
             "43": "1",
             "44": "\\",
             "45": "p",
             "46": "r",
             "47": "u",
             "48": "e",
             "49": "b",
             "5": "e",
             "50": "a",
             "51": "3",
             "52": ".",
             "53": "m",
             "54": "d",
             "6": "r",
             "7": "s",
             "8": "\\",
             "9": "u",
            "message": "Internal Server Error",
            "status": 500,
      }])
    })
  });
});

