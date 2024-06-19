import toast from 'react-hot-toast';

/// validdate login page username

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// validate password
function passwordVerify(error = {}, values) {
  const spicalChars = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!values.password) {
    error.username = toast.error('Password Required..!');
  } else if (values.password.includes(' ')) {
    error.username = toast.error('Wrong Password..!');
  } else if (values.password.length < 4) {
    error.username = toast.error(
      'Password must be more then 4 characters long'
    );
  } else if (!spicalChars.test(values.password)) {
    error.username = toast.error(
      'Password must be more then spical characters'
    );
  }
  return error;
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username..!');
  }
}
