import React from "react";
import Content from '../common/adminLTE/content'
import ChartPlot from '../chart/chart'
import Row from '../common/layout/row'
import Editor from '../editor/editor'
 
class Dashboard extends React.Component {
    render() {
        return (
            <Content>
                <Row>
                    <Editor cols="12" />
                </Row>
                <Row>
                    <ChartPlot cols="12" />
                </Row>
            </Content>
        );
    }
}
export default Dashboard