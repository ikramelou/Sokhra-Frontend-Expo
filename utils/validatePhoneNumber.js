export default function validatePhoneNumber(countryCode, nationalNumber) {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  try {
    return phoneUtil.isValidNumberForRegion(phoneUtil.parse(nationalNumber, countryCode), countryCode);
  } catch (error) {
    return false
  }
}
