import {deleteApi, editApi, getApi, postApi} from "../utils/request"
export const getAllJob = async () => {
    const result = await getApi("jobs");
    return result;
}

export const getOneJob = async (id) => {
    const result = await getApi(`jobs/${id}`);
    return result;
}

export const getListJob = async (id) => {
    const result = await getApi(`jobs?idCompany=${id}`);
    return result;
}

export const createJob = async (option) => {
    const result = await postApi(`jobs`, option);
    return result;
}

export const updateJob = async (id,option) => {
    const result = await editApi(`jobs`,id, option);
    return result;
}

export const deleteJob = async (id) => {
    const result = await deleteApi("jobs",id)
    return result;
}