import { setIsLoggedIn, setIsLogout, setLoginReset } from "../features/auth/authSlice.js";
import { axiosPost } from "./api.js";


export const getLogin = (formData) => async (dispatch) => {
    const url = 'http://13.125.219.73:9000/member/login';
    const data = formData;

    const loginResult = await axiosPost({ url, data });
    const result_rows = loginResult.result_rows;

    if (result_rows) { //성공
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("user_id", formData.id);
        dispatch(setIsLoggedIn({ result_rows }));  // 리듀서(슬라이스)의 함수 호출
    } else { //실패
        dispatch(setIsLoggedIn({ result_rows }));  // 리듀서(슬라이스)의 함수 호출

    }
}

export const getLoginReset = () => (dispatch) => {
    dispatch(setLoginReset());
}

export const getLogout = () => (dispatch) => {
    localStorage.clear();
    dispatch(setIsLogout());  // 리듀서(슬라이스)의 함수 호출
}
