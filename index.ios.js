// @flow
import { iconsLoaded } from './src/lib/iconSources';

// this is done, so that icons from src/lib/iconSources$iconSources
// can be used in static contexts
iconsLoaded.then(() => {
  require('./src/app');
});

