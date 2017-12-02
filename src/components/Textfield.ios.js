// @flow
import React from 'react';
import {
  LayoutAnimation,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultLayoutAnimation from '../lib/defaultLayoutAnimation';
import styles from './styles/Textfield.styles.ios';
import { colors, metrics } from '../themes';

type Props = {
  isButton?: boolean,
  input?: Object,
  label?: string,
  meta?: Object,
  onPress?: () => void,
  placeholderColor?: string,
  value?: string,
};

/**
 * Text input component for ios which can also be used as a button
 * (useful in forms to achieve same look across input and other fields).
 * Shows error message passed in meta prop (made for use with redux-form)
 */
export default class TextField extends React.Component<Props, {}> {
  static defaultProps = {
    isButton: false,
    input: {
      onChange: () => {},
    },
    meta: {},
    onPress: () => {},
    value: '',
  };

  // animates showing up of error messages
  componentWillUpdate(nextProps: Props) {
    const meta = this.props.meta || {};
    const nextMeta = nextProps.meta || {};
    const showsError = Boolean(
      (meta.touched || meta.submitFailed) && meta.error,
    );
    const nextShowsError = Boolean(
      (nextMeta.touched || nextMeta.submitFailed) && nextMeta.error,
    );
    if (showsError !== nextShowsError) {
      LayoutAnimation.configureNext(defaultLayoutAnimation);
    }
  }

  render() {
    const {
      input = {},
      meta = {},
      label,
      value = '',
      isButton,
      onPress,
      placeholderColor,
      ...rest
    } = this.props;
    const { error, submitFailed, touched } = meta;
    return (
      <View>
        <TouchableOpacity
          style={styles.labelAndFieldContainer}
          disabled={!isButton}
          onPress={onPress}
        >
          {label && <Text style={styles.label}>{label}</Text>}
          <View
            style={styles.fieldContainer}
            pointerEvents={isButton ? 'none' : 'auto'}
          >
            <TextInput
              style={(label && styles.textInputWithLabel) || styles.textInput}
              placeholderTextColor={placeholderColor || colors.darkHint}
              onChangeText={input.onChange}
              onBlur={() => input.onBlur()}
              onFocus={() => input.onFocus()}
              value={input.value || value}
              editable={!isButton}
              clearButtonMode="while-editing"
              {...rest}
            />
          </View>
          {isButton && (
            <View style={styles.chevronContainer}>
              <Icon
                name={'chevron-right'}
                size={metrics.icons.small}
                color={colors.darkHint}
              />
            </View>
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.horizontalLine,
            {
              backgroundColor:
                ((touched || submitFailed) && error && colors.error) ||
                colors.darkDivider,
            },
          ]}
        />
        {(touched || submitFailed) &&
          error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
}
