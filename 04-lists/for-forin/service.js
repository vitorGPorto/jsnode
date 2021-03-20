const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {

    const url = `${URL}/?search=${nome}&format=json` //para não ter que digitar novamente chamei a variavel 
    const response = await axios.get(url)
    return response.data

}

// para exporta pessoas
module.exports = {
obterPessoas // se a chave do meu obj for o mesmo nome do valor, eu não preciso passa o valor

}
