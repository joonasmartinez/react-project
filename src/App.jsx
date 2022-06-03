import { useState } from "react";

function App() {
  const [cepI, setCep] = useState("");
  const [data, setData] = useState([]);
  const [erro, setErro] = useState("");

   const updateDatas = async (cepIn)=>{

    setErro("")
     
    try{
    const { cep, logradouro, bairro, localidade} = await fetch(`https://viacep.com.br/ws/${cepIn.trim().replaceAll("-","").replaceAll(",","").replace(".","")}/json`, {method:'GET'}).then((response) => response.json());
    
      if([cep, logradouro, bairro, localidade].every((a)=>{return (a != undefined)}) ){

        setData({cep, logradouro, bairro, localidade})
        return document.querySelector(".Info").removeAttribute("hidden")
        
      }
    }catch(e){
      setErro(`Não foi possível localizar o CEP`);
    }
    setErro(`Digite um CEP válido.`);
  return document.querySelector(".Info").setAttribute("hidden", 0)
  
  }

  return (
    <div className="App">

      <header>
        <h1>BUSCAR CEP</h1>
        <form>
          <input placeholder="Insira o CEP" onChange={(e)=>{setCep(e.target.value)}}></input><button onClick={(e)=>{e.preventDefault(),updateDatas(cepI)}}>OK</button>
        </form>
        <br></br>
        <h6>{erro}</h6>
      </header>

      <div className="Info" hidden>
        <h2>{data.cep}</h2>
        <span>{`${data.logradouro} - `}</span>
        <span>{`${data.bairro} / `}</span>
        <span>{`${data.localidade}. `}</span>
      </div>

    <footer>Desenvolvido por Jonas Martinez</footer>
    </div>
  );
}

export default App
