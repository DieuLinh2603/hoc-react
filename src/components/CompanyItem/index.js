import { Card } from "antd";
import "./CompanyItem.scss";
import { Link } from "react-router-dom";

function CompanyItem(props) {
  const { item } = props;
  return (
    <>
      <Link to={`company/${item.id}`}>
        <Card>
          <div className="company">
            <div className="company__img">
              <img src={item.image} alt={item.companyName} />
            </div>

            <div className="company__content">
              <div>
                Công ty:
                <strong>{item.companyName}</strong>
              </div>

              <div>
                Nhân sự:
                <strong>{item.quantityPeople}</strong>
              </div>
              <div>
                Địa chỉ:
                <strong>{item.address}</strong>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
}

export default CompanyItem;
