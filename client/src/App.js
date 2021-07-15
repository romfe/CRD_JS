import './App.css';
import { useState } from "react";
import Axios from 'axios';
import moment from 'moment';


function App() {

  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState(new Date());
  const [admissao, setAdmissao] = useState(new Date());
  const [funcao, setFuncao] = useState("");

  const [listaPessoas, setLista] = useState([]);

  const deletarDados = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setLista(listaPessoas.filter((val) => {
        return val.id_pessoa != id
      }))
    })
  }

  const salvarDados = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      rg: rg,
      cpf: cpf,
      nascimento: nascimento,
      admissao: admissao,
      funcao: funcao
    }).then(() => {
      setLista([...listaPessoas, {
        nome: nome,
        rg: rg,
        cpf: cpf,
        nascimento: nascimento,
        admissao: admissao,
        funcao: funcao
      },]);
    });
  };

  const consultarDados = () => {
    Axios.get("http://localhost:3001/pessoas").then((response) => {
      setLista(response.data);
    });
  };

  return (
    <div className="App">
      <div className="form">
        <button onClick={consultarDados}>Exibir dados</button>
        {listaPessoas.map((val, key) => {
          return <div className="pessoas">
            <h3>Nome: {val.nome}</h3>
            <h3>RG: {val.rg}</h3>
            <h3>Data de Admissão: {moment(val.data_admissao).format('DD/MM/YYYY')}</h3>
            <div>
              <button onClick={() => { deletarDados(val.id_pessoa) }}>Remover</button>
            </div>
          </div>
        })}
      </div>
      <div className="form">
        <label>Nome: </label>
        <input type="text" maxLength="100"
          onChange={(event) => { setNome(event.target.value); }} />
        <label>  RG: </label>
        <input type="text" maxLength="100"
          onChange={(event) => { setRg(event.target.value); }} />
        <label>  CPF: </label>
        <input type="text" maxLength="100"
          onChange={(event) => { setCpf(event.target.value); }} />
        <label>  Data de Nascimento: </label>
        <input type="date"
          onChange={(event) => { setNascimento(event.target.value); }} />
        <label>  Data de Admissão: </label>
        <input type="date"
          onChange={(event) => { setAdmissao(event.target.value); }} />
        <label>  Função: </label>
        <input type="text" maxLength="100"
          onChange={(event) => { setFuncao(event.target.value); }} />
        <button onClick={salvarDados}>Adicionar</button>
      </div>
    </div>

  );
}

export default App;
