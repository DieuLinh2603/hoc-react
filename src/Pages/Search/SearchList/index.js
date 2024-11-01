import { useEffect, useState } from "react";
import { getAllCompany } from "../../../services/companyService";
import { Col, Row, Pagination } from "antd";
import JobItem from "../../../components/JobItem";

function SearchList(props) {
  const { dulieu = [] } = props;
  //   console.log(dulieu);

  const [dataFinal, setDataFinal] = useState([]);

  //Giá trị của trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  //Số item trên mỗi trang
  const [postPerPage, setPotsPerPage] = useState(3);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllCompany();
      //   console.log(result);

      //Lấy dữ liệu từ bên trang chính
      const newData = dulieu.map((item) => {
        // console.log("Item:", item);
        const infoCompany = result.find(
          (itemCompany) => itemCompany.id == item.idCompany && itemCompany
        );
        // console.log(item.idCompany);

        return {
          infoCompany: infoCompany,
          ...item,
        };
      });
      setDataFinal(newData);
    };
    fetchApi();
  }, []);

  const handlePageChange = (page) => {
    // console.log(page);
    //Vị trí page (số)
    setCurrentPage(page);
  };

  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentPost = dataFinal.slice(startIndex, endIndex);

  return (
    <>
      {currentPost.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[16, 16]}>
            {currentPost.map((item, index) => (
              <Col span={8} key={index}>
                <JobItem data={item} />
              </Col>
            ))}
          </Row>
          <div className="pagination-container">
            <Pagination className="mt-20"
            //Số trang hiện tại (trang 2 thì số 2)
              current={currentPage}
              //Hiển thị tổng số trang dựa theo số item của 1 trang
              pageSize={postPerPage}
              //Tổng số item tất cả 
              total={dataFinal.length}
              align="center"
              onChange={handlePageChange}
            />
          </div>
        </div>
      ) : <div className="mt-20">Không tìm thấy việc phù hợp với yêu cầu!</div>}
    </>
  );
}
export default SearchList;
