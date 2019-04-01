import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2'
import Grid from '../common/layout/grid'
import Row from '../common/layout/row'

class Chart extends Component {
  chartReference = {}
  componentWillUpdate() {
    const { chart: { executing } } = this.props;
    if (executing) {
      this.chartReference.chartInstance.update();
    }
  }
  render() {
    const { chart: { data, options }, cols } = this.props;
    return (
      <Grid cols={cols}>
        <div className="box no-border">
          <div className="box-body">
            <Row>
              <Grid cols="12">
                <div className="chart">
                  <Line ref={(reference) => this.chartReference = reference} data={data} options={options} width={600} height={200} />
                </div>
              </Grid>
            </Row>
          </div>
        </div>
      </Grid>
    )
  }

}

const mapStateToProps = state => ({ chart: state.chart })
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Chart)
