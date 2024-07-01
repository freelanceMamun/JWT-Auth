import toast from 'react-hot-toast';
import { authentication } from './helper';

/// validdate login page username

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authentication(values.username);

    if (status !== 200) {
      errors.exist = toast.error('User dose not exist');
    }
  }

  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// validate password
export function passwordVerify(error = {}, values) {
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
export function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username..!');
  }
}

// Validate Reset password

export async function resetPasswordValidteion(values) {
  const error = passwordVerify({}, values);

  if (values.password !== values.confirm_PWd) {
    error.exist = toast.error('Password Not match...!');
  }
  return error;
}

/// validate register form

export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

// === email varify

export function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Invalid Email...!');
  }

  return error;
}

/// Validate Profile page

export async function ProfileValidation(values) {
  const erros = emailVerify({}, values);

  return erros;
}
