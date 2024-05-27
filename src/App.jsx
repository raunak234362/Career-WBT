import Layout from "./components/Layout"
import { AdminProvider } from "./hooks/AdminContext"

import { ContestProvider } from "./hooks/ContestContext"
import { FormProvider } from "./hooks/FormContext"

function App() {


  return (
    <>
    <AdminProvider>
    <ContestProvider>
    <FormProvider>
      
     <Layout/>
      
    </FormProvider>
    </ContestProvider>
    </AdminProvider>
    </>
  )
}

export default App
