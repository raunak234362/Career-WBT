
import { useAdminContext } from '../../hooks/AdminContext';

const AdminProfile = () => {
  const { adminData, error } = useAdminContext();

  if (error) {
    return <div>{error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white p-5">
      <div className="flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5">
        <img
          src={`https://wbt-quizcave.onrender.com/${adminData.profilePic}`}
          alt="Profile Pic"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold pt-5 text-gray-800 text-center">
          {adminData.name}
        </h3>
        <p className="text-center text-gray-600">{adminData.designation}</p>
        <div className="mt-4">
          <p><strong>Email:</strong> {adminData.email}</p>
          <p><strong>Phone:</strong> {adminData.phone}</p>
          <p><strong>User ID:</strong> {adminData.userId}</p>
          <p><strong>Role:</strong> {adminData.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
