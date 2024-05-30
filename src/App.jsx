import { useEffect } from "react";
import Layout from "./components/Layout"
import { FormProvider } from "./hooks/FormContext"

function App() {
  

  useEffect(() => {
    window.document.title = `Whiteboard Technologies Pvt. Ltd.`;
  }, []);

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktop) {
    return (
      <>
        <div className="text-red-500">
          Please Open in Desktop Browser
        </div>
      </>
    )
  }


  return (
    <>
  
    <FormProvider>
      
     <Layout/>
      
    </FormProvider>
    </>
  )
}

export default App
