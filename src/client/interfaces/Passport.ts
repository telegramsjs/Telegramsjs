/** This object represents an error in the Telegram Passport element that was submitted and should be resolved by the user. It can be one of the following:
- PassportElementErrorDataField
- PassportElementErrorFrontSide
- PassportElementErrorReverseSide
- PassportElementErrorSelfie
- PassportElementErrorFile
- PassportElementErrorFiles
- PassportElementErrorTranslationFile
- PassportElementErrorTranslationFiles
- PassportElementErrorUnspecified
*/
export type PassportElementError =
  | PassportElementErrorDataField
  | PassportElementErrorFrontSide
  | PassportElementErrorReverseSide
  | PassportElementErrorSelfie
  | PassportElementErrorFile
  | PassportElementErrorFiles
  | PassportElementErrorTranslationFile
  | PassportElementErrorTranslationFiles
  | PassportElementErrorUnspecified;

/** Represents an issue in one of the data fields provided by the user. The error is considered resolved when the field's value changes. */
export interface PassportElementErrorDataField {
  /** Error source, must be "data". */
  source: "data";
  /** The section of the user's Telegram Passport that has the error. Possible values are "personal_details", "passport", "driver_license", "identity_card", "internal_passport", and "address". */
  type:
    | "personal_details"
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "address";
  /** Name of the data field that has the error. */
  field_name: string;
  /** Base64-encoded data hash. */
  data_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface PassportElementErrorFrontSide {
  /** Error source, must be "front_side". */
  source: "front_side";
  /** The section of the user's Telegram Passport that has the issue. Possible values are "passport", "driver_license", "identity_card", and "internal_passport". */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
  /** Base64-encoded hash of the file with the front side of the document. */
  file_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with the reverse side of the document changes. */
export interface PassportElementErrorReverseSide {
  /** Error source, must be "reverse_side". */
  source: "reverse_side";
  /** The section of the user's Telegram Passport that has the issue. Possible values are "driver_license" and "identity_card". */
  type: "driver_license" | "identity_card";
  /** Base64-encoded hash of the file with the reverse side of the document. */
  file_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface PassportElementErrorSelfie {
  /** Error source, must be "selfie". */
  source: "selfie";
  /** The section of the user's Telegram Passport that has the issue. Possible values are "passport", "driver_license", "identity_card", and "internal_passport". */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
  /** Base64-encoded hash of the file with the selfie. */
  file_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface PassportElementErrorFile {
  /** Error source, must be "file". */
  source: "file";
  /** The section of the user's Telegram Passport that has the issue. Possible values are "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". */
  type:
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** Base64-encoded file hash. */
  file_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface PassportElementErrorFiles {
  /** Error source, must be "files". */
  source: "files";
  /** The section of the user's Telegram Passport that has the issue. Possible values are "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". */
  type:
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** List of base64-encoded file hashes. */
  file_hashes: string[];
  /** Error message. */
  message: string;
}

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface PassportElementErrorTranslationFile {
  /** Error source, must be "translation_file". */
  source: "translation_file";
  /** Type of element of the user's Telegram Passport that has the issue. Possible values are "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". */
  type:
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** Base64-encoded file hash. */
  file_hash: string;
  /** Error message. */
  message: string;
}

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation changes. */
export interface PassportElementErrorTranslationFiles {
  /** Error source, must be "translation_files". */
  source: "translation_files";
  /** Type of element of the user's Telegram Passport that has the issue. Possible values are "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". */
  type:
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** List of base64-encoded file hashes. */
  file_hashes: string[];
  /** Error message. */
  message: string;
}

/** Represents an issue in an unspecified element of the Telegram Passport. The error is considered resolved when new data is added. */
export interface PassportElementErrorUnspecified {
  /** Error source, must be "unspecified". */
  source: "unspecified";
  /** Type of element of the user's Telegram Passport that has the issue. Possible values are "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", and "email". */
  type:
    | "personal_details"
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "address"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration"
    | "phone_number"
    | "email";
  /** Base64-encoded element hash. */
  element_hash: string;
  /** Error message. */
  message: string;
}
