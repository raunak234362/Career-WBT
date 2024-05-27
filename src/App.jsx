import Layout from "./components/Layout"
import { ContestProvider } from "./hooks/ContestContext"
import { FormProvider } from "./hooks/FormContext"

function App() {


  return (
    <>
    <ContestProvider>
    <FormProvider>
     <Layout/>
    </FormProvider>
    </ContestProvider>
    </>
  )
}

export default App
