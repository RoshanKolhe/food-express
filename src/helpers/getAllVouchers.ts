export const ALL_VOUCHERS_DATA = (dates: any) => {
  return `<ENVELOPE Action="">
      <HEADER>
          <VERSION>1</VERSION>
          <TALLYREQUEST>EXPORT</TALLYREQUEST>
          <TYPE>COLLECTION</TYPE>
          <ID>CustomVoucherCollection</ID>
      </HEADER>
      <BODY>
          <DESC>
              <STATICVARIABLES>
                  <SVCURRENTCOMPANY>Demo Food Express</SVCURRENTCOMPANY>
                  <SVFROMDATE TYPE="Date">${dates.startDate}</SVFROMDATE>
                  <SVTODATE TYPE="Date">${dates.endDate}</SVTODATE>
              </STATICVARIABLES>
              <TDL>
                  <TDLMESSAGE>
                      <COLLECTION ISMODIFY="No" ISFIXED="No" ISINITIALIZE="No" ISOPTION="No" ISINTERNAL="No" NAME="CustomVoucherCollection">
                          <TYPE>Vouchers : VoucherType</TYPE>
                          <CHILDOF>$$VchTypeSales</CHILDOF>
                          <BELONGSTO>Yes</BELONGSTO>
                          <NATIVEMETHOD>*, *.*</NATIVEMETHOD>
                          <FETCH>LEDGERENTRIES</FETCH>
                      </COLLECTION>
                  </TDLMESSAGE>
              </TDL>
          </DESC>
      </BODY>
  </ENVELOPE>`;
};
