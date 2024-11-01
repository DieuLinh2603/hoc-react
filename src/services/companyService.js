import { editApi, getApi, postApi } from "../utils/request";

// lấy all 
export const getAllCompany = async () => {
  const result = await getApi("companys");
  return result;
};

//lấy theo id
export const getDetailCompany = async (id) => {
  const result = await getApi(`companys/${id}`);
  return result;
};

//lọc theo loại truyền vào
export const checkExist = async (type, value) => {
  const result = await getApi(`companys?${type}=${value}`);
  return result;
};

//tạo thêm 1 công ty (đăng ký)
export const createCompany = async (option) => {
  const result = await postApi(`companys`, option);
  return result;
};

// kiểm tra thông tin để sử dụng tính năng login
export const login = async (email, password) => {
  const pass = `&password=${password}`;

  const result = await getApi(`companys?email=${email}${pass}`);
  return result;
};

//chỉnh sửa thông tin công ty
export const editCompany = async (id, option) => {
  const result = await editApi("companys",id, option);
  return result;
}
