//can import variables & function similar signup to here if i again coding
//Variables
let telInput = document.querySelector( 'input[type="tel"]' )
	, passInput = document.querySelector( 'input[type="password"]' )
	, form = document.querySelector( "form" )
	, submitForm = document.querySelector( 'input[type="submit"]' );
const loaders = document.querySelector( "#show-result .loaders" );
//EventListeners
eventListeners();

function eventListeners() {
	document.addEventListener( "DOMContentLoaded", () => {
		submitForm.disabled = true
	} );
	telInput.addEventListener( 'paste', telUserPaste )
	telInput.addEventListener( "keydown", validateTelInput );
	telInput.addEventListener( "blur", validateFields );
	passInput.addEventListener( "blur", validateFields );
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
	let keyCode = e.keyCode
		, codeToString = String.fromCharCode( keyCode )
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
	if ( this.type === "tel" ) {
		validateTel( this );
	}
	if ( this.type === "password" ) {
		validatePassword( this );
	}
}

function validateTel( inputElement ) {
	let lengthTelInput = telInput.value.length;
	if ( lengthTelInput == 11 && telInput.value[ 0 ] == '0' && telInput.value[ 1 ] == '9' ) {
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'شماره همراه باید با 09 شروع و 11 رقم باشد' )
	}
	submitFormBtn()
}

function validatePassword( inputElement ) {
	if ( passInput.value.length >= 8 ) {
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'باید رمز عبور حداقل 8 کاراکتر باشد ' )
	}
	submitFormBtn()
}

function submitFormBtn() {
	if ( telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) ) {
		submitForm.disabled = false
	} else submitForm.disabled = true
}

function styleForInput( element, classOne, classTwo ) {
	element.classList.add( classOne )
	element.classList.remove( classTwo )
}

function checkValidateForm( e ) {
	e.preventDefault();
	/*
	let phoneNumber = telInput.value
		, //userPass مقدار داخل اینپوت تایپ پسورد رو میگیریم میریزیم داخل
		userPass = passInput.value
	//test api login
	farawin.testLogin( phoneNumber, userPass, ( response ) => {
		const success = response.code == "200";
		if ( success ){
			console.log( "result from api -> ", response );
			window.location.href = "file:///C:/Users/Reza/Desktop/Register%20&%20Login(no%20comment)/Messenger/index.html";
		}
		else console.error( "error from api -> ", response );
		alert( response.message );
	} );
	*/
	if ( ( telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) ) ) {
		showResult( 'درحال ورود به صفحه پیام رسان  ...', 'loaders-validate', 'loaders-unvaliate', 'goToMessenger' )
	} else {
		showResult( 'مقادیر ورودی صحیح نیست !', 'loaders-unvalidate', 'loaders-valiate' )
	}
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
	loaders.className = ''
	form.reset();
}