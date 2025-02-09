function bubbleSort(arr) {
  let n = arr.length;

  // Ciclo externo: nos aseguramos de que hagamos suficientes pasadas
  for (let i = 0; i < n - 1; i++) {
    // Ciclo interno: comparamos los elementos de dos en dos
    for (let j = 0; j < n - i - 1; j++) {
      // Si el número actual es mayor que el siguiente, los intercambiamos
      if (arr[j] > arr[j + 1]) {
        // Intercambio
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    console.log(`Paso ${i + 1}:`, arr); // Ver el array después de cada paso
  }
  return arr;
}

let numeros = [5, 1, 4, 2, 8];
console.log("Array inicial:", numeros);
console.log("Array ordenado:", bubbleSort(numeros));
