import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {Header,Login,Signup,Footer,Home, Ide,AuthLayout} from "./components"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
          <>
           <AuthLayout authRequired={false}>
           <Header/>
           <Home/>
           <Footer/>
           </AuthLayout>
           </>
        )
      },
      {
        path:"/login",
        element:(
          <AuthLayout authRequired={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authRequired={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:"/ide",
        element:(
          <AuthLayout authRequired={true}>
            <Ide/>
          </AuthLayout>
        )
      },
      {
        path:"/guest",
        element:(
          <AuthLayout authRequired={false}>
            <Ide/>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
