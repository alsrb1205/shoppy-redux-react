import { axiosPost, axiosPut, axiosDelete } from "./api";
import { setCartCount, setClearCount, setCartList, setClearCartList, setTotalPrice, setIsAdded, setIsAddedReset } from "../features/cart/cartSlice.js"

/**
 * 장바구니 전체 카운트 조회
 */
export const getCount = () => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://54.180.106.193:9000/cart/count";
    const data = { "id": id };

    const result = await axiosPost({ url, data });
    const count = result.count;
    dispatch(setCartCount({ count }));
}

export const clearCount = () => (dispatch) => {
    dispatch(setClearCount());
}

export const getCartList = () => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://54.180.106.193:9000/cart/items";
    const data = { "id": id };
    const result = await axiosPost({ url, data });
    dispatch(setCartList({ result }));
    dispatch(setTotalPrice({ result }));
}

export const clearCartList = () => (dispatch) => {
    dispatch(setClearCartList());
}

export const updateCartList = (cid, type) => async (dispatch) => {
    const url = "http://54.180.106.193:9000/cart/updateQty";
    const data = { "cid": cid, "type": type };

    const result = await axiosPut({ url, data }) // 수량이 업데이트 성공하면 => 카트리스트 다시가져오기!
    result.result_rows && dispatch(getCartList());
    if (result.result_rows) {
        dispatch(getCartList());
        dispatch(getCount());
    }
}

export const deleteCartItem = (cid) => async (dispatch) => {
    const url = "http://54.180.106.193:9000/cart/deleteItem";
    const data = { "cid": cid };

    const result = await axiosDelete({ url, data })
    if (result.result_rows) {
        dispatch(getCartList());
        dispatch(getCount());
    }
}

export const saveToCartList = (cartItem) => async (dispatch) => {
    const url = "http://54.180.106.193:9000/cart/add";
    const id = localStorage.getItem("user_id");
    const data = { id: id, cartList: [cartItem] };

    const result = await axiosPost({ url, data })
    if (result.result_rows) {
        const result_rows = result.result_rows
        dispatch(setIsAdded({ result_rows }));
        dispatch(getCartList());
        dispatch(getCount());
    }
}

export const clearAdded = () => (dispatch) => {
    dispatch(setIsAddedReset());
}
/**
 * 장바구니 전체 삭제
 */
export const clearCart =()=> async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://54.180.106.193:9000/cart/clear";
    const data = { "id": id };
    const result = await axiosDelete({ url, data });
    result.result_rows && dispatch(getCount());
}
