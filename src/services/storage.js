const { localStorage } = window;

export const set = (label, item) => {
  localStorage.setItem(label, item);
};

export const get = (label) => {
  return localStorage.getItem(label);
};

export const clear = () => {
  localStorage.clear();
};
