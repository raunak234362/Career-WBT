import Layout from "./components/Layout"
import { FormProvider } from "./hooks/FormContext"

function App() {


  return (
    <>
  
    <FormProvider>
      
     <Layout/>
      
    </FormProvider>
    </>
  )
}

export default App
