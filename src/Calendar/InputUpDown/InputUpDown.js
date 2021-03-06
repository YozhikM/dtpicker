/* @flow */

import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';
import chevronUp from '../../SvgIcon/svg-icons/chevron-up.svg';
import chevronDown from '../../SvgIcon/svg-icons/chevron-down.svg';
import s from './InputUpDown.scss';

type Props = {|
  value?: number,
  min?: number,
  max?: number,
  circular?: boolean,
  onChange?: (value: number) => void,
  onClickNumber?: (value: number) => void,
|};

type State = {|
  value: number,
  isBtnHold: boolean,
|};

class InputUpDown extends React.Component<Props, State> {
  state: State;
  holdIntervalId: ?IntervalID;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
      isBtnHold: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  increment = () => {
    let value = this.state.value + 1;
    if (typeof this.props.max === 'number' && value > this.props.max) {
      value =
        this.props.circular && typeof this.props.min === 'number' ? this.props.min : this.props.max;
    }
    this.setState({ value }, () => {
      if (this.props.onChange) this.props.onChange(value);
    });
  };

  decrement = () => {
    let value = this.state.value - 1;
    if (typeof this.props.min === 'number' && value < this.props.min) {
      value =
        this.props.circular && typeof this.props.max === 'number' ? this.props.max : this.props.min;
    }
    this.setState({ value }, () => {
      if (this.props.onChange) this.props.onChange(value);
    });
  };

  onClickNumber = () => {
    if (this.props.onClickNumber) {
      this.props.onClickNumber(this.state.value);
    }
  };

  onHoldStart = (cb: Function) => {
    this.setState({ isBtnHold: true });
    setTimeout(() => {
      if (this.state.isBtnHold && !this.holdIntervalId) {
        this.holdIntervalId = setInterval(() => {
          if (this.state.isBtnHold) cb();
        }, 50);
      }
    }, 300);
  };

  onHoldEnd = () => {
    this.setState({ isBtnHold: false });
    if (this.holdIntervalId) {
      clearInterval(this.holdIntervalId);
      this.holdIntervalId = null;
    }
  };

  render() {
    return (
      <div className="InputUpDown">
        <button
          onClick={this.increment}
          onMouseDown={() => this.onHoldStart(this.increment)}
          onTouchStart={() => this.onHoldStart(this.increment)}
          onMouseUp={this.onHoldEnd}
          onTouchEnd={this.onHoldEnd}
        >
          <SvgIcon file={chevronUp} />
        </button>
        <p onClick={this.onClickNumber}>{this.state.value}</p>
        <button
          onClick={this.decrement}
          onMouseDown={() => this.onHoldStart(this.decrement)}
          onTouchStart={() => this.onHoldStart(this.decrement)}
          onMouseUp={this.onHoldEnd}
          onTouchEnd={this.onHoldEnd}
        >
          <SvgIcon file={chevronDown} />
        </button>
      </div>
    );
  }
}

export default InputUpDown;
