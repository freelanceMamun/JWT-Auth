import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
// varifiy user  fun import
import { ProfileValidation } from '../helper/validate';
import style from '../styles/user.module.css';
import extend from '../styles/profile.module.css';

import convartToBase64 from '../helper/convet';

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      fristname: '',
      lastname: '',
      email: '',
      mobile: '',
      address: '',
    },
    validate: ProfileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
    },
  });

  // formik

  const onupload = async (e) => {
    const base64 = await convartToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center flex-col items-center h-screen">
        <div className={`${style.glass} ${extend.glass}`}>
          <div className="title flex py-10 flex-col items-center">
            <h1 className="text-5xl font-medium">Profile </h1>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Created A New Account
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={style.profile_img}
                  src={
                    file ||
                    'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
                  }
                  alt="avatar"
                />
              </label>
              <input
                onChange={onupload}
                className=" hidden"
                name="profile"
                type="file"
                id="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="flex w-3/4 gap-5">
                <input
                  {...formik.getFieldProps('email')}
                  className={style.textbox}
                  type="text"
                  placeholder="Frist name"
                />
                <input
                  {...formik.getFieldProps('username')}
                  className={style.textbox}
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <div className="flex w-3/4 gap-5">
                <input
                  {...formik.getFieldProps('password')}
                  className={style.textbox}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps('password')}
                  className={style.textbox}
                  type="text"
                  placeholder="password"
                />
              </div>

              <input
                placeholder="Address."
                type="text"
                className={style.textbox}
                {...formik.getFieldProps('password')}
              />

              <button className={style.btn} type="submit">
                update
              </button>
            </div>

            <div className="text-center py-4">
              <span className=" text-gray-500">
                come back later?{' '}
                <Link className=" text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
