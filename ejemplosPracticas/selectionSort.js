function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // Suponemos que el número más pequeño está en 'i'

    for (let j = i + 1; j < n; j++) {
      // Buscamos un número aún más pequeño
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // Encontramos un número más pequeño
      }
    }

    // Si encontramos uno más pequeño, lo intercambiamos
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }

    console.log(`Paso ${i + 1}:`, arr); // Vemos el array después de cada cambio
  }
  return arr;
}

let numeros = [64, 25, 12, 22, 11];
console.log("Array inicial:", numeros);
console.log("Array ordenado:", selectionSort(numeros));
