import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
// varifiy user  fun import
import { registerValidation } from '../helper/validate';

import convartToBase64 from '../helper/convet';

import style from '../styles/user.module.css';
const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: registerValidation,
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
        <div className={style.glass}>
          <div className="title flex py-10 flex-col items-center">
            <h1 className="text-5xl font-medium"> Register Now </h1>
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
              <input
                {...formik.getFieldProps('email')}
                className={style.textbox}
                type="text"
                placeholder="Enter your email"
              />
              <input
                {...formik.getFieldProps('username')}
                className={style.textbox}
                type="text"
                placeholder="Enter your username"
              />
              <input
                {...formik.getFieldProps('password')}
                className={style.textbox}
                type="text"
                placeholder="password"
              />
              <button className={style.btn} type="submit">
                Register Now
              </button>
            </div>

            <div className="text-center py-4">
              <span className=" text-gray-500">
                All Ready Register?{' '}
                <Link className=" text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
