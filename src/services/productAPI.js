import { setDetailImgList, setImgList, setProduct, setProductList, setSize } from "../features/product/productSlice";
import { axiosGet, axiosPost } from "./api";

export const getProductList = () => async (dispatch) => {
    const url = 'http://54.180.106.193:9000/product/all';

    const result = await axiosGet({ url })
    dispatch(setProductList({ result }));
}

export const getProduct = (pid) => async (dispatch) => {
    const url = "http://54.180.106.193:9000/product/detail";
    const data = { "pid": pid };

    const result = await axiosPost({ url,data })
    const product = result;
    const imgList=result.imgList;
    const detailImgList=result.detailImgList;    

    dispatch(setProduct({ product }));
    dispatch(setImgList({ imgList }));
    dispatch(setDetailImgList({ detailImgList }));
}


export const changeSize = (size) => (dispatch) => {
    dispatch(setSize({size}));
}
