let usuarios = [];
let mensagens = [];
let usuario = prompt("Qual é o seu nome de usuário?")

/* ENVIAR PARA A API O NOVO USUARIO */

function entrou(usuario){
    const nomeusuario = {
        name: usuario
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeusuario);

    promise.catch(tratarErroUsuario);
}
function tratarErroUsuario(error){
    console.log(error.response);
        if(error.response.status === 400){
             usuario = prompt("Esse nome já existe! Digine outro nome de usuário");
        }
    }   

entrou(usuario)

/* MANTER ATUALIZAÇÃO DE STATUS */

function atualizarStatus(){
    const nomeusuario = {
        name: usuario
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeusuario);
}
setInterval(atualizarStatus, 4000);

/* BLOCO DE BUSCAR MENSGENS NA APT */

function pegarMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMsg);
}

function carregarMsg(response){
    mensagens = response.data;
    renderizarMsg();
}
function renderizarMsg(){
    const divCorpoDeMensagens = document.querySelector(".corpoDeMensagens");
    divCorpoDeMensagens.innerHTML = ""
    if (mensagens[i].type === "message"){
        for(let i=0; i<mensagens.length; i++){
            divCorpoDeMensagens.innerHTML+=`
                <div class="mensagens">
                    <span class="hora">${mensagens[i].time}</span>
                    <span class="remetente">${mensagens[i].from}</span>
                    <p>para</p>
                    <span class="destinatario">${mensagens[i].to}</span>
                    <span class="mensagem">${mensagens[i].text}</span>
                </div>`
        }
    }else if (mensagens[i].type === "status"){
        
        for(let i=0; i<mensagens.length; i++){
            divCorpoDeMensagens.innerHTML+=`
            <div class="entrousaiu">
                    <span class="hora">${mensagens[i].time}</span>
                    <span class="remetente">${usuarios[i]}</span>
                    <p>${mensagens[i].text}</p>
            </div>`
        }
    }else if (mensagens[i].type === "private_message"){
        for(let i=0; i<mensagens.length; i++){
            divCorpoDeMensagens.innerHTML+=`
            <div class="mensagens reservada">
                    <span class="hora">${mensagens[i].time}</span>
                    <span class="remetente">${mensagens[i].from}</span>
                    <p>reservadamente para</p>
                    <span class="destinatario">${mensagens[i].to}</span>
                    <span class="mensagem">${mensagens[i].text}</span>
            </div>`
        }
    }
}
setInterval(pegarMsg, 3000)

/* ENVIAR NOVA MENSAGEM PARA APT E RENDERIZAR */

function enviarMsg() {
  
  const from =  `${usuario}`;
  const to = "todos"
  const text = document.querySelector(".bottom").querySelector(".input").value;
  const type = "message"

  const novaMsg = {
      
	from: from,
	to: to,
	text: text,
	type: type
   }

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    novaMsg
  );

  promise.then(pegarMsg);

}


