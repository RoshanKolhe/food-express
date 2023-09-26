export const STOCK_ITEM_XML = () => {
//   return `
//   <ENVELOPE>

//   <HEADER>

//   <VERSION>1</VERSION>

//   <TALLYREQUEST>Export</TALLYREQUEST>

//   <TYPE>Data</TYPE>

//   <ID>List of Accounts</ID>

//   </HEADER>

//   <BODY>

//   <DESC>

//   <STATICVARIABLES>

//            <AccountType>Stock Items</AccountType>

//   </STATICVARIABLES>

//   </DESC>

//   </BODY>

//   </ENVELOPE>`;
    return `<ENVELOPE>
  	<HEADER>
  		<VERSION>1</VERSION>
  		<TALLYREQUEST>Export</TALLYREQUEST>
  		<TYPE>Data</TYPE>
  		<ID>MyReportLedgerTable</ID>
  	</HEADER>
  	<BODY>
  		<DESC>
  			<STATICVARIABLES>
  				<SVEXPORTFORMAT>XML (Data Interchange)</SVEXPORTFORMAT>
  				<SVFROMDATE>{fromDate}</SVFROMDATE>
  				<SVTODATE>{toDate}</SVTODATE>
  			</STATICVARIABLES>
  			<TDL>
  				<TDLMESSAGE>
  					<REPORT NAME="MyReportLedgerTable">
  						<FORMS>MyForm</FORMS>
  					</REPORT>
  					<FORM NAME="MyForm">
  						<PARTS>MyPart01</PARTS>
  					</FORM>
  					<PART NAME="MyPart01">
  						<LINES>MyLine01</LINES>
  						<REPEAT>MyLine01 : MyCollection</REPEAT>
  						<SCROLLED>Vertical</SCROLLED>
  					</PART>
  					<LINE NAME="MyLine01">
  					<FIELDS>Fld01,Fld02,Fld03,Fld04,Fld05,Fld06,Fld07,Fld08,Fld09,Fld10,Fld11,Fld12,Fld13,Fld14,Fld15,Fld16,Fld17</FIELDS>
  					</LINE>
  					<FIELD NAME="Fld01">
  						<SET>$Guid</SET>
  						<XMLTAG>Guid</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld02">
  						<SET>if $$IsEmpty:$AlterId then "0" else $$String:$AlterId</SET>
  						<XMLTAG>AlterId</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld03">
  						<SET>$Name</SET>
  						<XMLTAG>Name</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld04">
  						<SET>if $$IsEqual:$Parent:$$SysName:Primary then "" else $Parent</SET>
  						<XMLTAG>Parent</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld05">
  						<SET>if $$IsEqual:$Parent:$$SysName:Primary then "" else $Guid:StockGroup:$Parent</SET>
  						<XMLTAG>_Parent</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld06">
  						<SET>$OnlyAlias</SET>
  						<XMLTAG>Alias</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld07">
  						<SET>$BaseUnits</SET>
  						<XMLTAG>uom</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld08">
  						<SET>$Guid:Unit:$BaseUnits</SET>
  						<XMLTAG>_uom</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld09">
  						<SET>$$StringFindAndReplace:($$Number:$$String:$OpeningBalance):"(-)":"-"</SET>
  						<XMLTAG>OpeningBalance</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld10">
  						<SET>if $$IsEmpty:$OpeningRate then 0 else $$Number:$OpeningRate</SET>
  						<XMLTAG>OpeningRate</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld11">
  						<SET>$$StringFindAndReplace:(if $$IsDebit:$OpeningValue then -$$NumValue:$OpeningValue else $$NumValue:$OpeningValue):"(-)":"-"</SET>
  						<XMLTAG>OpeningValue</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld12">
  						<SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].Natureofgoods) then $GstDetails[Last].Natureofgoods else ""</SET>
  						<XMLTAG>Natureofgoods</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld13">
  						<SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].Hsncode) then $GstDetails[Last].Hsncode else ""</SET>
  						<XMLTAG>Hsncode</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld14">
  						<SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].Taxability) then $GstDetails[Last].Taxability else ""</SET>
  						<XMLTAG>Taxability</XMLTAG>
  					</FIELD>
  					<FIELD NAME="Fld15">
                          <SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].CGST) then $GstDetails[Last].CGST else ""</SET>
                          <XMLTAG>CGST</XMLTAG>
                      </FIELD>
                      <FIELD NAME="Fld16">
                          <SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].IGST) then $GstDetails[Last].IGST else ""</SET>
                          <XMLTAG>IGST</XMLTAG>
                      </FIELD>
                      <FIELD NAME="Fld17">
                          <SET>if ($$IsEqual:$GstApplicable:($$SysName:Applicable) AND NOT $$IsEmpty:$GstDetails[Last].VAT) then $GstDetails[Last].VAT else ""</SET>
                          <XMLTAG>VAT</XMLTAG>
                      </FIELD>
  					<FIELD NAME="FldBlank">
  						<SET>""</SET>
  					</FIELD>
  					<COLLECTION NAME="MyCollection">
                          <TYPE>StockItem</TYPE>
                          <FETCH>GstDetails</FETCH>
                          <FETCH>StateWiseDetails</FETCH>
                      </COLLECTION>
  				</TDLMESSAGE>
  			</TDL>
  		</DESC>
  	</BODY>
  </ENVELOPE>`;
};
