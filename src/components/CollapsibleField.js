// @flow
import * as React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
/* eslint-disable import/no-unresolved, import/extensions */
import Textfield from './Textfield';
/* eslint-enable import/no-unresolved, import/extensions */

type Props = {
  children?: React.Node,
  headerText: string,
  meta: Object,
  onCollapse: () => void,
  onExpand: () => void,
}

type State = {
  collapsibleHeight: Animated.Value,
}

export interface Collapsible {
  collapse: () => void;
  expand: () => void;
}

/**
 * Renders a field that collapses/expands on click (like in iOS calendar app datepickers).
 *
 * Calls props.onCollapse/props.onExpand when collapsing/expanding by click but not
 * when collapsed/expanded programmatically by calling collapse()/exapand().
 *
 * Uses a <TextField /> to render the field itself (only thing that is visible when collapsed).
 * Additional props are passed to TextField.
 */
export default class CollapsibleField extends React.Component<Props, State>
  implements Collapsible {
  static defaultProps = {
    children: undefined,
    onCollapse: () => {},
    onExpand: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      collapsibleHeight: new Animated.Value(0),
    };
    this._collapsed = true;
    this._childrenHeight = 0;
  }

  collapse = () => {
    this._animateCollapsibleHeight(0);
    this._collapsed = true;
  };

  expand = () => {
    this._animateCollapsibleHeight(this._childrenHeight);
    this._collapsed = false;
  };

  _animateCollapsibleHeight = (toValue: number) => {
    Animated.timing(this.state.collapsibleHeight, {
      toValue,
      duration: 220,
    }).start();
  };

  _toggle = () => {
    const { onCollapse, onExpand } = this.props;
    if (this._collapsed) {
      this.expand();
      onExpand();
    } else {
      this.collapse();
      onCollapse();
    }
  };

  _setChildrenHeight = (event: Object) => {
    this._childrenHeight = event.nativeEvent.layout.height;
  };

  _collapsed: boolean;
  _childrenHeight: number;

  render() {
    const { children, headerText, meta, ...rest } = this.props;
    // uses Textfield to have same look as other fields in forms
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._toggle}>
          <View>
            <Textfield
              editable={false}
              pointerEvents="none"
              meta={meta}
              value={headerText}
              {...rest}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.container, { height: this.state.collapsibleHeight }]}
        >
          <View
            onLayout={this._setChildrenHeight}
            style={styles.childrenContainer}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  childrenContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
