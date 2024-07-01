import create from 'zustand';

export const UseAuthStore = create((set) => {
  return {
    auth: {
      username: '',
    },
    setUsername: (name) => {
      return set((state) => ({ auth: { ...state.auth } }));
    },
  };
});
