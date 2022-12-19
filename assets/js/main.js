(function(){
function criaHoraDosSegundos(segundos){
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pr-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}
const $body = document.querySelector('.body')
const $relogio = document.querySelector('.relogio');
const $iniciar = document.querySelector('.iniciar');
const $marcaTempo = document.querySelector('.marcaTempo')

let segundos = 0;
let timer;
let rodando = false;

function criaLi(){
    const li = document.createElement('li');
    return li;
};

function criaBotaoApagar($marcaTempo){
    $marcaTempo.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar'
    $marcaTempo.appendChild(botaoApagar);
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar essa tarefa')
    
};

function criaMarcaTempo(){
    const li = criaLi();
    li.innerHTML = criaHoraDosSegundos(segundos);
    $marcaTempo.appendChild(li);
    criaBotaoApagar(li);
    
};

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
    }

})

function iniciaRelogio(){
    timer = setInterval(function(){
    segundos++;
    $relogio.innerHTML = criaHoraDosSegundos(segundos);
}, 1000)
}

function colors(condição){
    if(rodando === true){
        $body.classList.remove('parado')
        $relogio.classList.remove('pausado')
        $body.classList.add('rodando')
        $relogio.classList.add('iniciado')
    } else{
        $body.classList.remove('rodando')
        $relogio.classList.remove('iniciado')
        $body.classList.add('parado')
        $relogio.classList.add('pausado')
        }
    }

document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('iniciar')){
        clearInterval(timer);
        $iniciar.innerHTML = 'Iniciar';
        rodando = true
        iniciaRelogio()
        colors()
    } 
    
    if(el.classList.contains('pausar')){
        if(rodando === true){
            clearInterval(timer);
            $iniciar.innerHTML = 'Retomar';
            rodando = false
            criaMarcaTempo(criaHoraDosSegundos(segundos))
            colors()
        }
        
    }
    
    if(el.classList.contains('zerar')){
        clearInterval(timer);
        $relogio.classList.remove('pausado')
        $relogio.classList.remove('iniciado')
        $body.classList.remove('rodando')
        $body.classList.remove('parado')
        $relogio.innerHTML = '00:00:00';
        $iniciar.innerHTML = 'Iniciar';
        segundos = 0;
        rodando = false
    }
})

})();



