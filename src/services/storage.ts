const { localStorage } = window;

export const set = (label: string, item: any) => {
  localStorage.setItem(label, item);
};

export const get = (label: string) => {
  return localStorage.getItem(label) || '';
};

export const clear = () => {
  localStorage.clear();
};
