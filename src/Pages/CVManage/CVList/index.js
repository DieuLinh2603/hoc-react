import { useEffect, useState } from "react";
import CVJobName from "../../../components/CVJobName";
import { getCookie } from "../../../helpers/cookie";
import { getCVById } from "../../../services/cvService";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";


function CVList() {
  const idCompany = getCookie("id");
  console.log(idCompany);
  
  const [listCV, setListCV] = useState();
  const fetchApi = async () => {
    const response = await getCVById(idCompany);
    if (response) {
      setListCV(response.reverse());
      console.log(response);
      
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };
  const columns = [
    {
      title: "Tên job",
      key: "idJob",
      dataIndex: "idJob",
      render: (_, record) => <CVJobName record={record} />,
    },
    {
      title: "Họ tên",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Ngày gửi",
      key: "createAt",
      dataIndex: "createAt",
    },
    {
        title: "Trạng thái",
        key: "statusRead",
        dataIndex: "statusRead",
        render: (_,record) => {
            return(
                <>
                    {record.statusRead ? (<Tag color="green">Đã đọc</Tag>) : (<Tag color="red">Chưa đọc</Tag>)}
                </>
            )
        }
      },
      {
        title: "Trạng thái",
        key: "actions",
        render: (_,record) => (
            <>
            {/* phải có dâu / trước detail nếu k có thì url sẽ thành "manage-dv/detail-cv/id" */}
                <Link to={`/detail-cv/${record.id}`}>
                    <Tooltip title="Xem chi tiết">
                        <Button icon={<EyeOutlined />}></Button>
                    </Tooltip>
                </Link>
            </>
        )
      }
  ];
  return (
    <>
      <Table rowKey="id" dataSource={listCV} columns={columns}></Table>
    </>
  );
}
export default CVList;
