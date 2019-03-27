import React from "react";
import ContentHeader from '../common/adminLTE/contentHeader'
import Content from '../common/adminLTE/content'
import ChartPlot from './chart'
import Row from '../common/layout/row'
import Code from '../code/code'
 
const code = ``;
class Dashboard extends React.Component {
    state = { code };
    render() {
      return (
        <div>
          <ContentHeader title="Leandro Lasnor" small="Challenge" />
          <Content>
            <Row>
                <Code cols="12" />
            </Row>
            <Row>
              <ChartPlot cols="12" />
            </Row>
          </Content>
        </div>
      );
    }
}
export default Dashboard;