export function loadDataAsObject(key: string): Record<string, string> {
  const data = localStorage.getItem(key)
  if(data !== null) {
    try {
      const parsed = JSON.parse(data)
      if(parsed instanceof Object && !(parsed instanceof Array)) {
        return parsed
      }
    } catch (err) {
      console.error(err);
    }
  }
  return ({})
}

export function storeDataAsJson(key: string, data: object) {
  try{
    const json = JSON.stringify(data)
    localStorage.setItem(key, json)
  } catch (err) {
    console.error(err)
  }
}

export function clearData(key: string) {
  localStorage.removeItem(key);
}