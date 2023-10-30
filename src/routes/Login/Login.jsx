import { useState } from "react"

export default function Login() {


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

  return (
    <div>
        <h1>Login</h1>

        <div>
            <form>
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
