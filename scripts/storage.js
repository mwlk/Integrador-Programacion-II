export function readLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}

export function addElementToStorage(key, value) {
  let collection = readLocalStorage(key);
  if (collection === null) {
    localStorage.setItem(key, JSON.stringify([value]));
    return;
  }

  collection.push(value);

  setLocalStorage(key, collection);
}
