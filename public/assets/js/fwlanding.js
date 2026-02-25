
let TempMobileNo = "";
let TempRegNo = "";
var whatsupModel = true;
var PrivateCarlandingUI = (function () {

    var fwVehicleUIObj = {};

    fwVehicleUIObj.proposalId = "";
    fwVehicleUIObj.PPproposalId = "";
    fwVehicleUIObj.IsfwLanding = true;
    fwVehicleUIObj.policyType = 0;
    fwVehicleUIObj.registrationNo = "";
    return fwVehicleUIObj;

})();

var Motor = (function () {
    var Motor = {};
    var resources = {};
    Motor.resources = resources;
    resources.UserProfileUrl = "Customer/Profile";
    resources.GetAllCityDistrictURL = "Master/CityDistricts";
    resources.CryptoKey = "7080808080808083";
    resources.CryptoIv = "9080808080808083";
    Motor.GetCityDistrictList = function () {
        //Remove by AshishK localStorage.getItem('_cityDistrict') != null && localStorage.getItem('_cityDistrict') != undefined from below if to fix citydistricts API issue.
        if (localStorage != null && localStorage != undefined && Motor.IsNullOrEmpty(JSON.parse(localStorage.getItem('_cityDistrict')))) {
            return new Promise(function (resolve, reject) {
                resolve(Motor.GetAllCityDistrict(""));
            });
        }
        else
            return new Promise(function (resolve, reject) { resolve([]) });
    };
    Motor.GetAllCityDistrict = function (data) {
        var ajaxretVal = corelibrary.MakeGetCallForCore2(resources.GetAllCityDistrictURL, data);
        return ajaxretVal;
    }

    Motor.GetUserProfile = function (ecsCustomerId) {
        let URlstr = resources.UserProfileUrl + "/" + ecsCustomerId + "?nocache=" + new Date().getTime();

        var ajaxretVal = corelibrary.MakeGetCallForCore2(URlstr, ecsCustomerId);

        return ajaxretVal;
    };

    Motor.IsWhatsappCommunication = function (mobileNo) {
        let IsWhatsappCommunicationUrl = "Customer/IsWhatsappCommunicationOptIn" + "/" + mobileNo + "?nocache=" + new Date().getTime();

        var httpResponse = corelibrary.MakeGetCallForCore2(IsWhatsappCommunicationUrl, '');
        return httpResponse;
    };
    Motor.SendPolcyOnWhatsappRequestModel = function (MobileNo, Product, ProductCode, RegNo, ReqType) {
        let whatsappRequestModel = {};
        whatsappRequestModel.MobileNo = MobileNo;
        whatsappRequestModel.Product = Product;
        whatsappRequestModel.ProductCode = ProductCode;
        whatsappRequestModel.RegistrationNumber = RegNo;
        whatsappRequestModel.ReqType = ReqType;
        return whatsappRequestModel;
    }

    Motor.WhatsappOptInContactDetails = function (mobileNo, product, productCode, regNo, ReqType) {
        let body = this.SendPolcyOnWhatsappRequestModel(mobileNo, product, productCode, regNo, ReqType);
        let WhatsappOptInContactDetailsUrl = "Customer/WhatsappOptInContactDetails";
        var httpResponse = corelibrary.MakePostCallForCore2(WhatsappOptInContactDetailsUrl, body);
        return httpResponse;
    };

    Motor.SendPolcyOnWhatsapp = function (mobileNo, product, productCode, regNo) {
        let body = this.SendPolcyOnWhatsappRequestModel(mobileNo, product, productCode, regNo);
        let SendPolicyOnWhatsappUrl = "Customer/CustomerWhatsappConsentOptIn";
        var httpResponse = corelibrary.MakePostCallForCore2(SendPolicyOnWhatsappUrl, body);
        return httpResponse;
    };

    Motor.RenewalRemindApi = function (mobileNo, product, policyExpiryDate) {
        var RenewalRemindRequestDataModel = {};
        RenewalRemindRequestDataModel.MobileNo = mobileNo;
        RenewalRemindRequestDataModel.ProductCode = product;
        RenewalRemindRequestDataModel.PolicyExpiryDate = policyExpiryDate;

        var body = RenewalRemindRequestDataModel;
        var RenewalRemindApiUrl = "Customer/RenewalRemindApi";
        var httpResponse = corelibrary.MakePostCallForCore2(RenewalRemindApiUrl, body);
        return httpResponse;
    };

    Motor.IsNullOrEmpty = function (input) {
        if (input === null || input === "" || input === undefined || input.length <= 0 || input == 0)
            return true;
        else
            return false;
    };

    Motor.IsValidEmailId = function (emailId) {

        const emailFilter = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^0-9<>()[\]\.,;:\s@\"]{2,3})$/i;
        var emailFilterx = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-]{2,9})+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailFilter.test(emailId) && emailFilterx.test(emailId);
    };

    Motor.IsValidMobileNo = function (mobileNo) {
        const mobileFilter = /^([6-9]{1}[0-9]{9})$/;
        mobileNo = this.IsNullOrEmpty(mobileNo) ? mobileNo : mobileNo.trim();
        return mobileFilter.test(mobileNo);
        //if (mobileNo.indexOf('*') != -1) {
        //    const mobileFilter = /^[6-9][0-9][\d*]{6}[0-9]{2}$/;
        //    mobileNo = this.IsNullOrEmpty(mobileNo) ? mobileNo : mobileNo.trim();
        //    return mobileFilter.test(mobileNo);
        //}
        //else if (mobileNo.substring(2, 8) == '000000') {
        //    const mobileFilter = /^([6-9]{1}[0-9]{9})$/;
        //    mobileNo = this.IsNullOrEmpty(mobileNo) ? mobileNo : mobileNo.trim();
        //    return mobileFilter.test(mobileNo);
        //}
        //else {
        //    const mobileFilter = /^(?!.*(\d)\1{6})[6-9]\d{9}$/;
        //    mobileNo = this.IsNullOrEmpty(mobileNo) ? mobileNo : mobileNo.trim();
        //    return mobileFilter.test(mobileNo);
        //}
    };

    Motor.EncryptionWithoutSalt = function (input) {

        let encryptString = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), CryptoJS.enc.Utf8.parse(resources.CryptoKey),
            {
                keySize: 128 / 8,
                iv: CryptoJS.enc.Utf8.parse(resources.CryptoIv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encryptString;
    };

    //below validations modified by praneeth to resolve external exceptions issue
    //Motor.IsValidRegistrationNo = function (regNo) {

    //      var regex = /^[a-zA-Z]{2}[a-zA-Z0-9]*[0-9]$/;
    //    //var regex = /^[A-Za-z]{2}[0-9]{1,}[a-zA-Z0-9]*$/;
    //    var registrationNo = regNo.trim().toUpperCase();

    //    if (this.IsNullOrEmpty(regNo)) {
    //        return false;
    //    }
    //    else if (registrationNo.length < 5) {
    //        return false;
    //    }
    //    else if (regex.test(registrationNo)) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }

    //};
    Motor.IsValidRegistrationNo = function (regNo) {

        if (this.IsNullOrEmpty(regNo)) {
            return false;
        }
        else {
            let registrationNo = regNo.trim().toUpperCase();

            //atleast 5 lenth
            if (registrationNo.length < 5)
                return false;

            //Special character not allowed
            var re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
            var isSplChar = re.test(registrationNo);
            if (isSplChar)
                return false;

            //Atleast one number
            //var regEx =  /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/; 
            var regExC = /.*[0-9].*/;
            if (!registrationNo.match(regExC))
                return false;

            //Atleast one character
            var regExN = /.*[a-zA-Z].*/;
            if (!registrationNo.match(regExN))
                return false;

            // var regex = /[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,5}$/;
            var regex = /^[a-zA-Z]{2}[a-zA-Z0-9]*$/;
            if (registrationNo.slice(2, 4).toUpperCase() == 'BH') {
                var inputYear = Number(registrationNo.slice(0, 2));
                var currentYear = Number(new Date().getFullYear().toString().slice(2, 4));
                if (!isNaN(inputYear)) {
                    if (inputYear < 21 || inputYear > currentYear) {
                        return false;
                    }
                }
                regex = /^[0-9]{2}BH(?!0{4})[0-9]{4}[A-HJ-NP-Z]{1,2}$/;

            }
            return regex.test(registrationNo);

        }
    };
    Motor.GetUrlParameter = function(url) {

        var outParam = new RegExp('[\?&]' + url + '=([^&#]*)').exec(window.location.href);
        if (outParam == null)
            return null;
        else
            return decodeURIComponent(outParam[1]) || "0";
    }

    return Motor;
})();

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    corelibrary.LogJserro(errorMsg, errorMsg, errorObj.stack, url, lineNumber);
}


$(document).ready(function () {
    sessionStorage.removeItem("FWKycSkipped");
    showloader(true);
    $(".js-tellaboutcarKnow").css("display", "none");
    //$("#lblregister-vehileKnow").css("display", "none");
    //$("#register-vehileKnow").css("display", "none");
    //$("#error-registerKnow").css("display", "none");

    $("#error-register").css("display", "none");
    $("#error-mobile").css("display", "none");
    $("#error-email").css("display", "none");
    $("#error-accept").css("display", "none");
    sessionStorage.setItem("policyType", "fw");
    $("#pd-details").prop("checked", true);
    $("#tc-con").prop("checked", true);

    $("#tc-conremind").prop("checked", true);
    $("#remind-details").prop("checked", true);

    // Harsh -- added ActiveTab session
    window.sessionStorage.setItem("ActiveTab", "1");
    window.sessionStorage.removeItem("GA_Datalayer");
    window.sessionStorage.removeItem("AuthTokenForUser");

    if (window.sessionStorage.getItem("IsGuestUser") == "true" && window.sessionStorage.getItem("IsCalledGuestUserToken") == "true") {
        window.sessionStorage.removeItem("AuthorizationToken");
        window.sessionStorage.removeItem("AuthToken");
    }

    
    var PreviousfwPlanUI = JSON.parse(sessionStorage.getItem("fwMotorUIData")); //will contain relevant UI data(page level declaration)
    //sessionStorage.removeItem("fwMotorUIData");

    var prod = { "Product": "Private Car", "ProductCode": "2311" };
    sessionStorage.setItem("ProdDetail", JSON.stringify(prod));


    var CallGetCityDistrictList = Motor.GetCityDistrictList();
    if (CallGetCityDistrictList != null && CallGetCityDistrictList != undefined) {
        Promise.all([CallGetCityDistrictList]).then(function (response) {

            if (response[0] != null && !jQuery.isEmptyObject(response[0])) {
                isSuccess = true;
                localStorage.setItem('_cityDistrict', JSON.stringify(response[0]));

            }

        }, function (response) {
            if (response.status == "401") {
                ShowErrorPopUp('Session Expired Please login in');
            }
            else { ShowErrorPopUp(response.responseJSON.Message); }

        }).catch(function (ex) {

        });
    }



    if (!Motor.IsNullOrEmpty(PreviousfwPlanUI)) {


        $("#register-vehile").val(PreviousfwPlanUI.registrationNo);
        $("#valid-mobile").val(PreviousfwPlanUI.mobileNo);
        $("#valid-email").val(PreviousfwPlanUI.emailId);

        if ($("#register-vehile").val() != null && $("#register-vehile").val() != "")
            $('#register-vehile').parent().addClass('focus');
        if ($("#valid-mobile").val() != null && $("#valid-mobile").val() != "")
            $('#valid-mobile').parent().addClass('focus');
        if ($("#valid-email").val() != null && $("#valid-email").val() != "")
            $('#valid-email').parent().addClass('focus');

        if (PreviousfwPlanUI.policyType == 1) {
            $('.js-tellaboutcar').css('display', 'none');
            //$('#register-vehile').css('display', 'none');
            $('.js_Vehicleregwrap').css('display', 'none');
            $('#lblregister-vehile').css('display', 'none');
            //$("#error-register").css("display", "none");
            //$('.js-tellaboutcarKnow').css('display', 'inline-block');
            //$('.js-tellaboutcarKnow').text("My vehicle is already registered");
            $('.js-tellaboutcar1').parents('.ui-form-block').find('.js-veh-block').addClass('blockInpdis');
            $('#register-vehile').prop('disabled', true);
            $('.js-tellaboutcar1').hide();
            $('.js-gotnewcar').hide();
            $('.js-already-reg').text("My vehicle is already registered.");
            $('.js-already-reg').show();
            $('#error-register').hide();
            $('.js-know-reg').text('');
            $('#newcar').css('display', 'none');
        }
        else if (PreviousfwPlanUI.policyType == 2) {
            if (PreviousfwPlanUI.registrationNo == undefined || PreviousfwPlanUI.registrationNo == "") {
                //$('#register-vehile').css('display', 'none');
                $('.js_Vehicleregwrap').css('display', 'none');
                $('#lblregister-vehile').css('display', 'none');
                //$("#error-register").css("display", "none");
                //$('.js-tellaboutcarKnow').css('display', 'inline-block');
                //$('.js-tellaboutcarKnow').text("I remember my vehicle registration number");
                $('.js-tellaboutcar1').parents('.ui-form-block').find('.js-veh-block').addClass('blockInpdis');
                $('#register-vehile').prop('disabled', true);
                $('.js-tellaboutcar1').hide();
                $('.js-gotnewcar').hide();
                $('.js-know-reg').text("I know registration no.");
                $('.js-know-reg').show();
                $('#error-register').hide();
                $('.js-already-reg').text('');
                $('.js-tellaboutcar').css('display', 'none');//Rollover 
                $('#newcar').css('display', 'none');
            }
            else {
                $('.js-tellaboutcarKnow').css('display', 'none');//Rollover
                $('.js-tellaboutcar').css('display', 'inline-block');//Rollover  
                $('#newcar').css('display', 'inline-block');
            }
        }
    }

    $("#whatsupModel").css("display", "block"); $("#car-whatsapp-pref").css("display", "none");
    var LoginType = window.sessionStorage.getItem("LoginType");


    if (LoginType != null && LoginType == "User") {
        Motor.GetUserProfile(0).then(function (resp) {
            if (resp != null && resp.success == true) {

                $("#valid-email").val(resp.emailId);

                if ($("#valid-mobile").val() == null || $("#valid-mobile").val() == "")
                    $("#valid-mobile").val(resp.telephoneNo);

                //console.log(this.vehicleUIModel);
            }
        }).catch(function (ex) {
            console.log(ex);
        });




    }

    //Set_GA_Variables();
    showloader(false);
    //Start All Event Function


    $("#btnwhatapp").click(function () {
        checkWhatsapp(1);
    });

    $('#valid-mobile').change(function () {
        checkWhatsapp(0);
    });

    $('#register-vehile').change(function () {
        checkWhatsapp(0);
    });

    $('#pd-details').change(function () {
        var whatsappChecknew = $("#pd-details").is(':checked');
        if (!whatsappChecknew)
            $('#whatsapp-popup').addClass('active');
        else
            checked_whatsup_click();
    });

    $('#keepMeposted , #whtasapp-pop-close').click(function () {
        $("#pd-details").prop('checked', true);
        $("#remind-details").prop('checked', true);
        checked_whatsup_click();
    });
    $('#dontSendupdate').click(function () {
        $('#whatsapp-popup').removeClass('active');
        checked_whatsup_click();
    });

    $('#remind-details').change(function () {
        var whatsappChecknew = $("#remind-details").is(':checked');
        if (!whatsappChecknew)
            $('#whatsapp-popup').addClass('active');
        else
            checked_whatsup_click();
    });

    $('#btn_remindme').click(function () {
        //var mobileNo = $('#valmobiles').val();
        //var productCode = 2311;
        //var policyExpiryDate = $('#hltdb1').val();
        //Motor.RenewalRemindApi(mobileNo, productCode, policyExpiryDate);

        //Shantipriya code
        var valid = true;
        if (!$("#tc-conremind").is(':checked'))
        {
            $("#error-accepts").css("display", "block");
            valid = false;
        }
        else {
            $("#error-accepts").css("display", "none");
            valid = true;
        }

        var mobileNo = $('#valmobiles').val();
        var productCode = 2311;
        var policyExpiryDate = $('#hltdb1').val();

        valRatingmob = $('#valmobiles');

        if (!regMobile.test(valRatingmob.val()))
        {
            showErrorwdgt(valRatingmob);
            valid = false;
        }

        if (!requiredfield($("#hltdb1"), "Please enter a future expiry date"))
            valid = false;

        if ((parseInt($("#hltdb1").val()) > 1))
        {
            var policyExpiryDate = $('#hltdb1').val();
            var dateParts = policyExpiryDate.split("-");
            var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            var inpDate = new Date(dateObject);
            var currDate = new Date();
            if (currDate.setHours(0, 0, 0, 0) > inpDate.setHours(0, 0, 0, 0)) {
                $(".errorN").css("display", "block");
                $(".errorN").text("Please enter a future expiry date");
                valid = false;
            }
        }
        if (!valid) {
            return;
        }

        Motor.RenewalRemindApi(mobileNo, productCode, policyExpiryDate);
        $('.track_ins').css("display", "none");
        $('.input_success').css("display", "block");

    });

    $('.js-tellaboutcar').click(function () {//I don't remember Registration
        //$('.cmn-popup').css('display', 'none');//Buy New Car
        $('.js-tellaboutcar').css('display', 'none');//Rollover
        $('.js_Vehicleregwrap').css('display', 'none');
        $('#register-vehile').css('display', 'none');
        $('#lblregister-vehile').css('display', 'none');

        $("#error-register").css("display", "none");

        $('.js-tellaboutcarKnow').css('display', 'inline-block');
        //$('.cmn-popupKnow').css('display', 'inline-block');
        //$('.cmn-popup').css('display', 'inline-block');
        //$(".inline_display").css("display", 'inline-block');        

        //GetQuoteClick(3);
        $('.js-tellaboutcarKnow').text("I remember my vehicle registration number");
        $('#newcar').css('display', 'none');

    });
    $('.get-quote-btn').click(function () {//Rollover
        //if ($("#register-vehile").css("display") == "none") {
        //    GetQuoteClick(3);
        //}
        //else {
        //    GetQuoteClick(2);
        //}
        GetQuoteClick(2);
    });
    $('#newcar').click(function () {//Buy New Car
        //GetQuoteClick(1);
        $('.js-tellaboutcar').css('display', 'none');
        $(this).parents('.ui-form-block').find('.js-veh-block').addClass('blockInpdis');
        $('#register-vehile').prop('disabled', true);
        $('.js-tellaboutcar1').hide();
        $('.js-gotnewcar').hide();
        $('.js-already-reg').text("My vehicle is already registered.");
        $('.js-already-reg').show();
        $('#error-register').hide();
        $('#register-vehile').val('');
        $('.js-know-reg').text('');
        // $('#register-vehile').css('display', 'none');
        $('.js_Vehicleregwrap').css('display', 'none');
        $('#lblregister-vehile').css('display', 'none');
        //$("#error-register").css("display", "none");
        //$('.js-tellaboutcarKnow').css('display', 'inline-block');
        //$('.js-tellaboutcarKnow').text("My vehicle is already registered");
        $('#newcar').css('display', 'none');

        $('#valid-mobile').focus();
        $('.wit-popuplink').hide();
        $('#whatIsreg').show();
    });
    $(document).on('click', '.js-tellaboutcar1', function (e) {
        e.preventDefault();
        $(this).parents('.ui-form-block').find('.js-veh-block').addClass('blockInpdis');
        $('#register-vehile').prop('disabled', true);
        $(this).hide();
        $('.js-tellaboutcarKnow1').hide();
        $('.js-gotnewcar').hide();
        $('.js-know-reg').text("I know registration no.");
        $('.js-know-reg').show();
        $('#error-register').hide();
        $('#register-vehile').val('');
        $('.js-already-reg').text('');
        // Added by manoj on 30-08-21 instruction by Rohit/Digambar
        $('#valid-mobile').focus();
        $('.wit-popuplink').hide();
        $('#whatIsreg').show();
    });

    $(document).on('click', '.js-know-reg', function (e) {
        e.preventDefault();
        $(this).parents('.ui-form-block').find('.js-veh-block').removeClass('blockInpdis');
        $('#register-vehile').prop('disabled', false);
        $(this).parents('.ui-form-block').find('.js-veh-block').removeClass('focus');
        $(this).hide();
        $('.js-tellaboutcar1').show();
        $('.js-tellaboutcarKnow1').show();
        $('.js-gotnewcar').show();
        $('.js-know-reg').hide();

        $('#register-vehile').focus();
        $('#whatIsreg').hide();
        $('.wit-popuplink').css('display', 'inline-block');

    });
    $(document).on('click', '.js-already-reg', function (e) {
        e.preventDefault();
        $(this).parents('.ui-form-block').find('.js-veh-block').removeClass('blockInpdis');
        $('#register-vehile').prop('disabled', false);
        $(this).parents('.ui-form-block').find('.js-veh-block').removeClass('focus');
        $(this).hide();
        $('.js-tellaboutcar1').show();
        $('.js-tellaboutcarKnow1').show();
        $('.js-gotnewcar').show();
        $('.js-know-reg').hide();

        $('#register-vehile').focus();
        $('#whatIsreg').hide();
        $('.wit-popuplink').css('display', 'inline-block');
    });

    $('.js-tellaboutcarKnow').click(function () {//I remember Registration
        //$("#lblregister-vehileKnow").css("display", "inline-block");        
        //$("#register-vehileKnow").css("display", "inline-block");
        //$("#error-registerKnow").css("display", "inline-block");

        $("#lblregister-vehile").css("display", "inline-block");
        $("#register-vehile").css("display", "inline-block");
        $('.js_Vehicleregwrap').css('display', 'block');
        //$("#error-register").css("display", "inline-block");

        //$("#error-register").css("display", "none");

        //GetQuoteClick(2);
        $('.js-tellaboutcarKnow').css('display', 'none');
        $('.js-tellaboutcar').css('display', 'inline-block');//Rollover
        $('#newcar').css('display', 'inline-block');
    });
    //$('.cmn-popupKnow').click(function () {//Buy New Car
    //    GetQuoteClick(1);
    //});
    //End All Event Function

    if (!Motor.IsNullOrEmpty(corelibrary.GetParameterValues("data")) && !Motor.IsNullOrEmpty(corelibrary.GetParameterValues("source")) && corelibrary.GetParameterValues("source") == "parkplus") {
        var parkplusdata = '';
        if (!Motor.IsNullOrEmpty(corelibrary.getDecryptedPassword(corelibrary.GetParameterValues("data")))) {
            parkplusdata = '&' + corelibrary.getDecryptedPassword(corelibrary.GetParameterValues("data"));
            var mb = new RegExp('[\?&]mb=([^&#]*)').exec(parkplusdata);
            if (!Motor.IsNullOrEmpty(mb)) {
                $("#valid-mobile").val(mb[1]);
            }
            var em = new RegExp('[\?&]em=([^&#]*)').exec(parkplusdata);
            if (!Motor.IsNullOrEmpty(em)) {
                $("#valid-email").val(em[1]);
            }
            var reg = new RegExp('[\?&]reg=([^&#]*)').exec(parkplusdata);
            if (!Motor.IsNullOrEmpty(reg)) {
                $("#register-vehile").val(reg[1]);
            }
            //window.sessionStorage.setItem("IsParkPlusRedirect", "true");
        }
    }

});



function GetQuoteClick(policyType) {
    showloader(true);

    if (!$('.js-veh-block').hasClass('blockInpdis')) {
        PrivateCarlandingUI.registrationNo = $("#register-vehile").val();
        policyType = 2;
    }
    else {
        if ($('.js-already-reg').text() == "My vehicle is already registered.") {
            policyType = 1;
        }
        else if ($('.js-know-reg').text() == "I know registration no.") {
            policyType = 3;
        }

    }
    PrivateCarlandingUI.registrationNo = $("#register-vehile").val();
    PrivateCarlandingUI.mobileNo = $("#valid-mobile").val();
    PrivateCarlandingUI.emailId = $("#valid-email").val();
    PrivateCarlandingUI.InsuredMobileNo = $("#valid-mobile").val();
    PrivateCarlandingUI.InsuredEmailId = $("#valid-email").val();

    PrivateCarlandingUI.policyType = policyType == 3 ? 2 : policyType;
    //PrivateCarlandingUI.policyType = policyType;
    if (policyType == 3)
        PrivateCarlandingUI.registrationNo = "";


    if (FormValidation(policyType)) {
        checked_whatsup_click();
        PrivateCarlandingUI.proposalId = "";
        PrivateCarlandingUI.PPproposalId = "";
        PrivateCarlandingUI.IsfwLanding = true;
        sessionStorage.setItem("fwMotorUIData", JSON.stringify(PrivateCarlandingUI));
        if (window.sessionStorage.getItem("IsGuestUser") == "true" && window.sessionStorage.getItem("IsCalledGuestUserToken") == "true")
            window.sessionStorage.removeItem("AuthorizationToken");
        window.sessionStorage.removeItem("IsCalledGuestUserToken");



        showloader(false);
        window.sessionStorage.setItem('quote_type_GA', "fresh");

        sessionStorage.setItem("querySrc", "");
        Set_GA_Variables();
        window.location.href = $("#hdnSetProceed").val();

    }
    else { showloader(false); }


}





function showloader(Isloader) {
    if (Isloader)
        $('.ui-loader').css('display', 'block');
    else

        $('.ui-loader').css('display', 'none');


}


function FormValidation(type) {

    var isvalid = true;
    if (PrivateCarlandingUI.policyType == 1) { $("#error-register").css("display", "none"); }
    else {
        if (type == 2 && (!Motor.IsValidRegistrationNo(PrivateCarlandingUI.registrationNo) || PrivateCarlandingUI.registrationNo == undefined)) {
            if ($("#register-vehile").css("display") == "block" || $("#register-vehile").css("display") == "inline-block") {
                $("#error-register").css("display", "inline-block");
                //$("#error-registerKnow").css("display", "none");
                isvalid = false;
            }
            //else if ($("#register-vehileKnow").css("display") == "block" || $("#register-vehileKnow").css("display") == "inline-block") {
            //    $("#error-registerKnow").css("display", "inline-block");
            //    $("#error-register").css("display", "none");
            //    isvalid = false;
            //}
            //else if ($("#register-vehileKnow").css("display") == "none" || $("#register-vehile").css("display") == "none") {
            //    isvalid = true;
            //}
            else if ($("#register-vehile").css("display") == "none") {
                isvalid = true;
            }
            else {
                //$("#error-register").css("display", "block");
                isvalid = false;
            }
        }
        else { $("#error-register").css("display", "none"); }
    }
    var MobileNo = !Motor.IsNullOrEmpty(PrivateCarlandingUI.mobileNo) ? PrivateCarlandingUI.mobileNo.replace(/\*/g, "0") : '';
    if (!Motor.IsValidMobileNo(MobileNo)) {
        $("#error-mobile").css("display", "block");
        isvalid = false;
    }
    else {
        $("#error-mobile").css("display", "none");
    }
    var emailId = !Motor.IsNullOrEmpty(PrivateCarlandingUI.emailId) ? PrivateCarlandingUI.emailId.replace(/\*/g, "0") : '';
    if (!Motor.IsValidEmailId(emailId)) { $("#error-email").css("display", "block"); isvalid = false; }
    else {
        $("#error-email").css("display", "none");
    }
    if (!$("#tc-con").is(':checked')) {
        $("#error-accept").css("display", "block");
        isvalid = false;
    }
    else {
        $("#error-accept").css("display", "none");
    }
    if (!isvalid)
        this.ToggleErrorSection();
    return isvalid;
}


function Set_GA_Variables() {
    try {
        var GA_DataLayer = {};
        var CorelationID = 'NA';
        window['dataLayer'] = window['dataLayer'] || [];

        var page = window.location.href;
        var pageURL = page.split("?")[0].split("/");
        if (sessionStorage.getItem("Corelationid") != null) {
            CorelationID = sessionStorage.getItem("Corelationid");
        }
        /*--------------CommonVariable--------------*/
        GA_DataLayer.pagetype = page.split("/")[4];

        GA_DataLayer.pageurl = pageURL[pageURL.length - 1].split("#")[0];

        if (window.location.host != "www.icicilombard.com") {
            GA_DataLayer.usertype = "callcenter";
        }
        else {
            GA_DataLayer.usertype = "website";
        }

        if (Motor.GetUrlParameter(GA_DataLayer.pageurl) != null) {
            GA_DataLayer.lcf_response_locations = Motor.GetUrlParameter(GA_DataLayer.pageurl);
            sessionStorage.getItem("GA_lcf_response_locations") = Motor.GetUrlParameter(GA_DataLayer.pageurl);;
        }
        else if (sessionStorage.GA_lcf_response_locations != null) {
            GA_DataLayer.lcf_response_locations = sessionStorage.getItem("GA_lcf_response_locations");
        }
        else {
            GA_DataLayer.lcf_response_locations = 'NA';
        }

        var pageArr = page.split("/");
        GA_DataLayer.business_vertical_product = 'car-insurance';
        GA_DataLayer.business_vertical_subcategory = '4w';

        GA_DataLayer.pagereferrer = document.referrer;
        GA_DataLayer.domain = window.location.host;

        if (CorelationID != "" && CorelationID != null && CorelationID != "NA")
            GA_DataLayer.correlationid = CorelationID;

        /*--------------CommonVariable--------------*/
        if (GA_DataLayer.event == undefined || GA_DataLayer.event == null || GA_DataLayer.event == "" || GA_DataLayer.event == "PageLoad") {
            GA_DataLayer.event = "allpage";
        }
        window['dataLayer'].push(GA_DataLayer);

        // GA_DataLayer.PageEvent = PageEvent;

    }
    catch (err) {
        corelibrary.LogJserro(err.message, err.message, err.stack, window.location.href, '', '');
        window['dataLayer'].push({ 'event': 'errorpopup', 'statusmessage': err.message })

    }
}
function ToggleErrorSection() {
    $(".ui-error").each(function () {

        if ($(this).css('display') == 'block') {

            var gt_id = $(this).parents('.input-block').find('input').attr('id');
            if (gt_id != undefined) {
                $('html, body').animate({
                    scrollTop: $("#" + gt_id).offset().top - 50
                });
                return false;
            }
        }
    });
}
//Whatsapp Function

function checkWhatsapp(type) {
    // checkin to resolve conflict on staging
    var regFlag = 0;
    if ($("#register-vehile").val() != TempRegNo && Motor.IsValidRegistrationNo($("#register-vehile").val())) {
        regFlag = 1;
    }

    if (($("#valid-mobile").val() != TempMobileNo || regFlag != 0) || type == 1) {
        var MobileNo = !Motor.IsNullOrEmpty($("#valid-mobile").val()) ? $("#valid-mobile").val().replace(/\*/g, "0") : '';

        if (Motor.IsValidMobileNo(MobileNo) && $("#valid-mobile").val().length == 10) {
            var ProdDetail = JSON.parse(sessionStorage.getItem("ProdDetail"));
            var encryptedMobileNo = Motor.EncryptionWithoutSalt($("#valid-mobile").val()).toString();
            var registrationNo = "";
            if ($("#register-vehile").css("display") == "block" || $("#register-vehile").css("display") == "inline-block") {
                registrationNo = (!Motor.IsValidRegistrationNo($("#register-vehile").val()) || $("#register-vehile").val() == undefined) ? null : $("#register-vehile").val().toUpperCase();
            }

            if (ProdDetail != null && ProdDetail != undefined) {
                Motor.WhatsappOptInContactDetails(encryptedMobileNo, ProdDetail.Product, ProdDetail.ProductCode, registrationNo, type).then(function (ContactDetail) {
                    TempMobileNo = $("#valid-mobile").val();
                    TempRegNo = $("#register-vehile").val();
                    if (ContactDetail.optInSuccess == true) {
                        GetWhatsApp(false);
                        sessionStorage.setItem("MobileNoWhatsPre", $("#valid-mobile").val());
                    }
                    else {
                        GetWhatsApp(true);

                        if (type == 1 && sessionStorage.getItem("MobileNoWhatsapp") != null && sessionStorage.getItem("MobileNoWhatsapp") != undefined && sessionStorage.getItem("MobileNoWhatsapp") == $("#valid-mobile").val()) {

                            //   this.whatsappChecknew = false;
                            $("#pd-details").prop("checked", false);
                        }

                    }
                }).catch(function (ex) {
                    console.log(ex);
                });

            }
        }
        else {
            $("#pd-details").prop("checked", true);
            GetWhatsApp(true);
            //this.whatsappChecknew = true;
            // this.whatsupModel = true;
        }
    }



}



function GetWhatsApp(whatsapp) {
    whatsupModel = whatsapp;
    if (whatsapp) {
        $("#whatsupModel").css("display", "block"); $("#car-whatsapp-pref").css("display", "none");
    }
    else {
        $("#whatsupModel").css("display", "none"); $("#car-whatsapp-pref").css("display", "block");

    }
}

function checked_whatsup_click() {

    var whatsappChecknew = $("#pd-details").is(':checked');
    if (whatsappChecknew && whatsupModel) {
        var MobileNo = !Motor.IsNullOrEmpty($("#valid-mobile").val()) ? $("#valid-mobile").val().replace(/\*/g, "0") : '';
        var ProdDetail = JSON.parse(sessionStorage.getItem("ProdDetail"));

        if (ProdDetail != null && ProdDetail != undefined) {
            if (Motor.IsValidMobileNo(MobileNo) && $("#valid-mobile").val().length == 10) {
                Motor.SendPolcyOnWhatsapp($("#valid-mobile").val(), ProdDetail.Product, ProdDetail.ProductCode).then(function (sendPolicyOnWhatsapp) {


                    if (!sendPolicyOnWhatsapp.success) {
                        ShowErrorPopUp(sendPolicyOnWhatsapp.errorMessage);


                    }

                }).catch(function (ex) {
                    console.log(ex);
                });
            }
            else {
                $("#error-mobile").css("display", "block");
                // this.errorModel.mobileNo = true;

            }

        }

    }
    else if (!whatsappChecknew && whatsupModel) {
        sessionStorage.setItem("MobileNoWhatsapp", $("#valid-mobile").val());
    }
}

function whatsappOptIn() {
    var MobileNo = !Motor.IsNullOrEmpty($("#valid-mobile").val()) ? $("#valid-mobile").val().replace(/\*/g, "0") : '';
    var ProdDetail = JSON.parse(sessionStorage.getItem("ProdDetail"));

    if (Motor.IsValidMobileNo(MobileNo) && $("#valid-mobile").val().length == 10) {
        Motor.SendPolcyOnWhatsapp($("#valid-mobile").val(), ProdDetail.Product, ProdDetail.ProductCode).then(function (sendPolicyOnWhatsapp) {

            if (!sendPolicyOnWhatsapp.success) {
                ShowErrorPopUp(sendPolicyOnWhatsapp.errorMessage);


            }
        }).catch(function (ex) {
            console.log(ex);
        });

    }
}

function ShowErrorPopUp(errorMessage) {

}
//EndWhatsapp Function
///





