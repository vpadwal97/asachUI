import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setAuthCode, setCountryCallingCode, setTokenExpiryTime, setLoginStatus, setMobile, setUserEmailId, setUserFirstName, setUserID, setUserLastName, setUserType } from "../../reduxStore/LoginSlice";
import { setAddressList, setSearchKey } from "../../reduxStore/AppSlice";

export const TokenExpiryChecking = (expiryTime, currentDateTime, loginStatus, dispatch) => {
    if (loginStatus) {
        let tokenExpireDateTime = new Date(expiryTime);
        const TokenExpireYear = tokenExpireDateTime.getFullYear();
        const TokenExpireMonth = tokenExpireDateTime.getMonth();
        const TokenExpireDay = tokenExpireDateTime.getDate();
        const TokenExpireHour = tokenExpireDateTime.getHours();
        const TokenExpireMinute = tokenExpireDateTime.getMinutes();
        const userYear = currentDateTime.getFullYear();
        const userMonth = currentDateTime.getMonth();
        const userDay = currentDateTime.getDate();
        const userHour = currentDateTime.getHours();
        const userMinute = currentDateTime.getMinutes();
        if (TokenExpireYear <= userYear &&
            TokenExpireMonth <= userMonth &&
            TokenExpireDay < userDay) {
            // app slice data 
            dispatch(setSearchKey(undefined))
            dispatch(setAddressList({}))
            dispatch(setTokenExpiryTime(undefined))
            // login slice data 
            dispatch(setMobile(""))
            dispatch(setCountryCallingCode(""))
            dispatch(setUserID(""))
            dispatch(setAuthCode(""))
            dispatch(setLoginStatus(false))
            dispatch(setUserFirstName(""))
            dispatch(setUserLastName(""))
            dispatch(setUserType(""))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It looks like your session has expired. Please log in again to resume.",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        if (TokenExpireYear <= userYear &&
            TokenExpireMonth <= userMonth &&
            TokenExpireDay <= userDay &&
            TokenExpireHour <= userHour 
            // TokenExpireMinute <= userMinute
        ) {
            // app slice data 
            dispatch(setSearchKey(undefined))
            dispatch(setAddressList({}))
            dispatch(setTokenExpiryTime(undefined))
            // login slice data 
            dispatch(setMobile(""))
            dispatch(setCountryCallingCode(""))
            dispatch(setUserID(""))
            dispatch(setAuthCode(""))
            dispatch(setLoginStatus(false))
            dispatch(setUserFirstName(""))
            dispatch(setUserLastName(""))
            dispatch(setUserType(""))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It looks like your session has expired. Please log in again to resume.",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        if (TokenExpireYear <= userYear &&
            TokenExpireMonth <= userMonth &&
            TokenExpireDay <= userDay &&
            TokenExpireHour <= userHour &&
            TokenExpireMinute <= userMinute
        ) {
            // app slice data 
            dispatch(setSearchKey(undefined))
            dispatch(setAddressList({}))
            dispatch(setTokenExpiryTime(undefined))
            // login slice data 
            dispatch(setMobile(""))
            dispatch(setCountryCallingCode(""))
            dispatch(setUserID(""))
            dispatch(setAuthCode(""))
            dispatch(setLoginStatus(false))
            dispatch(setUserFirstName(""))
            dispatch(setUserLastName(""))
            dispatch(setUserType(""))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It looks like your session has expired. Please log in again to resume.",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
}
