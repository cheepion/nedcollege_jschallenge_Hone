
export const addData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getData = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export const updateData = (key, updatedValue) => {
  localStorage.setItem(key, JSON.stringify(updatedValue));
}

export const deleteData = (key) =>  {
  localStorage.removeItem(key);
}