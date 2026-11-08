function normalizarTitulo(valor) {
  if (typeof valor !== 'string') return null;
  const titulo = valor.trim();
  return titulo || null;
}

module.exports = { normalizarTitulo };
