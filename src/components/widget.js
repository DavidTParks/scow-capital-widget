import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import Logo from '../images/block30-logo.svg';
import './widget.scss';

class Widget extends Component {
  state = {
    opened: true,
    showDock: false,
    tickerAmount: 29584,
    points: 17.11,
    percent: 4.17
  }

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

  componentDidMount = () => {
    this.intervalID = setInterval(
      () => this.simulateData(),
      3000
    );
  }

  simulateData = () => {
    let tickerRandom = Math.round(Math.random() * (29540 - 29500) + 29500);
    this.setState({
      tickerAmount: tickerRandom
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  }

  handleWidgetExit = () => {
    this.setState({
      showDock: true,
    });
  }

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

    return (
      <div className="docked-widget">
        <Transition in={this.state.opened} timeout={250} onExited={this.handleWidgetExit}>
          {status => (
            <div className={`widget widget-${status}`}>
              <div className="widget-header">
                <div className="widget-header-title">
                  BLOCK30
                </div>
                <a className="widget-header-icon" onClick={this.handleToggleOpen}>
                  X
                </a>
              </div>
              <div className="widget-body">
                <h1 className="ticker-amount">{this.state.tickerAmount.toLocaleString()}</h1>
                <h3 className="percent-right">+{this.state.points} {" "} {this.state.percent}%</h3>
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

Widget.propTypes = {};

export default Widget;
