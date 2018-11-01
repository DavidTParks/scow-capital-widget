import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import UpArrow from '../images/up_arrow.svg';
import DownArrow from '../images/down_arrow.svg';
import './widget.scss';

class Widget extends Component {
  state = {
    opened: true,
    showDock: false,
    tickerAmount: 3000.00,
    points: 0.00,
    percent: 0.00,
    increased: true
  }

  /*
  handleToggleOpen = () => {
    this.setState((prev) => {
      let { showDock } = prev;
      if (!prev.opened) {
        showDock = false;
      }
      return {
        showDock,
        opened: !prev.opened,
      };
    });
  }
  */

  componentDidMount = () => {
    this.intervalID = setInterval(
      () => this.simulateData(),
      2000
    );
  }

  simulateData = () => {
    let randomnum = parseFloat((Math.random() * (5.00 - 1.00) + 1.00).toFixed(2));
    randomnum *= (Math.floor(Math.random() * 2)) == 1 ? 1 : -1;

    if (this.state.tickerAmount - randomnum < 3000.00) {
      this.setState({
        tickerAmount: this.state.tickerAmount - randomnum,
        points: ((this.state.tickerAmount - randomnum) - 3000).toFixed(2),
        percent: ((((this.state.tickerAmount - randomnum) / 3000.00) - 1.00) * 100).toFixed(2),
        increased: false
      });
    } else if (this.state.tickerAmount - randomnum > 3000.00) {
      this.setState({
        tickerAmount: this.state.tickerAmount - randomnum,
        points: ((this.state.tickerAmount - randomnum) - 3000).toFixed(2),
        percent: ((((this.state.tickerAmount - randomnum) / 3000.00) - 1.00) * 100).toFixed(2),
        increased: true
      });
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  }

  /*
  handleWidgetExit = () => {
    this.setState({
      showDock: true,
    });
  }
  

  */
  renderBody = () => {
    if (this.state.showDock) {
      return (
        <a className="dock" onClick={this.handleToggleOpen}>
          ^ Block30 Widget ^
        </a>
      );
    }
    return '';
  }


  render() {
    const body = this.renderBody();
    const increased = this.state.increased;

    let increaseStyles = {
      color: '#88C984'
    };

    let decreasedStyles = {
      color: '#f24c46'
    };

    if (increased) {
      return (
        <div className="docked-widget">
          <Transition in={this.state.opened} timeout={250} onExited={this.handleWidgetExit}>
            {status => (
              <div className={`widget widget-${status}`}>
                <div className="widget-header">
                  <div className="widget-header-title">
                    BLOCK30
                </div>
                </div>
                <div className="widget-body">
                  <h1 className="ticker-amount">{this.state.tickerAmount.toLocaleString()}</h1>
                  <div className="up-arrow">
                    <UpArrow height={50} width={50} fill={'#88C984'}></UpArrow>
                  </div>
                  <h3 className="points-percent" style={increaseStyles}>+{this.state.points} {" "} +{this.state.percent}%</h3>
                </div>
                <div className="widget-footer">
                  Powered by Scow
              </div>
              </div>
            )}
          </Transition>
          {body}
        </div>
      );
    } else {
      return (
        <div className="docked-widget">
          <Transition in={this.state.opened} timeout={250} onExited={this.handleWidgetExit}>
            {status => (
              <div className={`widget widget-${status}`}>
                <div className="widget-header">
                  <div className="widget-header-title">
                    BLOCK30
                </div>
                </div>
                <div className="widget-body">
                  <h1 className="ticker-amount">{this.state.tickerAmount.toLocaleString()}</h1>
                  <div className="down-arrow">
                    <DownArrow height={50} width={50} fill={"#f24c46"}></DownArrow>
                  </div>
                  <h3 className="points-percent" style={decreasedStyles}>-{this.state.points} {" "} -{this.state.percent}%</h3>
                </div>
                <div className="widget-footer">
                  Powered by Scow
              </div>
              </div>
            )}
          </Transition>
          {body}
        </div>
      );
    }
  }
}

Widget.propTypes = {};

export default Widget;
