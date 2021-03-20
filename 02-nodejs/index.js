/*
 0 - obter um usuario
 1- obter o numero de telefone de um usuario a partir de seu ID
 2 - obter o endereço do usuario pelo id
*/
//Import um modílo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

// função para obter usuario, sempre passa o callback (primeiro o erro segundo o sucesso) como ultimo paramento.
function obterUsuario() {
    //quandoder algum problema-> reject (ERRO)
    // quando sucess -> resolv
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Vitor',
                dataNascimento: new Date()
            })
        }, 1000)
    })


}

function obterTelefone(IdUsuario) {
    return new Promise(function resolverPromise(resolve,reject){
    setTimeout(() => {
        return resolve( {
            telefone: '1231314',
            ddd: 31
        })

    }, 2000);   

    })
    
}

function obterEndereco(IdUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'jose tall',
            numero: 12,
            bairro: 'São das quantas'
        })
    }, 2000);
}
function resolverUsuario(erro, usuario) {
    console.log('Usuario', usuario)

}

//1o passo adicionar a palavra async -> automaticamente ela retornará uma Promise 
main()
async function main(){
    try {
        console.time('medida - promise')//medir o tempo de execucao
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
         
        console.log(`
                Nome: ${usuario.nome}
                Endereço: Rua: ${endereco.rua }, Bairro: ${endereco.bairro}, Número: ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}

        `)
        console.timeEnd('medida - promise')

    } catch (error) {
        console.error('deu ruim jovem', error)
    }


}

/*
const usuarioPromise = obterUsuario()
//para maninpular a função sucesso usamos a função .then
//para manupular erro, usamos o .catch
// usu -> telefone -> telefone
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
                return{
                    usuario:{
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone:result
                }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
                Nome: ${resultado.usuario.nome}
                Endereço: Rua: ${resultado.endereco.rua }, Bairro: ${resultado.endereco.bairro}, Número: ${resultado.endereco.numero},
                Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}

        `)

    })
    .catch (function (error) {
        console.error('Deu ruim', error)
    })
*/
