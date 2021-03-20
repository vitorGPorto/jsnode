const EventEmitter = require('events')
class MeuEmissor extends EventEmitter{

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:clcik'
meuEmissor.on(nomeEvento, function(clcik){
    console.log('um usuario clicou', clcik)

})

const stdin = process.openStdin()
stdin.addListener('data', function(value){
    console.log(`Voce digitou: ${value.toString().trim()}`)
})