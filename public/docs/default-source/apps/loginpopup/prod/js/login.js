var googleInitiateFlag;
$(document).ready(function () {
    loadLoginHtmlLP();
    otpFormFocusLP();
    loginFormLP();
    OTPFormLP();
    registerFormLP();
    showForgotFormLP();
    handleNumericDataLP();
    handleOtpInputLP();
    toggleEmailLP();
    validateSendResendOtpLP();
    validateOTPLP();
    validateLoginLP();
    validateGuestLP();
    validateRegisterLP();
    validateTNCLP();
    validateForgotLP();
    handleHidePasswordLP();
    handlePopUpClose();
    initializeEmailInput();
});

function loadLoginHtmlLP() {
    $("body").append(
        "<link href='/docs/default-source/apps/loginpopup/prod/css/popup-login-css.css?ver=22092021' type='text/css' rel='stylesheet' media='all'><div id='login_verificationEc_lp' class='login_overlayPop login_expressPop login-overlayN'><div class='login_popup'> <a class='login-close' id='login_close_lp'>×</a><div class='login_content'><div class='login_expressform-block'><div class='login_otp-verification-form-lp'><h3>Verify OTP for a faster checkout experience</h3><p> Get your details auto-filled after entering the OTP sent to your registered email ID</p><div class='login_email-mobdetail'> <span id='otp_email1_lp' class='login_otp-email-edit-lp'></span> <span class='login_otp-email-input-lp'><div class='login_block-lp login_sInput otp_email_input'><label for='TxtEmailAddreg_lp'> Email ID* </label> <input id='otp-email-input-lp' type='email' class='login_email-input' autocomplete='off'></div> </span> <span id='otpEmail_lp' class='login_input-error-lp' style='margin-top: 5px;'>Please enter valid email id</span><span id='UpdatePanelloginComError_otp_lp' class='login_input-error-lp '></span><div class='btnSectn-Login' id='OTP_email_send-lp' style='margin-top: 10px;'><a class='login_bg js-otpExp'>SEND OTP</a></div></div><div class='login_otpInner login_otp-container' id='otpcontainer_lp'> <input type='hidden' id='txtOTP1-lp'> <input name='C032$TxtOTPreg_a_lp' id='TxtOTPreg_a_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'> <input name='C032$TxtOTPreg_b_lp' id='TxtOTPreg_b_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'> <input name='C032$TxtOTPreg_c_lp' id='TxtOTPreg_c_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'> <input name='C032$TxtOTPreg_d_lp' id='TxtOTPreg_d_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'> <input name='C032$TxtOTPreg_e_lp' id='TxtOTPreg_e_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'> <input name='C032$TxtOTPreg_f_lp' id='TxtOTPreg_f_lp' type='tel' class='login_expotp-number-input-lp Numeric' autocomplete='off'><div class='resend_otp_div_lp'> <a class='resend_otp_a_lp' id='OTP_email_resend-lp'>Resend</a></div> <span id='otpSent' class='login_emlOtp'></span><span id='UpdatePanelloginComError_otp_lp' class='login_input-error-lp '></span></div><div class='btnSectn-Login'><a id='OTP_email_lp' class='login_bg js-otpExp'>VERIFY</a></div></div><div class='login_exp-email-password_lp exp-email-passwordbox'><h3>Enter the below details to login</h3><div class='login_inptMainBox'><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left m-b-2'><div class='login_block-lp login_sInput'> <label for='TxtEmailAddreg_lp'> Email* </label> <input name='TxtEmailAddreg_lp' type='text' autocomplete='off' maxlength='150' id='TxtEmailAddreg_lp'> <span id='loginEmail' class='login_input-error-lp'>Please enter valid email id</span></div></div><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='TxtPasswordreg_lp'> Password* </label> <input name='TxtPasswordreg_lp' type='password' maxlength='25' id='TxtPasswordreg_lp' data-toggle='tooltip' data-trigger='manual' data-title='Caps lock is on'><span id='password-field-lp' class='eye_pwd_icon_lp'></span> <span id='loginPassword' class='login_input-error-lp'>Please enter valid password</span></div> <a id='btnforgot_lp' class='login_js-forgotPass'>Forgot Password</a></div><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center m-b-2'><div class='btnSectn-Login'><a id='btnloginform_lp' class='login_bg js-valexlogin'>Login</a></div></div><div class='row m-0'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'> <span id='UpdatePanelloginComError_lp' class='login_input-error-lp'></span> <span id='UpdatePanelcomError' class='login_input-error-lp'> </span></div></div></div></div><div class='clearfix'></div></div><div class='login_forgotPassBox_lp exp-email-passwordbox'><div class='login_frgtPassDiv'><div class='login_topBox text-center'><h3>Reset your password</h3><p> We will send you an email with instructions on how to reset your password.</p></div><div class='login_inputFieldsBox'><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput'> <label for='forgotemail_lp'> Email* </label> <input type='text' name='forgotemail_lp' id='forgotemail_lp' maxlength='150'> <span class='login_input-error-lp'>Please enter valid email id</span></div></div><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='forgotdob_lp'> Date of Birth* </label> <input name='forgotdob_lp' type='text' id='forgotdob_lp' class='mPass js-requred datepicker-input' readonly> <span class='login_input-error-lp'>Select Date of Birth</span></div></div><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><div class='btnSectn-Login'> <a id='btnforgotsubmit_lp' class='login_bg js-submit'>SUBMIT</a></div> <span class='login_errorCommFP_lp login_input-error-lp'></span></div></div></div></div><div class='login_instruBox_lp'><h4>An email with instruction on how to reset your password has been sent to <span id='forgotpassEmail_lp'></span></h4></div></div><div class='login_registerNowBox_lp'><h3>Signup</h3><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6'><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-3 col-lg-3 p-l-0 p-r-0 m-b-2'><div class='login_block-lp login_sInput login_sSelect'> <label for='title-reg'>Title</label> <select id='regtitle_lp'><option>Mr</option><option>Mrs</option><option>M/S</option><option>Ms</option><option>Mx</option> </select></div></div><div class='col-xs-12 col-sm-6 col-md-9 col-lg-9 p-r-0 m-b-2 m-p-l-0'><div class='login_block-lp login_sInput login_mar-none'> <label for='regname_lp'> Full name* </label> <input type='text' name='regname_lp' id='regname_lp' maxlength='150'> <span class='login_input-error-lp'>Please enter valid name</span></div></div></div></div><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='regemail_lp'> Email ID* </label> <input type='text' name='regemail_lp' id='regemail_lp' maxlength='150'> <span class='login_input-error-lp'>Please enter valid email id</span></div></div></div><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput '> <label for='regmobile_lp'> Mobile No.* </label> <input type='text' class='Numeric' name='regmobile_lp' id='regmobile_lp' maxlength='10'> <span class='login_input-error-lp'>Please enter valid mobile no</span></div></div><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='regdob_lp'> Date of Birth* </label> <input name='regdob_lp' type='text' id='regdob_lp' class='mPass js-requred datepicker-input ' readonly> <span class='login_input-error-lp'>Please select date of birth</span></div></div></div><div class='row m-0'><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='regpassword_lp'> Password* </label> <input name='regpassword_lp' type='password' maxlength='25' id='regpassword_lp'> <span class='login_input-error-lp'>Please enter valid format.(e.g. Abc@123) Password</span></div></div><div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-2'><div class='login_block-lp login_sInput login_mar-none'> <label for='regconfirmpassword_lp'> Confirm password* </label> <input name='regconfirmpassword_lp' type='password' maxlength='25' id='regconfirmpassword_lp'> <span class='login_input-error-lp'>Both password should match</span></div></div></div><div class='row m-0'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-2' style='margin-top:1rem;'><ul class='login_unstyled paddEb centered regtnc'><li> <input type='checkbox' id='agreetnc_tp' class='login_styled-checkbox Checkboxs2 '> <label for='agreetnc_tp'><span>I hereby acknowledge and accept the </span><a href='/legal/terms' target='_blank' class='login_termsconditions'>terms and conditions </a></label><div class='login_block-lp block2'> <span id='tnc1_lp' class='login_errorN ng-star-inserted'> Please accept terms and conditions </span></div></li></ul></div><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center m-b-2'><div class='btnSectn-Login'> <a id='btnreguser_lp' class='register-btn'>Register</a></div> <span id='reginvalidmsg_lp' class='login_errorCommFP_lp login_input-error-lp'></span><div class='login_footer-links_lp login-footer-links register-footer-link' style='display: block !important;'><div id='loginnowdiv' class='text-center login_clikSignup'>Already have an account? <a id='btnregnowlogin_lp' class='login_regNowbtn'>Login Now</a></div></div></div><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><div class='login_footer-links_lp login-footer-links'><div class='text-center login_clikSignup'>Already have an account? <a _ngcontent-fuv-c37='' class='login_regNowbtn'>Login Now</a></div></div></div></div></div><div class='login_footer-links_lp login-footer-links'> <a id='btnlogin_lp' class='js-loginexp'>Login with email ID</a> <a id='btnotp_lp'>Login with OTP</a> <span>OR</span> <a id='btnguest_lp'>Continue as guest</a><div class='text-center login_clikSign'> You can sign in with</div></div><div id='btngoogle_lp' class='g-signin2 text-center' style='margin: 10px auto; width: 120px;' data-theme='dark' data-onsuccess='onSignIn'></div><div class='login_footer-links_lp login-footer-links reg-footer-links_lp'><div id='registerdiv_lp' class='text-center login_clikSignup'> Don't have an account? <a id='btnreg_lp' class='login_regNowbtn'>Register Now</a></div><div id='logindiv_lp' class='text-center login_clikSignup'> Already have an account? <a id='btnreglogin_lp' class='login_regNowbtn'>Login Now</a></div></div></div></div><div class='bTBor'></div></div><div class='login-datepicker-lp'></div><div class='loader_lp' style='display: none;'><div class='innerT_lp'><div class='typing_loader_lp'>&nbsp;</div></div></div></div>");
}
function handleHidePasswordLP() {
    $("#password-field-lp")
        .off()
        .on("click", function () {
            $(this).toggleClass("eye_pwd_icon_lp eye_slash_pwd_icon_lp");
            var input = $("#TxtPasswordreg_lp");
            input.attr("type") === "password"
                ? input.attr("type", "text")
                : input.attr("type", "password");
        });
}
function handleOtpInputLP() {

    const $inp = $(".login_expotp-number-input-lp");

    $inp.on({
        input: function (ev) {
            if (this.value.length > 1) {
                //Validate otp from clipboard
                var otpValue = this.value.trim();

                if (!/\d{6}/.test(otpValue)) {
                    resetOTPLP();
                    return;
                }
                ev.preventDefault();

                const s = otpValue.split("");
                $inp
                    .each(function (index) {
                        $(this).val(s[index]);
                    }).eq(5).focus();
                $(".login_expotp-number-input-lp").attr({ maxlength: "1" });
            } else {
                const i = $inp.index(this);
                $(".login_expotp-number-input-lp").attr({ maxlength: "1" });
                if (this.value) $inp.eq(i + 1).focus();
            }
        },
        keydown: function (ev) {
            const i = $inp.index(this);
            if (!this.value && ev.key === "Backspace" && i) $inp.eq(i - 1).focus();
        },
        keyup: function (ev) {
            if (!fetchOtpValue()) {
                $(".login_expotp-number-input-lp").removeAttr("maxlength");
            }
        },
        focusout: function (ev) {

            $("#txtOTP1-lp").val(fetchOtpValue());
        }
    });

}

function fetchOtpValue() {
    var otpCodeTemp = "";

    $("input.login_expotp-number-input-lp").each(function (e) {
        otpCodeTemp += $(this).val();
    });

    return otpCodeTemp;
}
function handleNumericDataLP() {
    $(document).on("keydown", ".Numeric", function (e) {
        46 == e.keyCode ||
            8 == e.keyCode ||
            9 == e.keyCode ||
            27 == e.keyCode ||
            13 == e.keyCode ||
            (65 == e.keyCode && e.ctrlKey === !0) ||
            (e.keyCode >= 35 && e.keyCode <= 39) ||
            ((e.shiftKey ||
                ((e.keyCode < 48 || e.keyCode > 57) &&
                    (e.keyCode < 96 || e.keyCode > 105))) &&
                e.preventDefault());
    });
    $(document).on("keyup", ".Numeric", function (e) {
        var regex = /^[0-9\.]$/;
        var str = $(this).val();
        var subStr = str.substr(str.length - 1);
        if (!regex.test(subStr)) {
            if (str.length > 0) {
                $(this).val(str.substr(0, str.length - 1));
            } else {
                $(this).val();
            }
        }
    });
}

function RegShowLoaderLP() {
    $(".loader_lp").show();
}

function RegHideLoaderLP() {
    $(".loader_lp").hide();
}

function RegHideLoaderParentLP() {
    $(".loader").hide();
}

function RegShowLoaderOTPLP() {
    $(".loader_lp").show();
}

function otpFormFocusLP() {
    $(".login_block-lp input, .login_otp-verification-form-lp input").focus(
        function () {
            $(this).parents(".login_block-lp").addClass("focus");
            $(this)
                .parents(".login_block-lp")
                .find("span.login_input-error-lp")
                .hide();
            $("#otpEmail_lp").css("display", "none");
        }
    );
    $(".login_block-lp input").focusout(function () {
        if ($(this).val() == "") {
            $(this).parents(".login_block-lp").removeClass("focus");
        } else {
            $(this).parents(".login_block-lp").addClass("focus");
        }
    });
}

function onSignIn(googleUser) { }

function validateSendResendOtpLP() {
    $("#OTP_email_send-lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            var isValidEmail = validateSendResendBtnLP();
            if (isValidEmail) {
                sendOTPLP();
            } else {
                RegHideLoaderLP();
            }
        });
    $("#OTP_email_resend-lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            var isValidEmail = validateSendResendBtnLP();
            if (isValidEmail) {
                resetOTPLP();
                sendOTPLP();
            } else {
                RegHideLoaderLP();
            }
        });
}

function resetOTPLP() {
    $("#TxtOTPreg_a_lp").val("");
    $("#TxtOTPreg_b_lp").val("");
    $("#TxtOTPreg_c_lp").val("");
    $("#TxtOTPreg_d_lp").val("");
    $("#TxtOTPreg_e_lp").val("");
    $("#TxtOTPreg_f_lp").val("");
    $(".login_expotp-number-input-lp").removeAttr("maxlength");
}

function validateSendResendBtnLP() {
    flag = !0;
    var email = $("#otp-email-input-lp").val();
    var emailValid = validateEmail(email);
    if (!emailValid) {
        $("#UpdatePanelloginComError_otp_lp").hide();
        $("#otpEmail_lp").css("display", "block");
        flag = !1;
    } else {
        $("#otpEmail_lp").hide();
    }
    return flag;
}

function validateForgotLP() {
    $("#btnforgotsubmit_lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            var isValidForgot = validateForgotbtnLP();
            if (isValidForgot) {
                doForgot();
            } else {
                RegHideLoaderLP();
            }
        });
}

function validateTNCLP() {
    $("#agreetnc_tp").on("click", function () {
        $("#tnc1_lp").hide();
    });
}

function toggleEmailLP() {
    $(".login_otp-email-edit-lp").on("click", function () {
        $(this).hide();
        $("#otpcontainer_lp").hide();
        $("#OTP_email_lp").hide();
        $(".login_otp-email-input-lp").show();
        $("#OTP_email_send-lp").show();
        $("#OTP_email_resend-lp").hide();
        $("#UpdatePanelloginComError_otp_lp").hide();
    });
}

function validateOTPLP() {
    $("#OTP_email_lp")
        .off()
        .on("click", function () {
            var isValidOtp = validateOTPbtn();
            if (isValidOtp) {
                RegShowLoaderLP();
                verifyOTPLP();
            } else {
                RegHideLoaderLP();
            }
        });
}

function validateRegisterLP() {
    $("#btnreguser_lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            $("#reginvalidmsg_lp").hide();
            var isValidRegister = validateRegisterBtn();
            if (isValidRegister) {
                doRegister();
            } else {
                RegHideLoaderLP();
            }
        });
}

function validateGuestLP() {
    $("#btnguest_lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            doGuestLogin();
        });
}

function validateLoginLP() {
    $("#btnloginform_lp")
        .off()
        .on("click", function () {
            RegShowLoaderLP();
            var isValidLogin = validateLoginbtnLP();
            if (isValidLogin) {
                doLogin();
            } else {
                RegHideLoaderLP();
            }
        });
}

function validateForgotbtnLP() {
    flag = !0;
    var email = $("#forgotemail_lp").val();
    var emailValid = validateEmail(email);
    var dob = $("#forgotdob_lp").val();
    if (!emailValid) {
        $("#forgotemail_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#forgotemail_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (dob == "") {
        $("#forgotdob_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#forgotdob_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    return flag;
}

function validateRegisterBtn() {
    flag = !0;
    var name = $("#regname_lp").val();
    var namePattern = /^[a-zA-Z0-9 ]+$/;
    var nameValid = name.match(namePattern);
    var email = $("#regemail_lp").val();
    var emailValid = validateEmail(email);
    var mobile = $("#regmobile_lp").val();
    var mobilePattern = /^([6-9]{1}[0-9]{9})$/;
    var mobileValid = mobile.match(mobilePattern);
    var dob = $("#regdob_lp").val();
    var password = $("#regpassword_lp").val();
    var passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var passwordValid = password.match(passwordPattern);
    var confirmPAssword = $("#regconfirmpassword_lp").val();
    if (nameValid == null || name == "") {
        $("#regname_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regname_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (!emailValid) {
        $("#regemail_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regemail_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (mobileValid == null || mobile == "") {
        $("#regmobile_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regmobile_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (dob == "") {
        $("#regdob_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regdob_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (passwordValid == null || password == "" || password.lenght < 8) {
        $("#regpassword_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regpassword_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (confirmPAssword == "" || confirmPAssword != password) {
        $("#regconfirmpassword_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#regconfirmpassword_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if ($("#agreetnc_tp").is(":checked") != !0) {
        flag = !1;
        $("#tnc1_lp").show();
    }
    return flag;
}

function validateOTPbtn() {
    flag = !0;
    var passLogin = $("#txtOTP1-lp").val();
    if (passLogin == null || passLogin == "" || passLogin.length < 6) {
        flag = !1;
    }
    if (flag == !1) {
        if (passLogin.length < 1) {
            $("#UpdatePanelloginComError_otp_lp").text("Please enter OTP");
        }
        if (passLogin.length >= 1 && passLogin.length < 6) {
            $("#UpdatePanelloginComError_otp_lp").text("Please enter Valid OTP");
        }
        $("#UpdatePanelloginComError_otp_lp").show();
        RegHideLoaderLP();
    }
    if (flag == !0) {
        $("#UpdatePanelloginComError_otp_lp").hide();
    }
    return flag;
}

function validateLoginbtnLP() {
    flag = !0;
    var email = $("#TxtEmailAddreg_lp").val();
    var emailValid = validateEmail(email);
    var passLogin = $("#TxtPasswordreg_lp").val();
    if (!emailValid) {
        $("#TxtEmailAddreg_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#TxtEmailAddreg_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    if (passLogin == null || passLogin == "") {
        $("#TxtPasswordreg_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .show();
        flag = !1;
    } else {
        $("#TxtPasswordreg_lp")
            .parents(".login_block-lp")
            .find("span.login_input-error-lp")
            .hide();
    }
    return flag;
}

function loginFormLP() {
    $("#btnlogin_lp").click(function () {
        showLoginFormLP();
    });
    $("#btnreglogin_lp").click(function () {
        showLoginFormLP();
    });
    $("#btnregnowlogin_lp").click(function () {
        showLoginFormLP();
    });
}

function registerFormLP() {
    $("#btnreg_lp").click(function () {
        showRegisterFormLP();
    });
}

function showForgotFormLP() {
    $("#btnforgot_lp").click(function () {
        $(".login_instruBox_lp").hide();
        $(".login_forgotPassBox_lp").show();
        $(".login_otp-verification-form-lp").hide();
        $(".login_exp-email-password_lp").hide();
        $(".login_registerNowBox_lp").hide();
        $("#btnotp_lp").hide();
        $("#btnlogin_lp").hide();
        $(".login_footer-links_lp").hide();
        $("#btngoogle_lp").hide();
        $("#registerdiv_lp").hide();
        $(".reg-footer-links_lp").show();
        $("#logindiv_lp").show();
    });
}

function showLoginFormLP() {
    if ($("#TxtEmailAddreg_lp").val()) {
    } else {
        $("#TxtEmailAddreg_lp").val($("#otp-email-input-lp").val());
        if ($("#otp-email-input-lp").val()) {
            $("#TxtEmailAddreg_lp").parents(".login_block-lp").addClass("focus");
        } else {
            $("#TxtEmailAddreg_lp").parents(".login_block-lp").removeClass("focus");
        }
    }
    $("#TxtEmailAddreg_lp")
        .parents(".login_block-lp")
        .find("span.login_input-error-lp")
        .hide();
    $("#TxtPasswordreg_lp")
        .parents(".login_block-lp")
        .find("span.login_input-error-lp")
        .hide();
    $(".login_forgotPassBox_lp").hide();
    $(".login_otp-verification-form-lp").hide();
    $(".login_exp-email-password_lp").show();
    $(".login_registerNowBox_lp").hide();
    $("#btnotp_lp").show();
    $("#btnlogin_lp").hide();
    $(".login_footer-links_lp").show();
    $("#btngoogle_lp").show();
    $("#registerdiv_lp").show();
    $("#logindiv_lp").hide();
    $(".login_errorCommFP_lp").hide();
    $("#otp-email-input-lp").val("");
}

function OTPFormLP() {
    $("#btnotp_lp").click(function () {
        showOTPFormLP();
    });
}

function showOTPFormLP() {
    if ($("#otp-email-input-lp").val()) {
    } else {
        $("#otp-email-input-lp").val($("#TxtEmailAddreg_lp").val());
        if ($("#TxtEmailAddreg_lp").val()) {
            $("#otp-email-input-lp").parents(".login_block-lp").addClass("focus");
        } else {
            $("#otp-email-input-lp").parents(".login_block-lp").removeClass("focus");
        }
    }
    $(".login_otp-verification-form-lp").show();
    $(".login_exp-email-password_lp").hide();
    $(".login_registerNowBox_lp").hide();
    $("#otpcontainer_lp").hide();
    $("#OTP_email_resend-lp").hide();
    $(".login_forgotPassBox_lp").hide();
    $("#btnlogin_lp").show();
    $("#btnotp_lp").hide();
    $(".login_footer-links_lp").show();
    $("#btngoogle_lp").show();
    $("#registerdiv_lp").show();
    $("#logindiv_lp").hide();
    $("#OTP_email_lp").hide();
    $("#otp_email1_lp").hide();
    $(".login_otp-email-input-lp").show();
    $("#OTP_email_send-lp").show();
    $("#UpdatePanelloginComError_otp_lp").hide();
    $("#TxtEmailAddreg_lp").val("");
}

function showRegisterFormLP() {
    $(".login_otp-verification-form-lp").hide();
    $(".login_exp-email-password_lp").hide();
    $("#forgotPassBox_lp").hide();
    $(".login_registerNowBox_lp").show();
    $(".login_footer-links_lp").hide();
    $("#btngoogle_lp").hide();
    $("#registerdiv_lp").hide();
    $("#logindiv_lp").hide();
    $(".reg-footer-links_lp").show();
}

function addRemoveFocus(id) {
    if ($(id).val() == "") {
        $(id).parents(".login_block-lp").removeClass("focus");
    } else {
        $(id).parents(".login_block-lp").addClass("focus");
    }
}

function showLoginPopUp(loginType) {
    RegHideLoaderLP();
    RegHideLoaderParentLP();
    $("#ui-datepicker-div").remove();
    var userLoginUIData = JSON.parse(sessionStorage.getItem("userLoginUIData"));
    $("#login_verificationEc_lp").show();
    googleInitiateFlag = !0;
    if (loginType == "email") {
        if (userLoginUIData != null) {
            if (userLoginUIData.EmailId) {
                $("#TxtEmailAddreg_lp").val(userLoginUIData.EmailId);
            } else if (userLoginUIData.emailId) {
                $("#TxtEmailAddreg_lp").val(userLoginUIData.emailId);
            } else {
                $("#TxtEmailAddreg_lp").val(userLoginUIData.email);
            }
            addRemoveFocus("#TxtEmailAddreg_lp");
        }
        showLoginFormLP();
    } else {
        if (userLoginUIData != null) {
            if (userLoginUIData.EmailId) {
                $("#otp_email1_lp").val(userLoginUIData.EmailId);
            } else if (userLoginUIData.emailId) {
                $("#otp_email1_lp").val(userLoginUIData.emailId);
            } else {
                $("#otp_email1_lp").val(userLoginUIData.email);
            }
            $("#otp-email-input-lp").val(userLoginUIData.email);
        }
        showOTPFormLP();
    }
    addDatepickerLP();
}

function sendOTPLP() {
    RegShowLoaderOTPLP();
    var sendOtpRequest = {
        Login: $("#otp-email-input-lp").val(),
        LoginType: "User",
    };
    corelibrary
        .MakePostCallForCore2("user/otp", sendOtpRequest)
        .then(function (response) {
            if (response != undefined) {
                if (response.success == !0) {
                    $("#OTP_email_send-lp").hide();
                    $("#otp_email1_lp").show();
                    $(".login_otp-email-input-lp").hide();
                    $("#OTP_email_resend-lp").show();
                    $("#otp_email1_lp").text($("#otp-email-input-lp").val());
                    $("#otpcontainer_lp").show();
                    $("#OTP_email_lp").show();
                    $("#UpdatePanelloginComError_otp_lp").text("OTP sent successfully");
                    $("#UpdatePanelloginComError_otp_lp").css("display", "block");
                } else {
                    $("#UpdatePanelloginComError_otp_lp").text(response.errorMessage);
                    $("#UpdatePanelloginComError_otp_lp").css("display", "block");
                }
            }
            RegHideLoaderLP();
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function verifyOTPLP() {
    var verifyOtpRequest = {
        EmailId: $("#otp-email-input-lp").val(),
        OTP: corelibrary.getEncryptedPassword($("#txtOTP1-lp").val()),
    };
    corelibrary
        .MakePostCallForCore2("auth/otp", verifyOtpRequest)
        .then(function (response) {
            if (response != undefined) {
                if (response.success == !0) {
                    processLoginResponseLP(response, !1);
                } else {
                    $("#UpdatePanelloginComError_otp_lp").text(response.errorMessage);
                    $("#UpdatePanelloginComError_otp_lp").show();
                    RegHideLoaderLP();
                }
            } else {
                RegHideLoaderLP();
            }
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function doLogin() {
    var loginRequest = {
        Login: $("#TxtEmailAddreg_lp").val(),
        Password: corelibrary.getEncryptedPassword($("#TxtPasswordreg_lp").val()),
        LoginType: "User",
    };
    corelibrary
        .MakePostCallForCore2("auth/token", loginRequest)
        .then(function (response) {
            if (response != undefined) {
                if (response.success == !0) {
                    processLoginResponseLP(response, !1);
                } else {
                    if (response.errorMessage == "login or password doesnot match") {
                        $("#UpdatePanelloginComError_lp").text(
                            "login or password does not match"
                        );
                    } else {
                        $("#UpdatePanelloginComError_lp").text(response.errorMessage);
                    }
                    $("#UpdatePanelloginComError_lp").show();
                    RegHideLoaderLP();
                }
            } else {
                RegHideLoaderLP();
            }
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function doLogout() {
    this.doWebsiteLogout();
}

function doWebsiteLogout() {
    var loginRequest = {
        Login: $("#TxtEmailAddreg_lp").val(),
        Password: corelibrary.getEncryptedPassword($("#TxtPasswordreg_lp").val()),
        LoginType: "User",
    };
    corelibrary
        .MakeGetCallForMicro("auth-api/user/signout", loginRequest)
        .then(function (response) {
            if (response != undefined) {
                if (response.Success == !0) {
                    sessionStorage.removeItem("UserDetailsData");
                    sessionStorage.removeItem("UserLoggedInDetail");
                    sessionStorage.removeItem("AuthorizationToken");
                    sessionStorage.removeItem("TokenExpiry");
                    sessionStorage.removeItem("LoginType");
                    sessionStorage.removeItem("IsCallCenterUser");
                    window.location.href = "/";
                } else {
                    RegHideLoaderLP();
                }
            } else {
                RegHideLoaderLP();
            }
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function doGuestLogin() {
    var guestRequest = {};
    if (window.proceed_url) {
        corelibrary
            .MakePostCallForCore2("auth/guest", guestRequest)
            .then(function (response) {
                if (response != undefined) {
                    if (response.success == !0) {
                        processLoginResponseLP(response, !0);
                    } else {
                        RegHideLoaderLP();
                    }
                } else {
                    RegHideLoaderLP();
                }
            })
            .catch(function (error) {
                RegHideLoaderLP();
            });
    } else {
        RegHideLoaderLP();
        $("#reginvalidmsg_lp").text(
            "You are not a registered user, please register to continue."
        );
        $("#reginvalidmsg_lp").show();
        showRegisterFormLP();
    }
}

function doForgot() {
    var forgotdob_lp = $("#forgotdob_lp").val().split("/");
    var forgotRequest = {
        EmailID: $("#forgotemail_lp").val(),
        DateOfBirth:
            forgotdob_lp[1] + "/" + forgotdob_lp[0] + "/" + forgotdob_lp[2],
    };
    corelibrary
        .MakePostCallForCore2("user/forgot-password", forgotRequest)
        .then(function (response) {
            if (response != undefined) {
                if (response.success == !0) {
                    $(".login_instruBox_lp").show();
                    $("#forgotpassEmail_lp").text($("#forgotemail_lp").val());
                    $(".login_errorCommFP_lp").hide();
                    setTimeout(function () {
                        showLoginFormLP();
                    }, 5000);
                } else {
                    $(".login_errorCommFP_lp").text(response.errorMessage);
                    $(".login_errorCommFP_lp").css("display", "block");
                }
            }
            RegHideLoaderLP();
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function doRegister() {
    // Get password directly from input
    var password = $("#regpassword_lp").val();

    // Prepare registration request
    var registerRequest = {
        EmailId: $("#regemail_lp").val(),
        UserPassword: corelibrary.getEncryptedPassword(password),
        UserName: $("#regname_lp").val(),
        DateOfBirth: $("#regdob_lp").val(),
        MobileNo: $("#regmobile_lp").val(),
        UserTitleId: getTitleId($("#regtitle_lp").val()),
        LoginType: "User",
        IsRegisterByCallCenter: false, // Call center registration removed
        UserTitleText: $("#regtitle_lp").val(),
    };

    // Make API call
    corelibrary
        .MakePostCallForCore2("user/register", registerRequest)
        .then(function (response) {
            if (response !== undefined) {
                if (response.success === true) {
                    processLoginResponseLP(response, false);
                } else {
                    $("#reginvalidmsg_lp").text(response.errorMessage).show();
                    RegHideLoaderLP();
                }
            } else {
                RegHideLoaderLP();
            }
        })
        .catch(function (error) {
            RegHideLoaderLP();
        });
}

function doGoogleLogIn(email, token, authId) {
    var googleRequest = {
        EmailId: email,
        AuthorizedCode: token,
        GoogleId: authId,
    };
    if (googleInitiateFlag) {
        corelibrary
            .MakePostCallForCore2("Auth/google", googleRequest)
            .then(function (response) {
                if (response != undefined) {
                    if (response.success == !0) {
                        processLoginResponseLP(response, !1);
                    } else {
                        RegHideLoaderLP();
                        $("#reginvalidmsg_lp").text(
                            "You are not a registered user, please register to continue."
                        );
                        $("#reginvalidmsg_lp").show();
                        showRegisterFormLP();
                    }
                } else {
                    RegHideLoaderLP();
                }
            })
            .catch(function (error) {
                RegHideLoaderLP();
            });
    }
}

function processLoginResponseLP(responseFromToken, isGuestUrl) {
    sessionStorage.setItem("AuthorizationToken", responseFromToken.authToken);
    var sid = "sid";
    if (responseFromToken.sid) {
        sid = responseFromToken.sid;
    }
    sessionStorage.setItem("SID", sid);
    if (sessionStorage.getItem("PolicyId")) {
        let strPolicyId = [];
        //Multi policy id handler
        let strPolicyIdSession = sessionStorage.getItem("PolicyId");
        let strPolicyIdList = strPolicyIdSession.split(",");
        for (let i = 0; i < strPolicyIdList.length; i++) {
            strPolicyId.push(strPolicyIdList[i]);
        }
        let paymentRequest = {
            policyId: strPolicyId,
        };
        corelibrary
            .MakePaymentTransactionCall(
                "Payment/CreatePaymentTransaction",
                paymentRequest
            )
            .then(function (res) {
                var response = JSON.parse(res.responseText);
                if (response != undefined) {
                    if (
                        (response.Success == !0 || response.success == !0) &&
                        (response.RazorpayOrderId != null ||
                            response.razorpayOrderId != null)
                    ) {
                        if (res.getResponseHeader("X-Token")) {
                            sessionStorage.setItem(
                                "NewAuthorizationToken",
                                res.getResponseHeader("X-Token")
                            );
                            sessionStorage.setItem(
                                "AuthorizationToken",
                                res.getResponseHeader("X-Token")
                            );
                        }
                        if (res.getResponseHeader("X-TokenExpiry")) {
                            sessionStorage.setItem(
                                "TokenExpiry",
                                res.getResponseHeader("X-TokenExpiry")
                            );
                        }
                        sessionStorage.setItem(
                            "clientId",
                            responseFromToken.clientId.toString()
                        );
                        sessionStorage.setItem("LoginType", "User");
                        var sessionData = {
                            clientId: responseFromToken.clientId,
                            IPartnerUserId: responseFromToken.iPartnerUserId,
                            LastLogin: convertLastLoginFormat(responseFromToken.lastLogin),
                            UserName: responseFromToken.userName,
                            isguestuser: isGuestUrl ? 1 : 0,
                        };
                        sessionStorage.setItem(
                            "UserDetailsData",
                            JSON.stringify(sessionData)
                        );
                        googleInitiateFlag = !1;
                        window.location.href =
                            window.location.origin +
                                window.proceed_url +
                                "?returl=" +
                                window.location.pathname;
                    } else {
                        RegHideLoaderLP();
                        $("#UpdatePanelloginComError_lp").text(response.ErrorMessage);
                        $("#UpdatePanelloginComError_lp").show();
                    }
                } else {
                    RegHideLoaderLP();
                }
            })
            .catch(function (error) {
                RegHideLoaderLP();
            });
    } else if (sessionStorage.getItem("ProposalId")) {
        var strPolicyId = [];
        var id = sessionStorage.getItem("ProposalId").toString().split(',');
        for (var i = 0; i < id.length; i++) {
            strPolicyId.push(id[i]);
        }
        let paymentRequest = {
            proposalId: strPolicyId,
        };
        corelibrary
            .MakePostCallForCore2("Payment/Transaction", paymentRequest)
            .then(function (response) {
                if (response != undefined) {
                    if (
                        (response.Success == !0 || response.success == !0) &&
                        (response.paymentTransactionId != null ||
                            response.PaymentTransactionId != null)
                    ) {
                        if (response.xToken) {
                            sessionStorage.setItem("NewAuthorizationToken", response.xToken);
                            sessionStorage.setItem("AuthorizationToken", response.xToken);
                        }
                        if (response.xTokenExpiry) {
                            sessionStorage.setItem("TokenExpiry", response.xTokenExpiry);
                        }
                        sessionStorage.setItem(
                            "clientId",
                            responseFromToken.clientId.toString()
                        );
                        sessionStorage.setItem("LoginType", "User");
                        var sessionData = {
                            clientId: responseFromToken.clientId,
                            IPartnerUserId: responseFromToken.iPartnerUserId,
                            LastLogin: convertLastLoginFormat(responseFromToken.lastLogin),
                            UserName: responseFromToken.userName,
                            isguestuser: isGuestUrl ? 1 : 0,
                        };
                        sessionStorage.setItem(
                            "UserDetailsData",
                            JSON.stringify(sessionData)
                        );
                        googleInitiateFlag = !1;
                        if (window.location.pathname.search("renew") != -1) {
                            var retUrl = window["hb_renewal_ret_url"];
                            if (retUrl != undefined && retUrl != null && retUrl != "") {
                                window.location.href = window.location.origin + window.proceed_url +
                                    "?PaymentTransactionId=" + response.paymentTransactionId +
                                    "&returl=" + retUrl;
                            } else {
                                window.location.href = window.location.origin + window.proceed_url +
                                    "?PaymentTransactionId=" + response.paymentTransactionId +
                                    "&returl=" + window.location.pathname;
                            }
                        } else {
                            window.location.href =
                                window.location.origin +
                                    window.proceed_url +
                                    "?returl=" +
                                    window.location.pathname;
                        }
                    } else {
                        RegHideLoaderLP();
                        $("#UpdatePanelloginComError_lp").text(response.ErrorMessage);
                        $("#UpdatePanelloginComError_lp").show();
                    }
                } else {
                    RegHideLoaderLP();
                }
            })
            .catch(function (error) {
                RegHideLoaderLP();
            });
    } else {
        if (responseFromToken.clientId && responseFromToken.iPartnerUserId) {
            sessionStorage.setItem("clientId", responseFromToken.clientId.toString());
            sessionStorage.setItem("LoginType","User");
            var sessionData = {
                clientId: responseFromToken.clientId,
                IPartnerUserId: responseFromToken.iPartnerUserId,
                LastLogin: convertLastLoginFormat(responseFromToken.lastLogin),
                UserName: responseFromToken.userName,
                isguestuser: isGuestUrl ? 1 : 0,
            };
            sessionStorage.setItem("UserDetailsData", JSON.stringify(sessionData));
            sessionStorage.setItem(
                "TokenExpiry",
                responseFromToken.tokenExpiry.toString()
            );
            googleInitiateFlag = !1;
            if (window.proceed_url) {
                window.location.href = window.location.origin + window.proceed_url;
            } else {
                window.location.href =
                    window.location.origin +
                        "/manage-your-policy/dashboard-duplicate"; 
                        
                       
            }
        } else {
            RegHideLoaderLP();
        }
    }
}

function convertLastLoginFormat(date) {
    var newDate = new Date(date);
    var lastLoginDate =
        ("00" + newDate.getDate()).slice(-2) +
        "/" +
        ("00" + (newDate.getMonth() + 1)).slice(-2) +
        "/" +
        newDate.getFullYear() +
        " " +
        ("00" + newDate.getHours()).slice(-2) +
        ":" +
        ("00" + newDate.getMinutes()).slice(-2) +
        ":" +
        ("00" + newDate.getSeconds()).slice(-2);
    if (lastLoginDate != "aN/aN/NaN aN:aN:aN") return lastLoginDate;
    return date;
}

function addDatepickerLP() {
    if ($.fn.datepicker) {
        $("#regdob_lp").datepicker({
            changeMonth: !0,
            changeYear: !0,
            showOn: "both",
            dateFormat: "dd/mm/yy",
            minDate: "-100Y +1D",
            maxDate: "-18Y",
            yearRange: "-100:-18",
            beforeShow: function (textbox, instance) {
                $(".login-datepicker-lp").append($("#ui-datepicker-div"));
            },
            onSelect: function (selectedDate) {
                if (selectedDate) {
                    addRemoveFocus("#regdob_lp");
                }
            },
        });
        $("#forgotdob_lp").datepicker({
            changeMonth: !0,
            changeYear: !0,
            showOn: "both",
            dateFormat: "dd/mm/yy",
            minDate: "-100Y +1D",
            maxDate: "-18Y",
            yearRange: "-100:-18",
            beforeShow: function (textbox, instance) {
                $(".login-datepicker-lp").append($("#ui-datepicker-div"));
            },
            onSelect: function (selectedDate) {
                if (selectedDate) {
                    addRemoveFocus("#forgotdob_lp");
                }
            },
        });
    }
}

function verifyCallCenter() {
    var currentUrl = window.location.host;
    if (
        currentUrl == "https://ipartnercc.icicilombard.com" ||
        currentUrl == "https://ipartnerext.icicilombard.com" ||
        currentUrl == "https://ipartnerccui.icicilombard.com"
    )
        return !0;
    else return !1;
}

function getTitleId(title) {
    switch (title) {
        case "Mr":
            return "1";
        case "Mrs":
            return "0";
        case "M/S":
            return "11";
        case "Ms":
            return "2";
        case "Mx":
            return "3";
    }
}

function closePopup() {
    $("#login_verificationEc_lp").hide();
    $("#ui-datepicker-div").remove();
    googleInitiateFlag = !1;
}

function handlePopUpClose() {
    $(document).on("click", "#login_close_lp", function (e) {
        closePopup();
    });
}

function validateEmail(email) {
    const emailFilterOne = 
        /^(([^|\\<>/()\[\]\,;:@\"]+(\[^<>()\[\]\,;:\s@\"])*)|(\"\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^0-9<>/()[\]\.,;:\s@\"]{2,4})$/;
    const emailFilterTwo = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-]{2,9})+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailFilterOne.test(email) && emailFilterTwo.test(email);
}

function initializeEmailInput() {

    const $inp = $('#TxtEmailAddreg_lp, #forgotemail_lp, #regemail_lp, #otp-email-input-lp');
    $inp.on({
        keypress: function (e) {
            var pattern = /^[a-zA-Z0-9.@_-]*$/;
            var currentValue = String.fromCharCode(e.which);
            if (currentValue && !pattern.test(currentValue)) {
                e.preventDefault();
                return false;
            }
        }
    });
}
