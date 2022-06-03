import { useState } from "react";

function App() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState([]);
  const [erro, setErro] = useState("");

   const updateDatas = async (cep)=>{
    try{
      setErro("")
    const {logradouro, bairro, localidade} = await fetch(`https://viacep.com.br/ws/${cep.trim().replace("-","")}/json`, {method:'GET'}).then((response) => response.json());
  
    
      if([logradouro, bairro, localidade].every((a)=>{return (a != undefined)}) ){

        setData({logradouro, bairro, localidade})
        
      }

    }catch(e){
      setErro(`Algo inesperado aconteceu.`)
    }
    
  }

  return (
    <div className="App">

      <header>
        <h1>BUSCAR CEP</h1>
        <input placeholder="Insira o CEP" onChange={(e)=>{setCep(e.target.value)}}></input><button onClick={()=>{updateDatas(cep.trim().replaceAll("-","").replaceAll(",","").replace(".",""))}}>OK</button>
        <br></br>
        <h6>{erro}</h6>
      </header>

      <div className="Info">
        <h2>{cep}</h2>
        <span>{`${data.logradouro} - `}</span>
        <span>{`${data.bairro} / `}</span>
        <span>{`${data.localidade}. `}</span>
      </div>

    <footer>Desenvolvido por Jonas Martinez</footer>
    </div>
  );
}

export default App
