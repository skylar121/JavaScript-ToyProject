const userTask = document.querySelector('.artcl_main input');
const addBtn = document.querySelector('.artcl_main button');
const listTodo = document.querySelector('.list_todo');
const main = document.querySelector('.artcl_main');

// 다운로드 버튼 생성
const downloadBtn = document.createElement('button');
downloadBtn.classList.add('btn');
downloadBtn.textContent = '리스트 다운로드';
document.body.append(downloadBtn);
downloadBtn.addEventListener('click', downloadFile);

addBtn.addEventListener('click', createListItem);

// 빈배열이 아니라면 할일 목록을 js 객체로 변환
const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];

// 할일 목록을 localStorage에 저장하는 함수
function saveTasks() {
    localStorage.setItem('tasklist', JSON.stringify(tasks))
}

// 로컬 스토리지에 저장된 데이터를 기반으로 화면에 li목록 보여주기
if (tasks) {
    tasks.forEach((task) => {
        genItem(task.val, task.checked);
    });
    showDownload();
}

function createListItem() {
    const val = userTask.value;

    if(val) {
        // myObj 객체를 생성합니다.
        const myObj = {
            val: genItem(val, false),
            checked: false
        }

        // myObj 객체를 할 일 배열에 저장합니다.
        tasks.push(myObj);

        // 할일 데이터를 localStorage에 저장하는 함수
        saveTasks();

        // 다운로드 버튼 노출 판단 함수
        showDownload();
    } else {
        errorMsg('내용을 작성해 주세요!')
    }
}

// 리스트 아이템을 생성하는 함수
function genItem(val, complete) {
    const li = document.createElement('li');
    li.textContent = val;
    listTodo.append(li);

    // input 초기화
    userTask.value = '';

    // 만약 수행한 일이라면
    if(complete) {
        li.classList.add('done');
    }

    li.addEventListener('click', () =>{
        li.classList.toggle('done');

        // 할일 목록 데이터를 업데이트 하는 함수
        buildTasks();
    })

    // 삭제 버튼 만들기
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.append(btn);
    btn.addEventListener('click', () => {
        li.remove();
        showDownload();
        buildTasks();
    })

    return val;
}

// 할일 목록 데이터를 업데이트 하는 함수
function buildTasks() {
    // task 목록의 정보를 업데이트 하기 위해서 기존 데이터를 초기화
    tasks.length = 0; // 배열을 초기화하는 쉬운 방법
    const currList = listTodo.querySelectorAll('li');
    currList.forEach((el) => {
        const tempTask = {
            val: el.textContent,
            checked: false
        };

        // done 클래스가 있는지 확인하고 있다면 checked 정보를 변경
        if(el.classList.contains('done')) {
            tempTask.checked = true;
        }
        tasks.push(tempTask);
    })

    // 업데이트된 배열을 localStorage에 저장
    saveTasks();
}

function showDownload() {
    const currList = listTodo.querySelectorAll('li');
    if (currList.length > 0) {
        downloadBtn.style.display = 'block';
    } else {
        downloadBtn.style.display = 'none';
    }
}

// 경고 메시지 생성
const message = document.createElement('strong');
message.style.display = 'none';
message.style.color = 'red';
main.append(message);
userTask.addEventListener('input', () => {
    message.style.display = 'none';
})

function errorMsg(msg) {
    message.style.display = 'block';
    message.textContent = msg;
    userTask.focus();
}

//할일 목록을 다운로드 합니다.
function downloadFile() {
    // 다운로드 받을 텍스트를 생성합니다.
    let temp = '<나의 할일 목록>\n\n';

    const curList = listTodo.querySelectorAll('li');
    curList.forEach((el) => {
        // 완료한 한 일 앞에는 '완료-' 라는 텍스트를 붙이겠습니다.
        if (el.classList.contains('done')) {
            temp += '완료-';
        }
        temp += `${el.textContent}\n`;
    })
    let element = document.createElement('a');

    // data URI scheme 을 이용해서 데이터를 a안에 임베드시킵니다.
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + temp);
    // data:text 라고 해줘서 .txt로 다운확장자 지정되는 것
    element.setAttribute('download', 'todoList');
    // element.setAttribute('download', 'todoList.docs'); // 확장자 지정가능
    element.click();
    element = null;
}