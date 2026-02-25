var strIP = 'NA';
var IsValid = 'NA';
//$(document).ready(function () {
//    $.getJSON("https://jsonip.com/?callback=?", function (data) {
//        console.log(data.ip);
//        strIP = data.ip;
//    });
//});

function fnGTM_Layer(ObjIn, ObjJson) {
    var MobileNo = 'NA';
    var EmailID = 'NA';
    var RID = 'NA';
    var QuoteID = 'NA';
    var PolicyID = 'NA';
    var PolicyNo = 'NA';
    var ProposalNo = 'NA';
    var PaymentMode = 'NA';
    var PageEvent = 'NA';

    if (ObjIn != null) {
        MobileNo = "9999999999"; //ObjIn.MobileNo;
        EmailID = ObjIn.EmailID;
        RID = ObjIn.RID;
        QuoteID = ObjIn.QuoteID;
        PolicyID = ObjIn.PolicyID;
        PolicyNo = ObjIn.PolicyNo;
        ProposalNo = ObjIn.ProposalNo;
        PaymentMode = ObjIn.PaymentMode;
        PageEvent = ObjIn.PageEvent;
    }
    else if (ObjJson != null && ObjJson != "") {
        //&& ObjJson != "" Added by Ganesh Nayak on 22/01/2018
        jsonData = JSON.parse(ObjJson);

        MobileNo = "9999999999"; //jsonData.MobileNo;
        EmailID = jsonData.EmailID;
        RID = jsonData.RID;
        QuoteID = jsonData.QuoteID;
        PolicyID = jsonData.PolicyID;
        PolicyNo = jsonData.PolicyNo;
        ProposalNo = jsonData.ProposalNo;
        PaymentMode = jsonData.PaymentMode;
        PageEvent = jsonData.PageEvent;
    }

    if (MobileNo == 'NA' && sessionStorage.getItem("GA_Mobile") != '')
        MobileNo = "9999999999"; //sessionStorage.getItem("GA_Mobile");
    if (EmailID == 'NA' && sessionStorage.getItem("GA_Email") != '')
        EmailID = sessionStorage.getItem("GA_Email");


    var data = fngetPageData();
    //dataLayer.push({ 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'pageseokeywords': data.pageseokeywords, 'usertype': data.usertype, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'payment_method': Payment_method, 'pagereferrer': data.pagereferrer, 'userID': ObjIn.RID, 'quoteID': ObjIn.QuoteID, 'IPaddress': data.IPaddress });

    window.dataLayer = window.dataLayer || [];

    dataLayer.push({
        'event': 'allpage',
        'pagetype': data.pagename,
        'pageurl': data.pageurl,
        'pageseokeywords': data.pageseokeywords,
        'usertype': data.UserType,
        'pagesection': 'NA',
        'lcf_response_locations': data.lcf_response_locations,
        'business_vertical_product': data.business_vertical,
        'business_vertical_subcategory': data.business_vertical_subcategory,
        'payment_method': PaymentMode,
        'pagereferrer': data.pagereferrer,
        'userid': RID,
        'quoteid': QuoteID,
        'domain': data.domain,
        'email': EmailID,
        'phone': MobileNo,
        'ipaddress': data.IPaddress,
        'isvalid': 'True'
    });

    //console.log("dataLayer.push({ 'pagetype': " + data.pagename + ", 'pageurl': " + data.pageurl + ", 'pageseokeywords': " + data.pageseokeywords + ", 'usertype': " + data.UserType + ", 'pagesection': 'NA', 'lcf_response_locations': " + data.lcf_response_locations + ", 'business_vertical': " + data.business_vertical + ", 'business_vertical_subcategory': " + data.business_vertical_subcategory + ", 'payment_method': " + PaymentMode + ", 'pagereferrer': " + data.pagereferrer + ", 'userid': " + RID + ", 'quoteid': " + QuoteID + ", 'domain': " + data.domain + " , 'email': " + EmailID + ", 'phone': " + MobileNo + ", 'ipaddress': " + data.IPaddress + ", 'isvalid' : 'True'});");

    //if (QuoteID != "NA")
    if (typeof QuoteID !== "undefined" && QuoteID != null && QuoteID != "null" && QuoteID != "NA")
        sessionStorage.setItem("IPartnerQuoteId", QuoteID);
}

function fngetPageData() {
    var pagedata = new Object();
    var page = window.location.href;
    //var urlParams = new URLSearchParams(window.location.search); // ISSUE on IE11

    pagedata.pagetype = page.split("/")[4]; //get-quote, Enter Details, RnC

    var pageURL = page.split("?")[0].split("/");
    pagedata.pagename = pageURL[pageURL.length - 1].split("#")[0];
    pagedata.pageurl = page; // Current URL
    pagedata.pageseokeywords = 'NA'; // Metadata

    if (fnGetQueryString('source') != null) {
        pagedata.lcf_response_locations = fnGetQueryString('source'); // nav
        sessionStorage.GA_lcf_response_locations = fnGetQueryString('source'); // nav
    }
    else if (sessionStorage.GA_lcf_response_locations != null) {
        pagedata.lcf_response_locations = sessionStorage.GA_lcf_response_locations;
    }
    else {
        pagedata.lcf_response_locations = 'NA';
    }

    var pageArr = page.split("/");
    pagedata.business_vertical = pageArr[3]; //Health-Insurance, Motor-Insurance
    if (pagedata.business_vertical.indexOf("?") > 0) //health-insurance?utm_source=yahoo-native&utm_medium=cpc&utm_campaign=Health_insurance_native
        pagedata.business_vertical = pagedata.business_vertical.split("?")[0];
    if (pagedata.business_vertical.indexOf("#") > 0)
        pagedata.business_vertical = pagedata.business_vertical.split("#")[0];
    if (pagedata.business_vertical == "campaigns" && pageArr.length > 4) //www.icicilombard.com/campaigns/health-insurance/tax-benefi
        pagedata.business_vertical = pageArr[4];
    if (pagedata.business_vertical == "renew-policy" && pageArr.length > 4) //www.icicilombard.com/renew-policy/motor/vehicle-details
        pagedata.business_vertical = pageArr[4] + "-insurance";

    pagedata.business_vertical_subcategory = 'NA';
    if (fnGetQueryString('opt') != null) {
        pagedata.business_vertical_subcategory = fnGetQueryString('opt'); // CHI, PP
        //sessionStorage.GA_business_vertical_subcategory = fnGetQueryString('opt'); // CHI, PP
    }
    else if (pageArr.length > 3) {
        var subcategory = "";
        if (pageArr[3] == "campaigns") {
            if (pageArr.length > 5)
                subcategory = pageArr[5];
        }
        else if (pageArr[3] == "renew-policy") {
            if (pageArr.length > 5)
                subcategory = pageArr[5];
        }
        else {
            if (pageArr.length > 4)
                subcategory = pageArr[4];
            if (subcategory == "get-quote" && pageArr.length > 5)
                subcategory = pageArr[5];
        }

        switch (subcategory) {
            case "two-wheeler-insurance":
            case "two-wheeler-renewal":
                pagedata.business_vertical_subcategory = "2W";
                break;
            case "car-insurance":
            case "car-renewal":
                pagedata.business_vertical_subcategory = "4W";
                break;
            case "complete-health-insurance":
            case "select-chi-plans":
            case "customize-your-chi-plan":
            case "chi-insured-details":
            case "chi-review-confirm":
            case "chi-renewal":
            case "complete-health-insurance-new":
                pagedata.business_vertical_subcategory = "chi";
                break;
            case "health-booster":
            case "select-hb-plans":
            case "customize-your-hb-plan":
            case "hb-details":
            case "hb-review-confirm":
                pagedata.business_vertical_subcategory = "hb";
                break;
            case "personal-accident-insurance":
            case "select-personal-protect-plans":
            case "customize-your-personal-protect-plan":
            case "personal-protect-insured-details":
            case "personal-protect-review-confirm":
                pagedata.business_vertical_subcategory = "pp";
                break;
            case "single-trip":
                pagedata.business_vertical_subcategory = "Single";
                break;
            case "gold-multi-trip":
                pagedata.business_vertical_subcategory = "multi-trip";
                break;
            default:
                {
                    //Handle Travel product GA product localstorage ovveride issue
                    if (pagedata.business_vertical == 'travel-insurance') {
                        pagedata.business_vertical_subcategory = "single";
                    }
                    break;
                }
        }

    }
    else {
        pagedata.business_vertical_subcategory = "NA";
    }
    if (pagedata.business_vertical_subcategory == 'NA' && localStorage.getItem("product") != null) {
        pagedata.business_vertical_subcategory = localStorage.getItem("product");
    }
    if ((pagedata.business_vertical == 'payment-new' || pagedata.business_vertical == 'payment-duplicate' || pagedata.business_vertical == '' || pagedata.business_vertical == 'registration') && localStorage.getItem("_PolicyType") != null) {
        pagedata.business_vertical = localStorage.getItem("_PolicyType").toLowerCase() + "-insurance";
    }


    if (pagedata.business_vertical_subcategory == "tw")
        pagedata.business_vertical_subcategory = "2W";
    if (pagedata.business_vertical_subcategory == "chi%20")
        pagedata.business_vertical_subcategory = "chi";
    if (pagedata.business_vertical_subcategory == "car")
        pagedata.business_vertical_subcategory = "4W";
    if (pagedata.business_vertical_subcategory == "TWRenewal")
        pagedata.business_vertical_subcategory = "2WRenewal";
    if (pagedata.business_vertical_subcategory == "single-trip" || pagedata.business_vertical_subcategory == "single-tripsource")
        pagedata.business_vertical_subcategory = "Single";

    //sometimes the local storage business vertical is incorrect but subcategory is correct, derive vertical from subcategory
    if (pagedata.business_vertical_subcategory == 'chi' || pagedata.business_vertical_subcategory == 'hb' || pagedata.business_vertical_subcategory == 'pp' || pagedata.business_vertical_subcategory == 'arog')
        pagedata.business_vertical = 'health-insurance';
    if (pagedata.business_vertical_subcategory == 'multi-trip' || pagedata.business_vertical_subcategory == 'Single')
        pagedata.business_vertical = 'travel-insurance';
    if (pagedata.business_vertical_subcategory == 'home')
        pagedata.business_vertical = 'home-insurance';
    if (pagedata.business_vertical_subcategory == '2W' || pagedata.business_vertical_subcategory == '4W')
        pagedata.business_vertical = 'motor-insurance';

    pagedata.pagereferrer = document.referrer; // Previous Page URL
    pagedata.IPaddress = "NA"; //strIP; //Request.ServerVariables("remote_addr"); // IP Address
    pagedata.domain = window.location.host;

    if (window.location.host != "www.icicilombard.com") {
        pagedata.UserType = "CallCenter";
    }
    else {
        pagedata.UserType = "Customer";
    }
    return pagedata;
}

function fnPaymentGTM_Layer(quoteID, In) {
    if (In != null) {
        var userid = In.userid;
        quoteID = In.quoteno;

        var data = fngetPageData();

        if (In.TransProd_Category.toUpperCase().trim() == "FRESH")
            In.saletype = "Fresh";
        else if (In.TransProd_Category.toUpperCase().trim() == "RENEWAL")
            In.saletype = "Renewal";

        //dataLayer.push({ 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'usertype': usertype, 'pageseokeywords': data.pageseokeywords, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'userid': userid, 'domain': data.domain, 'pagereferrer': data.pagereferrer, 'dealid': In.dealId, 'quoteID': quoteID, 'IP Address': data.IPaddress, 'policystartdate': In.PolicyStartDate, 'policyenddate': In.PolicyEndDate, 'paymenttype': In.PaymentType });

        if (data.business_vertical == "payment-new" || data.business_vertical == "payment-duplicate" || data.business_vertical == "make-payment" || data.business_vertical == 'revamp-payment') {
            data.business_vertical_product = In.producttype;
            data.business_vertical_subcategory = In.subproducttype;
        }

        window.dataLayer = window.dataLayer || [];
        //console.log("window.dataLayer = window.dataLayer || [];");

        var exceptionraised = "";
        try {
            var Log = "";
            if (In.producttype == "MOTOR") {//Motor
                data.business_vertical_product = 'motor-insurance';
                data.business_vertical = 'motor-insurance';
                //console.log("({ 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'domain':" + data.domain + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ",'purchasetype':" + In.TransProd_Category + ", 'vehicletype':" + In.Vehicle_type + ", 'RegistrationDate':" + In.Registration_date + ", 'Manufacturer':" + In.Manufacturer + ", 'Model':" + In.Model + ", 'RegistrationCity':" + In.RegistrationCity + ", 'AddOn':" + In.Add_on + "})");
                //'vehicletype' : In.vehicletype, 'RegistrationDate' : In.RegistrationDate, 'Manufacturer' : In.Manufacturer, 'Model' : In.Model, 'RegistrationCity' : In.RegistrationCity, 'AddOn' : In.AddOn 
                dataLayer.push({ 'event': 'allpage', 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'usertype': In.usertype, 'pageseokeywords': data.pageseokeywords, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical_product': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'business_vertical_product': data.business_vertical_product, 'userid': userid, 'domain': data.domain, 'Plantype': In.plantype, 'policyterm': In.policyterm, 'pagereferrer': data.pagereferrer, 'dealid': In.dealid, 'quoteID': In.quoteno, 'IP Address': data.IPaddress, 'policystartdate': In.policystartdate, 'policyenddate': In.policyenddate, 'paymenttype': In.paymenttype, 'purchasetype': In.TransProd_Category, 'vehicletype': In.Vehicle_type, 'RegistrationDate': In.Registration_date, 'Manufacturer': In.Manufacturer, 'Model': In.Model, 'RegistrationCity': In.RegistrationCity, 'AddOn': In.Add_on, 'saletype': In.saletype });
                Log = "dataLayer.push({ 'event': 'allpage', 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical_product':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'domain':" + data.domain + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ",'purchasetype':" + In.TransProd_Category + ", 'vehicletype':" + In.Vehicle_type + ", 'RegistrationDate':" + In.Registration_date + ", 'Manufacturer':" + In.Manufacturer + ", 'Model':" + In.Model + ", 'RegistrationCity':" + In.RegistrationCity + ", 'AddOn':" + In.Add_on + "})";
            }
            else if (In.producttype == "TRAVEL") {//Travel
                //console.log("dataLayer.push({ 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'travellocation':" + In.Travel_location + ", 'traveldate':" + In.Travel_date + ", 'travellingpersonage':" + In.Travellingperson_Age + ", 'numberofpersontravelling':" + In.Number_Of_Person_Travelling + ", 'visatype':" + In.Visa_Type + ", 'traveldestination':" + In.Travel_Destination + "})");
                //'travellocation' : In.travellocation, 'traveldate' : Intraveldate, 'travellingpersonage' : In.travellingpersonage, 'numberofpersontravelling' : In.numberofpersontravelling, 'visatype' : In.visatype, 'traveldestination' : In.traveldestination
                dataLayer.push({ 'event': 'allpage', 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'usertype': In.usertype, 'pageseokeywords': data.pageseokeywords, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical_product': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'userid': In.userid, 'domain': data.domain, 'Plantype': In.plantype, 'policyterm': In.policyterm, 'pagereferrer': data.pagereferrer, 'dealid': In.dealid, 'quoteID': In.quoteno, 'IP Address': data.IPaddress, 'policystartdate': In.policystartdate, 'policyenddate': In.policyenddate, 'paymenttype': In.paymenttype, 'purchasetype': In.TransProd_Category, 'travellocation': In.Travel_location, 'traveldate': In.Travel_date, 'travellingpersonage': In.Travellingperson_Age, 'numberofpersontravelling': In.Number_Of_Person_Travelling, 'visatype': In.Visa_Type, 'traveldestination': In.Travel_Destination, 'saletype': In.saletype });
                Log = "dataLayer.push({ 'event': 'allpage', 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical_product':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'travellocation':" + In.Travel_location + ", 'traveldate':" + In.Travel_date + ", 'travellingpersonage':" + In.Travellingperson_Age + ", 'numberofpersontravelling':" + In.Number_Of_Person_Travelling + ", 'visatype':" + In.Visa_Type + ", 'traveldestination':" + In.Travel_Destination + "})";
            }
            else if (In.producttype == "HOME") {//Home
                //console.log("dataLayer.push({ 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'hometype':" + In.home_Type + ", 'homeinsuranceon':" + In.home_insuranc_on + ", 'totalvaluewithcontent':" + In.total_value_with_content + ", 'jweleryvalue':" + In.jwelery_value + ", 'builtuparea':" + In.builtup_area + ", 'costofcunstruction':" + In.cost_of_custruction + "})");
                //'hometype' : In.hometype, 'homeinsuranceon' : In.homeinsuranceon, 'totalvaluewithcontent' : In.totalvaluewithcontent, 'jweleryvalue' : In.jweleryvalue, 'builtuparea' : In.builtuparea, 'costofcunstruction' : In.costofcunstruction
                dataLayer.push({ 'event': 'allpage', 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'usertype': In.usertype, 'pageseokeywords': data.pageseokeywords, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical_product': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'userid': userid, 'domain': data.domain, 'Plantype': In.plantype, 'policyterm': In.policyterm, 'pagereferrer': data.pagereferrer, 'dealid': In.dealid, 'quoteID': In.quoteno, 'IP Address': data.IPaddress, 'policystartdate': In.policystartdate, 'policyenddate': In.policyenddate, 'paymenttype': In.paymenttype, 'purchasetype': In.TransProd_Category, 'hometype': In.home_Type, 'homeinsuranceon': In.home_insuranc_on, 'totalvaluewithcontent': In.total_value_with_content, 'jweleryvalue': In.jwelery_value, 'builtuparea': In.builtup_area, 'costofcunstruction': In.cost_of_custruction });
                Log = "dataLayer.push({ 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical_product':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'hometype':" + In.home_Type + ", 'homeinsuranceon':" + In.home_insuranc_on + ", 'totalvaluewithcontent':" + In.total_value_with_content + ", 'jweleryvalue':" + In.jwelery_value + ", 'builtuparea':" + In.builtup_area + ", 'costofcunstruction':" + In.cost_of_custruction + "})";
            }
            else if (In.producttype == "HEALTH") {//Health
                //console.log("dataLayer.push({ 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'peds':" + In.PED + ", 'lifecover':" + In.life_cover + ", 'ageoftheeldestmember':" + In.Age_Of_the_eldest_member + ", 'noofmembers':" + In.NoOfMembers + ", 'healthaddon':" + In.Health_Add_On + ", 'policytenure':" + In.Policy_tenure + ", 'deductible':" + In.Deductible + "})");
                //'peds' : In.peds, 'lifecover' : In.lifecover, 'ageoftheeldestmember' : In.ageoftheeldestmember, 'noofmembers' : In.noofmembers, 'healthaddon' : In.healthaddon, 'policytenure' : In.policytenure, 'deductible' : In.policytenure
                dataLayer.push({
                    'event': 'allpage',
                    'pagetype': data.pagetype,
                    'pageurl': data.pageurl,
                    'usertype': In.usertype,
                    'pageseokeywords': data.pageseokeywords,
                    'lcf_response_locations': data.lcf_response_locations,
                    'business_vertical_product': data.business_vertical,
                    'business_vertical_subcategory': data.business_vertical_subcategory,
                    'userid': userid,
                    'domain': data.domain,
                    'Plantype': In.plantype,
                    'policyterm': In.policyterm,
                    'pagereferrer': data.pagereferrer,
                    'dealid': In.dealid,
                    'quoteID': In.quoteno,
                    'IP Address': data.IPaddress,
                    'policystartdate': In.policystartdate,
                    'policyenddate': In.policyenddate,
                    'paymenttype': In.paymenttype,
                    'purchasetype': In.TransProd_Category == undefined ? In.transProd_Category : In.TransProd_Category,
                    'peds': In.PED == undefined?In.ped:In.PED,
                    'lifecover': In.life_cover,
                    'ageoftheeldestmember': In.Age_Of_the_eldest_member == undefined ? In.age_Of_the_eldest_member : In.Age_Of_the_eldest_member,
                    'noofmembers': In.NoOfMembers,
                    'healthaddon': In.Health_Add_On,
                    'policytenure': In.Policy_tenure,
                    'deductible': In.Deductible,
                    'policyterm': In.policyterm,
                    'saletype': In.saletype
                });
                Log = "dataLayer.push({ 'event': 'allpage', 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid':" + userid + ", 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + ", 'peds':" + In.PED + ", 'lifecover':" + In.life_cover + ", 'ageoftheeldestmember':" + In.Age_Of_the_eldest_member + ", 'noofmembers':" + In.NoOfMembers + ", 'healthaddon':" + In.Health_Add_On + ", 'policytenure':" + In.Policy_tenure + ", 'deductible':" + In.Deductible + "})";
            }
            else if (In.producttype == "MARINE") {
                dataLayer.push({ 'event': 'allpage', 'pagetype': data.pagetype, 'pageurl': data.pageurl, 'usertype': In.usertype, 'pageseokeywords': data.pageseokeywords, 'lcf_response_locations': data.lcf_response_locations, 'business_vertical': data.business_vertical, 'business_vertical_subcategory': data.business_vertical_subcategory, 'userid': userid, 'domain': data.domain, 'Plantype': In.plantype, 'policyterm': In.policyterm, 'pagereferrer': data.pagereferrer, 'dealid': In.dealid, 'quoteID': In.quoteno, 'IP Address': data.IPaddress, 'policystartdate': In.policystartdate, 'policyenddate': In.policyenddate, 'paymenttype': In.paymenttype, 'purchasetype': In.TransProd_Category });
                Log = "dataLayer.push({ 'event': 'allpage', 'pagetype':" + data.pagetype + ", 'pageurl':" + data.pageurl + ", 'usertype':" + In.usertype + ", 'pageseokeywords':" + data.pageseokeywords + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical':" + data.business_vertical + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'userid': NA , 'domain':" + data.domain + ", 'Plantype':" + In.plantype + ", 'policyterm':" + In.policyterm + ", 'pagereferrer':" + data.pagereferrer + ", 'dealid':" + In.dealid + ", 'quoteID':" + In.quoteno + ", 'IP Address':" + data.IPaddress + ", 'policystartdate':" + In.policystartdate + ", 'policyenddate':" + In.policyenddate + ", 'paymenttype':" + In.paymenttype + ", 'purchasetype':" + In.TransProd_Category + "})";
            }
            exceptionraised = "No";
        }
        catch (err) {
            exceptionraised = "Yes";
            dataLayer.push({ 'event': 'errorpopup', 'statusmessage': 'DataLayer_Data Catch : ' + err.message });
        }

        try {
            var objLog = new Object();
            objLog.TransProd_sku = "Exception raised: " + exceptionraised + " " + Log;
            if (typeof ajaxPost === 'function')
                ajaxPost("PolicyConfirmation/GA_DataLayer_Log", JSON.stringify(objLog), OnSuccessNewGALog, OnErrorNewGALog);
        }
        catch (err) {
            dataLayer.push({ 'event': 'errorpopup', 'statusmessage': 'New GA Log : ' + err.message });
        }
    }
}


function fnEcommerceGTM_Layer(quoteID, In) {
    if (In != null) {
        //console.log("dataLayer.push({ 'event': 'transactionSuccess', 'transactionId':" + In.transactionId + ", 'transactionAffiliation':" + In.transactionAffiliation + ", 'transactionTotal':" + In.transactionTotal + ", 'transactionTax':" + In.transactionTax + ", 'transactionProducts': [{ 'sku':" + In.TransProd_sku + ", 'name':" + In.TransProd_name + ", 'category':" + In.TransProd_Category + ", 'price':" + In.TransProd_price + ", 'quantity':" + In.TransProd_quantity + "}] });");
        var exceptionraised = "";
        var dealId = "";
        try {
            //Commented by Sangeeta as suggested by Yaman deal ID is not required in this 
            //            if (typeof In.dealid !== "undefined" && In.dealid != null)
            //                dealId = In.dealid;

            //Bharat: Added Condition for HB
            if (In.transProd_name == "HB") {

                var PaymentTransactionId = In.transactionId == "0" ? corelibrary.GetParameterValues("transId") : quoteID;

                dataLayer.push({
                    'event': 'transactionSuccess',
                    'saletype': In.saletype == "" || In.saletype == null || In.saletype == undefined ? "" : In.saletype,
                    'transactionId': PaymentTransactionId,
                    'transactionAffiliation': In.transactionAffiliation,
                    'transactionTotal': In.transactionTotal,
                    'transactionTax': In.transactionTax,
                    'transactionShipping': 0,
                    'transactionProducts': [{
                        'sku': In.transProd_sku,
                        'name': In.transProd_name,
                        'category': In.transProd_Category,
                        'price': In.transProd_price,
                        'quantity': In.transProd_quantity
                    }]
                });

                dataLayer.push({
                    'event': 'tvc_transactionnew',
                    'saletype': In.saletype == "" || In.saletype == null || In.saletype == undefined ? "" : In.saletype,
                    'tvc_transactionId': PaymentTransactionId, //transaction id
                    'tvc_transactionAffiliation': In.transactionAffiliation,
                    'tvc_transactionTotal': In.transactionTotal, // amount
                    'tvc_transactionTax': In.transactionTax,   //service tax
                    'tvc_sku': In.transProd_sku,  //Product Id
                    'tvc_name': In.transProd_name, //Product name
                    'tvc_category': In.transProd_Category,
                    'tvc_price': In.transProd_price, //amount
                    'tvc_quantity': In.transProd_quantity,
                });
            }
            else {
                dataLayer.push({ 'event': 'transactionSuccess', 'transactionId': In.transactionId, 'transactionAffiliation': In.transactionAffiliation, 'transactionTotal': In.transactionTotal, 'transactionTax': In.transactionTax, 'transactionShipping': 0, 'transactionProducts': [{ 'sku': In.TransProd_sku, 'name': In.TransProd_name, 'category': In.TransProd_Category, 'price': In.TransProd_price, 'quantity': In.TransProd_quantity }] });
                dataLayer.push({
                    'event': 'tvc_transactionnew',
                    'tvc_transactionId': In.transactionId, //transaction id
                    'tvc_transactionAffiliation': In.transactionAffiliation,
                    'tvc_transactionTotal': In.transactionTotal, // amount
                    'tvc_transactionTax': In.transactionTax,   //service tax
                    'tvc_sku': In.TransProd_sku,  //Product Id
                    'tvc_name': In.TransProd_name, //Product name
                    'tvc_category': In.TransProd_Category,
                    'tvc_price': In.TransProd_price, //amount
                    'tvc_quantity': In.TransProd_quantity,
                    'tvc_motor_rto': In.RegistrationZone,
                    'tvc_motor_ex_showroom_price': In.Vehicle_Ex_Showroom_Price,
                    'tvc_motor_year_of_manufacture': In.Year_Of_Manufacture
                });
            }
            console.log(dataLayer);
            //Added by Sangeeta to use new function of GA suggested by YAMAN for transaction layer

            ga('create', {
                trackingId: 'UA-129630-22',
                cookieName: 'tvc_lombardgacookie',
                cookieDomain: 'auto',
                name: 'tvc_trans'
            });
            ga('tvc_trans.require', 'ecommerce');
            ga('tvc_trans.ecommerce:addTransaction', {
                'id': In.transactionId,
                'affiliation': In.transactionAffiliation,
                'revenue': In.transactionTotal,
                'shipping': '0',
                'tax': In.transactionTax,
                'currency': 'INR'  // local currency code.

            });
            ga('tvc_trans.ecommerce:addItem', {
                'id': In.transactionId,
                'name': In.TransProd_name,
                'sku': In.TransProd_sku,
                'category': In.TransProd_Category,
                'price': In.TransProd_price,
                'quantity': In.TransProd_quantity,
                'currency': 'INR' // local currency code.
            });
            ga('tvc_trans.ecommerce:send');

            exceptionraised = "No";
            //console.log(" dataLayer.push({ 'event': 'transactionSuccess', 'transactionId':" + In.transactionId + ", 'transactionAffiliation':" + In.transactionAffiliation + ", 'transactionTotal':" + In.transactionTotal + ", 'transactionTax':" + In.transactionTax + ", 'transactionProducts': [{ 'sku':" + In.TransProd_sku + ", 'name':" + In.TransProd_name + ", 'category':" + In.TransProd_Category + ", 'price':" + In.TransProd_price + ", 'quantity':" + In.TransProd_quantity + "}],DealID:" + dealId + " });");

        }
        catch (err) {
            exceptionraised = "Yes";
            dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'DataLayer_Transaction Catch : ' + err.message });
        }

        try {
            var Log = "Exception raised: " + exceptionraised + " dataLayer.push({ 'event': 'transactionSuccess', 'transactionId':" + In.transactionId + ", 'transactionAffiliation':" + In.transactionAffiliation + ", 'transactionTotal':" + In.transactionTotal + ", 'transactionTax':" + In.transactionTax + ", 'transactionProducts': [{ 'sku':" + In.TransProd_sku + ", 'name':" + In.TransProd_name + ", 'category':" + In.TransProd_Category + ", 'price':" + In.TransProd_price + ", 'quantity':" + In.TransProd_quantity + "}] });";
            var objLog = new Object();
            objLog.TransProd_sku = Log;
            if (typeof ajaxPost === 'function')
                ajaxPost("PolicyConfirmation/GA_DataLayer_Log", JSON.stringify(objLog), OnSuccessNewGALog, OnErrorNewGALog);
        }
        catch (err) {
            dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'New GA Log : ' + err.message });
        }

        if (typeof ajaxPost === 'function')
            ajaxPost("PolicyConfirmation/GA_EC_Log", JSON.stringify(In), OnSuccessLog, OnErrorLog);
    }
}

//function OnSuccessNewGALog() {
//    //console.log("Success");
//}

function OnErrorNewGALog(err) {
    //console.log("Error");
    dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'OnError New GA Log : ' + err.message });
    if (typeof ajaxPost === 'function')
        ajaxPost("PolicyConfirmation/GA_DataLayer_Log", JSON.stringify(err.message));
}

//function OnSuccessLog() {
//    console.log("Success");
//}

function OnErrorLog() {
    //console.log("Error");
    dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'STEP 0 - fnGA_Layer_Log : GA API FAIL' });
}

function fnGA_Layer_Log(transactionId, transactionAffiliation, transactionTotal, transactionTax, TransProd_sku, TransProd_name, TransProd_Category, TransProd_price, TransProd_quantity) {
    try {
        var ErrorData = new Object();
        ErrorData.transactionId = transactionId;
        ErrorData.transactionAffiliation = transactionAffiliation;
        ErrorData.transactionTotal = transactionTotal;
        ErrorData.transactionTax = transactionTax;
        ErrorData.TransProd_sku = TransProd_sku;
        ErrorData.TransProd_name = TransProd_name;
        ErrorData.TransProd_Category = TransProd_Category;
        ErrorData.TransProd_price = TransProd_price;
        ErrorData.TransProd_quantity = TransProd_quantity;

        if (typeof ajaxPost === 'function')
            ajaxPost("PolicyConfirmation/GA_EC_Log", JSON.stringify(ErrorData), OnSuccessGALog, OnErrorGALog);

        dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'STEP 1 - fnGA_Layer_Log : ' + transactionId + ' : ' + TransProd_sku });

    }
    catch (err) {
        dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'STEP 2 - fnGA_Layer_Log : ' + err.message });
    }
}
function OnSuccessGALog() {

}

function OnErrorGALog() {
    //dataLayer.push({ 'event': 'transactionpageerror', 'statusmessage': 'STEP 3 - fnGA_Layer_Log : GA API FAIL' }); --Commented by Mukesh
}

function fnGA_DataLayer(EMAIL, MOBILE, RID, QUOTEID, EVENTNAME) {
    var usertype;
    var data = fngetPageData();
    if (data.domain != "www.icicilombard.com") {
        usertype = "CallCenter";
    }
    else {
        usertype = "Customer";
    }

    if (sessionStorage.GA_IsValid != null) {
        IsValid = sessionStorage.GA_IsValid;
    }

    window.dataLayer = window.dataLayer || [];
    MOBILE = "9999999999";
    if (EVENTNAME.toUpperCase() != "ONLOAD") {
        dataLayer.push({
            'event': 'widget_screen3_getquote_producthomepage_5',
            'domain': data.domain,
            'label': EVENTNAME,
            'pagereferrer': data.pagereferrer,
            'business_vertical_subcategory': data.business_vertical_subcategory,
            'lcf_response_locations': data.lcf_response_locations,
            'business_vertical_product': data.business_vertical,
            'usertype': usertype,
            'pagesection': 'NA',
            'pagetype': data.pagename,
            'email': EMAIL,
            'phone': MOBILE,
            'quoteid': QUOTEID,
            'userid': RID,
            'IsValid': IsValid
        });

        //console.log("dataLayer.push({ 'event': 'widget_screen3_getquote_producthomepage_5', 'domain':" + data.domain + ", 'label':" + EVENTNAME + ", 'pagereferrer':" + data.pagereferrer + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical_product':" + data.business_vertical + ", 'usertype':" + usertype + ", 'pagesection':" + 'NA' + ", 'pagetype':" + data.pagename + ", 'email':" + EMAIL + ", 'phone':" + MOBILE + ", 'quoteid':" + QUOTEID + ", 'userid':" + RID + ", 'IsValid': " + IsValid + "});");

        sessionStorage.removeItem("GA_Email");
        sessionStorage.removeItem("GA_Mobile");
        sessionStorage.removeItem("GA_Rid");
        sessionStorage.removeItem("GA_QuoteId");

        if (EMAIL != 'NA') {
            sessionStorage.GA_Email = EMAIL;
        }
        if (MOBILE != 'NA') {
            sessionStorage.GA_Mobile = MOBILE;
        }
        if (RID != 'NA') {
            sessionStorage.GA_Rid = RID;
        }
        if (QUOTEID != 'NA') {
            sessionStorage.GA_QuoteId = QUOTEID;
        }
    }
    else {

        if (sessionStorage.GA_Email != null) {
            EMAIL = sessionStorage.GA_Email;
        }
        if (sessionStorage.GA_Mobile != null) {
            MOBILE = "9999999999";  //sessionStorage.GA_Mobile;
        }
        if (sessionStorage.GA_Rid != null) {
            RID = sessionStorage.GA_Rid;
        }
        if (sessionStorage.GA_QuoteId != null) {
            QUOTEID = sessionStorage.GA_QuoteId;
        }
        dataLayer.push({
            'event': 'allpageload',
            'domain': data.domain,
            'label': EVENTNAME,
            'pagereferrer': data.pagereferrer,
            'business_vertical_subcategory': data.business_vertical_subcategory,
            'lcf_response_locations': data.lcf_response_locations,
            'business_vertical_product': data.business_vertical,
            'usertype': usertype,
            'pagesection': 'NA',
            'pagetype': data.pagename,
            'email': EMAIL,
            'phone': MOBILE,
            'quoteid': QUOTEID,
            'userid': RID,
            'IsValid': IsValid
        });
        //console.log("dataLayer.push({'domain':" + data.domain + ", 'label':" + EVENTNAME + ", 'pagereferrer':" + data.pagereferrer + ", 'business_vertical_subcategory':" + data.business_vertical_subcategory + ", 'lcf_response_locations':" + data.lcf_response_locations + ", 'business_vertical_product':" + data.business_vertical + ", 'usertype':" + usertype + ", 'pagesection':" + 'NA' + ", 'pagetype':" + data.pagetype + ", 'email':" + EMAIL + ", 'phone':" + MOBILE + ", 'quoteid':" + QUOTEID + ", 'userid':" + RID + ", 'IsValid':" + IsValid + "});");
    }
}
/********************* Remain Active for the usage of PP, TravelExtension,HB******************************/
function fnAllPageGA(PageEvent, MobileNo, EmailID, RID, QuoteID, PremiumCacheRequestID, Pincode = '') {
    try {
        var PolicyID = 'NA';
        var PolicyNo = 'NA';
        var ProposalNo = 'NA';
        var PaymentMode = 'NA';
        var CorelationID = 'NA';
        var data = fngetPageData();
        if (data.business_vertical_subcategory == "2W" && data.pagename == "select-plans")
            PageEvent = (PageEvent == "" || PageEvent == null || PageEvent == undefined) ? 'allpage' : PageEvent;
        else
            PageEvent = "allpage";
        MobileNo = MobileNo == undefined ? '9999999999' : MobileNo;

        if (sessionStorage.GA_IsValid != null) {
            IsValid = sessionStorage.GA_IsValid;
        }

        if (sessionStorage.Corelationid != null) {
            CorelationID = sessionStorage.Corelationid;
        }

        window.dataLayer = window.dataLayer || [];

        if (data.business_vertical_subcategory == "2W" || data.business_vertical_subcategory == "4W") {
            var RegistrationZone = sessionStorage.getItem("RegistrationZone") == null ? "" : sessionStorage.getItem("RegistrationZone");
            var Vehicle_Ex_Showroom_Price = sessionStorage.getItem("Vehicle_Ex_Showroom_Price") == null ? "" : sessionStorage.getItem("Vehicle_Ex_Showroom_Price");
            var Year_Of_Manufacture = sessionStorage.getItem("Year_Of_Manufacture") == null ? "" : sessionStorage.getItem("Year_Of_Manufacture");

            dataLayer.push({
                'event': PageEvent,
                'pagetype': data.pagename,
                'pageurl': data.pageurl,
                'pageseokeywords': data.pageseokeywords,
                'usertype': data.UserType,
                'pagesection': 'NA',
                'lcf_response_locations': data.lcf_response_locations,
                'business_vertical_product': data.business_vertical,
                'business_vertical_subcategory': data.business_vertical_subcategory,
                'payment_method': PaymentMode,
                'pagereferrer': data.pagereferrer,
                'userid': RID,
                'quoteid': QuoteID,
                'domain': data.domain,
                'email': EmailID,
                'phone': MobileNo,
                'ipaddress': data.IPaddress,
                'isvalid': IsValid,
                'cacheid': PremiumCacheRequestID,
                'correlationid': CorelationID,
                'motor_rto': RegistrationZone,
                'motor_ex_showroom_price': Vehicle_Ex_Showroom_Price,
                'motor_year_of_manufacture': Year_Of_Manufacture
            });
            //console.log("New dataLayer.push({  'event': " + PageEvent + ",'pagetype': " + data.pagename + ", 'pageurl': " + data.pageurl + ", 'pageseokeywords': " + data.pageseokeywords + ", 'usertype': " + data.UserType + ", 'pagesection': 'NA', 'lcf_response_locations': " + data.lcf_response_locations + ", 'business_vertical': " + data.business_vertical + ", 'business_vertical_subcategory': " + data.business_vertical_subcategory + ", 'payment_method': " + PaymentMode + ", 'pagereferrer': " + data.pagereferrer + ", 'userid': " + RID + ", 'quoteid': " + QuoteID + ", 'domain': " + data.domain + " , 'email': " + EmailID + ", 'phone': " + MobileNo + ", 'ipaddress': " + data.IPaddress + ", 'isvalid' : " + IsValid + ", 'cacheid' : " + PremiumCacheRequestID + ", 'correlationid' : " + CorelationID + ", 'motor_rto' : " + RegistrationZone + ", 'motor_ex_showroom_price' : " + Vehicle_Ex_Showroom_Price + ", 'motor_year_of_manufacture' : " + Year_Of_Manufacture + "});");
        }
        else {
            dataLayer.push({
                'event': PageEvent,
                'pagetype': data.pagename,
                'pageurl': data.pageurl,
                'pageseokeywords': data.pageseokeywords,
                'usertype': data.UserType,
                'pagesection': 'NA',
                'lcf_response_locations': data.lcf_response_locations,
                'business_vertical_product': data.business_vertical,
                'business_vertical_subcategory': data.business_vertical_subcategory,
                'payment_method': PaymentMode,
                'pagereferrer': data.pagereferrer,
                'userid': RID,
                'quoteid': QuoteID,
                'domain': data.domain,
                'email': EmailID,
                'phone': MobileNo,
                'pincode': Pincode,
                'ipaddress': data.IPaddress,
                'isvalid': IsValid,
                'cacheid': PremiumCacheRequestID,
                'correlationid': CorelationID
            });

            //console.log("New dataLayer.push({ 'event': " + PageEvent + ",'pagetype': " + data.pagename + ", 'pageurl': " + data.pageurl + ", 'pageseokeywords': " + data.pageseokeywords + ", 'usertype': " + data.UserType + ", 'pagesection': 'NA', 'lcf_response_locations': " + data.lcf_response_locations + ", 'business_vertical': " + data.business_vertical + ", 'business_vertical_subcategory': " + data.business_vertical_subcategory + ", 'payment_method': " + PaymentMode + ", 'pagereferrer': " + data.pagereferrer + ", 'userid': " + RID + ", 'quoteid': " + QuoteID + ", 'domain': " + data.domain + " , 'email': " + EmailID + ", 'phone': " + MobileNo + ", 'ipaddress': " + data.IPaddress + ", 'isvalid' : " + IsValid + ", 'cacheid' : " + PremiumCacheRequestID + ", 'correlationid' : " + CorelationID + "});");
        }
        //Commented by Sangeeta as the quote ID was null
        //if (typeof QuoteID !== "undefined") {
        //if (Quoteid > 0) {
        //if (typeof QuoteID !== "undefined" && QuoteID != null && QuoteID != "null" && QuoteID != "NA") {
        //    sessionStorage.setItem("IPartnerQuoteId", QuoteID);
        //}
    }
    catch (err) {
        dataLayer.push({ 'event': 'errorpopup', 'statusmessage': 'New 2W ' + err.message });
    }
}

function fnErrorPage(ErrorMessage) {
    dataLayer.push({ 'event': 'errorpopup', 'statusmessage': ErrorMessage });
}

function fnAllPageGA_v1(PageEvent, MobileNo, EmailID, RID, QuoteID, PremiumCacheRequestID, quote_ref_count, quote_type, fla_nonfla, MPID) {
    try {
        var PolicyID = 'NA';
        var PolicyNo = 'NA';
        var ProposalNo = 'NA';
        var PaymentMode = 'NA';
        var CorelationID = 'NA';
        var data = fngetPageData();
        if (data.business_vertical_subcategory == "2W" && data.pagename == "select-plans")
            PageEvent = (PageEvent == "" || PageEvent == null || PageEvent == undefined) ? 'allpage' : PageEvent;
        else
            PageEvent = "allpage";
        MobileNo = "9999999999";

        if (sessionStorage.GA_IsValid != null) {
            IsValid = sessionStorage.GA_IsValid;
        }

        if (sessionStorage.Corelationid != null) {
            CorelationID = sessionStorage.Corelationid;
        }
        var Cache_noncache = "";
        if (PremiumCacheRequestID != null && PremiumCacheRequestID != "undefined") { Cache_noncache = "cache"; } else { Cache_noncache = "noncache"; }

        window.dataLayer = window.dataLayer || [];

        if (data.business_vertical_subcategory == "2W" || data.business_vertical_subcategory == "4W") {
            var RegistrationZone = sessionStorage.getItem("RegistrationZone") == null ? "" : sessionStorage.getItem("RegistrationZone");
            var Vehicle_Ex_Showroom_Price = sessionStorage.getItem("Vehicle_Ex_Showroom_Price") == null ? "" : sessionStorage.getItem("Vehicle_Ex_Showroom_Price");
            var Year_Of_Manufacture = sessionStorage.getItem("Year_Of_Manufacture") == null ? "" : sessionStorage.getItem("Year_Of_Manufacture");

            dataLayer.push({
                'event': PageEvent,
                'pagetype': data.pagename,
                'pageurl': data.pageurl,
                'pageseokeywords': data.pageseokeywords,
                'usertype': data.UserType,
                'pagesection': 'NA',
                'lcf_response_locations': data.lcf_response_locations,
                'business_vertical_product': data.business_vertical,
                'business_vertical_subcategory': data.business_vertical_subcategory,
                'payment_method': PaymentMode,
                'pagereferrer': data.pagereferrer,
                'userid': RID,
                'quoteid': QuoteID,
                'domain': data.domain,
                'email': EmailID,
                'phone': MobileNo,
                'ipaddress': data.IPaddress,
                'isvalid': IsValid,
                'cacheid': PremiumCacheRequestID,
                'correlationid': CorelationID,
                'motor_rto': RegistrationZone,
                'motor_ex_showroom_price': Vehicle_Ex_Showroom_Price,
                'motor_year_of_manufacture': Year_Of_Manufacture,

                'quote_ref_count': quote_ref_count,
                'quote_type': quote_type,
                'fla_nonfla': fla_nonfla,
                'Cache_noncache': Cache_noncache,
                'tvc_UAID': MPID

            });
            //console.log("New dataLayerv1.push({ 'event': " + PageEvent + ",'pagetype': " + data.pagename + ",'quote_ref_count': " + quote_ref_count + ",'quote_type': " + quote_type + ",'fla_nonfla': " + fla_nonfla + ",'Cache_noncache': " + Cache_noncache + ", 'pageurl': " + data.pageurl + ", 'pageseokeywords': " + data.pageseokeywords + ", 'usertype': " + data.UserType + ", 'pagesection': 'NA', 'lcf_response_locations': " + data.lcf_response_locations + ", 'business_vertical': " + data.business_vertical + ", 'business_vertical_subcategory': " + data.business_vertical_subcategory + ", 'payment_method': " + PaymentMode + ", 'pagereferrer': " + data.pagereferrer + ", 'userid': " + RID + ", 'quoteid': " + QuoteID + ", 'domain': " + data.domain + " , 'email': " + EmailID + ", 'phone': " + MobileNo + ", 'ipaddress': " + data.IPaddress + ", 'isvalid' : " + IsValid + ", 'cacheid' : " + PremiumCacheRequestID + ", 'correlationid' : " + CorelationID + ", 'motor_rto' : " + RegistrationZone + ", 'motor_ex_showroom_price' : " + Vehicle_Ex_Showroom_Price + ", 'motor_year_of_manufacture' : " + Year_Of_Manufacture + ", 'tvc_UAID': " + MPID + "});");
        }
        else {
            dataLayer.push({
                'event': PageEvent,
                'pagetype': data.pagename,
                'pageurl': data.pageurl,
                'pageseokeywords': data.pageseokeywords,
                'usertype': data.UserType,
                'pagesection': 'NA',
                'lcf_response_locations': data.lcf_response_locations,
                'business_vertical_product': data.business_vertical,
                'business_vertical_subcategory': data.business_vertical_subcategory,
                'payment_method': PaymentMode,
                'pagereferrer': data.pagereferrer,
                'userid': RID,
                'quoteid': QuoteID,
                'domain': data.domain,
                'email': EmailID,
                'phone': MobileNo,
                'ipaddress': data.IPaddress,
                'isvalid': IsValid,
                'cacheid': PremiumCacheRequestID,
                'correlationid': CorelationID,
                'quote_ref_count': quote_ref_count,
                'quote_type': quote_type,
                'tvc_UAID': MPID

            });

            //console.log("New dataLayerchi.push({ 'event': " + PageEvent + ",'pagetype': " + data.pagename + ", 'quote_ref_count': " + quote_ref_count + ",'quote_type': " + quote_type + ", 'pageurl': " + data.pageurl + ", 'pageseokeywords': " + data.pageseokeywords + ", 'usertype': " + data.UserType + ", 'pagesection': 'NA', 'lcf_response_locations': " + data.lcf_response_locations + ", 'business_vertical': " + data.business_vertical + ", 'business_vertical_subcategory': " + data.business_vertical_subcategory + ", 'payment_method': " + PaymentMode + ", 'pagereferrer': " + data.pagereferrer + ", 'userid': " + RID + ", 'quoteid': " + QuoteID + ", 'domain': " + data.domain + " , 'email': " + EmailID + ", 'phone': " + MobileNo + ", 'ipaddress': " + data.IPaddress + ", 'isvalid' : " + IsValid + ", 'cacheid' : " + PremiumCacheRequestID + ", 'correlationid' : " + CorelationID + ", 'tvc_UAID': " + MPID + "});");
        }
        //Commented by Sangeeta as the quote ID was null
        //if (typeof QuoteID !== "undefined") {
        //if (Quoteid > 0) {
        //if (typeof QuoteID !== "undefined" && QuoteID != null && QuoteID != "null" && QuoteID != "NA") {
        //    sessionStorage.setItem("IPartnerQuoteId", QuoteID);
        //}
    }
    catch (err) {
        dataLayer.push({ 'event': 'errorpopup', 'statusmessage': 'New 2W ' + err.message });
    }
}



function fnGetQueryString(input) {

    if (window.location.search.split('?').length > 1) {
        var strQueryString = window.location.search.split('?')[1].split('&');
        for (var i = 0; i < strQueryString.length; i++) {
            if (strQueryString[i].split('=')[0].toUpperCase() == input.toUpperCase()) {
                return strQueryString[i].split('=')[1];
            }
        }
    }
    return null;
}


function fngetPageData_V2() {
    var pagedata = new Object();
    var page = window.location.href;
    //var urlParams = new URLSearchParams(window.location.search); // ISSUE on IE11

    pagedata.pagetype = page.split("/")[4]; //get-quote, Enter Details, RnC

    var pageURL = page.split("?")[0].split("/");
    pagedata.pagename = pageURL[pageURL.length - 1].split("#")[0];
    pagedata.pageurl = page; // Current URL
    //  pagedata.pageseokeywords = 'NA'; // Metadata

    if (fnGetQueryString('source') != null) {
        pagedata.lcf_response_locations = fnGetQueryString('source'); // nav
        sessionStorage.GA_lcf_response_locations = fnGetQueryString('source'); // nav
    }
    else if (sessionStorage.GA_lcf_response_locations != null) {
        pagedata.lcf_response_locations = sessionStorage.GA_lcf_response_locations;
    }
    else {
        pagedata.lcf_response_locations = 'NA';
    }

    var pageArr = page.split("/");
    pagedata.business_vertical = pageArr[3]; //Health-Insurance, Motor-Insurance
    if (pagedata.business_vertical.indexOf("payment") == 0) {
        var pageArr2 = page.split("?").length > 1 ? page.split("?")[1].split("/") : "".split("/");

        if (pageArr2.length > 1) {
            pagedata.business_vertical = pageArr2[1];
            pageArr[3] = pageArr2[1]
            if (pageArr2[1].indexOf("renew") == 0) {
                pageArr[4] = pageArr2[2];
                pageArr[5] = pageArr2[3];
            }

        }
    }
    if (pagedata.business_vertical.indexOf("?") > 0) //health-insurance?utm_source=yahoo-native&utm_medium=cpc&utm_campaign=Health_insurance_native
        pagedata.business_vertical = pagedata.business_vertical.split("?")[0];
    if (pagedata.business_vertical.indexOf("#") > 0)
        pagedata.business_vertical = pagedata.business_vertical.split("#")[0];
    if (pagedata.business_vertical == "campaigns" && pageArr.length > 4) //www.icicilombard.com/campaigns/health-insurance/tax-benefi
        pagedata.business_vertical = pageArr[4];
    if ((pagedata.business_vertical == "renew-policy" || pagedata.business_vertical.indexOf("renew") == 0) && pageArr.length > 4) //www.icicilombard.com/renew-policy/motor/vehicle-details
        pagedata.business_vertical = pageArr[4] + "-insurance";

    pagedata.business_vertical_subcategory = 'NA';
    if (fnGetQueryString('opt') != null) {
        pagedata.business_vertical_subcategory = fnGetQueryString('opt'); // CHI, PP
        //sessionStorage.GA_business_vertical_subcategory = fnGetQueryString('opt'); // CHI, PP
    }
    else if (pageArr.length > 3) {
        var subcategory = "";
        if (pageArr[3] == "campaigns") {
            if (pageArr.length > 5)
                subcategory = pageArr[4];
        }
        else if (pageArr[3] == "renew-policy" || pageArr[3].indexOf("renew") == 0) {
            if (pageArr.length > 5)
                subcategory = pageArr[5];
        }
        else {
            if (pageArr.length > 4)
                subcategory = pageArr[4];
            if (subcategory == "get-quote" && pageArr.length > 5)
                subcategory = pageArr[5];
        }

        switch (subcategory) {
            case "two-wheeler-insurance":
            case "two-wheeler-renewal":
                pagedata.business_vertical_subcategory = "2w";
                break;
            case "car-insurance":
            case "car-renewal":
                pagedata.business_vertical_subcategory = "4w";
                break;
            case "complete-health-insurance":
            case "select-chi-plans":
            case "customize-your-chi-plan":
            case "chi-insured-details":
            case "chi-review-confirm":
            case "chi-renewal":
                pagedata.business_vertical_subcategory = "chi";
                break;
            case "health-booster":
            case "select-hb-plans":
            case "customize-your-hb-plan":
            case "hb-details":
            case "hb-review-confirm":
                pagedata.business_vertical_subcategory = "hb";
                break;
            case "personal-accident-insurance":
            case "select-personal-protect-plans":
            case "customize-your-personal-protect-plan":
            case "personal-protect-insured-details":
            case "personal-protect-review-confirm":
                pagedata.business_vertical_subcategory = "pp";
                break;
            case "single-trip":
                pagedata.business_vertical_subcategory = "single";
                break;
            case "gold-multi-trip":
                pagedata.business_vertical_subcategory = "multi-trip";
                break;
            default:
                {
                    //Handle Travel product GA product localstorage ovveride issue
                    if (pagedata.business_vertical == 'travel-insurance') {
                        pagedata.business_vertical_subcategory = "single";
                    }
                    break;
                }    
        }

    }
    else {
        pagedata.business_vertical_subcategory = "NA";
    }
    if (pagedata.business_vertical_subcategory == 'NA' && localStorage.getItem("product") != null) {
        pagedata.business_vertical_subcategory = localStorage.getItem("product");
    }
    if ((pagedata.business_vertical == 'payment-new' || pagedata.business_vertical == 'payment-duplicate' || pagedata.business_vertical == '' || pagedata.business_vertical == 'registration') && localStorage.getItem("_PolicyType") != null) {
        pagedata.business_vertical = localStorage.getItem("_PolicyType").toLowerCase() + "-insurance";
    }


    if (pagedata.business_vertical_subcategory == "tw")
        pagedata.business_vertical_subcategory = "2w";
    if (pagedata.business_vertical_subcategory == "chi%20")
        pagedata.business_vertical_subcategory = "chi";
    if (pagedata.business_vertical_subcategory == "car")
        pagedata.business_vertical_subcategory = "4w";
    if (pagedata.business_vertical_subcategory == "TWRenewal")
        pagedata.business_vertical_subcategory = "2WRenewal";
    if (pagedata.business_vertical_subcategory == "single-trip" || pagedata.business_vertical_subcategory == "single-tripsource")
        pagedata.business_vertical_subcategory = "single";

    //sometimes the local storage business vertical is incorrect but subcategory is correct, derive vertical from subcategory
    if (pagedata.business_vertical_subcategory == 'chi' || pagedata.business_vertical_subcategory == 'hb' || pagedata.business_vertical_subcategory == 'pp' || pagedata.business_vertical_subcategory == 'arog')
        pagedata.business_vertical = 'health-insurance';
    if (pagedata.business_vertical_subcategory == 'multi-trip' || pagedata.business_vertical_subcategory == 'single')
        pagedata.business_vertical = 'travel-insurance';
    if (pagedata.business_vertical_subcategory == 'home')
        pagedata.business_vertical = 'home-insurance';
    if (pagedata.business_vertical_subcategory == '2w' || pagedata.business_vertical_subcategory == '4w')
        pagedata.business_vertical = 'motor-insurance';

    pagedata.pagereferrer = document.referrer; // Previous Page URL
    // pagedata.IPaddress = "NA"; //strIP; //Request.ServerVariables("remote_addr"); // IP Address
    pagedata.domain = window.location.host;

    if (window.location.host != "www.icicilombard.com") {
        pagedata.UserType = "callcenter";
    }
    else {
        pagedata.UserType = "website";
    }
    return pagedata;
}


function fnAllPageGA_V2(PageEvent, GA_DataLayer) {
    try {
        var CorelationID = 'NA';
        var data = fngetPageData_V2();




        if (sessionStorage.Corelationid != null) {
            CorelationID = sessionStorage.Corelationid;
        }

        window.dataLayer = window.dataLayer || [];


        /*--------------CommonVariable--------------*/

        if (GA_DataLayer.pagetype == null || GA_DataLayer.pagetype == undefined || GA_DataLayer.pagetype == "")
            GA_DataLayer.pagetype = data.pagename;
        GA_DataLayer.pageurl = data.pageurl;
        GA_DataLayer.usertype = data.UserType;

        GA_DataLayer.lcf_response_locations = data.lcf_response_locations;
        if (GA_DataLayer.business_vertical_product == null || GA_DataLayer.business_vertical_product == undefined || GA_DataLayer.business_vertical_product == "")
            GA_DataLayer.business_vertical_product = data.business_vertical;


        if (GA_DataLayer.business_vertical_subcategory == undefined || GA_DataLayer.business_vertical_subcategory == null || GA_DataLayer.business_vertical_subcategory == "") {
            GA_DataLayer.business_vertical_subcategory = data.business_vertical_subcategory;
        }

        GA_DataLayer.pagereferrer = data.pagereferrer;
        GA_DataLayer.domain = data.domain;

        if (CorelationID != "" && CorelationID != null && CorelationID != "NA")
            GA_DataLayer.correlationid = CorelationID;

        /*--------------CommonVariable--------------*/
        if (GA_DataLayer.event == undefined || GA_DataLayer.event == null || GA_DataLayer.event == "") {
            GA_DataLayer.event = "allpage";
        }

        GA_DataLayer.mobileno = hashIt(GA_DataLayer.mobileno);
        GA_DataLayer.email = hashIt(GA_DataLayer.email);


        dataLayer.push(GA_DataLayer);
        GA_DataLayer.PageEvent = PageEvent;
        //console.log(GA_DataLayer);

    }
    catch (err) {
        dataLayer.push({ 'event': 'errorpopup', 'statusmessage': err.message });
    }
}
function fnLowerCase(data) {
    if (data != null && data != "")
        data = data.toLowerCase();
    return data;
}
function AgeCalculation(birthDate) {
    birthDate = new Date(birthDate);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function monthDiff(PurchaseDate) {
    var d2 = new Date();
    var d1 = new Date(PurchaseDate);
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    // edit: increment months if d2 comes later in its month than d1 in its month
    if (d2.getDate() >= d1.getDate())
        months++
    // end edit
    return months <= 0 ? 0 : months;
}
function GetPlanTypeFW(PlanOpted) {
    var plantype = "";
    if (PlanOpted.split(',').length > 1) {
        switch (PlanOpted.split(',')[1]) {
            case "1":
                plantype = "Economy Plan";
                break;
            case "2":
                plantype = "Recommended Plan";
                break;
            case "3":
                plantype = "Telematics Plan";
                break;

        }
        return plantype;
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var tvc_UAID = 'UA-129630-25'; //add property ID here

function tvc_cid_function() {

    ga(function () {

        var tvc_trackers = ga.getAll();

        var tvc_i, tvc_len;

        for (tvc_i = 0, tvc_len = tvc_trackers.length; tvc_i < tvc_len; tvc_i += 1) {

            if (tvc_trackers[tvc_i].get('trackingId') === tvc_UAID && tvc_trackers[tvc_i].get('cookieName') == "tvc_lombardgacookie") {

                tvc_clientID = tvc_trackers[tvc_i].get('clientId');

            }

        }
        var sessionCID = window.sessionStorage.getItem('CID');

        if (sessionCID == null || sessionCID == "" || sessionCID == undefined) {
            if (tvc_clientID != '' && typeof tvc_clientID != 'undefined') {

                //console.log(tvc_clientID) //Store this in your DB  Tatvic Analytics Pvt. Ltd. 4
                if (tvc_clientID == null || tvc_clientID == "" || tvc_clientID == undefined) {

                    var tvc_lombardcookie = getCookie("tvc_lombardgacookie");
                    if (tvc_lombardcookie == null || tvc_lombardcookie == "" || tvc_lombardcookie == undefined) {
                        window.sessionStorage.setItem('CID', "websitecid");
                    } else {
                        window.sessionStorage.setItem('CID', tvc_lombardcookie);
                    }
                }
                else {
                    window.sessionStorage.setItem('CID', tvc_clientID);
                }
            }
        }
        else {
            if (sessionCID == "websitecid") {
                var tvc_lombardcookie = getCookie("tvc_lombardgacookie");
                if (tvc_lombardcookie != null && tvc_lombardcookie != "" && tvc_lombardcookie != undefined) {
                    window.sessionStorage.setItem('CID', tvc_lombardcookie);
                }
            }
        }
    });
}

var tvc_cid_myVar = setInterval(function () {

    if (typeof window.ga != 'undefined' && typeof window.ga.getAll != 'undefined') {

        clearInterval(tvc_cid_myVar);

        tvc_cid_function();

    }
}, 300);

//Bharat Method to add Screen Log
function logScreenEvent(event, screenName) {
    if (window['dataLayer'] == undefined)
        window['dataLayer'] = window['dataLayer'] || [];

    window['dataLayer'].push({ 'event': event, 'screenName': screenName });
    console.log({ 'event': event, 'screenName': screenName });
}

//Arvind Trigger custom events to GA
function pushGACustomEvents(eventCategory,eventName,eventLabel) {
    try {
            var data = {
                'event': 'custom_event',
                'eventCategory': eventCategory,
                'eventAction': eventName,
                'eventLabel': eventLabel == '' || eventLabel == undefined ? 'NA' : eventLabel
            };
   
            console.log(data);
            dataLayer.push(data);
        }
        catch (err) {
            dataLayer.push({ 'event': 'errorpopup', 'statusmessage': err.message });
         }
}
function passTravelPlanPageGAEventLiveChat() {
    try {
        var data = {
            'event': 'custom_event',
            'eventCategory': 'travel_plan_interactions',
            'eventAction': 'ask_ria_chat_icon_click'
        };
        console.log(data);
        dataLayer.push(data);
    }
    catch (err) {
        dataLayer.push({ 'event': 'errorpopup', 'statusmessage': err.message });
    }
}
function passTravelPlanPageGAEventForHelp() {
    try {
        var data = {
            'event': 'custom_event',
            'eventCategory': 'travel_plan_interactions',
            'eventAction': 'need_help_icon_click'
        };
        console.log(data);
        dataLayer.push(data);
    }
    catch (err) {
        dataLayer.push({ 'event': 'errorpopup', 'statusmessage': err.message });
    }
}



function passTravelPlanPageGAEventForHelpOptions(helpOption) {
    if (helpOption == 1) {
        pushGACustomEvents("travel_plan_interactions", "need_help_icon_click", "toll_free")
    }
    if (helpOption == 2) {
        pushGACustomEvents("travel_plan_interactions", "need_help_icon_click", "call_back")
    }

    if (helpOption == 3) {
        pushGACustomEvents("travel_plan_interactions", "need_help_icon_click", "contact back")
    }
}

function passTWLandingPageRiaChatGAEvents() {
    var divElement = document.querySelector('.imgWrapp.landing-chaticon');
    if (!divElement)
        pushGACustomEvents("tw_landing_page_interactions", "2W_riabot_click", "ria_bot")
    else
        pushGACustomEvents("tw_landing_page_interactions", "2W_chatnow_click", "chat_now")
}
function passTWLandingPageRiaChatCloseGAEvent() {

    pushGACustomEvents("tw_landing_page_interactions", "2W_riabot_close", "close")
}
function passTWLandingPageLiveChatCloseGAEvent() {

    pushGACustomEvents("tw_landing_page_interactions", "2W_chatnow_close", "close")
}
function passHealthLandingDisclaimerGAEvent() {

    if (window.location.href.indexOf("health-insurance") > -1) {

        pushGACustomEvents("health_landing_page_interactions", "disclaimer_click","NA")
    }
}
function hashIt(value) {
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
}

