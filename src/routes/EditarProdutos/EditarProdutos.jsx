import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import "./EditarProdutos.scss"

export default function EditarProdutos() {

    const {id} = useParams();
    const navigation = useNavigate()

    document.title = "Editar Produtos " + id; 

    const[produto,setProduto] = useState({
      id:id,
      nome:'',
      desc:'',
      preco:''
    });

    //Criar uma estratégia para recuperar o produto da API-JSON com fetch, utilizando GET:
    useEffect(()=>{
      
      fetch(`http://localhost:5000/produtos/${id}`)
      .then((response)=> response.json())
      .then((response)=> setProduto(response))
      .catch(error=> console.log(error));

    },[id]);
    
    const handleChange = (e)=>{

      //Destructuring
      const {name,value} = e.target;

      //Setando os dados diretamente no objeto atravé de SPREAD
      setProduto({...produto,[name]:value});
      
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
   
        fetch(`http://localhost:5000/produtos/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(produto)
        })
        .then((response)=> console.log("Dados alterado com sucesso - STATUS CODE : " + response.status))
        .catch(error=> console.log(error));

        //Redirect
        navigation("/produtos");
    }

  return (
    <div className='editarProdutos'>
        <h1>Editar Produto</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Produto Selecionado</legend>
                <div>
                  <label htmlFor="">Nome:</label>
                  <input type="text" name="nome" placeholder="Digite o nome do Produto." value={produto.nome} onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="">Descrição:</label>
                  <input type="text" name="desc" placeholder="Digite a descrição do Produto." value={produto.desc} onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="">Preço:</label>
                  <input type="text" name="preco" placeholder="Digite o preço do Produto." value={produto.preco} onChange={handleChange}/>
                </div>
                <div className='botoes'>
                  <button className='btnVoltar'><Link to={`/produtos`}>Voltar</Link></button>
                  <button className='btnSalvar'>Salvar</button>
                </div>
              </fieldset>
            </form>
          </div>

    </div>
  )
}



//2ª FORM DE INPUT COM useState
// if(name == "nome"){
//   setProduto({"nome":value,"desc":produto.desc,"preco":produto.preco});
// }else if(name == "desc"){
//   setProduto({"nome":produto.nome,"desc":value,"preco":produto.preco});
// }else if(name == "preco"){
//   setProduto({"nome":produto.nome,"desc":produto.desc,"preco":value});
// }

// //1ª FORMA DE INPUT COM useState
// <form>
// <fieldset>
//   <legend>Produto Selecionado</legend>
//   <div>
//     <label htmlFor="">Nome:</label>
//     <input type="text" name="nome" placeholder="Digite o nome do Produto." value={produto.nome} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <label htmlFor="">Descrição:</label>
//     <input type="text" name="desc" placeholder="Digite a descrição do Produto." value={produto.desc} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <label htmlFor="">Preço:</label>
//     <input type="text" name="preco" placeholder="Digite o preço do Produto." value={produto.preco} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <button>EDITAR</button>
//   </div>
// </fieldset>
// </form>