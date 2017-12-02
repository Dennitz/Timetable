// @flow
import React from 'react';
import { Text, View } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

import styles from './styles/Textfield.styles.android';
import { colors } from '../themes';

type Props = {
  input?: Object,
  meta?: Object,
  value?: string,
};

export default function TextField({
  input = {},
  meta = {},
  value = '',
  ...rest
}: Props) {
  const { error, submitFailed, touched } = meta;
  return (
    <View>
      <MKTextField
        style={styles.textfield}
        textInputStyle={styles.textInput}
        highlightColor={colors.main}
        tintColor={
          ((touched || submitFailed) && error && colors.error) ||
          colors.darkDivider
        }
        placeholderTextColor={colors.darkHint}
        underlineSize={1}
        {...rest}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        value={input.value || value}
      />

      {(touched || submitFailed) &&
        error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

TextField.defaultProps = {
  input: {
    onChange: () => {},
  },
  meta: {},
  value: '',
};
