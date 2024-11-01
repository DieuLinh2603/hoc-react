import { getApi } from "../utils/request"

export const getAllTag = async () => {
    const result = await getApi("tags");
    return result;
}