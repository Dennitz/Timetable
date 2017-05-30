import I18n from 'react-native-i18n';

I18n.fallbacks = true;

const languageCode = I18n.locale.substr(0, 2);

I18n.translations = {
  en: require('./english.json'),
};

switch (languageCode) {
  case 'af':
    I18n.translations.af = require('./af.json');
    require('moment/locale/af');
    break;
  case 'am':
    I18n.translations.am = require('./am.json');
    break;
  case 'ar':
    I18n.translations.ar = require('./ar.json');
    require('moment/locale/ar');
    break;
  case 'bg':
    I18n.translations.bg = require('./bg.json');
    require('moment/locale/bg');
    break;
  case 'ca':
    I18n.translations.ca = require('./ca.json');
    require('moment/locale/ca');
    break;
  case 'cs':
    I18n.translations.cs = require('./cs.json');
    require('moment/locale/cs');
    break;
  case 'da':
    I18n.translations.da = require('./da.json');
    require('moment/locale/da');
    break;
  case 'de':
    I18n.translations.de = require('./de.json');
    require('moment/locale/de');
    break;
  case 'el':
    I18n.translations.el = require('./el.json');
    require('moment/locale/el');
    break;
  case 'es':
    I18n.translations.es = require('./es.json');
    require('moment/locale/es');
    break;
  case 'et':
    I18n.translations.et = require('./et.json');
    require('moment/locale/et');
    break;
  case 'fi': {
    const addCode = I18n.locale.substr(0, 3);
    if (addCode === 'fil') {
      I18n.translations.fil = require('./fil.json');
    } else {
      I18n.translations.fi = require('./fi.json');
      require('moment/locale/fi');
    }
    break;
  }
  case 'fr':
    I18n.translations.fr = require('./fr.json');
    require('moment/locale/fr');
    break;
  case 'he':
    I18n.translations.he = require('./he.json');
    require('moment/locale/he');
    break;
  case 'hi':
    I18n.translations.hi = require('./hi.json');
    require('moment/locale/hi');
    break;
  case 'hr':
    I18n.translations.hr = require('./hr.json');
    require('moment/locale/hr');
    break;
  case 'hu':
    I18n.translations.hu = require('./hu.json');
    require('moment/locale/hu');
    break;
  case 'in':
    I18n.translations.in = require('./id.json');
    require('moment/locale/id');
    break;
  case 'id':
    I18n.translations.id = require('./id.json');
    require('moment/locale/id');
    break;
  case 'it':
    I18n.translations.it = require('./it.json');
    require('moment/locale/it');
    break;
  case 'ja':
    I18n.translations.ja = require('./ja.json');
    require('moment/locale/ja');
    break;
  case 'ko':
    I18n.translations.ko = require('./ko.json');
    require('moment/locale/ko');
    break;
  case 'lt':
    I18n.translations.lt = require('./lt.json');
    require('moment/locale/lt');
    break;
  case 'lv':
    I18n.translations.lv = require('./lv.json');
    require('moment/locale/lv');
    break;
  case 'ms':
    I18n.translations.ms = require('./ms.json');
    require('moment/locale/ms');
    break;
  case 'nb':
    I18n.translations.nb = require('./nb.json');
    require('moment/locale/nb');
    break;
  case 'nl':
    I18n.translations.nl = require('./nl.json');
    require('moment/locale/nl');
    break;
  case 'no':
    I18n.translations.no = require('./no.json');
    require('moment/locale/nb');
    break;
  case 'pl':
    I18n.translations.pl = require('./pl.json');
    require('moment/locale/pl');
    break;
  case 'pt':
    I18n.translations.pt = require('./pt.json');
    require('moment/locale/pt');
    break;
  case 'ro':
    I18n.translations.ro = require('./ro.json');
    require('moment/locale/ro');
    break;
  case 'ru':
    I18n.translations.ru = require('./ru.json');
    require('moment/locale/ru');
    break;
  case 'sl':
    I18n.translations.sl = require('./sl.json');
    require('moment/locale/sl');
    break;
  case 'sk':
    I18n.translations.sk = require('./sk.json');
    require('moment/locale/sk');
    break;
  case 'sr':
    I18n.translations.sr = require('./sr.json');
    require('moment/locale/sr');
    break;
  case 'sv':
    I18n.translations.sv = require('./sv.json');
    require('moment/locale/sv');
    break;
  case 'sw':
    I18n.translations.sw = require('./sw.json');
    require('moment/locale/sw');
    break;
  case 'th':
    I18n.translations.th = require('./th.json');
    require('moment/locale/th');
    break;
  case 'tr':
    I18n.translations.tr = require('./tr.json');
    require('moment/locale/tr');
    break;
  case 'uk':
    I18n.translations.uk = require('./uk.json');
    require('moment/locale/uk');
    break;
  case 'vi':
    I18n.translations.vi = require('./vi.json');
    require('moment/locale/vi');
    break;
  case 'zh':
    I18n.translations.zh = require('./zh.json');
    require('moment/locale/zh-cn');
    break;
  case 'zu':
    I18n.translations.zu = require('./zu.json');
    break;
  default: break;
}
