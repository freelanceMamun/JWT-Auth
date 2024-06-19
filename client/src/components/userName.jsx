import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
// varifiy user  fun import
import { usernameValidate } from '../helper/validate';

import style from '../styles/user.module.css';
const userName = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center flex-col items-center h-screen">
        <div className={style.glass}>
          <div className="title flex py-10 flex-col items-center">
            <h1 className="text-5xl font-medium">Welcome</h1>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us
            </span>
          </div>
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className={style.profile_img}
                src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps('username')}
                className={style.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={style.btn} type="submit">
                Login
              </button>
            </div>

            <div className="text-center py-4">
              <span className=" text-gray-500">
                Not a Member{' '}
                <Link className=" text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default userName;
