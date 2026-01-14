import { enCldr } from '../../../core/localization/cldr-data/en';
import { supplementalCldr } from '../../../core/localization/cldr-data/supplemental';
import coreLocalization from '../../../core/localization/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import Globalize from 'globalize';
if (Globalize !== null && Globalize !== void 0 && Globalize.load) {
  if (!Globalize.locale()) {
    Globalize.load(enCldr, supplementalCldr);
    Globalize.locale('en');
  }
  coreLocalization.inject({
    // eslint-disable-next-line consistent-return,@typescript-eslint/no-invalid-void-type
    locale(locale) {
      if (!locale) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Globalize.locale().locale;
      }
      Globalize.locale(locale);
    }
  });
}