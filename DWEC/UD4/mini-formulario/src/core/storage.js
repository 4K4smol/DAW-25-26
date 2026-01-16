export async function guardarStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function devolverStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
