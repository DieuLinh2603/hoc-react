import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../services/jobService";

function DeleteJob(props) {
  const { recordFileEdit, onReload } = props;
  const [messageApi, contextHolder] = message.useMessage();

  console.log(recordFileEdit.id);

  const handleDeleteJob = async () => {
    const response = await deleteJob(recordFileEdit.id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa job thành công!",
      });
      setTimeout(() => {
        onReload();
      }, 3000);
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật dữ liệu thất bại!",
      });
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Thông báo xác nhận"
        description="Bạn có chắc chắn muốn xóa?"
        onConfirm={handleDeleteJob}
        onCancel={cancel}
        cancelText="Đóng"
        okText="Xóa"
      >
        <Button
          className="ml-5"
          type="primary"
          danger
          icon={<DeleteOutlined />}
        ></Button>
      </Popconfirm>
    </>
  );
}
export default DeleteJob;
