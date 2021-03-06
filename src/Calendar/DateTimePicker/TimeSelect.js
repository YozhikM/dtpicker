/* @flow */

import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';
import check from '../../SvgIcon/svg-icons/check.svg';
import InputUpDown from '../InputUpDown/InputUpDown';
import TableSelect, { type Option } from '../TableSelect/TableSelect';
import s from './TimeSelect.scss';
import { getValueFromDate, type Highlight } from '../helpers';

type ShowEnum = 'main' | 'hh' | 'mm' | 'ss';

type HHMMSS = {
  hh: number,
  mm: number,
  ss: number,
};

type Props = {|
  value?: ?Highlight,
  onSetTime?: (value: Highlight) => void,
  onSubmit?: (value: Highlight) => void,
  showSeconds?: boolean,
  show?: ShowEnum,
|};

type State = HHMMSS & {
  show: ShowEnum,
};

class TimeSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.parseTime(this.props.value),
      show: this.props.show || 'main',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  genTableOpts = (from: number, till: number, step: number = 1): Option[] => {
    const res: Option[] = [];
    for (let i = from; i <= till; i += step) {
      res.push({ value: i, name: i < 10 ? `0${i}` : `${i}` });
    }
    return res;
  };

  parseTime(value: ?Highlight): HHMMSS {
    if (!value) return { hh: 0, mm: 0, ss: 0 };
    return { hh: value.hour, mm: value.minute, ss: value.second };
  }

  getValue = (): Highlight => {
    const { hh, mm, ss } = this.state;
    const { value } = this.props;
    const newDate = value ? { ...value, hour: hh, minute: mm, second: ss } : getValueFromDate();
    return newDate;
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(this.getValue());
  };

  onSetTime = () => {
    const { onSetTime } = this.props;
    if (onSetTime) onSetTime(this.getValue());
  };

  onChangeHH = (hh: number) => {
    this.setState({ hh }, this.onSetTime);
  };

  onChangeMM = (mm: number) => {
    this.setState({ mm }, this.onSetTime);
  };

  onChangeSS = (ss: number) => {
    this.setState({ ss }, this.onSetTime);
  };

  onClickHH = () => {
    this.setState({ show: 'hh' });
  };

  onClickMM = () => {
    this.setState({ show: 'mm' });
  };

  onClickSS = () => {
    this.setState({ show: 'ss' });
  };

  onChangeTableHH = (value: number) => {
    this.setState({ hh: value, show: 'main' }, this.onSetTime);
  };

  onChangeTableMM = (value: number) => {
    this.setState({ mm: value, show: 'main' }, this.onSetTime);
  };

  onChangeTableSS = (value: number) => {
    this.setState({ ss: value, show: 'main' }, this.onSetTime);
  };

  render() {
    const { showSeconds } = this.props;
    const { hh, mm, ss, show } = this.state;

    if (show === 'hh') {
      return (
        <TableSelect
          options={this.genTableOpts(0, 23)}
          cols={6}
          value={hh}
          onChange={this.onChangeTableHH}
        />
      );
    } else if (show === 'mm') {
      return (
        <TableSelect
          options={this.genTableOpts(0, 59, 5)}
          cols={4}
          value={mm}
          onChange={this.onChangeTableMM}
        />
      );
    } else if (show === 'ss' && showSeconds) {
      return (
        <TableSelect
          options={this.genTableOpts(0, 59, 5)}
          cols={6}
          value={ss}
          onChange={this.onChangeTableSS}
        />
      );
    }

    return (
      <div className={s.hs}>
        <InputUpDown
          value={hh}
          min={0}
          max={23}
          onChange={this.onChangeHH}
          onClickNumber={this.onClickHH}
          circular
        />
        <InputUpDown
          value={mm}
          min={0}
          max={59}
          onChange={this.onChangeMM}
          onClickNumber={this.onClickMM}
          circular
        />
        {showSeconds && (
          <InputUpDown
            value={ss}
            min={0}
            max={59}
            onChange={this.onChangeSS}
            onClickNumber={this.onClickSS}
            circular
          />
        )}
        <button onClick={this.onSubmit}>
          <SvgIcon file={check} />
        </button>
      </div>
    );
  }
}

export default TimeSelect;
