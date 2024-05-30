/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./style/complete.css";

export const CompletedAssessment = ({result, contest}) => {
    const handleSubmit = async () => {
        const myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        myHeader.append("Authorization", `Bearer ${localStorage.getItem("access")}`);

        const requestOptions = {
            method: "POST",
            headers: myHeader,
            request: "follow"
        }

        alert("You answers are successfully submitted.\nYou will be notified when results are declared")
        // window.location.reload();

        const response = await fetch(`https://wbt-quizcave.onrender.com/api/v1/result/submit/${result._id}`, requestOptions);
        const data = await response.json();
        console.log(data);
        if(data.status === 200) {
            window.location.href = "https://whiteboard-website.web.app/";
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center my-20 select-none bg-white">
                <h1 className="text-[#6adb45] text-6xl font-bold text-center">Congratulations!</h1>
            <svg width="100" height="100" viewBox="0 0 50 50" className="text-[#6adb45] h-80 w-80">
                <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2" fill="transparent" className="circle"></circle>
                <path d="M15 25 L22 32 L35 18" stroke="currentColor" strokeWidth="2" fill="transparent" className="check"></path>
            </svg>
            <div className="my-10 flex flex-col items-center">
                <h1 className="text-black text-3xl font-semibold text-center">You have successfully completed the {contest?.name} quiz!</h1>
                <h1 className="text-black text-3xl font-semibold text-center my-5">Please do the final submission to release your score</h1>
                <button className="bg-[#6adb45] text-5xl font-semi-bold px-12 py-4 rounded-2xl border-2 hover:border-[#6adb45] hover:bg-white hover:text-[#6adb45] text-white"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>Submit</button>
            </div>
            </div>
        </>
    )
}