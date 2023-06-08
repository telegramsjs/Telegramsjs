## Object: DocumentTypes

Constants for document types.

### Properties

- `PersonalDetails`: Personal details.
- `Passport`: Passport.
- `DriverLicense`: Driver's license.
- `IdentityCard`: Identity card.
- `InternalPassport`: Internal passport.
- `Address`: Address.
- `UtilityBill`: Utility bill.
- `BankStatement`: Bank statement.
- `RentalAgreement`: Rental agreement.
- `PassportRegistration`: Passport registration.
- `TemporaryRegistration`: Temporary registration.
- `PhoneNumber`: Phone number.
- `Email`: Email.

### Usage

The `DocumentTypes` object provides a set of predefined constants representing different document types.

Example:

```javascript
const { DocumentTypes } = require('telegramsjs');

console.log(DocumentTypes.Passport); // Output: "passport"
console.log(DocumentTypes.Address); // Output: "address"
// ...
```