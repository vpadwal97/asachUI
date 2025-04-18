import { setCartCount } from "../../reduxStore/appSlice"
import axios from "../../utils/HttpServices"


export const  getCartCount = async(dispatch)=>{
    await axios.get(`api/addToCart/counts`)
    .then(response=>{
        if(response.data.success){
            dispatch(setCartCount(response?.data?.response?.cartCounts))
        }
    }).catch(error=>{
        console.log("Cart Count Error")
    })
}