const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//находим обЬекты
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');



let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос
let points = 0 // кол-во баллов

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function  clearPage(){
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion(){
  // вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
  headerContainer.innerHTML = title;

  // варианты ответов
  let answerNumber = 1;
for (answerText of questions[questionIndex]['answers']) {
  const questionTemplate = `<li>
				<label>
					<input  value ="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

  // let answerHTML = questionTemplate.replace('%answer%', answerText)

  //  answerHTML = answerHTML.replace('%number%', answerNumber);

   const answerHTML = questionTemplate
   .replace('%answer%', answerText)
   .replace('%number%', answerNumber)
  
  listContainer.innerHTML += answerHTML;
  answerNumber++;
}
}

function checkAnswer(){
  // находим выбранную кнопку
  const checkedRadio = listContainer.querySelector('input:checked')

  // если ответ не выбран - выходим из функции
if (!checkedRadio) {
  submitBtn.blur();
  return
}

const userAnswer = parseInt(checkedRadio.value)
// узнаем номер ответа
// если ответил верно - увеличиваем счет

if (userAnswer === questions[questionIndex]['correct']) {
  score++;
  points+=2;
}

if (questionIndex !== questions.length -1) {
  questionIndex++;
  clearPage();
  showQuestion();
} else {
  clearPage();
  showResults();
}
}

function showResults() {
  const resultTemplate =
      `<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>`;

      let title, message; 
      if 
    (score === questions.length) {
      title = 'Поздравляем!';
      message = 'Вы ответили верно на все вопросы!';
    } else if ((score * 100) / questions.length >= 50) {
      title = 'Неплохой результат!' ;
      message = 'Вы дали более половины правильных ответов';
    } else {
      title = 'стоит постараться';
      message = 'Пока у вас меньше половины правильных ответов'
    }




    let result = `${score} из ${questions.length} 
    вопросов!   Вы получили баллов : ${points} `;

    const finalMessage = resultTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%result%', result)


    headerContainer.innerHTML = finalMessage;

    submitBtn.blur();
    submitBtn.innerHTML = 'Начать заново';
    submitBtn.onclick = () => {
      history.go();
}

}