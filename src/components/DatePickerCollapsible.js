// @flow
import React from 'react';
import CollapsibleField from './CollapsibleField';
/* eslint-disable import/no-unresolved, import/extensions */
import DatePicker from './DatePicker';
/* eslint-enable import/no-unresolved, import/extensions */
import type { Collapsible } from './CollapsibleField';

type Input = {
  value: moment$Moment,
  onChange: (value: any) => void,
}

type Props = {
  input: Input,
  meta: Object,
  onCollapse?: () => void,
  onExpand?: () => void,
}

export default class DatePickerCollapsible extends React.Component implements Collapsible {
  collapse = () => {
    this._collapsibleRef.collapse();
  };

  expand = () => {
    this._collapsibleRef.expand();
  };

  _collapsibleRef: CollapsibleField;
  props: Props;

  render() {
    const { input, ...rest } = this.props;
    return (
      <CollapsibleField
        ref={(collapsible) => { this._collapsibleRef = collapsible; }}
        headerText={input.value.format('dddd, ll')}
        {...rest}
      >
        <DatePicker input={input} />
      </CollapsibleField>
    );
  }
}
