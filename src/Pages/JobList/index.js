import { Badge, Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "../EditJob";
import DeleteJob from "../../components/DeleteJob";

function JobList() {
  const idCompany = getCookie("id");
  const [jobs, setJobs] = useState([]);

  const fetchApi = async () => {
    const response = await getListJob(idCompany);
    // console.log(response);
    if (response) {
      setJobs(response.reverse());
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  //reload
  const handleReload = () => {
    fetchApi();
  };
  console.log(jobs);

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) =>
        (record.tags || []).map((item, index) => (
          <Tag key={index} className="mb-5" color="blue">
            {item}
          </Tag>
        )),
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <>
          <span>
            Ngày tạo: <strong>{record.createAt}</strong>
          </span>
          <br />
          <span>
            Ngày cập nhật: <strong>{record.updateAt}</strong>
          </span>
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        return (
          <>
            {record.status ? (
              <Badge color="green" text="Đang bật"></Badge>
            ) : (
              <Badge color="red" text="Đang tắt"></Badge>
            )}
          </>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/detail-job/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <EditJob recordFileEdit={record} onReload={handleReload} />
          <DeleteJob recordFileEdit={record} onReload={handleReload}/>
        </>
      ),
    },
  ];

  return (
    <>
      <Table className="mt-20" columns={columns} dataSource={jobs} rowKey="id" pagination={{pageSize: 6}}/>
    </>
  );
}
export default JobList;
