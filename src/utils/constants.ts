export interface Product {
  GUID: string;
  ALTERID: string;
  NAME: string;
  PARENT: string;
  _PARENT: string;
  ALIAS: string;
  UOM: string;
  _UOM: string;
  OPENINGBALANCE: string;
  OPENINGRATE: string;
  OPENINGVALUE: string;
  NATUREOFGOODS: string;
  HSNCODE: string;
  TAXABILITY: string;
}

export interface Voucher {
  GUID: string;
  ALTERID: string;
  DATE: string;
  VOUCHER_TYPE: string;
  _VOUCHER_TYPE: string;
  VOUCHER_NUMBER: string;
  REFERENCE_NUMBER: string;
  REFERENCE_DATE: string;
  NARRATION: string;
  PARTY_NAME: string;
  _PARTY_NAME: string;
  PLACE_OF_SUPPLY: string;
  IS_INVOICE: string;
  IS_ACCOUNTING_VOUCHER: string;
  IS_INVENTORY_VOUCHER: string;
  IS_ORDER_VOUCHER: string;
}

export interface Header {
  VERSION: string;
  STATUS: string;
}

export interface ImportResult {
  CREATED: string;
  ALTERED: string;
  DELETED: string;
  LASTVCHID: string;
  LASTMID: string;
  COMBINED: string;
  IGNORED: string;
  ERRORS: string;
  CANCELLED: string;
}

export interface CompanyInfo {
  COMPANY: string;
  GROUP: string;
  LEDGER: string;
  // Add other properties from the XML if needed...
}

export interface ParsedResponse {
  HEADER: Header;
  IMPORTRESULT: ImportResult;
  CMPINFO: CompanyInfo;
  // Add other properties from the XML if needed...
}

export interface Ledger {
  name: string;
  guid: string;
  openingBalance: number;
}
export interface ParsedObject {
  GUID: string;
  ALTERID: string;
  NAME: string;
  FORMALNAME: string;
  ISSIMPLEUNIT: string;
  BASEUNITS: string;
  ADDITIONALUNITS: string;
  CONVERSION: string;
}

export interface InputItem {
  deliveryRoute: string;
  name: string;
  PercentGST: string;
  BilledQuantity: string;
  FreeQuantity: string;
  Rate: string;
  SchemeAmount: string;
  SchemeName: string;
  DiscountPercent: string;
  TaxableAmount: string;
  CGSTAmount: string;
  SGSTAmount: string;
  Amount: string;
  SortingFlag: string;
  RoundOFF: string;
}

export interface OutputItem {
  ItemName: string;
  ItemCode: string; // Not important, you can add it if needed
  PercentGST: number;
  BilledQuantity: number;
  FreeQuantity: number;
  Rate: number;
  SchemeAmount: string;
  SchemeName: string;
  DiscountPercent: number;
  TaxableAmount: number;
  CGSTAmount: number;
  SGSTAmount: number;
  Amount: number;
  SortingFlag: number;
  RoundOFF: number;
}

export interface OutputInvoice {
  OrderRefNo: string;
  InvoiceNumber: string;
  InvoiceDate: string;
  Salesperson: string;
  ShopName: string;
  ShopPincode: string;
  GSTIN_UIN: string;
  IRNNumber: string;
  IRNQRCode: string;
  IRNAcknowledgementNo: string;
  IRNAcknowledgementDate: string;
  EwayBillNumber: string;
  EwayBillDate: string;
  TotalAmount: number;
  TotalBilledQTY: number;
  TotalTaxableAmount: number;
  TotalFreeQTY: number;
  TotalCGSTAmount: number;
  TotalSGSTAmount: number;
  Items: OutputItem[];
}

export interface OutputRoute {
  DeliveryRoute: string;
  Invoices: OutputInvoice[];
}

export interface OutputData {
  Status: number;
  Message: string;
  Data: {
    Count: number;
    Routes: OutputRoute[];
  };
}
