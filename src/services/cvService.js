import { editApi, getApi, postApi } from "../utils/request"

export const createCV = async (option) => {
    const result = await postApi(`cv`, option);
    return result;

}

export const getCVById = async (idCompany) => {
    const result = await getApi(`cv?idCompany=${idCompany}`);
    return result;
}

export const getOneCV = async (id) => {
    const result = await getApi(`cv/${id}`);
    return result;
}

export const changeStatusCV = async (id, option) => {
    const result = await editApi("cv", id, option);
    return result;
}