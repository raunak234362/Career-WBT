/* eslint-disable react/prop-types */
import parse from 'html-react-parser';

export const ContestRules = ({ description, rules, start }) => {
  return (
    <>
      <div className="w-1/2 mx-auto border-2 rounded-lg p-3 my-5">
        {
            (description) && (
              <div className="text-lg my-5">
                <div className="text-black text-2xl font-bold">Description</div>
                <div className='mx-8'>{parse(description)}</div>
              </div>
            
            )
        }
        {
            (rules) && (
              <div className="text-lg my-5">
              <div className="text-black text-2xl font-bold">Rules & Regulation</div>
              <div className='mx-10'>{parse(rules)}</div>
            </div>
            )
        }
        <div className="text-lg">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={ async (e) => {
              e.preventDefault();
              const info = await confirm("Please read the rules and regulation carefully before starting the assessment.\n\nDo you want to start the assessment?");
              if (info) {
                start(true);
              }
            }}
          >
            Start Assessment
          </button>
        </div>
      </div>
    </>
  );
};
