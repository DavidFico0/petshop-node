let pets = []

//Cria uma tabela de pets
let listarPets = () => {
    let conteudo = "<h1>**** Lista de Pets ****</h1><a href='/'>Home</a>" + " | <a href='/pets/adicionar'>Adicionar Pet</a> | <a href='/pets/buscapets'>Buscar pets</a><table style='width:100%; border: 1px solid black; border-collapse: collapse;'><tr style='border: 1px solid black; border-collapse: collapse;'><th>Nome</th><th>Tipo</th><th>Raca</th><th>Genero</th><th>Idade</th><th>Vacinado?</th><th>Servicos</th></tr>";
    console.log(pets);
    for(let pet of pets){
        //Retorna data de nascimento do pet
        let dataAtual = new Date()
        let dataNascimento = dataAtual.getFullYear() - pet.idade;
        //Retorna linhas da tabela
        conteudo += `<tr style='border: 1px solid black; border-collapse: collapse;'><td>${pet.nome}</td><td>${pet.tipo}</td><td>${pet.raca}</td><td>${pet.genero}</td><td>${pet.idade}anos nasc:${dataNascimento}</td><td>${pet.vacinado == true ? 'S' : 'N' }</td><td>${pet.servicos}</td></tr>`;
    }
    conteudo += "</table>"
    return conteudo;
}

//Inseri novo pet
let adicionarPet = novoPet => {
    return pets.push(novoPet);
}

//Busca por nome do pet
const buscarPet = nomePet => {
    let petsEncontrados = pets.filter(pet => pet.nome == nomePet);
    return petsEncontrados;
};

const atenderPet = (pets, servico) => {
    let resposta;
    if(servico[0] == pets.nome && servico[1] == 'true'){
        pets.vacinado = true;
        resposta = `<p>Parabens ${pets.nome}, a vacina foi aplicada com sucesso! - <a href='/pets'>Listar pets</a></p>`;
    }
    else if(servico[2] == 'true') {
        if(pets.servicos){
            pets.servicos.push(servico[0]);
            pets.vacinado = true;
            resposta = `<p>Parabens ${pets.nome}, os servicos: ${servico[0]} e vacinacao foram adicionados com sucesso! - <a href='/pets'>Listar pets</a></p>`;
        } else{
            pets.servicos = [servico[0]];
            pets.vacinado = true;
            resposta = `<p>Parabens ${pets.nome}, os servicos: ${servico[0]} e vacinacao foram adicionados com sucesso! - <a href='/pets'>Listar pets</a></p>`;
        }
    }
    else {
        if(pets.servicos){
            pets.servicos.push(servico[0]);
            resposta = `<p>Parabens ${pets.nome}, os servicos: ${servico[0]} foram adicionados com sucesso! - <a href='/pets'>Listar pets</a></p>`;
        } else{
            pets.servicos = [servico[0]];
            resposta = `<p>Parabens ${pets.nome}, os servicos: ${servico[0]} foram adicionados com sucesso! - <a href='/pets'>Listar pets</a></p>`;
        }
    }
    return resposta;
}


module.exports = { listarPets, adicionarPet, buscarPet, atenderPet };