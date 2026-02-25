var HomeObject = {
    Plan: ['/home-insurance/get-quote/select-plans'],
    CustomizePlan: ['/home-insurance/get-quote/select-plans-structured'],
    Insured: ['/home-insurance/get-quote/insured-details'],
};

var TravelObject = {
    Plan: ['/travel-insurance/get-quote/select-plans'],
    CustomizePlan: ['/travel-insurance/get-quote/customize-your-plan'],
    Insured: ['/travel-insurance/get-quote/insured-details']
};
var Motor2WObject = {
    Plan: ['/motor-insurance/two-wheeler-insurance/get-quote/select-plans'],
    CustomizePlan: ['/motor-insurance/two-wheeler-insurance/get-quote/customize-your-plan'],
    Insured: ['/motor-insurance/two-wheeler-insurance/get-quote/insured-details'],
    PlanFresh: ['/motor-insurance/two-wheeler-insurance/get-quote/select-plans'],
    InsuredFresh: ['/motor-insurance/two-wheeler-insurance/get-quote/insured-details']
};

var Motor4WObject = {
    Plan: ['/motor-insurance/car-insurance/get-quote/select-plans'],
    Insured: ['/motor-insurance/car-insurance/get-quote/insured-details']
};
var ChiHealthObject = {
    Plan: ['/health-insurance/get-quote/select-chi-plans'],
    CustomizePlan: ['/health-insurance/get-quote/customize-your-chi-plan'],
    Insured: ['/health-insurance/get-quote/insured-details']
};
var PPHealthObject = {
    Plan: ['/health-insurance/get-quote/select-personal-protect-plans'],
    CustomizePlan: ['/health-insurance/get-quote/customize-your-plan'],
    Insured: ['/health-insurance/get-quote/pp-insured-details']
};
var HBHealthObject = {
    Plan: ['/health-insurance/get-quote/select-hb-plans'],
    CustomizePlan: ['/health-insurance/get-quote/customize-your-hb-plan'],
    Insured: ['/health-insurance/get-quote/hb-insured-details']
};
var ArogyaHealthObject = {
    Plan: ['/health-insurance/arogya-sanjeevani-policy/get-quote/select-ags-plans'],
    Insured: ['/health-insurance/arogya-sanjeevani-policy/get-quote/insured-details-ags']
};
var CyberObject = {
    Plan: ['/cyber-insurance/select-plan'],
    Insured: ['/cyber-insurance/insured-details']

};
var MotorType = "";
$(document).ready(function () {
    sessionStorage.removeItem("IsKycSkip");
    sessionStorage.removeItem("IsKYCSkipped");
    sessionStorage.removeItem("fwMotorUIData");
    BindData();
    $('.close').click(function () {
        var id = $(this).parent().find('input[type="hidden"]').val();
        RemoveQuoteLocalStorage("");
    });

    $('.redirectUrl, #premium-continue-btn').click(function () {
        var RedirectURL = '';
        let quoteList;
        if (localStorage != null && localStorage != undefined && localStorage.getItem("RetrieveQuoteData") != null && localStorage.getItem("RetrieveQuoteData") != undefined) {
            quoteList = JSON.parse(localStorage.getItem("RetrieveQuoteData"));
        }
        var IsGuestUser = false;
        var ProposalId = $(this).parent().find('input[type="hidden"]').val();
        //let productquoteList = quoteList.filter(x => x.ProposalId == ProposalId);
        if (ProposalId == undefined || ProposalId == null)
            ProposalId = quoteList[0].ProposalId;
        var productquoteList = [];

        if (quoteList != null) {

            for (var i = 0; i < quoteList.length; i++) {
                if (quoteList[i].ProposalId == ProposalId)
                    productquoteList.push(quoteList[i]);
            }
        }

        if (!IsNullOrEmptyStr(window.sessionStorage.getItem("UserDetailsData"))) {
            let UserDetails = {};
            UserDetails = JSON.parse(window.sessionStorage.getItem("UserDetailsData"));
            if (!IsNullOrEmptyStr(UserDetails) && UserDetails.isguestuser != null && UserDetails.isguestuser != undefined && UserDetails.isguestuser == 1) {
                IsGuestUser = true;
                window.sessionStorage.removeItem("UserDetailsData");
                window.sessionStorage.removeItem("AuthorizationToken");
            }
            else {
                IsGuestUser = false;
            }
        }
        else {
            IsGuestUser = true;
        }

        if (window.sessionStorage.getItem("IsGuestUser") == "true" && window.sessionStorage.getItem("IsCalledGuestUserToken") == "true")
            window.sessionStorage.removeItem("AuthorizationToken");
        window.sessionStorage.removeItem("IsCalledGuestUserToken");

        if (productquoteList.length > 0) {
            switch (productquoteList[0].ProductType) {
                case 'fw':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = Motor4WObject.Plan + "?proposalId=" + productquoteList[0].ProposalId + "&isrecent=1";
                    else
                        RedirectURL = Motor4WObject.Insured + "?proposalId=" + productquoteList[0].ProposalId;
                    if (!IsNullOrEmptyStr(productquoteList[0].PPProposalId))
                        RedirectURL += "&pp=" + productquoteList[0].PPProposalId;
                    if (!IsNullOrEmptyStr(productquoteList[0].SCPAproposalId))
                        RedirectURL += "&scpa=" + productquoteList[0].SCPAproposalId;
                    break;
                case 'fwtp':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = Motor4WObject.Plan + "?tp=" + productquoteList[0].ProposalId + "&isrecent=1";
                    else
                        RedirectURL = Motor4WObject.Insured + "?tp=" + productquoteList[0].ProposalId + "&isrecent=1";

                    break;
                case 'tw':
                    if (IsNullOrEmptyStr(productquoteList[0].PFQuoteId)) {
                        if (productquoteList[0].Status == 1)
                            RedirectURL = Motor2WObject.PlanFresh + "?proposalId=" + productquoteList[0].ProposalId + "&isrecent=1";
                        //else if (productquoteList[0].Status == 3)
                        //    RedirectURL = Motor2WObject.CustomizePlanFresh + "?proposalId=" + productquoteList[0].ProposalId;
                        else
                            RedirectURL = Motor2WObject.InsuredFresh + "?proposalId=" + productquoteList[0].ProposalId;
                        if (!IsNullOrEmptyStr(productquoteList[0].PPProposalId))
                            RedirectURL += "&pp=" + productquoteList[0].PPProposalId;
                        if (!IsNullOrEmptyStr(productquoteList[0].scpaProposalID)) {
                            RedirectURL += "&scpa=" + productquoteList[0].scpaProposalID;
                        }
                    }
                    else {
                        if (productquoteList[0].Status == 1)
                            RedirectURL = Motor2WObject.Plan + "?QuoteId=" + productquoteList[0].ProposalId + "&isrecent=1";
                        //else if (productquoteList[0].Status == 3)
                        //    RedirectURL = Motor2WObject.CustomizePlan + "?QuoteId=" + productquoteList[0].ProposalId;
                        else
                            RedirectURL = Motor2WObject.Insured + "?QuoteId=" + productquoteList[0].ProposalId;
                        if (!IsNullOrEmptyStr(productquoteList[0].PPProposalId))
                            RedirectURL += "&PPQuoteId=" + productquoteList[0].PPProposalId;
                    }

                    break;
                case 'twtp':
                    if (IsNullOrEmptyStr(productquoteList[0].PFQuoteId)) {
                        if (productquoteList[0].Status == 1)
                            RedirectURL = Motor2WObject.PlanFresh + "?tp=" + productquoteList[0].ProposalId + "&isrecent=1" ;
                        else
                            RedirectURL = Motor2WObject.InsuredFresh + "?tp=" + productquoteList[0].ProposalId;
                    }

                    break;
                case 'twtp':
                    if (IsNullOrEmptyStr(productquoteList[0].PFQuoteId)) {
                        if (productquoteList[0].Status == 1)
                            RedirectURL = Motor2WObject.PlanFresh + "?tp=" + productquoteList[0].ProposalId;
                        else
                            RedirectURL = Motor2WObject.InsuredFresh + "?tp=" + productquoteList[0].ProposalId;                       
                    }
                     
                    break;
                case 'chi':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = ChiHealthObject.Plan + "?QuoteId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = ChiHealthObject.Insured + "?QuoteId=" + productquoteList[0].ProposalId;


                    break;
                case 'hb':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = HBHealthObject.Plan + "?ProposalId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = HBHealthObject.Insured + "?ProposalId=" + productquoteList[0].ProposalId;


                    break;
                case 'pp':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = PPHealthObject.Plan + "?proposalId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = PPHealthObject.Insured + "?proposalId=" + productquoteList[0].ProposalId;


                    break;
                case 'as':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = ArogyaHealthObject.Plan + "?ProposalId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = ArogyaHealthObject.Insured + "?ProposalId=" + productquoteList[0].ProposalId;


                    break;
                case 'cyber':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = CyberObject.Plan + "?proposalId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = CyberObject.Insured + "?proposalId=" + productquoteList[0].ProposalId;


                    break;
                case 'home':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = HomeObject.Plan + "?QuoteId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = HomeObject.Insured + "?QuoteId=" + productquoteList[0].ProposalId;


                    break;
                case 'singletrip':
                case 'multitrip':
                    if (productquoteList[0].Status == 1)
                        RedirectURL = TravelObject.Plan + "?QuoteId=" + productquoteList[0].ProposalId;
                    else
                        RedirectURL = TravelObject.Insured + "?QuoteId=" + productquoteList[0].ProposalId;

                    if (IsNullOrEmptyStr(window.sessionStorage.getItem('travelUIData'))) {
                        window.sessionStorage.setItem("travelUIData", productquoteList[0].UIData);
                    }
                    if (!IsNullOrEmptyStr(productquoteList[0].SyncStatus) && productquoteList[0].SyncStatus == 2
                        && productquoteList[0].Status != 1 && IsNullOrEmptyStr(window.sessionStorage.getItem("UserDetailsData"))) {
                        var AppStorage = {};
                        AppStorage.isguestuser = 1;
                        AppStorage.IPartnerUserId = -9;
                        AppStorage = JSON.stringify(AppStorage);
                        sessionStorage.setItem('UserDetailsData', AppStorage);
                    }

                    break;
            }
            if (productquoteList[0].Status == 2 || productquoteList[0].Status == 3)
                RedirectURL = "/manage-your-policy/search-quote1";

        }
        if (RedirectURL != "") {
            if (productquoteList[0].Status != 2 && IsGuestUser) {
                var proposalId = IsNullOrEmptyStr(productquoteList[0].PFQuoteId) ? productquoteList[0].ProposalId : "";
                VerifyRetrieveQuoteOnId(proposalId, productquoteList[0].PFQuoteId, RedirectURL);
            }
            else { window.location.href = RedirectURL; }

        }

        console.log(ProposalId);
    });
    $('#spnRetrieveQuote').click(function () {
        if ($('#autoRetrieveQuote').find('.il-popup-overlay').hasClass('activeOverlay') == true) {
            window.location.href = "/manage-your-policy/search-quote1";
        }
        else {
            if ($('#autoRetrieveQuote').find('.il-popup-overlay').hasClass('activeOverlay') == false) {
                $('#autoRetrieveQuote').find('.il-popup-overlay').addClass('activeOverlay');
            }
        }

    });

    function RedirectUrl(id) {

        console.log($("#hdnProposalId_" + id).val());
    }
    function VerifyRetrieveQuoteOnId(ProposalId, PFQuoteId, buyUrl) {
        var request = { "ProposalId": ProposalId, "PfQuoteId": PFQuoteId };

        GetVerifyRetrieveQuoteOnId(request).then(function (responseData) {
            if (responseData.success == true) {
                window.sessionStorage.setItem("AuthorizationToken", responseData.authToken);
                window.sessionStorage.setItem("TokenExpiry", new Date(responseData.tokenExpiry));
                window.sessionStorage.setItem("clientId", responseData.clientId);
                if (responseData.isGuestUser)
                    window.sessionStorage.setItem("LoginType", "App");
                else
                    window.sessionStorage.setItem("LoginType", "User");
                window.location.href = buyUrl;
                $(".loader").hide();

            }
        });
    }

    

    function GetVerifyRetrieveQuoteOnId(requestdata) {
        var baseurl = window.location.origin + "/echannelServices/api/";
        var RetrieveSavedQuoteUserURL = baseurl + "Customer/RetrieveQuote/Redirect";

        $.support.cors = true;
        var ajaxretVal = $.ajax({
            url: RetrieveSavedQuoteUserURL,
            type: 'POST',
            crossDomain: true,
            datatype: 'json',
            data: JSON.stringify(requestdata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //   'Authorization': coreobject.getAuthToken(),
                //  'CorelationId': coreobject.corelationId(),
                'UtmSrc': window.sessionStorage.getItem("utm_source"),
                'UtmMedium': window.sessionStorage.getItem("utm_medium"),
                'UtmCampaign': window.sessionStorage.getItem("utm_campaign"),
                'UtmKeyword': window.sessionStorage.getItem("utm_keyword"),
                'GclId': window.sessionStorage.getItem("gclid"),
                'EfId': window.sessionStorage.getItem("ef_id"),
                'ClientIPAddress': '2405:204:e187:d206',
                'DeviceId': 'd1234',
                //  'ApiBinding': coreobject.getApiBinding()
            },
            success: function (data, textStatus, xhr) {
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
        return Promise.resolve(ajaxretVal);
    }
    function RemoveQuoteLocalStorage(proposalId) {
        let quoteList;
        if (localStorage != null && localStorage != undefined && localStorage.getItem("RetrieveQuoteData") != null && localStorage.getItem("RetrieveQuoteData") != undefined)
            quoteList = JSON.parse(localStorage.getItem("RetrieveQuoteData"));
        if (!IsNullOrEmptyStr(proposalId)) {
            //quoteList = quoteList.filter(x => x.ProposalId != proposalId);
            if (quoteList != null) {
                var temp = [];
                for (var i = 0; i < quoteList.length; i++) {
                    if (quoteList[i].ProposalId != proposalId)
                        temp.push(quoteList[i]);
                }
                quoteList = temp;
            }
            if (quoteList.length > 0)
                localStorage.setItem("RetrieveQuoteData", JSON.stringify(quoteList));
            else
                localStorage.removeItem("RetrieveQuoteData");

        }
        else {
            localStorage.removeItem("RetrieveQuoteData");
        }
        BindData();
    }
    function IsNullOrEmptyStr(d) {
        return (d === undefined || d == null || d == "" || d <= 0 || d.length <= 0) ? true : false;
    }
    function BindData() {
        try {
            //Below line added by prince to terminate session login on landing page for guest user

            let sessionList = JSON.parse(sessionStorage.getItem("UserDetailsData"));
            let sessionAuth = sessionStorage.getItem("AuthorizationToken");
            if (sessionList != null) {
                var temp = [];
                if (sessionList.UserName == undefined) {
                    if (sessionAuth != null) {
                        sessionStorage.removeItem("UserDetailsData");
                        sessionStorage.removeItem("AuthorizationToken");
                        sessionStorage.removeItem("AuthToken");
                    }
                }
            }
            //End here
            let quoteList;
            if (localStorage != null && localStorage != undefined && localStorage.getItem("RetrieveQuoteData") != null && localStorage.getItem("RetrieveQuoteData") != undefined)
                quoteList = JSON.parse(localStorage.getItem("RetrieveQuoteData"));
            if (quoteList != null && quoteList.length > 0) {
                var url = window.location.href;
                var productType = "", policyType;

                if (url.indexOf('two-wheeler') > 0 || url.toLowerCase().indexOf('two-wheeler') > 0) {
                    productType = 'tw'; policyType = 1;
                }
                else if (url.indexOf('car') > 0 || url.indexOf('motor-insurance') > 0) {
                    productType = 'fw'; policyType = 1;
                }
                else if (url.indexOf('cyber') > 0) {
                    productType = 'cyber'; policyType = 8;
                }
                else if (url.indexOf('arogya-sanjeevani') > 0) {
                    productType = 'as'; policyType = 2;
                }
                else if (url.indexOf('personal-accident') > 0) { productType = 'pp'; policyType = 2; }
                else if (url.indexOf('super-top-up-plan') > 0) {
                    productType = 'hb'; policyType = 2;
                }
                else if (url.indexOf('corona-kavach') > 0) {
                    productType = 'ck'; policyType = 2;
                }
                else if (url.indexOf('health-insurance') > 0 || url.indexOf('chi') > 0) {
                    productType = 'chi'; policyType = 2;
                }
                else if (url.indexOf('multi-trip') > 0) {
                    productType = 'multitrip'; policyType = 3;

                }
                else if (url.indexOf('single-trip') > 0 || url.indexOf('travel-insurance') > 0) {
                    productType = 'singletrip'; policyType = 3;
                }
                else if (url.indexOf('home-insurance') > 0) {
                    productType = 'home'; policyType = 4;
                }

                var todaysDate = new Date(Date.now());
                var compareDate = new Date(todaysDate.setDate(todaysDate.getDate() - 7));
                //quoteList = quoteList.filter(x => new Date(x.TransOn) >= compareDate);

                if (quoteList != null) {
                    var temp = [];
                    for (var i = 0; i < quoteList.length; i++) {
                        if (new Date(quoteList[i].TransOn) >= compareDate)
                            temp.push(quoteList[i]);
                    }
                    quoteList = temp;
                }

                let productquoteList = [];

                if (quoteList != null) {

                    for (var i = 0; i < quoteList.length; i++) {
                        if ((quoteList[i].ProductType == (productType == "" ? quoteList[i].ProductType : productType)) || (quoteList[i].Type == policyType && policyType != 1))
                            productquoteList.push(quoteList[i]);
                        if (productType == "tw" && quoteList[i].ProductType == "twtp") {
                            if ((quoteList[i].ProductType == (productType == "" ? quoteList[i].ProductType : "twtp")) || (quoteList[i].Type == policyType && policyType != 1))
                                productquoteList.push(quoteList[i]);
                        }

                        if (productType == "fw" && quoteList[i].ProductType == "fwtp") {
                            if ((quoteList[i].ProductType == (productType == "" ? quoteList[i].ProductType : "fwtp")) || (quoteList[i].Type == policyType && policyType != 1))
                                productquoteList.push(quoteList[i]);
                        }
                    }
                }

                //let productquoteList = quoteList.filter(x => (x.ProductType == (productType == "" ? x.ProductType : productType)) || (x.Type==policyType && policyType!=1));

                if (productquoteList != null && productquoteList.length > 0) {
                    productquoteList = productquoteList.slice().sort((a, b) => new Date(b.TransOn) < new Date(a.TransOn) ? -1 : (new Date(b.TransOn) > new Date(a.TransOn) ? 1 : 0))
                    productquoteList = productquoteList.slice(0, 3);
                }

                if (productquoteList.length > 0) {

                    if (IsNullOrEmptyStr(productquoteList[0].Premium)) {
                        $("#autoRetrieveQuote").css("display", "none");
                    }
                    else {
                        $("#autoRetrieveQuote").css("display", "");
                    }  

                    $("#quotecnt").text(productquoteList.length - 1);
                    $("#mobile_quotecnt").text(productquoteList.length);
                    //$("#autoRetrieveQuote").css("display", "");
                    //if ($("#spnRetrieveQuote").length>0)
                    //$("#spnRetrieveQuote").css("display", "");

                    switch (productquoteList.length) {
                        case 1:
                            $("#moreQuote").css("display", "none");
                            if ($("#spnRetrieveQuote").length > 0)
                                $("#spnRetrieveQuote").text("Recent Quote");
                            $(".continue-journey").text("Recent quote");
                            $(".continue-journey-m").text("Recent quote");
                            $("#mobile_quoteavail").text("Recent quote available")

                            break;

                        default:
                            $("#mobile_quoteavail").text("Recent quotes available")
                            if (productquoteList.length == 2)
                                $("#web_quoteavail").text("more quote available");
                            else
                                $("#web_quoteavail").text("more quotes available");
                            $(".continue-journey").text("Recent quotes");
                            $(".continue-journey-m").text("Recent quotes");
                            $("#moreQuote").css("display", "");


                            if ($("#spnRetrieveQuote").length > 0)
                                $("#spnRetrieveQuote").text("Recent Quotes");
                            break;

                    }

                }
                else {
                    $("#autoRetrieveQuote").css("display", "none");
                    //if ($("#spnRetrieveQuote").length > 0)
                    //$("#spnRetrieveQuote").css("display", "none");
                }

                productquoteList.forEach(function (item, index) {
                    if (index == 0) {
                        if (productType == "") {
                            BindRecentQuote(item)
                            if (item.ProductType == "fwtp" || item.ProductType == "fw") {
                                MotorType = "4W";
                            } else if (item.ProductType == "twtp" || item.ProductType == "tw") { MotorType = "2W"; }

                        }
                        else if (productType == "fw" || productType == "fwtp") {
                            MotorType = "4W";
                            $("#quoteTitle_0").text(item.Title);
                            if (item.ProductType == "fwtp") {
                                $('.four-wheeler-idv').css('display', 'none');
                            } else {
                                $("#quoteidvAmt").text(item.IDV);
                            }
                            $("#motor-prm-amt").text(item.Premium);
                            
                            $("#hdnProposalId_" + (index)).val(item.ProposalId);
                        }
                        else {
                            if (productType == "tw" || productType == "twtp") {
                                MotorType = "2W";
                                $("#quoteTitle_0").text(item.Title);  
                                if (item.ProductType == "twtp") {
                                    $('.two-wheeler-idv').css('display', 'none');
                                } else {
                                    $("#twquoteidvAmt").text(item.IDV);
                                }
                                $("#tw-motor-prm-amt").text(item.Premium);
                                
                                $("#hdnProposalId_" + (index)).val(item.ProposalId);
                            }

                        }
                    }
                });

                localStorage.setItem("RetrieveQuoteData", JSON.stringify(quoteList));
            }
            else {
                $("#autoRetrieveQuote").css("display", "none");

            }
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    function BindRecentQuote(item) {
        var data = item;
        try {
            //console.log(data);
            if (IsNullOrEmptyStr(data?.CustomerName) || data?.CustomerName == 'NA' || data?.CustomerName.includes('*')) {
                $('#greeting-hi').css('display', 'none');
                $('#owner-name').css('display', 'none');
                $('#greeting-hello').css('display', 'inline-block');
            }
            else {
                $('#greeting-hi').css('display', 'inline-block');
                $("#owner-name").text(data.CustomerName);
            }

            $("#vehicleName").text(data.MakeModel);
            $("#vehicleNumber").text(data.VehicleRegNo);
            if (data.ProductType == "fwtp" || data.ProductType == "twtp")
            {
                $('.vehicle-idv-cost').css('display', 'none');
                $('.vehicle-number').addClass('hide-idv-cost');
            }
            else {
                $("#idvCost").text(data.IDV);
            }


            if (data.Covers == null || Object.keys(data.Covers).length == 0) {
                $('.benefit-cover-block').addClass("hidden");
            }
            else {

                $('.benefit-cover-block').show();
                var CoverLength = data.Covers.length;
                // $("#benefit-cover-num").text(CoverLength);
                $("#benefit-cover-num").css('display', 'none');

                BindCovers(data.Covers);

            }
            $("#premium-num").text(data.Premium);
            
            if (data.ProductType == "fw" || data.ProductType == "fwtp" ) {
                $('.car-img').css('display', 'block');
                $('#tw-why-content').css('display', 'none');
                BindDynamicImage(data);
            }
            else {
                $('.car-img').css('display', 'none')
                $('.two-wheeler-img').css('display', 'block');
                $('#fw-why-content').css('display', 'none');
                BindDynamicImage(data);
            }

        }

        catch (ex) {
            // .closeBtn
            console.log(ex.message);
        }
    }

    function BindCovers(Covers) {
        try {
            var isRSApresent = Covers.find(cover => cover === "RSA") ? true : false;
            if (isRSApresent == true) {
                $("#road-side-assistance").removeClass('hide-Benefit');
            }

            var isZDpresent = Covers.find(cover => cover === "ZD") ? true : false;
            if (isZDpresent == true) {
                $("#zero-depreciation").removeClass('hide-Benefit');
            }
            var isCarDamagePresent = Covers.find(cover => cover === "Base") ? true : false;
            if (isCarDamagePresent == true) {
                $("#car-damages").removeClass('hide-Benefit');
            }
            var isSPCApresent = Covers.find(cover => cover === "SCPA") ? true : false;
            if (isSPCApresent == true) {
                $("#standalone-accident-cover").removeClass('hide-Benefit');

            }
            var isPPpresent = Covers.find(cover => cover === "PP") ? true : false;
            if (isPPpresent == true) {
                $("#personal-protect").removeClass('hide-Benefit');
            }
            var isVehicleDamagePresent = Covers.find(cover => cover === "Vehicle Damages") ? true : false;
            if (isVehicleDamagePresent == true) {
                $("#vehicle-damages").removeClass('hide-Benefit');
            }
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    function BindDynamicImage(data) {
        
        var hiddenInputValue = "";

        if (data.ProductType == "fw" || data.ProductType == "fwtp") {
            hiddenInputValue = $("#retrive-fw-img-hidden").val();
        } else {
            hiddenInputValue = $("#retrive-tw-img-hidden").val();
        }

        const imagePath = hiddenInputValue;
        const dynamicValue = data.MakeName.split(' ')[0] + "-" + data.ModelName.split(' ')[0];
        
        
        var imgElement = $("<img>");
 
        if (data.ProductType == "fw" || data.ProductType == "fwtp") {
            const CarImgUrl = localStorage.getItem("ImageURL");
            let finalName;
            if (CarImgUrl === null) {

                finalName = dynamicValue.toLowerCase();
            } else {

                finalName = CarImgUrl.replace(/"/g, '').toLowerCase();
            }
            imageUrl = `${imagePath}${finalName}.png`;            
            $('#retrive-fw-img').attr('src', imageUrl);
        } else {
            imageUrl = imagePath + dynamicValue.toLowerCase() + ".png";
            $('#retrive-tw-img').attr('src', imageUrl);
        }

        imgElement.on('error', function () {
            if (data.ProductType == "fw" || data.ProductType == "fwtp") {
                var errorImageUrl = imagePath + "honda-city-img.png";  
                $('#retrive-fw-img').attr('src', errorImageUrl);

            } else {
                var errorImageUrl = imagePath + "bajaj-pulsar-150.png";  
                $('#retrive-tw-img').attr('src', errorImageUrl);
            }
        });

        imgElement.attr('src', imageUrl);
    }

    $("#premium-continue-btn,#tw-retrivequote-btn,#fw-retrivequote-btn,#quote-continue-btn").click(function () {
        pushGACustomEvents("retrieve_quote_interaction", "continue_click", "motor-insurance_" + MotorType);
    });

    $("#btnClose_rq").click(function () {
        pushGACustomEvents("retrieve_quote_interaction", "close_click", "motor-insurance_" + MotorType);
    });

    $("#btnGetNewQuote_rq").click(function () {
        pushGACustomEvents("retrieve_quote_interaction", "get_new_quote_click", "motor-insurance_" + MotorType);
    });


});