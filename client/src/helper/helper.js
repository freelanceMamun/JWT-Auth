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

/// Login usr
