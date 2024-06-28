import axios from 'axios';

export async function authentication(username) {
  try {
    return axios.post('/api/authenticate', { username });
  } catch (error) {
    return { error: 'Username dose not found..!' };
  }
}

/// GEt user ]

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: 'Password Not match' };
  }
}

/// Register usr

export async function registerUser(cridentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post(`/api/register/`, cridentials);
    let { username, email } = cridentials;

    if (status === 201) {
      await axios.post(`/api/registerMail`, {
        username,
        userEmail: email,
        text: message,
      });
    }

    return Promise.resolve(message);
  } catch (error) {
    return { error: error };
  }
}

/// Login user

export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post(`/api/login`, { username, password });

      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: error });
  }
}

/// update user

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const { data } = await axios.put(`/api/updateuser`, response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: error });
  }
}

// OTP Gengerate

export async function OTPGenerator(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/generateOTP', { params: username });

    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });

      let text = 'Your Password Recovery OTP is' + ' ' + code + ' Verify ';

      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Verify Email',
      });
    }

    return Promise.resolve({ code });
  } catch (error) {
    return Promise.reject({ error: error });
  }
}

/// Veryfiy OTP

export async function verfiyOTP(username, code) {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', {
      params: { username, code },
    });

    return { data, status };
  } catch (error) {
    return Promise.reject({ error: error });
  }
}

// Reset pass

export async function resetPassworod({ username, password }) {
  try {
    const { data } = await axios.put('/api/resetPassword', {
      username,
      password,
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: error });
  }
}
