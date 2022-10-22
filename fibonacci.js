module.exports = function (n) {
  //fibonacci que se generen se guardar
  const cache = {};

  const fibonacci = (n) => {
    if (cache[n]) {
      // si existe el valor del fibonacci
      return cache[n];
    }

    //romper el fibonacci
    if (n < 2) {
      cache[n] = n;
      return n;
    }

    //calcular el fibonacci
    let solution = fibonacci(n - 1) + fibonacci(n - 2);
    cache[n] = solution;
    return solution;
  };
  return fibonacci(n);
};
