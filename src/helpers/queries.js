const urlColores = import.meta.env.VITE_COLOR;


export const listarColoresApi = async () => {
  try {
    const respuesta = await fetch(urlColores);
    return respuesta
  } catch (error) {
    console.error(error);
  }
};


//POST (Crear)
export const crearColorApi = async (color) =>{
    try{
        const respuesta = await fetch(urlColores,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(color)
        })
        return respuesta
    }catch(error){
        console.error(error)
    }
}


// BORRAR por ID
export const borrarColorApi = async (id) =>{
    try{
        const respuesta = await fetch(urlColores+`/${id}`,{
            method:'DELETE'
        })
        return respuesta
    }catch(error){
        console.error(error)
    }
}



// BUSCAR por ID
export const buscarColorApi = async (id) =>{
    try{
        const respuesta = await fetch(urlColores+`/${id}`)
        return respuesta
    }catch(error){
        console.error(error)
    }
}
