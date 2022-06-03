import { useState } from "react";

function App() {
  const [cepI, setCep] = useState("");
  const [data, setData] = useState([]);
  const [erro, setErro] = useState("");

   const updateDatas = async (cepIn)=>{
     console.log("CEP TENTATIVA:",cepIn)
    setErro("")
      
    const { cep, logradouro, bairro, localidade} = await fetch(`https://viacep.com.br/ws/${cepIn.trim().replaceAll("-","").replaceAll(",","").replace(".","")}/json`, {method:'GET'}).then((response) => response.json());
    console.log(cep, logradouro, bairro, localidade)
    
      if([cep, logradouro, bairro, localidade].every((a)=>{return (a != undefined)}) ){

        setData({cep, logradouro, bairro, localidade})
        return document.querySelector(".Info").removeAttribute("hidden")
        
      }

      document.querySelector(".Info").setAttribute("hidden", 0)
    return setErro(`Algo inesperado aconteceu.`)
  }

  return (
    <div className="App">

      <header>
        <h1>BUSCAR CEP</h1>
        <input placeholder="Insira o CEP" onChange={(e)=>{setCep(e.target.value)}}></input><button onClick={()=>{updateDatas(cepI)}}>OK</button>
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
