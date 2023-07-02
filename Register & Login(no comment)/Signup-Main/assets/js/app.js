//Variables
let telInput = document.querySelector( 'input[type="tel"]' )
	, submitForm = document.querySelector( 'input[type="submit"]' )
	, passInput = document.querySelectorAll( 'input[type="password"]' )[ 0 ]
	, passInputRepeat = document.querySelectorAll( 'input[type="password"]' )[ 1 ]
	, form = document.querySelector( "form" );
const loaders = document.querySelector( "#show-result .loaders" );
//EventListeners
eventListeners();

function eventListeners() {
	document.addEventListener( "DOMContentLoaded", () => {
		submitForm.disabled = true
		passInputRepeat.disabled = true
	} );
	telInput.addEventListener( 'paste', telUserPaste )
	telInput.addEventListener( "keydown", validateTelInput );
	telInput.addEventListener( "blur", validateFields )
	passInput.addEventListener( "blur", validateFields )
	passInputRepeat.addEventListener( "blur", validateFields )
	form.addEventListener( "submit", checkValidateForm );
}
//Functions
function telUserPaste( e ) {
	let clipboardData = e.clipboardData.getData( "text" )
	var counterNumber = 0;
	for ( let char of clipboardData ) {
		if ( char >= '0' && char <= '9' ) {
			counterNumber++
		}
	}
	if ( counterNumber == clipboardData.length && clipboardData[ 0 ] == '0' && clipboardData[ 1 ] == '9' && clipboardData.length <= 11 ) {} else {
		e.preventDefault()
	}
}

function validateTelInput( e ) {
	let keyCode = e.keyCode, // or event.key for nameKey
		codeToString = String.fromCharCode( keyCode )
		, //for enable key backspace aroow
		enableKey = ( keyCode != 8 && keyCode != 37 && keyCode != 39 )
	if ( isNaN( codeToString ) && enableKey ) {
		e.preventDefault();
	}
	if ( e.target.value.length > 10 && enableKey ) {
		e.preventDefault();
	}
	if ( e.target.value == "" && codeToString != "0" && enableKey ) {
		e.preventDefault();
	}
	if ( e.target.value == "0" && codeToString != "9" && enableKey ) {
		e.preventDefault()
	}
}

function validateFields() {
	switch ( this.id ) {
		case 'tel':
			validateTell( this )
			break;
		case 'pass':
			validatePass( this )
			break;
		case 'pass-repeat':
			validatePassRepeat( this )
			break;
	}
}

function validateTell( inputElement ) {
	let lengthTelInput = telInput.value.length;
	if ( lengthTelInput == 11 && telInput.value[ 0 ] == '0' && telInput.value[ 1 ] == '9' ) {
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'شماره همراه باید با 09 شروع و 11 رقم باشد' )
	}
	submitFormBtn()
}

function validatePass( inputElement ) {
	if ( passInput.value.length >= 8 ) {
		styleForInput( inputElement, 'success', 'danger' )
		passInputRepeat.disabled = false
	} else {
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'باید رمز عبور حداقل 8 کاراکتر باشد' )
	}
	submitFormBtn()
}

function validatePassRepeat( inputElement ) {
	let passwordValue = passInput.value
		, RepeatValue = passInputRepeat.value
	if ( passwordValue == RepeatValue ) {
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'تکرار رمز عبور مطابقت ندارد' )
	}
	submitFormBtn()
}

function submitFormBtn() {
	if ( passInput.value == passInputRepeat.value && telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) && passInputRepeat.classList.contains( "success" ) ) {
		submitForm.disabled = false
	} else submitForm.disabled = true
}

function styleForInput( element, classOne, classTwo ) {
	element.classList.add( classOne )
	element.classList.remove( classTwo )
}

function showMessage( inputElement, message ) {
	let div = document.createElement( 'div' )
	div.classList.add( 'alert-danger' )
	div.innerHTML = message
	let getElement = inputElement.parentElement.nextElementSibling
	form.insertBefore( div, getElement )
	setTimeout( () => {
		div.remove()
	}, 3000 );
}

function checkValidateForm( e ) {
	e.preventDefault();
	/*
	let phoneNumber = telInput.value, //userPass مقدار داخل اینپوت تایپ پسورد رو میگیریم میریزیم داخل
		userPass = passInput.value, // چون ورودی نام که تایپ تکست هست نداشتیم من متغیر نام رو تعریف کردم و داخلش اسمم رو ریختم 
		name = 'Reza Gholami' //convert to phoneNumber only for test
	//test api signup
	farawin.testRegister( phoneNumber, userPass, name, ( response ) => {
		const success = response.code == "200";
		if ( success ){
			console.log( "result from api -> ", response );
			window.location.href = "file:///C:/Users/Reza/Desktop/Register%20&%20Login(no%20comment)/Messenger/index.html";
		}
		else console.error( "error from api -> ", response );
		alert( response.message );
	} );
	*/
	if ( ( telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) && passInputRepeat.classList.contains( "success" ) ) ) {
		showResult( 'درحال ورود به صفحه پیام رسان...', 'loaders-validate', 'loaders-unvaliate', 'goToMessenger' )
	} else {
		showResult( 'مقادیر ورودی صحیح نیست !', 'loaders-unvalidate', 'loaders-valiate' )
	}
}

function showResult( message, classOne, classTwo, goToMessenger ) {
	const spinner = document.querySelector( "#show-result .spinner" );
	spinner.style.display = "block";
	setTimeout( function() {
		spinner.style.display = "none";
		loaders.style.display = "block";
		loaders.innerHTML = message;
		loaders.classList.remove( classTwo )
		loaders.classList.add( classOne );
		setTimeout( () => {
			loaders.style.display = "none";
			resetForm();
			if ( goToMessenger ) {
				//link for my local pc if upload to host edit href
				window.location.href = "file:///C:/Users/Reza/Desktop/Register%20&%20Login(no%20comment)/Messenger/index.html";
			}
		}, 3000 );
	}, 2000 );
}

function resetForm() {
	telInput.className = ''
	passInput.className = ''
	passInputRepeat.classList = ''
	loaders.className = ''
	form.reset();
}