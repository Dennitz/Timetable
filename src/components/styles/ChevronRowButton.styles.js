// @flow
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childrenContainer: {
    flexShrink: 1,
  },
  chevronContainer: {
    marginRight: -8, // aligns the actual chevron instead of it's border
  },
});

export default styles;
