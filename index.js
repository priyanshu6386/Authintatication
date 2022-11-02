const USER_DB = [];
const encryptionRule = {
	'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
	'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
	'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
	'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
	'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
	'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
	'Y': 'L', 'Z': 'M',
	'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
	'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
	'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
	'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
	'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
	'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
	'y': 'l', 'z': 'm',
	'0': '5', '1': '6', '2': '7', '3': '8',
	'4': '9', '5': '0', '6': '1', '7': '2',
	'8': '3', '9': '4',
	'!': '#', '$': '%', '&': '+', '-': '@',
	'_': '~', '#': '!', '%': '$', '+': '&',
	'@': '-', '~': '_'
}

const encrypt = (inputString)=>{
  let encryptString = '';
  for(char of inputString){
    encryptString = encryptString + encryptionRule[char];
  }
  return encryptString;
}

const decrypt = (encryptString)=>{
  let originalString = '';
  let keys = Object.keys(encryptionRule);
  let values = Object.values(encryptionRule);
  for(char of encryptString){
    let requiredIndex = values.indexOf(char);
    originalString = originalString + keys[requiredIndex];
  }
  // console.log(originalString)
  return originalString;
}


//form validation
const signUp = () => {
  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phone-number").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById('confirm-password').value;
  let iVC= document.getElementById('i-v-c').checked;
  let encryptedPassword = encrypt(password);
  let error = false;
  
   //first name condition
   if (firstName.length >= 2) {
    document.getElementById("first-name-valid").style.display = "block";
    document.getElementById("first-name-invalid").style.display = "none";
  } else {
    document.getElementById("first-name-invalid").style.display = "block";
    document.getElementById("first-name-valid").style.display = "none";
    error = true;
  }

  //last name condition
  if (lastName.length >= 2) {
    document.getElementById("last-name-valid").style.display = "block";
    document.getElementById("last-name-invalid").style.display = "none";
  } else {
    document.getElementById("last-name-invalid").style.display = "block";
    document.getElementById("last-name-valid").style.display = "none";
    error = true;
  }
  //email validation
  if (
    email.includes("@") &&
    email.includes(".") &&
    email.indexOf("@") >= 1 &&
    email.lastIndexOf(".") < email.length - 2
  ) 
  {
    document.getElementById("valid-email").style.display = "block";
    document.getElementById("invalid-email").style.display = "none";
  } 
  else {
    document.getElementById("invalid-email").style.display = "block";
    document.getElementById("valid-email").style.display = "none";
    error = true;
  }

  //phone number validaiton
  if (phoneNumber.length==10) {
    document.getElementById("phone-valid").style.display = "block";
    document.getElementById("phone-invalid").style.display = "none";
  } else {
    document.getElementById("phone-invalid").style.display = "block";
    document.getElementById("phone-valid").style.display = "none";
    error = true;
  }
  //password validation
  if (password.length>0) {
    document.getElementById("password-valid").style.display = "block";
    document.getElementById("password-invalid").style.display = "none";
  } else {
    document.getElementById("password-invalid").style.display = "block";
    document.getElementById("password-valid").style.display = "none";
    error = true;
  }
  //confirm password validation
  if (confirmPassword.length>0) {
    document.getElementById("confirm-password-valid").style.display = "block";
    document.getElementById("confirm-password-invalid").style.display = "none";
  } else {
    document.getElementById("confirm-password-invalid").style.display = "block";
    document.getElementById("confirm-password-valid").style.display = "none";
    error = true;
  }

  //terms and conditons validation
  if(iVC){
    document.getElementById("ivc-invalid").style.display = "none";
  }
  else{
    document.getElementById("ivc-invalid").style.display = "block";
    error = true;
  }

  if(!error){
    let resetForm = document.getElementById("sign-up-form");
    resetForm.reset();
    swal("Saved!", "Your Details has been saved!", "success");
    let userDetails = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: encryptedPassword 
    };
    USER_DB.push(userDetails);
    console.log(USER_DB);
    changeLinks(userDetails);

    //validation to remove red green classes after submitting the form
    let validFeedback = document.getElementsByClassName('valid-feedback')
    for(i=0; i<validFeedback.length; i++){
      validFeedback[i].style.display = 'none'
    }
    let invalidFeedback = document.getElementsByClassName('invalid-feedback')
    for(i=0; i<invalidFeedback.length; i++){
      invalidFeedback[i].style.display = 'none'
    }
  }
  
};

const signIn = () => {
  document.getElementById("signInMenu").innerText = "Sign In";
  document.getElementById("signUpMenu").innerText = "Sign Up";
  let enteredEmail = document.getElementById("sign-in-email").value;
  let enteredPassword = document.getElementById("sign-in-password").value;

  

  let requireUser = USER_DB.find(
    (user) => user.email == enteredEmail && decrypt(user.password) == enteredPassword
  );


  if (requireUser) {
    swal("Access!", "Your Details are correct!", "success");
    changeLinks(requireUser);
  } else {
    swal("Oops!", "Your Details are not correct!", "error");
  }
  document.getElementById("sign-in-form").reset();
};

//validation for displaying diffrent sections
let gotoSignup = () => {
  document.querySelector("#home-page").style.display = "none";
  document.getElementById("sign-up").style.display = "block";
  document.getElementById("sign-in").style.display = "none";
};
let gotoHome = () => {
  document.getElementById("home-page").style.display = "block";
  document.getElementById("sign-up").style.display = "none";
  document.getElementById("sign-in").style.display = "none";
};
let gotoSignIn = () => {
  document.getElementById("sign-in").style.display = "block";
  document.getElementById("home-page").style.display = "none";
  document.getElementById("sign-up").style.display = "none";
};

let changeLinks = (currentuser) => {
  let firstName = currentuser.firstName;
  let lastName = currentuser.lastName;
  document.getElementById("signUpMenu").style.display = "none";
  document.getElementById("signInMenu").style.display = "none";
  document.getElementById("profileMenu").style.display = "block";
  document.getElementById("signOutMenu").style.display = "block";

  document.getElementById(
    "profileMenu"
  ).innerText = `Hi! ${firstName} ${lastName}`;
};

const signOut = () => {
  document.getElementById("profileMenu").innerText = "";
  document.getElementById("signUpMenu").style.display = "block";
  document.getElementById("signInMenu").style.display = "block";
  document.getElementById("profileMenu").style.display = "none";
  document.getElementById("signOutMenu").style.display = "none";
};
