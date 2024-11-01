import { Card, Col, Row } from "antd";
import JobStatistic from "../../components/JobStatistic"
import CVStatistic from "../../components/CVStatistic"
import InfoCompany from "../../components/InfoCompany"

function Dashboard() {
    return (
        <>
            <h2>Tổng quan</h2>
            <Row justify={"center"} gutter={[10, 10]}>
                <Col  span={8}>
                    <Card style={{height: "180px"}} type="inner" title="Job" bordered={false}>
                        <JobStatistic/>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={{height: "180px"}} type="inner" title="CV" bordered={false}>
                        <CVStatistic/>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={{height: "180px"}} type="inner" title="Thông tin công ty" bordered={false}>
                        <InfoCompany/>
                    </Card>
                </Col>

                
            </Row>
        </>
    );
}

export default Dashboard;
