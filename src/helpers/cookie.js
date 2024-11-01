//Lấy cookie
export function getCookie(cname) {
  var name = cname + "=";

  //document.cookie trả về tất cả các cookie dưới dạng một chuỗi, trong đó mỗi cookie được phân tách bởi dấu chấm phẩy (;).
  //Dòng này tách chuỗi đó thành một mảng (ca) chứa các cookie riêng lẻ.
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    //Vòng lặp while này xóa bất kỳ khoảng trắng nào ở đầu chuỗi cookie (c).
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    //kiểm tra vị trí đầu tiên mà chuỗi name xuất hiện trong chuỗi c.
    //Nếu name là một phần của chuỗi c và nó xuất hiện ở vị trí đầu tiên (vị trí 0), điều kiện này sẽ trả về true.
    if (c.indexOf(name) === 0) {
      //name.length sẽ bỏ qua phần tên và dấu = của cookie.
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

//END lấy Cookie

//Tạo Cookie
export function createCookie(cname, cvalue, exdays)
{
    var d = new Date();

    //Đặt lại thời gian cho d(mili-giây)
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

    //Chuỗi này sẽ được sử dụng để thiết lập thuộc tính expires của cookie, xác định khi nào cookie sẽ hết hạn.
    //toUTCString() dùng để chuyển đối tượng Date sangg 1 dạng văn bản (Thu, 19 Sep 2024 10:00:00 GMT)
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
// END Tạo Cookie

//Hàm xóa Cookie
export function deleteCookie(cname)
{
    document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00`
}
// END Xóa Cookie

//Hàm xóa tất cả
export function deleteAllCookie()
{
    const cookies = document.cookie.split(";");

    for(let i = 0; i < cookies.length; i++){
        const cookie = cookies[i];

        // Trả về vị trí(số) của dấu =
        const eqPost = cookie.indexOf("=");
        const name = eqPost > -1 ? cookie.substr(0, eqPost) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00";
    }
}

