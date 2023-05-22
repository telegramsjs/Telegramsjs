/**
 * Constants for document types.
 *
 * @readonly
 * @enum {string}
 * @property {string} PersonalDetails - Personal details.
 * @property {string} Passport - Passport.
 * @property {string} DriverLicense - Driver's license.
 * @property {string} IdentityCard - Identity card.
 * @property {string} InternalPassport - Internal passport.
 * @property {string} Address - Address.
 * @property {string} UtilityBill - Utility bill.
 * @property {string} BankStatement - Bank statement.
 * @property {string} RentalAgreement - Rental agreement.
 * @property {string} PassportRegistration - Passport registration.
 * @property {string} TemporaryRegistration - Temporary registration.
 * @property {string} PhoneNumber - Phone number.
 * @property {string} Email - Email.
 */
const DocumentTypes = {
  PersonalDetails: 'personal_details',
  Passport: 'passport',
  DriverLicense: 'driver_license',
  IdentityCard: 'identity_card',
  InternalPassport: 'internal_passport',
  Address: 'address',
  UtilityBill: 'utility_bill',
  BankStatement: 'bank_statement',
  RentalAgreement: 'rental_agreement',
  PassportRegistration: 'passport_registration',
  TemporaryRegistration: 'temporary_registration',
  PhoneNumber: 'phone_number',
  Email: 'email'
};

module.exports = DocumentTypes;