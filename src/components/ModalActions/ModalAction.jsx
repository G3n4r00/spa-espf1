import { useState } from "react";
import "./ModalAction.scss";
import { useParams } from "react-router-dom";

export default function ModalAction(props) {
    
    const {id} = useParams()

    const [produto, setProduto] = useState({
        nome: "",
        desc: "",
        preco: "",
    })

    const handleChange = (e) => {

        //Aqui teremo o destructuring
        const { name, value} = e.target 

        //O proximo é para onderir os dados no useState do produto
        setProduto({...produto, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:5000/produtos/${id ? id: ""}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(produto)
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Produto adicionado com sucesso!");
          props.setOpen(false);
        } else {
          console.log("Erro ao adicionar o produto. Status: " + response.status);
        }
      })
      .catch((error) => console.log(error));
    };

    if (props.open) {
        return ( 
          <div className= "modal">
            <h1>NOVO PRODUTO</h1>    
            <div>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Dados do Produto</legend>
                  <div>
                    <label htmlFor="idNome">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      id="idNome"
                      value={produto.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="idDesc">Descrição</label>
                    <input
                      type="text"
                      name="desc"
                      id="idDesc"
                      value={produto.desc}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="idPreco">Preço</label>
                    <input
                      type="number"
                      name="preco"
                      id="idPreco"
                      value={produto.preco}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="botoes">
                    <button className="btnVoltar" onClick={() => props.setOpen(false)}>Voltar</button>

                    <button className="btnConfirmar">{id ? "EDITAR" : "Cadastrar"}</button>
                  </div>
                </fieldset>
              </form>
            </div>
            
          </div>
        );
      }
    }
    