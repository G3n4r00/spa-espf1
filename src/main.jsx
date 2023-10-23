import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'

//BLOCO DAS ROTAS
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Produtos from './routes/Produtos/Produtos.jsx';
import EditarProdutos from './routes/EditarProdutos/EditarProdutos.jsx';
import Erro404 from './routes/Erro404.jsx';
//BLOCO DAS ROTAS

const router = createBrowserRouter([
  {path:"/",element: <App/>,errorElement:<Erro404/>,
   children:[
    {path:"/", element:<Home/>},
    {path:"/produtos",element:<Produtos/>},
    {path:"/editar/produtos/:id",element:<EditarProdutos/>},
   ] 
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router}/>
  
)



  // <React.StrictMode>
  // useStrict te força a fazer declarações, começa a forçar a usar js no tipo typescript
