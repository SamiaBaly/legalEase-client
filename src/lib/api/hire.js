import { serverFetch } from "../core/sever";

export const getHiresbById = async (id) => { 
  console.log(id,'from hire action');
  return serverFetch(`/api/hires/${id}`)
  // http://localhost:9000/api/hires/6a38a89514bb00b6b920af13
}
export const getHires = async () => { 
  return serverFetch(`/api/hires`)
}


export const getHiresByClient = async (clientId) => { 
  return serverFetch(`/api/hires?clientId=${clientId}`)
}