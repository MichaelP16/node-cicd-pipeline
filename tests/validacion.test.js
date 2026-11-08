const { normalizarTitulo } = require('../src/validacion');

describe('normalizarTitulo', () => {
  test('recorta espacios al inicio y al final', () => {
    expect(normalizarTitulo('  Preparar demo  ')).toBe('Preparar demo');
  });

  test('rechaza valores que no sean texto', () => {
    expect(normalizarTitulo(null)).toBeNull();
    expect(normalizarTitulo(42)).toBeNull();
  });

  test('rechaza texto vacío o compuesto solo por espacios', () => {
    expect(normalizarTitulo('')).toBeNull();
    expect(normalizarTitulo('   ')).toBeNull();
  });
});
