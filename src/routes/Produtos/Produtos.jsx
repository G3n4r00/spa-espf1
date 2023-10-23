import { Link } from "react-router-dom";
import "./Produtos.scss";
import {AiTwotoneEdit as Editar} from "react-icons/ai"
import { RiDeleteBin2Fill as Excluir } from "react-icons/ri";
import { useEffect, useState} from "react"
import ModalAction from '../../components/ModalActions/ModalAction'

export default function Produtos() {
  document.title = "Lista de Produtos";

  //Js é uma linguagem assincrona, da para colocar os dados que ele não faz em ordem os comandos
  
  //O comando promisse diz que ele tem que executar ali em ordem ele precisa prometer que vai executar


  //Uqerer transmitir dados para a área de apresentação tem que usar useState
  //useState(valor inicial) -> retorna um array [valor, função]

  const [listaProdutosApi, setlistaProdutosApi] =  useState([]);
  const [open, setOpen] = useState(false)
  const [prodID] = useState(0)
  
  useEffect(
  ()=>{
  //Realizando o Request 
    fetch("http://localhost:5000/produtos")
  //Recebendo o Response e transformando em json
  //Tudo que viaja através do http é serializadp, eh textificado, transformado em bytes, então ele 

    .then((response)=> response.json())

  //Exibindo os dados no console
    .then((response)=> setlistaProdutosApi(response))

    .catch(error=> console.log(error))

  //precisa ser convertido pra json, ele sai de string e voltar a ser json
  // Devemos fazer isso com qualquer dado que colocamos em http, tudo que coloca no http ele vira text, saindo ele deve ser convertido de volta
  },[open])

  //controla o fluxo de execução dependendo do escopo que determinamos
  //escopo esse que nesse caso fará executar apenas uma vez


  //Criação da função para deletar itens 
  const handleDelete = (id)=>{
    fetch(`http://localhost:5000/produtos/${id}`, {method: `delete`})
    .then(()=> (window.location = `/produtos`))
    .catch((error)=> console.log(error))
  }



  return (
    <div>
      <h1>Produtos</h1>

      {open ? <ModalAction open={open} id={prodID} setOpen={setOpen} /> : ""}

      

      <table className="tblEstilo">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
            <th>EDITAR</th>
            <th>EXCLUIR</th>
          </tr>
        </thead>

        <tbody>
          {listaProdutosApi.map((item, indice) => (
            <tr key={indice} className="lineTbl">
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.desc}</td>
              <td>R$ {item.preco}</td>
              <td><Link to={`/editar/produtos/${item.id}`}> <Editar/> </Link></td>
              <td><Excluir onClick={handleDelete.bind(this, item.id)}/></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              QUANTIDADE DE PRODUTOS: {listaProdutosApi.length}
            </td>
          </tr>
        </tfoot>
      </table>
      <button className="btnAdicionarProduto" onClick={() => setOpen(true)}>ADICIONAR PRODUTO</button>
    </div>
  );
}