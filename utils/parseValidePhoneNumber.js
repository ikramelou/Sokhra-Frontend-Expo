export default function parseValidPhoneNumber(countryCode, nationalNumber) {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  const PNF = require('google-libphonenumber').PhoneNumberFormat
  return phoneUtil.format(phoneUtil.parse(nationalNumber, countryCode), PNF.INTERNATIONAL)
}
