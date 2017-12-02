// @flow
import Icon from 'react-native-vector-icons/MaterialIcons';
import { toPairs } from 'ramda';
import { metrics } from '../themes';

const icons = {
  close: {
    size: metrics.icons.small,
  },
};

const iconSources = {
  close: undefined,
};

// $FlowFixMe
const iconsLoaded = new Promise(resolve => {
  const iconNamePropsPairs = toPairs(icons);
  Promise.all(
    iconNamePropsPairs.map(([iconName, iconProps]) =>
      Icon.getImageSource(iconName, iconProps.size),
    ),
  ).then(sources => {
    iconNamePropsPairs.forEach(([iconName], index) => {
      iconSources[iconName] = sources[index];
    });
    resolve(true);
  });
});

export { iconSources, iconsLoaded };
