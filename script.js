const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const start=document.getElementById('start');
const submitButton = document.getElementById('submitButton');
const middle=document.getElementById('middle');
const timerElement = document.getElementById('timer');
const retrybtn = document.getElementById('retry');
const backbtn = document.getElementById('back');
let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let timer;
retrybtn.style.display='none';
backbtn.style.display='none';
document.getElementById('question-card').style.display='none';

start.addEventListener('click',()=>{
            middle.style.display="none";
            document.getElementById('question-card').style.display='';
})

async function fetchQuizData() {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
                const data = await response.json();
                questions = data.results;
                displayQuestion();
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
}

function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionElement.textContent = question.question;
            
            optionsElement.innerHTML = '';
            question.incorrect_answers.forEach(option => {
            optionsElement.innerHTML += `<div class="option">${option}</div>`;
            });
            optionsElement.innerHTML += `<div class="option">${question.correct_answer}</div>`;
            
            startTimer();
  } else {
            nextButton.style.display='none';
            submitButton.style.display='none';
            retrybtn.style.display='';
            backbtn.style.display=''; 
            questionElement.textContent = `Quiz Completed! Your Score: ${score} / ${questions.length}`;
            optionsElement.innerHTML = '';
            clearInterval(timer);
  }
}

function startTimer() {
            let timeLeft = 10;
            timer = setInterval(() => {
                timerElement.textContent = timeLeft;
                timeLeft--;
                if (timeLeft < 0) {
                clearInterval(timer);
                currentQuestionIndex++;
                displayQuestion();
                }
            }, 1000);
}

optionsElement.addEventListener('click', event => {
            const selectedOption = event.target.textContent;
            const correctAnswer = questions[currentQuestionIndex].correct_answer;

            if (selectedOption === correctAnswer) {
                score++;
            }

            clearInterval(timer);
            currentQuestionIndex++;
            displayQuestion();
});

nextButton.addEventListener('click', () => {
            clearInterval(timer);
            currentQuestionIndex++;
            displayQuestion();
});

retrybtn.addEventListener('click', () => {
            retrybtn.style.display='none';
            backbtn.style.display='none';
            nextButton.style.display='';
            submitButton.style.display=''; 
            currentQuestionIndex = 0;
            questions = [];
            score = 0;
            fetchQuizData();
});

backbtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            questions = [];
            score = 0;
            middle.style.display="";
            document.getElementById('question-card').style.display='none';
});

submitButton.addEventListener('click', () => {
            clearInterval(timer);
            nextButton.style.display='none';
            submitButton.style.display='none';
            retrybtn.style.display='';
            backbtn.style.display='';   
            questionElement.textContent = `Quiz Completed! Your Score: ${score} / ${questions.length}`;
            optionsElement.innerHTML = '';
});

fetchQuizData();
