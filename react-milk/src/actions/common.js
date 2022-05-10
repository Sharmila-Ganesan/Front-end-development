import apiRequest from "../Services";

export default function apiCallDispatcher(actionType,method,path,param,subType) {
    return function(dispatch) {
      return apiRequest(method,path,param,subType)
      .then((data)=>{
            dispatch({type:actionType,data:data.data})
      })
      .catch((err)=>{
        dispatch({type:actionType,data:err.data})
      })
    };
}