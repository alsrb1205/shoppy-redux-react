import { setIsSaveSuccess, setMember, setOrderList } from "../features/order/orderSlice";
import { axiosPost } from "./api";

/**
 * 전체 주문정보 가져오기 : getOrderList
 */
export const getOrderList = () => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://54.180.106.193:9000/order/all";
    const data = { "id": id };


    const result = await axiosPost({ url, data })
    console.log('order list-->', result);
    dispatch(setOrderList({ result }));
    dispatch(setMember({ result }));
    // calculateTotalPrice(result.data);
}

/**
 * 카카오페이 결제 요청 : paymentKakaoPay
 */
export const paymentKakaoPay = ({ orderList, totalPrice }) => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://54.180.106.193:9000/payment/qr";
    const pname = orderList[0].pname.concat(" 외");
    const type = "KAKAO_PAY";
    const data = {
        id: id,
        item_name: pname,
        total_amount: totalPrice, // 결제 금액 (KRW)
        formData: {
            id: id,
            type: type,
            totalPrice: totalPrice,
            orderList: orderList
        }
    }
    const result = await axiosPost({ url, data })

    if (result.next_redirect_pc_url) {
        result.tid && localStorage.setItem("tid", result.tid);
        window.location.href = result.next_redirect_pc_url;
    }

}

export const saveToOrder = ({orderList,totalPrice})=>async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const tid = localStorage.getItem("tid");
    const type = "KAKAO_PAY";
    let result_rows = 0;
    
    const url = "http://54.180.106.193:9000/order/add";
    const data = {
        id: id,
        tid: tid,
        type: type,
        totalPrice: totalPrice,
        orderList: orderList
    };

    try {
        const result = await axiosPost({url,data})
        if (result.result_rows) {
            const result_rows=result.result_rows
            console.log('주문테이블 저장 성공!!');
            dispatch(setIsSaveSuccess({result_rows}))
        }
    } catch (error) {
        console.error("주문테이블 저장 실패:", error);
    }

    return result_rows;
}//saveToOrder