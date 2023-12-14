let clientes = [];

function adicionarAoSubarray(index, elemento) {
    // Verifica se o subarray no índice especificado existe
    if (!clientes[index]) {
        // Se não existir, cria um novo subarray nesse índice
        clientes[index] = [];
    }

    // Adiciona o elemento ao subarray
    clientes[index].push(elemento);
}

// Exemplo de uso
adicionarAoSubarray(0, 5);  // Adiciona 5 ao primeiro subarray
adicionarAoSubarray(1, 9);  // Adiciona 9 ao segundo subarray
adicionarAoSubarray(10, 15); // Cria um novo subarray no índice 10 e adiciona 15
adicionarAoSubarray(0, 2);

console.log(clientes);
