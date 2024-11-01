import { getApi } from "../utils/request"

export const getListCity = async () => {
    const result = await getApi("city");
    return result;
}