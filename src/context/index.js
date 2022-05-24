import { createContext, useState, useContext } from 'react';

export const STORAGE_KEY = 'CHALLENGE';

export const storage = {
   get() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  },
  set: (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)),
};

const Context = createContext(storage.get());

const useProvider = () => {
  const [state, setState] = useContext(Context);
  const rehydrate = (data) => {
    storage.set(data);
  };

  const handleAdd = (dados) => {
    const newData = [...state, dados];

    setState(newData);
    rehydrate(newData);
  };

  const handleRemove = (id) => {
    const newData = state.filter((value) => value.id !== id);

    setState(newData);
    rehydrate(newData);
    console.log(id);
  };

  const handleEdit = (dados) => {
    const index = state.findIndex((value) => value.id === dados.id);

    if (index > -1) {
      const newData = state;

      newData[index] = dados;

      setState(newData);
      rehydrate(newData);
    }
  };

  return { handleAdd, handleRemove, handleEdit, items: state };
};

const Provider = ({ children }) => {
  const [state, setState] = useState(storage.get());

  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  )
};

const withProvider = (Component) => (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

export { useProvider };
export default withProvider;