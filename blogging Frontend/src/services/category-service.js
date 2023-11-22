import { myAxios, privateAxios } from "./helper";

export const loadAllCategories = () => {
  return myAxios.get(`/categories/`).then((respone) => {
    return respone.data;
  });


};


export const addCategory=(category)=>{
  return privateAxios.post('/categories/', category).then((response)=>{
    return response.data;
  })
}

export const deleteCategory=(categoryId)=>{
  return privateAxios.delete(`/categories/${categoryId}`).then((response)=>{
    return response.data;
  })
}