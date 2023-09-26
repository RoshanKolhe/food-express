/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-for-of */
import http from 'http';
import {parseString} from 'xml2js';

export class TallyHttpCallService {
  constructor() {}

  postTallyXML(msg: any) {
    console.log(process.env.TALLY_HOST);
    return new Promise((resolve, reject) => {
      try {
        const req = http.request(
          {
            hostname: process.env.TALLY_HOST,
            port: process.env.TALLY_PORT,
            path: '',
            method: 'POST',
            headers: {
              'Content-Length': Buffer.byteLength(msg, 'utf16le'),
              'Content-Type': 'text/xml;charset=utf-16',
            },
          },
          (res: any) => {
            let data = '';
            res
              .setEncoding('utf16le')
              .on('data', (chunk: any) => {
                const result = chunk.toString() || '';
                data += result;
              })
              .on('end', () => {
                resolve(data);
              })
              .on('error', (httpErr: any) => {
                reject(httpErr);
              });
          },
        );
        req.on('error', (reqError: any) => {
          reject(reqError);
        });
        req.write(msg, 'utf16le');
        req.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  parseActiveCompany(xmlData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          const envelope =
            result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0].COMPANY[0];
          const finalActiveCompanyData = {
            name: envelope.NAME[0]._,
            guid: envelope.GUID[0]._,
            companyNo: envelope.COMPANYNUMBER[0]._,
            booksFrom: envelope.BOOKSFROM[0]._,
            startingFrom: envelope.STARTINGFROM[0]._,
            endAt: envelope.ENDINGAT[0]._,
          };
          resolve(finalActiveCompanyData);
        }
      });
    });
  }

  parseVouchers(xmlData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const envelope = result.ENVELOPE;
          const productArray = [];

          const data = envelope.BODY[0].DATA[0].COLLECTION[0].VOUCHER;
          const formattedArray = data.map((res: any) => {
            let orderData = [];
            if (
              res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'].length &&
              res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'].length > 0
            ) {
              for (
                let i = 0;
                i <
                res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'].length;
                i++
              ) {
                const item = {
                  name: res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][
                    i
                  ]['UDF:SSITEMNAME.LIST'][0]['UDF:SSITEMNAME'][0]['_'],
                  SortingFlag:
                    res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i][
                      'UDF:SSSORTINGFLAG.LIST'
                    ][0]['UDF:SSSORTINGFLAG'][0]['_'],
                  // PercentGST:
                  //   `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSITEMGST.LIST'][0]['UDF:SSITEMGST'][0]['_']}`.trim(),
                  PercentGST:
                    `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSPERCENTGST.LIST'][0]['UDF:SSPERCENTGST'][0]['_']}`.trim(),
                  Rate: `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSUNITPTR.LIST'][0]['UDF:SSUNITPTR'][0]['_']}`.trim(),
                  unitMrp:
                    `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSUNITMRP.LIST'][0]['UDF:SSUNITMRP'][0]['_']}`.trim(),
                  BilledQuantity:
                    `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSQUANTITY.LIST'][0]['UDF:SSQUANTITY'][0]['_']}`.trim(),
                  FreeQuantity: res['UDF:SSORDERDATA.LIST'][0][
                    'UDF:SSORDERITEMS.LIST'
                  ][i]['UDF:SSITEMFREE.LIST']
                    ? `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSITEMFREE.LIST'][0]['UDF:SSITEMFREE'][0]['_']}`.trim()
                    : '',
                  SchemeAmount: res['UDF:SSORDERDATA.LIST'][0][
                    'UDF:SSORDERITEMS.LIST'
                  ][i]['UDF:SSSCHEMENAME.LIST']
                    ? `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSSCHEMENAME.LIST'][0]['UDF:SSSCHEMENAME'][0]['_']}`.trim()
                    : '',
                  SchemeName: res['UDF:SSORDERDATA.LIST'][0][
                    'UDF:SSORDERITEMS.LIST'
                  ][i]['UDF:SSSCHEMENAME.LIST']
                    ? `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSSCHEMENAME.LIST'][0]['UDF:SSSCHEMENAME'][0]['_']}`.trim()
                    : '',
                  TaxableAmount: res['UDF:SSORDERDATA.LIST'][0][
                    'UDF:SSORDERITEMS.LIST'
                  ][i]['UDF:SSTOTALITEMPRICE.LIST']
                    ? `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSTOTALITEMPRICE.LIST'][0]['UDF:SSTOTALITEMPRICE'][0]['_']}`.trim()
                    : '',
                  Amount: res['UDF:SSORDERDATA.LIST'][0][
                    'UDF:SSORDERITEMS.LIST'
                  ][i]['UDF:SSTOTALITEMPRICE.LIST']
                    ? `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERITEMS.LIST'][i]['UDF:SSTOTALITEMPRICE.LIST'][0]['UDF:SSTOTALITEMPRICE'][0]['_']}`.trim()
                    : '',
                };
                orderData.push(item);
              }
            }
            return {
              DeliveryRoute:
                res['UDF:SSORDERDATA.LIST'][0]['UDF:SSVEHICLEROUTE.LIST'][0][
                  'UDF:SSVEHICLEROUTE'
                ][0]['_'],
              Items: orderData,
              TotalAmount: `${Math.abs(
                res['LEDGERENTRIES.LIST'][0]['AMOUNT'][0],
              )}`.trim(),
              totalGst:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSTOTALGST.LIST'][0]['UDF:SSTOTALGST'][0]['_']}`.trim(),
              shopName:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSSHOPNAME.LIST'][0]['UDF:SSSHOPNAME'][0]['_']}`.trim(),
              OrderRefNo:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSINVOICEID.LIST'][0]['UDF:SSINVOICEID'][0]['_']}`.trim(),
              InvoiceNumber: `${res['VOUCHERNUMBER'][0]}`.trim(),
              ShopPincode: `${res['PARTYPINCODE'][0]}`.trim(),
              GSTINUIN: `${res['PARTYGSTIN'][0]}`.trim(),
              invoiceDate:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSINVOICEDATE.LIST'][0]['UDF:SSINVOICEDATE'][0]['_']}`.trim(),
              orderId:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSORDERID.LIST'][0]['UDF:SSORDERID'][0]['_']}`.trim(),
              salesPerson:
                `${res['UDF:SSORDERDATA.LIST'][0]['UDF:SSSALESPERSON.LIST'][0]['UDF:SSSALESPERSON'][0]['_']}`.trim(),
              irnAckDate: `${res['IRNACKDATE'][0]}`.trim(),
              irnNumber: `${res['IRN'][0]}`.trim(),
              irnQrCode: `${res['IRNQRCODE'][0]}`.trim(),
              irnAckCode: `${res['IRNACKNO'][0]}`.trim(),
              ewayBillNumber: `${
                res['EWAYBILLDETAILS.LIST'][0]['BILLNUMBER']
                  ? res['EWAYBILLDETAILS.LIST'][0]['BILLNUMBER']
                  : ''
              }`.trim(),
              ewayBillDate: `${
                res['EWAYBILLDETAILS.LIST'][0]['BILLDATE']
                  ? res['EWAYBILLDETAILS.LIST'][0]['BILLDATE']
                  : ''
              }`.trim(),
            };
          });
          resolve(formattedArray);
        }
      });
    });
  }

  parseVouchers1(xmlData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const envelope = result.ENVELOPE;
          const productArray = [];

          const data = envelope.BODY[0].DATA[0].COLLECTION[0].VOUCHER;

          resolve(data);
        }
      });
    });
  }
}
