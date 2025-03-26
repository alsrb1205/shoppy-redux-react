import axios from "axios";
// get
export async function axiosGet({url}) {
    let result=null;

    try {
        result = await axios({
            method : 'get',
            url:url,
        }).then(res=>res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}
// post
export async function axiosPost({url,data}) {
    let result=null;

    try {
        result = await axios({
            method : 'post',
            url:url,
            data:data
        }).then(res=>res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}
// put
export async function axiosPut({url,data}) {
    let result=null;

    try {
        result = await axios({
            method : 'put',
            url:url,
            data:data
        }).then(res=>res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}

// delete
export async function axiosDelete({url,data}) {
    let result=null;

    try {
        result = await axios({
            method : 'delete',
            url:url,
            data:data
        }).then(res=>res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}