const http = require('http');
const petshop = require('./petshop');
const url = require('url');

const server = http.createServer((req, res)=> {
    res.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"});
    let urlCompleta = url.parse(req.url, true);
    let queryString = url.queryString;
    let rota = urlCompleta.pathname;

    console.log(urlCompleta);

    switch(rota){
        case '/home':
        res.write('***** Bem vindo ao Pet Shop *****')
        break;
        case '/pets' :
        // LISTA PETS
        let conteudo = petshop.listarPets();
        if(conteudo.length > 0){
            res.write(conteudo);
        }
        else {
            res.write('Nenhum pet cadastrado');
        }
        break;

        case '/pets/add':
        // ADICIONA PET
        let novoPet = queryString;
        
        if(petshop.adicionarPet(novoPet)){
            res.write(`${novoPet.nome} Adicionando Pet`)
            console.log(novoPet.nome);
        } else {
            res.write('Erro ao inserir novo pet');
        }
        break;

        case '/pets/buscar':
        // Realiza busca pet
        let nomePet = queryString.nome;
        let petsEncontrados = petshop.buscarPet(nomePet);
        if(petsEncontrados.length > 0){
            res.write(`${petsEncontrados.length} pets com o nome ${nomePet}`)
        } else {
            res.write('Opst, nenhum pet cadastrado com esse nome!');
        }
        break;

        default:
        res.write('404 - Não encontrato')
        break;
    }
    res.end();
}).listen(3000, 'localhost', ()=> {
    console.log('Servidor rodando');
})