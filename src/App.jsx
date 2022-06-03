import { useState } from "react";

async function search(cep){

  if(cep.length >= 8) {
    document.getElementsByTagName('h6')[0].setAttribute("hidden",0);
      let a = await fetch(`https://viacep.com.br/ws/${cep.trim().replace("-","")}/json`, {method:'GET'}).then((response) => response.json());;
      console.log(a);
      if(!(a.erro)){
        document.getElementsByClassName('Info')[0].getElementsByTagName("span")[0].innerHTML = `${a.logradouro} - `;
        document.getElementsByClassName('Info')[0].getElementsByTagName("span")[1].innerHTML = `Bairro ${a.bairro}/`;;
        document.getElementsByClassName('Info')[0].getElementsByTagName("span")[2].innerHTML = `Cidade ${a.localidade}`;;
        document.getElementsByClassName('Info')[0].removeAttribute("hidden")
      }
      else{
        document.getElementsByClassName('Info')[0].setAttribute("hidden",0)
        document.getElementsByTagName('h6')[0].removeAttribute("hidden");
      }
    }
}

function App() {
  const [cep, setCep] = useState("");

  return (
    <div className="App">

      <header>
        <h1>BUSCAR CEP</h1>
        <input placeholder="Insira o CEP" onChange={(e)=>{setCep(e.target.value)}}></input><button onClick={()=>{search(cep.trim().replace("-","").replace(",","").replace(".",""))}}>OK</button>
        <br></br>
        <h6 hidden>Digite um CEP válido.</h6>
      </header>

      <div className="Info" hidden>
        <h2>{cep}</h2>
        <span>Rua: Santa Cruz - </span>
        <span>Bairro: Santa Cruz, </span>
        <span>Cidade: Gravataí</span>
      </div>

    <h5>Developer Jonas Martinez</h5>
    </div>
  );
}

export default App
