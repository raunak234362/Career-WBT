/* eslint-disable react/prop-types */
import { useFormContext } from "../../hooks/FormContext";

const Profile = ({ isSameAddress }) => {
  const { formData } = useFormContext();

  return (
    <div className="max-full mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl flex font-bold mb-6 items-center justify-center text-center">Profile</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Student Name</h2>
        <p className="text-gray-700">
          {formData.Fname} {formData.Lname}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">College ID</h2>
        <p className="text-gray-700">{formData.CollegeID}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="text-gray-700">{formData.email}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Number</h2>
        <p className="text-gray-700">{formData.contact}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Final Semester</h2>
        <p className="text-gray-700">{formData.year}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Marks/CGPA</h2>
        <p className="text-gray-700">{formData.marks}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlogs</h2>
        <p className="text-gray-700">{formData.backlogs}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Address</h2>
        <p className="text-gray-700">{formData.address}</p>
        <p className="text-gray-700">
          {formData.city}, {formData.state}, {formData.country}, {formData.zip}
        </p>
      </div>

      {!isSameAddress && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Present Address</h2>
          <p className="text-gray-700">{formData.presentAddress}</p>
          <p className="text-gray-700">
            {formData.presentCity}, {formData.presentState}, {formData.presentCountry}, {formData.presentZip}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;