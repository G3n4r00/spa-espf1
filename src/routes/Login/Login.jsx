import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {

    //Criando o Redirecionador!
    const navigate = useNavigate();

    //USE-STATE QUE VAI ARMAZENAR OS DADOS DO FORM.
    const [usuario,setUsuario] = useState({
        email: "",
        senha: ""
    })

    //PREENCHIMENTO DO FORM
    const handleChange = (e)=>{
        //DESTRUCTURING NOS CAMPOS DO FORM(NAME,INPUT).
        const {name,value} = e.target;
        //PREENCHENDO O USE-STATE COM OS VALORES DA DESESTRUTURAÇÃO, UTILIZANDO O OPERADOR SPREAD.
        setUsuario({...usuario,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        let users;
        let user;
        try {
            const response = await fetch("http://localhost:5000/usuarios");
            users = await response.json();
            
        } catch (error) {
            alert("Ocorreu um erro no processamento da sua solicitação!");    
        }

        //REALIZANDO A VALIDAÇÃO DO USUÁRIO.
        for (let x = 0; x < users.length; x++) {
                user = users[x];
            //REALIZANDO A COMPARAÇÃO DE FATO!
            if(user.email == usuario.email && user.senha == usuario.senha){
                alert("Login realizado com SUCESSO!")

                //Criando a autenticação:
                //Criando o token do usuário
                const tokenUser = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
                console.log(tokenUser);
                
                //Criando o SessionStorage
                sessionStorage.setItem("token-user",tokenUser);
                //Adicionando os dados do Usuário na sessão:
                sessionStorage.setItem("data-user", JSON.stringify(user));

                //REDIRECIONANDO O USUÁRIO PARA A PÁGINA HOME!
                navigate("/");
                return; 
            }
        }

        alert("Login ou senha incorretos!")
        setUsuario({
            email:"",
            senha:""
        });
    }

  return (
    <div>
        <h1>Login</h1>

        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>User Information:</legend>
                    <div>
                        <label htmlFor="idEmail">Email:</label>
                        {/*Para o prenchimento é obrigatório adicionar o atributo value e o evento onChange */}
                        <input type="email" name="email" id="idEmail" placeholder="Digite seu email." value={usuario.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="idSenha">Senha:</label>
                        <input type="password" name="senha" id="idSenha" placeholder="Digite sua senha." value={usuario.senha} onChange={handleChange}/>
                    </div>
                    <div>
                        <button>LOGIN</button>
                    </div>
                </fieldset>
            </form>
        </div>

    </div>
  )
}

    



    
    // Precismaos utilizar o await com o sync e tudo mais 
    // o then faz com que 
    // o javascript chega nas promises, isso quer dizer que ele tem que aguardar, que eh prometido que deve ser executado 


    // o async quer dizer que quando a egnte declara uma funcao como assincrona quer dizer que o fluxo eh diferente dentro da intrução 
    // ele vai detectar uma demora e vai largar a instrução para trás, ele vai criar uma thread e criar um subprocesso, 
    // ele vai deixar rodando em paralelo processando para continuar o fluxo principal 


    // As promises sao basicamente os then da vida, then catch 
