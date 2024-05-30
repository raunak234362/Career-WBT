import { CgAdd } from "react-icons/cg"


const QuestionPage = () => {
  return (
    <div>
     <div className="flex flex-row gap-10 w-full p-5">
      <div className="flex flex-col w-1/4 gap-3 bg-white shadow-lg p-5 rounded-xl py-20">
        <h1 className=" text-2xl text-gray-600 font-bold text-center">No. Of Questions in Set-A</h1>

      </div>
      <div className="flex flex-col gap-3 w-1/4 bg-white shadow-lg p-5 rounded-xl py-20">
        <h1 className=" text-2xl text-gray-600 font-bold text-center">No. Of Questions in Set-B</h1>

      </div>
      <div className="flex flex-col gap-5 w-1/4 bg-white shadow-lg p-5 items-center rounded-xl py-20">
        <CgAdd className="mx-auto text-green-500 text-2xl"/>
        <button
        className="bg-green-500 text-xl text-white p-5 rounded-xl hover:bg-green-700 hover:font-semibold w-1/2">
          Add Questions
        </button>
      </div>
     </div>
     <div className=' h-80 table-container overflow-y-auto w-full p-5 rounded-lg'>
          <table className='w-full table-auto border-collapse text-center rounded-xl'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-1 py-2'>S.No</th>
                <th className='px-6 py-2'>Question</th>
                <th className='px-2 py-2'>Type</th>
                <th className='px-2 py-2'>Set</th>
                <th className='px-1 py-2'>Difficulty</th>
                <th className='px-1 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
     
    </div>
  )
}

export default QuestionPage
