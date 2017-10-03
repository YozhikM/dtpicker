/* @flow */

import React from 'react';
import CalendarDateTimePicker from './components/Calendar/CalendarDateTimePicker';
import { addMonths, eachDay } from 'date-fns';
import s from './App.scss';

type Props = void;
type State = {
  startDate: Date,
  endDate: Date,
  date: Date,
  time: boolean,
  isCalendarShown: boolean
};

class App extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      date: new Date(),
      time: false,
      isCalendarShown: false
    };
  }

  getRangeDate = () => {
    return eachDay(this.state.startDate, this.state.endDate);
  };

  onChangeStartDay = (activeDates: Date) => {
    this.setState({ startDate: activeDates });
  };

  onChangeEndDay = (activeDates: Date) => {
    this.setState({ endDate: activeDates });
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
  };

  onChangeCalendarVisibility = (isCalendarShown: boolean) => {
    this.setState({ isCalendarShown });
  };

  render() {
    const { startDate, endDate, time, date, isCalendarShown } = this.state;
    return (
      <div className={s.container}>
        <CalendarDateTimePicker
          date={date}
          time={time}
          isCalendarShown={isCalendarShown}
          onChangeDay={this.onChangeStartDay}
          activeDates={startDate}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
          // range={this.getRangeDate()}
        />
        <CalendarDateTimePicker
          date={addMonths(date, 1)}
          time={time}
          isCalendarShown={isCalendarShown}
          onChangeDay={this.onChangeEndDay}
          activeDates={endDate}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
        />
      </div>
    );
  }
}

export default App;
