export default class StringsConstants {
  static permissionContact = {
    title: 'Contacts',
    message: 'The Bounce app would like to view your contacts.',
    buttonPositive: 'Please accept permission',
  };
  static requiredFieldError = (title = '') => {
    return ` ${title} is required.`;
  };
  static minimumFieldError = (title = '', len = 0) => {
    return `${title} should be ${len}`;
  };
  static urls = {
    REFUND_POLICY:
      'https://www.freeprivacypolicy.com/live/1d11abd9-805d-4fb1-8f8b-2f234200bd59',
    PRIVACY_POLICY:
      'https://doc-hosting.flycricket.io/vidhiricetraders-privacy-policy/30c8b32c-5677-497e-80d6-574be881f242/privacy',
    T_AND_C:
      'https://doc-hosting.flycricket.io/vidhiricetraders-terms-of-use/9428c152-c835-4a21-b974-658a427e0a94/terms',
  };
}
