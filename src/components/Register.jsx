/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    profilePic: '',
    resume: '',
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    password: '',
    dob: '',
    studentId: '',
    gender: '',
    fatherName: '',
    motherName: '',
    currentSemester: '',
    marksheet:'',
    branch: '',
    course: '',
    college: '',
    cgpa: '',
    passingYear: '',
    backlog: '',
    permAddress: {
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    },
    currAddress: {
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    }
  });

  const [isSameAddress, setIsSameAddress] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const navigate = useNavigate();

  const courseSemesterMap = {
    'BE/BTECH': ['Semester-7', 'Semester-8', 'Passout'],
    'BCA': ['Semester-5', 'Semester-6', 'Passout'],
    'BBA': ['Semester-5', 'Semester-6', 'Passout'],
    'BCOM': ['Semester-5', 'Semester-6', 'Passout'],
    'MBA': ['Semester-3', 'Semester-4', 'Passout'],
    'MTECH': ['Semester-3', 'Semester-4','Passout'],
    'DIPLOMA': ['Semester-3', 'Semester-4', 'Passout']
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData({ ...formData, course: selectedCourse, currentSemester: '' });
  };

  const handleSemesterChange = (e) => {
    setFormData({ ...formData, currentSemester: e.target.value });
  };

  const getSemesters = () => {
    const selectedCourse = formData.course;
    return courseSemesterMap[selectedCourse] || [];
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
    if (!isSameAddress) {
      setFormData((prevState) => ({
        ...prevState,
        currAddress: { ...prevState.permAddress }
      }));
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === 'profile') {
      setProfilePreview(URL.createObjectURL(file));
      setFormData((prevState) => ({
        ...prevState,
        profilePic: file
      }));
    }else if (fileType === 'marksheet'){
      setFormData((prevState) => ({
       ...prevState,
        marksheet: file
      }));
    } else if (fileType === 'resume') {
      setResumeName(file.name);
      setFormData((prevState) => ({
        ...prevState,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    );

    const sem = formData?.currentSemester?.charAt(formData.currentSemester.length -1);

    const form = new FormData();
    form.append('profile', formData.profilePic);
    form.append('resume', formData.resume);
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('altphone', formData.altPhone);
    form.append('password', formData.password);
    form.append('dob', formData.dob);
    form.append('studentId', formData.studentId);
    form.append('gender', formData.gender);
    form.append('fatherName', formData.fatherName);
    form.append('motherName', formData.motherName);
    form.append('currentSemester', (isNaN(Number.parseInt(sem))? 0 : Number.parseInt(sem)));
    form.append('marksheet', formData.marksheet);
    form.append('branch', formData.branch);
    form.append('course', formData.course);
    form.append('college', formData.college);
    form.append('passingYear', formData.passingYear);
    form.append('cgpa', formData.cgpa);
    form.append('backlog', formData.backlog);
    form.append('permAddress', JSON.stringify(formData.permAddress));
    form.append('currAddress', JSON.stringify(formData.currAddress));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/user/register`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('access', data?.data?.accessToken);
        localStorage.setItem('refresh', data?.data?.refreshToken);

        setFormData(data?.data);
        console.log(data?.data);
        navigate('/student/');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='flex flex-col border mx-[20%] my-3 rounded-lg p-4 bg-white shadow-lg shadow-green-500/50'>
        <img
          src={Logo}
          className='w-[20%] justify-center items-center m-auto mb-5'
          alt='Logo'
        />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='Name'>Student Name</label>
            <div className='flex flex-row w-full gap-3 mt-2'>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData?.name}
                required
                placeholder='Name'
                id='name'
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Student Email</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='email'
              value={formData?.email}
              required
              placeholder='Email'
              id='email'
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='CollegeID'>Student ID</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.studentId}
              required
              placeholder='Student ID'
              id='studentId'
              onChange={e =>
                setFormData({ ...formData, studentId: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Password</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='password'
              value={formData?.password}
              required
              placeholder='Password'
              id='password'
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Student Contact Number</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.phone}
              required
              placeholder='Contact Number'
              id='phone'
              onChange={e =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Alternate Contact Number</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.altPhone}
              
              placeholder='Alternative Contact Number'
              id='altphone'
              onChange={e =>
                setFormData({ ...formData, altPhone: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Father Name</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.fatherName}
              required
              placeholder='Father Name'
              id='fatherName'
              onChange={e =>
                setFormData({ ...formData, fatherName: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Mother Name</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.motherName}
              required
              placeholder='Mother Name'
              id='motherName'
              onChange={e =>
                setFormData({ ...formData, motherName: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Gender</label>
            <select
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              value={formData?.gender}
              required
              id='gender'
              onChange={e =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Date of Birth</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='date'
              value={formData?.dob}
              required
              placeholder='Date of Birth'
              id='dob'
              onChange={e => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>College Name</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.college}
              required
              placeholder='College Name'
              id='college'
              onChange={e =>
                setFormData({ ...formData, college: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Branch</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.branch}
              placeholder='Branch'
              id='branch'
              onChange={e =>
                setFormData({ ...formData, branch: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
        <label htmlFor='course'>Course</label>
        <select
          className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
          value={formData.course}
          required
          id='course'
          onChange={handleCourseChange}
        >
          <option value=''>Select Your Course</option>
          <option value='BE/BTECH'>B.E/B.Tech</option>
          <option value='BCA'>Bachelor's of Computer Applications</option>
          <option value='BBA'>Bachelor's of Business Administrations</option>
          <option value='BCOM'>Bachelor's of Commerce</option>
          <option value='MBA'>Master's of Business Administrations</option>
          <option value='MTECH'>M.Tech</option>
          <option value='DIPLOMA'>Diploma</option>
        </select>
      </div>

      <div className='mt-3'>
        <label htmlFor='currentSemester'>Select Semester</label>
        <select
          className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
          value={formData.currentSemester}
          required
          id='currentSemester'
          onChange={handleSemesterChange}
        >
          <option value=''>Current Semester</option>
          {getSemesters().map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>
          <div className='mt-3'>
            <label htmlFor='email'>CGPA</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='number'
              step='0.01'
              min='0'
              max='10'
              value={formData?.cgpa}
              required
              placeholder='CGPA'
              id='cgpa'
              onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Backlog</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='number'
              min='0'
              value={formData?.backlog}
              required
              placeholder='Backlog'
              id='backlog'
              onChange={e =>
                setFormData({ ...formData, backlog: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Year of Passing</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='number'
              min='2000'
              max='2030'
              value={formData?.passingYear}
              required
              placeholder='Passing Year'
              id='passingYear'
              onChange={e =>
                setFormData({ ...formData, passingYear: e.target.value })
              }
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='marksheet'>Upload Marksheet</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='file'
              id='marksheet'
              accept='.pdf,.doc,.docx'
              onChange={async (e) => {
                handleFileChange(e,'marksheet')
                await setFormData(prevState => ({
                 ...prevState,
                 'marksheet': e?.target?.files[0]
                }))
              }}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='profile'>Upload Profile Image</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='file'
              id='profile'
              accept='image/*'
              onChange={ async (e) => {
                handleFileChange(e, 'profile')
                await setFormData(prevState => ({
                  ...prevState,
                    'profile': e?.target?.files[0]
                  }))
              }}
            />
            {profilePreview && (
              <div className='mt-2'>
                <img
                  src={profilePreview}
                  alt='Profile Preview'
                  className='w-20 h-20 rounded-full'
                />
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label htmlFor='resume'>Upload Resume</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='file'
              id='resume'
              accept='.pdf,.doc,.docx'
              onChange={async (e) => {
                handleFileChange(e,'resume')
                await setFormData(prevState => ({
                 ...prevState,
                 'resume': e?.target?.files[0]
                }))
              }}
            />
            {resumeName && (
              <div className='mt-2'>
                <p>Resume: {resumeName}</p>
              </div>
            )}
          </div>
          <div className='mt-3'>
            <label htmlFor='permanentAddress'>Permanent Address</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData?.permAddress?.streetLine1}
              required
              placeholder='Street Line 1'
              id='permanentStreetLine1'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    streetLine1: e.target.value
                  }
                })
              }
            />
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
              type='text'
              value={formData?.permAddress?.streetLine2}
              placeholder='Street Line 2'
              id='permanentStreetLine2'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    streetLine2: e.target.value
                  }
                })
              }
            />
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
              type='text'
              value={formData?.permAddress?.city}
              required
              placeholder='City'
              id='permanentCity'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    city: e.target.value
                  }
                })
              }
            />
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
              type='text'
              value={formData?.permAddress?.state}
              required
              placeholder='State'
              id='permanentState'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    state: e.target.value
                  }
                })
              }
            />
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
              type='text'
              value={formData?.permAddress?.country}
              required
              placeholder='Country'
              id='permanentCountry'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    country: e.target.value
                  }
                })
              }
            />
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
              type='text'
              value={formData?.permAddress?.zip}
              required
              placeholder='Zip Code'
              id='permanentZip'
              onChange={e =>
                setFormData({
                  ...formData,
                  permAddress: {
                    ...formData?.permAddress,
                    zip: e.target.value
                  }
                })
              }
            />
          </div>
          <div className='mt-3'>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                checked={isSameAddress}
                onChange={handleCheckboxChange}
                className='form-checkbox'
              />
              <span className='ml-2'>Same as Permanent Address</span>
            </label>
          </div>
          {!isSameAddress && (
            <div className='mt-3'>
              <label htmlFor='currentAddress'>Current Address</label>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData?.currAddress?.streetLine1}
                required
                placeholder='Street Line 1'
                id='currentStreetLine1'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      streetLine1: e.target.value
                    }
                  })
                }
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
                type='text'
                value={formData?.currAddress?.streetLine2}
                placeholder='Street Line 2'
                id='currentStreetLine2'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      streetLine2: e.target.value
                    }
                  })
                }
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
                type='text'
                value={formData?.currAddress?.city}
                required
                placeholder='City'
                id='currentCity'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      city: e.target.value
                    }
                  })
                }
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
                type='text'
                value={formData?.currAddress?.state}
                required
                placeholder='State'
                id='currentState'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      state: e.target.value
                    }
                  })
                }
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
                type='text'
                value={formData?.currAddress?.country}
                required
                placeholder='Country'
                id='currentCountry'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      country: e.target.value
                    }
                  })
                }
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer mt-2'
                type='text'
                value={formData?.currAddress?.zip}
                required
                placeholder='Zip Code'
                id='currentZip'
                onChange={e =>
                  setFormData({
                    ...formData,
                    currAddress: {
                      ...formData?.currAddress,
                      zip: e.target.value
                    }
                  })
                }
              />
            </div>
          )}
          <div className='mt-6'>
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterStudent
