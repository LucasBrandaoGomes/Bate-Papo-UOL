let mensagens = [];
let usuario = prompt("Qual é o seu nome de usuário?")
const nomeusuario = {
        name: usuario
    };
const divCorpoDeMensagens = document.querySelector(".corpoDeMensagens");

/* ENVIAR PARA A API O NOVO USUARIO e MANTER ONLINE */

function entrar(nomeusuario){
    
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeusuario);
    requisicao.then(manterConexao);
    requisicao.catch(tratarErroUsuario);

}
function manterConexao(){
    setInterval(conexao, 4000);
    setInterval(pegarMsg, 3000);
    console.log("entrou");
}
function conexao(nomeusuario){
    const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeusuario);
    online.then(statusOnline);
}
function statusOnline(){
    console.log("online")
}
function tratarErroUsuario(error){
    console.log(error.response);
        if(error.response.status === 400){
             usuario = prompt("Esse nome já existe! Digine outro nome de usuário");
        }
    }   

entrar(nomeusuario)

/* BLOCO DE BUSCAR MENSGENS NA API */

function pegarMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMsg);
}

function carregarMsg(response){
    mensagens = response.data;
    renderizarMsg(divCorpoDeMensagens);
}
function renderizarMsg(divCorpoDeMensagens){
    divCorpoDeMensagens.innerHTML = ""
    for(let i=0; i<mensagens.length; i++){
        if (mensagens[i].type === "message"){
            divCorpoDeMensagens.innerHTML+=`
                <div class="mensagens">
                    <span class="hora">(${mensagens[i].time})</span>
                    <span class="remetente">${mensagens[i].from}</span>
                    <span>para</span>
                    <span class="destinatario">${mensagens[i].to}</span>
                    <span class="texto">${mensagens[i].text}</span>
                </div>`
        
        }else if (mensagens[i].type === "status"){
            divCorpoDeMensagens.innerHTML+=`
            <div class="entrousaiu">
                    <span class="hora">(${mensagens[i].time})</span>
                    <span class="remetente">${mensagens[i].from}</span>
                    <span class="texto">${mensagens[i].text}</span>
            </div>`
        }else if (mensagens[i].type === "private_message"){
            divCorpoDeMensagens.innerHTML+=`
            <div class="mensagens reservada">
                    <span class="hora">(${mensagens[i].time})</span>
                    <span class="remetente">${mensagens[i].from}</span>
                    <span>reservadamente para</span>
                    <span class="destinatario">${mensagens[i].to}</span>
                    <span class="texto">${mensagens[i].text}</span>
            </div>`
        }   
    }
    divCorpoDeMensagens.lastChild.scrollIntoView();
}

/* ENVIAR NOVA MENSAGEM PARA APT E RENDERIZAR */

function enviarMsg(usuario) {
  
  let from =  usuario;
  let to = "Todos"
  let text = document.querySelector(".bottom").querySelector("input").value;
  let type = "message";

  const novaMsg = {
      
	from: from,
	to: to,
	text: text,
	type: type
   }

  const envioDaMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMsg);
  envioDaMensagem.then(pegarMsg);
  text = "";
  envioDaMensagem.catch(tratarErroDeEnvio);
}
function tratarErroDeEnvio(error){
    alert("Você foi desconectado da sala, clique em OK para reestabelecer conexão");
    /*window.location.reload()*/
}


