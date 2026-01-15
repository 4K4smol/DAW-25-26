// core/tareasStorage.js

export async function cargaTareas() {
  const data = localStorage.getItem("tareas");
  return data ? JSON.parse(data) : [];
}

export async function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
