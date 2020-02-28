const http = require('http');
const petshop = require('./petshop');
const url = require('url');

const server = http.createServer((req, res)=> {
    //res.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"});
    let urlCompleta = url.parse(req.url, true);
    let queryString = urlCompleta.query; // parametros
    let rota = urlCompleta.pathname; // ex: pets/add

    console.log(urlCompleta);

    switch(rota){
        case '/':
            //Home e Menu do sistema
            res.end("<h1>**** PET SHOP ****</h1><a href='/pets'>Lista pets</a> | <a href='/pets/adicionar'>Adicionar Pet</a> | <a href='/pets/buscapets'>Buscar pets</a>")
            break;

        case '/pets/adicionar' :
            res.end(`<h1>** Adicionar Pet **</h1><a href='/'>Home</a> | <a href='/pets'>Lista pets</a> | <a href='/pets/adicionar'>Adicionar Pet</a> | <a href='/pets/buscapets'>Buscar pets</a><p>Insira o nome do pet:<form method='GET' action='/pets/add?'><input type="text" name="nome" placeholder='Nome pet...' /><br/> <input type='text' name='tipo' placeholder='Tipo...' /><br/><input type='text' name='raca' placeholder='Raca...' /><br/><input name='genero' type='text' placeholder='Genero...' /> <br/><input type='number' name='idade' placeholder='Idade...' /> <br/><input type='radio' name='vacinado' value='false'/>Nao Vaciando <input type='radio' name='vacinado' value='true'/>Vaciando<br/><input type='submit' value='Inserir' /></form></p>`)
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
        if (petshop.adicionarPet(novoPet)) {
          res.write(`<p>${novoPet.nome} foi adicionado a nossa lista! - <a href='/pets'>Listar pets</a></p>`);
        } else {
          res.write("Ops, algo deu errado!");
        }
            break;

        case '/pets/buscapets' :
                res.end(`<h1>** Buscar Pet **</h1><a href='/'>Home</a> | <a href='/pets'>Lista pets</a> | <a href='/pets/adicionar'>Adicionar Pet</a> | <a href='/pets/buscapets'>Buscar pets</a><p>Insira o nome do pet:<form method='GET' action='/pets/buscar?'><input type="text" name="nome" /> - <input type='submit' value='Buscar' /></form></p>`)
                break;

        case '/pets/buscar':
        // Realiza busca pet
        let nomePet = queryString.nome;
        let petsEncontrados = petshop.buscarPet(nomePet);
        if (petsEncontrados.length > 0) {
          res.write(
            `<a href='/'>Home</a> | <a href='/pets'>Lista pets</a> | <a href='/pets/adicionar'>Adicionar Pet</a> | <a href='/pets/buscapets'>Buscar pets</a><p>Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}</p><p>Nome: ${nomePet}</p><p>Idade:${petsEncontrados[0].idade}</p><p>Vacinado: ${petsEncontrados[0].vacinado == true ? 'S' : 'N' }</p><p>Servicos: ${petsEncontrados[0].servicos}</p><h1>**Servicos disponiveis**</h1><p><form method='GET' action='/pets/servicos'><input type="checkbox" name="servico[]" value="Banho">Banho <input type="checkbox" name="servico[]" value="Tosa">Tosa <input type="checkbox" name="servico[]" value="Corte de Unhas">Corte de Unhas <input type='hidden' name='petEncontrado' value='${petsEncontrados[0].nome}' /><input type="checkbox" name="vacinado" value="true">Vacina <input type='submit' value='Registrar'/></form></p>`
          );
        } else {
          res.write("Ops, nenhum pet cadastrado com esse nome!");
        }
            break;
      
        case '/pets/servicos':
        // ADICIONA SERVICOS PET
          let json = JSON.parse(JSON.stringify(queryString));
          let obj = Object.values(json)
          let petEncontr = petshop.buscarPet(queryString.petEncontrado)
          console.log(obj)
          let retorno = petshop.atenderPet(petEncontr[0], obj)
          
          res.write(retorno);
            break;

        default:
        res.write('404 - Nao encontrato')
            break;
    }
    res.end();
}).listen(3000, 'localhost', ()=> {
    console.log('Servidor rodando');
})