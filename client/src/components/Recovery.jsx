import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { passwordValidate } from '../helper/validate';
import style from '../styles/user.module.css';

const Recovery = () => {
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center flex-col items-center h-screen">
        <div className={style.glass}>
          <div className="title flex py-10 flex-col items-center">
            <h1 className="text-3xl font-medium"> Recovery password </h1>
            <span className="py-4 text-xl  text-center text-gray-500">
              Enter OTP To Recovery Password
            </span>
          </div>
          <form action="" className=" pt-5">
            <div className="textbox flex flex-col items-center gap-6">
              <span className="text-md text-gray-500 text-left py-4">
                Enter 6 Digit OTP sent to your email address
              </span>
              <input className={style.textbox} type="text" placeholder="OTP" />
              <button className={style.btn} type="submit">
                Recover Now
              </button>
            </div>

            <div className="text-center py-4">
              <span className=" text-gray-500">
                Can't get OTP? <button className=" text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
