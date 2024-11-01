import { getAllCompany } from "../../../services/companyService";
import { Row, Col, Pagination } from "antd";
import { useEffect, useState } from "react";
import CompanyItem from "../../../components/CompanyItem";

function CompanyList() {
  const [Company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllCompany();
      setCompany(result);
    };
    fetchApi();
  }, []);

  console.log(Company);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const currentPost = Company.slice(startIndex, endIndex);
  return (
    <>
      <div>
        <h2>Danh sách một số công ty</h2>
        {Company.length > 0 && (
          <div>
            <Row gutter={[15, 15]}>
              {currentPost.map((item,index) => (
                <Col span={8} key={index}>
                  <CompanyItem item={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <Pagination
          className="mt-20"
          current={currentPage}
          pageSize={postPerPage}
          total={Company.length}
          onChange={handleChangePage}
          align="center"
        ></Pagination>
      </div>
    </>
  );
}
export default CompanyList;
