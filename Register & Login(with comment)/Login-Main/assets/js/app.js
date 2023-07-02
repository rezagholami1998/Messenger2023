//can import variables & function similar signup to here if i again coding
//Variables
// var let const
// تمامی متغیر هایی که میخوایم به صورت گلوبال تعریف کنیم و در پلاک ها هم دسترسی داشته باشم اینجا تعریف میکنیم
// یک قسمت از شی ویندو است و میشه کل سند اچ تی ام ال ما document 
//  به المنت موردنظر دسترسی پیدا کنیم که دسترسی مثل دسیترسی در سی اس اس هست با آی دی و بقیه موارد query selector هم می توان با 
// کلاس آیدی و getElementBy... می توان از روش های دیگری هم استفاده کنیم مثل 
// اسم متغیر آورده شده است و سپس وقتی تگ در سمت راست مساوی سلکت شد ریخته میشه داخل متغیر که در سمت چپ تعریف کردیم let بعد
// از کاما استفاده شده است let برای عدم تکرار 
//const & let بلاک اسکوپ هستند یعنی اگر در بلاک مقدار بگیرند فقط در داخل بلاک قابل دسترس اند
let telInput = document.querySelector( 'input[type="tel"]' )
	, passInput = document.querySelector( 'input[type="password"]' )
	, form = document.querySelector( "form" )
	, submitForm = document.querySelector( 'input[type="submit"]' );
// ثابت است و بلافاصله بعد تعریف بایدمقداردهی شود const
// داخل پرانتز یعنی المنت با کلاس  لودر که داخل پرنت با آی دی موردنظر هست
const loaders = document.querySelector( "#show-result .loaders" );
//EventListeners
// event ها همان رویداد هایی هستند که در صفحه اتفاق می افتند
// function  یکسری کد که اعمال مختلفی انجام میدهند و تا زمانی که فراخوانی نشوند مورد استفاده قرار نمیگیرند
//روصدا زدیم تا مورد استفاده قرار بگیرند eventlistener ما در اینجا تابع  
eventListeners();

function eventListeners() {
	// event listener دو مقدار میگیره یکی برای نوع رویدادی که اتفاق می افته و دومی برای کاری که قراره اتفاق بیفته هست
	//DomContentLoaded  به محض لود شدن صفحه تابع ارو ما اجرا بششه
	//ها میتوان توابع رو مختصر نوشت arrow function با استفاده از 
	document.addEventListener( "DOMContentLoaded", () => {
		// در ابتدا دکمه سابمیت فرم غیر فعال باشه
		// با استفاده از دات میتونیم به اتربیوت ها دسترسی داشته باشیم
		submitForm.disabled = true
	} );
	// e || event همان رویدادی که اتفاق افتاده 
	// برای جلوگیری از پیست غیر عدد و عدم شروع با 09 در فیلد انتخاب شده از ایونت پیست استفاده کردم و جلوی کار پیشفرض رو که پیست بود گرفتم
	// به اینپوت تایپ تل ایونت رو اضافه میکنه
	telInput.addEventListener( 'paste', telUserPaste )
	//اجرا میشود  validateTelInput به محض فشار دادن کلید روی کیبورد توسط کاربر تابع 
	telInput.addEventListener( "keydown", validateTelInput );
	//اجرا میشود validateFields وقتی فوکوس از روی اینپوت برداشته شد یا بهتر وقتی که کاربر محتوا نوشت و بیرون فیلد کلیک کرد تابع
	telInput.addEventListener( "blur", validateFields );
	passInput.addEventListener( "blur", validateFields );
	// فرم وقتی سابمیت شد تابع موردنظر صدا زده میشه
	form.addEventListener( "submit", checkValidateForm );
}
//Functions
// وقتی رویداد پیست اتفاق می افته این تابع اجرا میشه
function telUserPaste( e ) {
	//  به داده های موجود در کلیپ بورد دسترسی پیدا میکنیم e.clipboardData با استفاده از  
	// clipboardData می تونیم داده های موجود در کلیپ بورد رو که فرمت تکست دارن بخونیم و بریزیم داخل متغیر .getData("text") با استفاده از
	let clipboardData = e.clipboardData.getData( "text" )
	//ابتدا مقدار کانتر رو صفر میزارم بعد در حلقه اضافه میشه صبق شرط
	// و هر دفعه که تابع اجرا میشه ابتدا باید صفر باشد تا با مقدار قبلی جمع نشود
	//var استفاده کردم تا در همه جا به مقدار آن دسترسی داشته باشم
	var counterNumber = 0;
	// ایجاد کردم تا روی استرینگی کلیپ بورد  دیتا پیمایش کنیم  for of حلقه 
	// char  تک تک کاراکتر های کلیپ بورد دیتا
	for ( let char of clipboardData ) {
		// شرط چک میکنه  اگر هرکدوم از کاراکتر های کلیپبورد دیتا عدد بود به کانتر کا یک عدد اضافه میکنه
		if ( char >= '0' && char <= '9' ) {
			//همان counterNumber = counterNumber +1
			counterNumber++
		}
	}
	// (شرط زیر چک میکنه اگر طول کلیپبورد دیتا برابر باشه با کانتر ما(یعنی کل دیتای کلیپ بورد عدد بود
	//و اولین  کاراکتر کلیپبورد دیتا 0 و دومی 9 بود و طول کمتر مساوی 11 بود پیست بشه
	// رو برابر 11 گذاشت تا فقط 11 رقم پیست بشه clipboardData.length می توان گفت 
	if ( counterNumber == clipboardData.length && clipboardData[ 0 ] == '0' && clipboardData[ 1 ] == '9' && clipboardData.length <= 11 ) {} else {
		// جلوگیری میکنه paste اگر شرط بالا برقرار نبود از کار پیشفرض که 
		e.preventDefault()
	}
}
// هر بار که کاربر در اینپوت تل چیزی تابپ کند این تابع فراخوانی میشود
function validateTelInput( e ) {
	// هر کلید رو صفحه کلید داری کد منحصر به فرد است که ما ایونت رخ داده رو مثلا کلید 0 ، با دات کی کد بهش دسترسی پیدا میکنیم
	let keyCode = e.keyCode, // or event.key for nameKey
		// میتوان یونیکد رو به کاراکتر تبدیل کرد String.fromCharCode( keyCode ) با استفاده از 
		//  بدیل اینکه در چند جا استفاده شده و کد ها زیاد میشود codeToString ما تبدیل که کردیم میریزیم توی 
		codeToString = String.fromCharCode( keyCode ), //رو میریزه false  در غیر اینصورت  arrow میریزه داخل  true کلید های ارو سمت چپ و راست اگر فشار داده نشده بود مقدار 
		//backspaseKey = (keyCode != 8)
		// arrowKey = ( keyCode != 37 && keyCode != 39 )
		enableKey = ( keyCode != 8 && keyCode != 37 && keyCode != 39 )
	// میتوان شرط گذاشت if با استفاده از 
	// در اینجا گفته شده اگر کلید حذف فشار داده نشده بود و کلید فشارداده شده عدد نبود و ارو های چپ و راست نبود برو داخل بلاک
	if ( isNaN( codeToString ) && enableKey ) {
		// جلوی کار پیشفرض که نوشتن هست رو بگیر
		e.preventDefault();
	}
	// e.target المنت
	// e.target.value مقدار داخل اینپوت 
	// e,target.value.length طول ورودی یا تعداد رقم وارد شده
	// این شرط چک میکنه اگر کلید حذف فشار داده نشده بود و تعداد شماره تلفن وارد شده بیشتر از 11 بود و کلید های چپ و راست فشار داده نشده بود برو داخل بلاک
	if ( e.target.value.length > 10 && enableKey ) {
		// جلوی کار پیشفرض که نوشتن هست رو بگیر
		e.preventDefault();
	}
	// چک میکنه اگر کلید حذف فشار داده نشده بود و هیچی هنز وارد نشده بود و 0 وارد نشده بود  و کلید های سمت چپ و راست فشار داده نشده بود برو داخل بلاک
	// یعنی رقم اول فقط میتونه 0 باشه
	if ( e.target.value == "" && codeToString != "0" && enableKey ) {
		// جلوی کار پیشفرض که نوشتن هست رو بگیر
		e.preventDefault();
	}
	// مثل بالایی ولی چک میکنه اگر رقم اولش صفر بود رقم دومی باید 9 وارد شود
	if ( e.target.value == "0" && codeToString != "9" && enableKey ) {
		// جلوی کار پیشفرض که نوشتن هست رو بگیر
		e.preventDefault()
	}
}
// برای آن اجرا شد این تابع رو صدا میزنه blur برای اینپوت های تل و پسورد  هرکدوم ایونت 
function validateFields() {
	// this همان تگی است که داخلش چیزی تایپ میشده و بعد بلر شده
	//چک میکنه اگر تایپ المنت تل بود بره داخل بلاک
	if ( this.type === "tel" ) {
		//تابع رو به مقداری که بهش دادیم صدا میزنیم تا اجرا بشه
		validateTel( this );
	}
	//اگر تایپ المنت ما پسورد بود وارد بلاک میشه و تابع رو صدامیزنه برای اجرا
	if ( this.type === "password" ) {
		validatePassword( this );
	}
}

function validateTel( inputElement ) {
	// یک متغیر تعریف کردیم که داخل آن طول ورودی فیلد موبایل رو میریزیم
	let lengthTelInput = telInput.value.length;
	// چک میکنه اگر طولی موبایل 11 بود و ورودی اول کاربر 0 و دومی 9 بود برو داخل بلاک
	if ( lengthTelInput == 11 && telInput.value[ 0 ] == '0' && telInput.value[ 1 ] == '9' ) {
		// وقتی شرط درسته تابع زیر رو صدا میزنه و مقادیر داخل پرانتز رو به تابع میفرسته
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		// در غیر اینصورت این بلاک اجرا میشود و توابع زیر با مقدارهایی که بهش ارسال میشود صدا زده میشود
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'شماره همراه باید با 09 شروع و 11 رقم باشد' )
	}
	// در نهایت این تابع صدا زده میشه 
	submitFormBtn()
}
//class بهش دسترسی پیدا کردیم هر نامی میتوان گذاشت بغیر از کلمات کلیدی مثل  inputElement فرستاده شده به تابع رو در اینجا با نام  this
function validatePassword( inputElement ) {
	// چک میکنه که رمز عبور باید حداقل 8 کاراکتر باشد
	if ( passInput.value.length >= 8 ) {
		// وقتی شرط درسته تابع زیر رو صدا میزنه و مقادیر داخل پرانتز رو به تابع میفرسته
		styleForInput( inputElement, 'success', 'danger' )
	} else {
		// در غیر اینصورت این بلاک اجرا میشود و توابع زیر با مقدارهایی که بهش ارسال میشود صدا زده میشود
		styleForInput( inputElement, 'danger', 'success' )
		showMessage( inputElement, 'باید رمز عبور حداقل 8 کاراکتر باشد ' )
	}
	// در نهایت این تابع صدا زده میشه 
	submitFormBtn()
}

function submitFormBtn() {
	//element.classList.contains() چک میکنه اگر المنت شامل کلاس داخل پرانتز بود درست و در غیر اینصورت غلط رو برمیگردونه
	// اگر تل و پسورد داری کلاس ساکسس بودند دکمه سابمیت رو فعال کن
	if ( telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) ) {
		submitForm.disabled = false
	}
	//درغیر اینصورت دکمه غیرفعالل بشه
	else submitForm.disabled = true
}

function styleForInput( element, classOne, classTwo ) {
	//المنت ما همون تگ 
	//به کلاس های المنت کلاس رو اضافه میکنه اونی که اولین کلاسش دنجر باشه اون اضافه و کلاس ساکسس حذف میشه و عکس این هم برقراره
	element.classList.add( classOne )
	element.classList.remove( classTwo )
}
// این تابع دو آرگومنت داره یکی خود المنت یکی پیامی که بهش دادیم
function showMessage( inputElement, message ) {
	// یک متغیر به نام دیو تعریف کردیم که یک تگ دیو ایجاد کردیم و داخلش ریختیم
	let div = document.createElement( 'div' )
	// به دیو ایجاد شده کلاس مورد نظر رو اضافه میکنه
	// استایل های این کلاس در سی اس اس تعریف شده است
	div.classList.add( 'alert-danger' )
	// داخل این تگ ایجاد شده پیام رو قرار میده که به عنوان ورودی گرفته
	div.innerHTML = message
	// برای اینکه بخواهیم پیغام رو بعد فیلد موردنظر نمایش بدیم از دایو چرنت اومدم بیرون و المنت بعدیش رو سلکت کردم
	let getElement = inputElement.parentElement.nextElementSibling
	// فرم ما پرنت هست که ما میایم و دیو ایجاد شده رو قبل المنت چاید فرم درج میکنیم
	form.insertBefore( div, getElement )
	// تابع زیر برای این است که بعد از گذشت زمانی که بر حسب میلی ثانیه بهش دادیم کد های داخلش رو اجرا میکنه
	setTimeout( () => {
		//بعد 3 ثانیه دیو ایجاد شده رو حذف میکنه
		div.remove()
	}, 3000 );
}
// این تابع به محض سابمیت شدن دکمه فرم اجرا میشود
function checkValidateForm( e ) {
	e.preventDefault();
	/*
	// phoneNumber مقذار داخل اینپوت تایپ تل رو میگیریم میریزیم داخل 
	let phoneNumber = telInput.value
		, //userPass مقدار داخل اینپوت تایپ پسورد رو میگیریم میریزیم داخل
		userPass = passInput.value
	//test api login
	farawin.testLogin( phoneNumber, userPass, ( response ) => {
		const success = response.code == "200";
		if ( success ){
			console.log( "result from api -> ", response );
			window.location.href = "file:///C:/Users/Reza/Desktop/Register%20&%20Login/Messenger/index.html";
		}
		else console.error( "error from api -> ", response );
		alert( response.message );
	} );
	*/
	// element.claaList.contains() یعنی المنت مورد نظر کلاس داخل پرانتز رو داره یا نه
	// چک میکنه اگر 2تا اینپوتی که مقدار وارد کردیم داخلش کلاس ساکسس رو داشت، بره داخل بلاک
	if ( ( telInput.classList.contains( "success" ) && passInput.classList.contains( "success" ) ) ) {
		//تابع رو صدا میزنه و این مقادیر رو میفرسته
		showResult( 'درحال ورود به صفحه پیام رسان  ...', 'loaders-validate', 'loaders-unvaliate', 'goToMessenger' )
	} else {
		//در غیر اینصورت تابع رو با مقادیر زیر ارسال میکنه
		showResult( 'مقادیر ورودی صحیح نیست !', 'loaders-unvalidate', 'loaders-valiate' )
	}
}
// برای نمایش لودر و نمایش نتیجه از این تابع استفاده میکنیم
function showResult( message, classOne, classTwo, goToMessenger ) {
	// هست دسترسی پیدا میکنیم display:none به اسپینر که پیشفرض 
	// const به خاطر اینکه مقدارش قرار نیست تغییر کنه
	const spinner = document.querySelector( "#show-result .spinner" );
	//وقتی تابع صدا زده شود اسپینر نمایش داده میشود
	// آن را به بلاک تبدیل میکنیم تا نمایشش داده شود display 
	spinner.style.display = "block";
	setTimeout( function() {
		// بعد از 2 ثانیه اسپینر حذف می شود
		spinner.style.display = "none";
		// دیو لودر که محتوایی نداشته از قبل نمایش میدهیم
		loaders.style.display = "block";
		// پیغام مورد نظر رو که گرفتیم داخل دیو قرار میدهیم
		loaders.innerHTML = message;
		// کلاس حذف میشه
		loaders.classList.remove( classTwo )
		//کلاس اضافه میشود
		loaders.classList.add( classOne );
		//ببعد تمام شدن 2 ثانیه وارد تابع زیر میشویم 
		setTimeout( () => {
			//میکنیم و نمایش نمیدهیم display:none باکسی که حاوی پیغام بود رو 
			loaders.style.display = "none";
			// تابع ریست فرم رو صدا میزنیم تا اجرا بشه
			resetForm();
			//داشتیم میره به لینک در غیراینصورت اتفاقی نمی افتد و باید ارور هارو برطرف کنیم goToMessenger اگر ورودی 
			if ( goToMessenger ) {
				//link for my local pc if upload to host edit href
				//وقتی روی هاست بزاریم لینک ها ادیت میشوند
				//در اینجا طبق آدرس فایل ها  در لب تاب خودم هست
				window.location.href = "file:///C:/Users/Reza/Desktop/Register%20&%20Login/Messenger/index.html";
			}
		}, 3000 );
	}, 2000 );
}

function resetForm() {
	// کلاس های اینپوت تل رو حذف میکنیم تا سایه داخلی بعد ریست فرم نمایش داده نشود
	telInput.className = ''
	// کلاس های اینپوت پسورد رو حذف میکنیم تا سایه داخلی بعد ریست فرم نمایش داده نشود
	passInput.className = ''
	loaders.className = ''
	// فرم رو ریست میکنیم و اطلاعات داخلش رو پاک و رفرش میکنیم
	form.reset();
}