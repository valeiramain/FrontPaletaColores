const urlColores = import.meta.env.VITE_COLOR;


// BUSCAR por ID
export const buscarColorApi = async (id) =>{
    try{
        const respuesta = await fetch(urlColores+`/${id}`)
        return respuesta
    }catch(error){
        console.error(error)
    }
}


export const listarColoresApi = async () => {
  try {
    const respuesta = await fetch(urlColores);
    return respuesta
  } catch (error) {
    console.error(error);
  }
};
