const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login-form input')

function onLoginSubmit(event){
    event.preventDefault(); 
    const username = loginInput.value;
    loginForm.classList.add("hidden");
    console.log(username);
}

loginForm.addEventListener("submit", onLoginSubmit);



// ⭐중요⭐
// addEventlistener 안의 함수는 직접 실행하지 않는다.
// 제로초님 강의를 생각해보면 괄호로 바로 실행하면 안에 리턴값으로 대체된다 => 여기서 ()를 달아서 바로 실행해주면 이벤트리스너 함수는 이벤트 정보 파라미터를 받아올수 없음, handleLinkClick의 파라미터를 받아와야함!

// form을 submit하면 브라우저는 기본적으로 페이지를 새로고침 하도록 되어있다. << 우리가 원하는 것이 아님!
// preventDefault() 함수를 추가함으로써 브라우저의 기본 동작을 막을 수 있다!!
// event object는 방금 실행된 이벤트 정보이고, preventDefault함수를 기본적으로 갖고 있음

// submit 이벤트가 발생한다면, onLoginSubmit 함수를 호출
// JS는 onLoginSubmit 함수 호출시 event object를 argument로 받아서 호출!
// 바로 실행하고 싶지 않아서 () 안달아줌, submit이 되면 함수를 실행

// preventDefault 함수는 EventListener 함수의 '첫 번째 argument' 안에 있는 함수이다. 첫 arument는 지금 막 벌어진 event들에 대한 정보를 갖고 있다.
// JS는(기본적으로)argument를 담아서 함수를 호출하는데, 이 argument가 기본 정보들을 제공하고 있다. ex) 누가 submit주체인지, 몇 시에 submit을 했는지 등등 콘솔에 출력해보면 알 수 있음
