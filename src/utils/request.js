const API_DOMAIN = "http://localhost:3002/";

// Lấy dữ liệu
export const getApi = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
};

// Tạo dữ liệu (POST)
export const postApi = async (path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
    });
    const result = await response.json();
    return result;
};

// Xóa dữ liệu (DELETE)
export const deleteApi = async (path, id) => {
    const response = await fetch(API_DOMAIN + path + `/${id}`, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
};

// Chỉnh sửa dữ liệu (PATCH)
//lưu ý path va id là 2 thứ riêng biệt nên k thể gộp lại `` => gọi đúng editApi("companys",id, option)
//=> có thể sửa thành fetch(API + path) => gọi lại editApi(`companys/${id}`, option)
export const editApi = async (path, id, option) => {
    const response = await fetch(API_DOMAIN + path + `/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
    });
    const result = await response.json();
    return result;
};
