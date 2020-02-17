let pets = [{nome: "doug" }, {nome: 'Costelinha'}, {nome: 'Bud'}]

let listarPets = () => {
    let conteudo = "";
    for(let pet of pets){
        conteudo += `
        -----------------
        Nome: ${pet.nome}
        -----------------
        `;
    }
    return conteudo;
}

let adicionarPet = novoPet => {
    return pets.push(novoPet);
}

let buscarPets = (nomePet) => {
    return petsEncontrados = pets.filter(pet)
}

module.exports = { listarPets, adicionarPet, buscarPets };