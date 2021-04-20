
//const {mdLinks} = require("./src/md-links.js");

const {
  validatePath,
  pathAbsolute,
  relativeToAbsolute,
  readDirectory,
  directory,
  fileExist,
  recursiveDirectory,
  searchLinks,
  validateLinks,
} = require ("../src/index.js");

const arrayOfLInksValid = [{
  file: 'C:\\Users\\user\\LIM014-mdlinks\\README.md',
  href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
  text: 'Uso de callbacks.'
}];

const arrayOfLInksValids = [{
  file: 'C:\\Users\\user\\LIM014-mdlinks\\README.md',
  href: '#9-checklist',
  text: '9. Checklist'
}];

describe('Función que me valida la ruta, si es FALSE o TRUE', () => {
  test('validatePath es una función', () => {
      expect(typeof validatePath).toBe('function');
  });
  test('debería retornar true', () => {
    expect(validatePath('C:\\Users\\user\\LIM014-mdlinks')).toBe(true);
  });
});

describe('Función para ruta absoluta', () => {
  test('pathAbsolute es una función', () => {
      expect(typeof pathAbsolute).toBe('function');
  });
  test('debería retornar true', () => {
    expect(pathAbsolute('/pruebas/prueba.md')).toBe(true);
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

describe('Función de Leer directorio', () => {
  test('readDirectory es una función', () => {
    expect(typeof readDirectory).toBe('function');
  });
  test('readDirectory es una función', () => {
    expect(readDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas')).toEqual(['app.css', 'prueba.md', 'prueba.txt', 'prueba1']);
  });
});



describe('Si es directorio o no', () => {
  test('Directory es una función', () => {
      expect(typeof directory).toBe('function');
  });
  test('retorna "C:\\Users\\user\\LIM014-mdlinks"', () => {
    expect(pathAbsolute('C:\\Users\\user\\LIM014-mdlinks')).toBe(true);
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


describe('debería validar los links del array si están rotos o no', () => {
  test('validateLinks es una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  test('retorna el estatus 200', (done) => {
    validateLinks(arrayOfLInksValid)
      .then((element) => {
        expect(element[0].status).toEqual(200);
        done();
      });
  });
  test('mensaje de error "Internal Server Error"', (done) => {
    validateLinks(arrayOfLInksValids)
      .then((element) => {
        expect(element[0].message).toEqual('Internal Server Error');
        done();
      });
  });
});
