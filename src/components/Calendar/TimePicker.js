/* @flow */

import React from 'react';
import SvgIcon from '../SvgIcon';
import TimeSelect from '../TimeSelect/TimeSelect';
import s from './Calendar.scss';

type Show = 'button' | 'timeSelect'

type Props = {
  onChangeDate?: (date: Date) => void,
  activeDates?: Date,
  date?: Date,
  onSubmit?: any => void,
  show?: Show
};

type State = {
  date: Date,
  show: 'button' | 'timeSelect'
};

class TimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      date: this.props.date || new Date(),
      show: this.props.show || 'button'
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: nextProps.date });
    }
  }

  onChangeDate = (date: Date) => {
    const { onChangeDate } = this.props;
    if (onChangeDate) onChangeDate(date);
  };

  onClickClock = () => {
    this.setState({ show: 'timeSelect' });
  };

  onSubmitTime = () => {
    this.setState({ show: 'button' });
  };

  render() {
    const { show, date } = this.state;

    if (show === 'timeSelect') {
      return (
        <TimeSelect
          value={date}
          onSubmit={this.onSubmitTime}
          onChange={this.onChangeDate}
        />
      );
    }

    return (
      <div className={s.time_picker}>
        <button onClick={this.onClickClock}>
          <SvgIcon file="clock" />
        </button>
      </div>
    );
  }
}

export default TimePicker;
