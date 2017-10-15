/* @flow */

import React from 'react';
import CalendarDateTimePicker from './CalendarDateTimePicker';
import SvgIcon from '../SvgIcon';
import s from './MainCalendar.scss';
import { addMonths } from 'date-fns';

type Props = {};
type State = {|
  highlight: Array<Date> | Date,
  value: Date,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean,
  firstClick: Date | boolean,
  endClick: Date | boolean,
  firstDate: Date,
  secondDate: Date,
|};

class Calendar extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      value: new Date(),
      time: false,
      isCalendarShown: true,
      isSingleCalendar: false,
      firstClick: false,
      endClick: false,
      firstDate: new Date(),
      secondDate: new Date(),
    };
  }

  componentWillMount() {
    const { isSingleCalendar } = this.state;
    if (isSingleCalendar) {
      this.setState({
        highlight: new Date(),
      });
    } else {
      this.setState({
        highlight: [new Date()],
      });
    }
  }

  onSetDate = (date: Date) => {
    const { firstClick, highlight, isSingleCalendar } = this.state;

    if (!isSingleCalendar) {
      const highlightCopy = highlight.slice();
      highlightCopy.push(date);

      if (highlightCopy.length > 2) {
        highlightCopy.shift();
      }

      if (!firstClick) {
        this.setState({
          firstClick: true,
          highlight: highlightCopy,
          endClick: false,
          firstDate: highlightCopy[1],
        });
      }

      if (firstClick) {
        this.setState({
          endClick: true,
          highlight: highlightCopy,
          firstClick: false,
          secondDate: highlightCopy[1],
        });
      }
    } else {
      this.setState({
        highlight: date,
      });
    }
  };

  onChange = (value: Date) => {
    this.setState({ value });
  };

  onChangeCalendarVisibility = () => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  render() {
    const {
      time,
      value,
      highlight,
      isCalendarShown,
      isSingleCalendar,
      firstDate,
      secondDate,
    } = this.state;
    return (
      <div>
        {isSingleCalendar ? (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={highlight}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={
                this.onChangeCalendarVisibility
              }
              borderLeft
              borderRight
              icon={true}
              time={time}
            />
          </div>
        ) : (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={firstDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={
                this.onChangeCalendarVisibility
              }
              borderLeft
              borderRight={false}
              icon={false}
              rightArrow={false}
              time={time}
            />
            <div className={s.arrow}>
              {firstDate < secondDate ? (
                <SvgIcon file="arrow-right" />
              ) : (
                <SvgIcon file="arrow-left" />
              )}
            </div>
            <CalendarDateTimePicker
              value={addMonths(value, 1)}
              highlight={highlight}
              visibleDate={secondDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={
                this.onChangeCalendarVisibility
              }
              borderLeft={false}
              borderRight
              icon={false}
              leftArrow={false}
              time={time}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
