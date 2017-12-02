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

export default class DatePickerCollapsible extends React.Component<Props, {}>
  implements Collapsible {
  collapse = () => {
    if (this._collapsibleRef) {
      this._collapsibleRef.collapse();
    }
  };

  expand = () => {
    if (this._collapsibleRef) {
      this._collapsibleRef.expand();
    }
  };

  _collapsibleRef: CollapsibleField | null;

  render() {
    const { input, ...rest } = this.props;
    return (
      <CollapsibleField
        ref={(collapsible) => {
          this._collapsibleRef = collapsible;
        }}
        headerText={input.value.format('dddd, ll')}
        {...rest}
      >
        <DatePicker input={input} />
      </CollapsibleField>
    );
  }
}
