import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./EditarProdutos.scss";  // Importando os estilos do arquivo EditarProdutos.scss

export default function EditarProdutos() {
    // Obtendo o parâmetro "id" da URL usando o hook useParams do React Router
    const { id } = useParams();
    const navigation = useNavigate();  // Obtendo a função de navegação do React Router

    document.title = "Editar Produtos " + id;  // Definindo o título da página

    // Inicializando o estado local "produto" com useState para controlar os campos do formulário
    const [produto, setProduto] = useState({
        id: id,
        nome: '',
        desc: '',
        preco: ''
    });

    // Efeito que faz uma requisição GET para obter os detalhes do produto da API-JSON com base no ID
    useEffect(() => {
        fetch(`http://localhost:5000/produtos/${id}`)
        .then((response) => response.json())
        .then((response) => setProduto(response))
        .catch(error => console.log(error));
    }, [id]);

    // Função para lidar com as mudanças nos campos de input
    const handleChange = (e) => {
        // Destructuring para obter name e value do campo de input
        const { name, value } = e.target;

        // Atualizando o estado do "produto" com os novos valores do campo de input usando SPREAD
        setProduto({ ...produto, [name]: value });
    }

    // Função para lidar com o envio do formulário (atualizar os dados do produto)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviando uma requisição PUT para atualizar os dados do produto na API-JSON
        fetch(`http://localhost:5000/produtos/${id}`, {
            method: "PUT",  // Método da requisição
            headers: {
                "Content-Type": "application/json"  // Tipo de conteúdo da requisição (JSON)
            },
            body: JSON.stringify(produto)  // Convertendo o objeto "produto" em JSON para o corpo da requisição
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Dados alterados com sucesso!");  // Se os dados do produto foram atualizados com sucesso
            } else {
                console.log("Erro ao atualizar os dados do produto. Status: " + response.status);  // Se ocorreu um erro ao atualizar os dados do produto
            }
        })
        .catch(error => console.log(error));

        // Redirecionando para a página de produtos após a atualização bem-sucedida
        navigation("/produtos");
    }

    return (
        <div className='editarProdutos'>
            <h1>Editar Produto</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Produto Selecionado</legend>
                        {/* Campos de input para nome, descrição e preço do produto */}
                        <div>
                            <label htmlFor="">Nome:</label>
                            <input type="text" name="nome" placeholder="Digite o nome do Produto." value={produto.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="">Descrição:</label>
                            <input type="text" name="desc" placeholder="Digite a descrição do Produto." value={produto.desc} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="">Preço:</label>
                            <input type="text" name="preco" placeholder="Digite o preço do Produto." value={produto.preco} onChange={handleChange} />
                        </div>
                        {/* Botões para voltar para a página de produtos e salvar as alterações */}
                        <div className='botoes'>
                            <button className='btnVoltar'><Link to={`/produtos`}>Voltar</Link></button>
                            <button className='btnSalvar'>Salvar Alterações</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
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