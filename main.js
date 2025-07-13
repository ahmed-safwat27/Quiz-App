const questions = [
  { question: "ما الرقم التالي في النمط: 3، 6، 11، 18، 27، ؟", answer: "38" },
  { question: "ما الحرف التالي: A, C, F, J, O, ؟", answer: "u" },
  { question: "ما هو المختلف: مكعب، كرة، هرم، دائرة؟", answer: "دائرة" },
  { question: "أوجد الرقم المفقود: 1، 4، 9، 16، ؟، 36", answer: "25" },
  {
    question:
      "إذا كانت بعض الأقلام أقلام رصاص وبعض أقلام الرصاص أقلام تحديد، فهل كل الأقلام أقلام تحديد؟",
    answer: "لا",
  },
  { question: "ما الرقم التالي: 2، 4، 8، 32، 256، ؟", answer: "8192" },
  {
    question: "أعد ترتيب الحروف: 'WATERFLOW' لتكوين كلمة واحدة.",
    answer: "waterflow",
  },
  { question: "ما الحرف التالي: Z, X, V, T, R, ؟", answer: "p" },
  {
    question:
      "إذا كانت كل الزورنز هي جينكس، وكل الجينكس هي بوبلز، فهل كل الزورنز بوبلز؟",
    answer: "نعم",
  },
  { question: "ما الرقم المناسب: 5 → 25، 6 → 36، 7 → ؟", answer: "49" },
  { question: "ما الرقم التالي: 1، 1، 2، 3، 5، 8، ؟", answer: "13" },
  {
    question: "إذا ضربتني في 4 وطرحت 6، تحصل على 18. ما الرقم أنا؟",
    answer: "6",
  },
  { question: "ما الحرف التالي: D, E, G, J, N, ؟", answer: "s" },
  { question: "ما الرقم المفقود: 81، 27، 9، ؟، 1", answer: "3" },
  { question: "ما هو انعكاس الساعة 12:15 في المرآة؟", answer: "11:45" },
  {
    question: "إذا استغرق شخصان ساعتين لطلاء حائط، فكم يحتاج 4 أشخاص؟",
    answer: "1",
  },
  { question: "اختر المختلف: مثلث، مربع، مستطيل، دائرة", answer: "دائرة" },
  {
    question: "إذا كان 2 = 6، و3 = 12، و4 = 20، و5 = 30، فكم يكون 6؟",
    answer: "42",
  },
  {
    question: "إذا كان جاك أطول من توم، وتوم أطول من هاري، فمن الأقصر؟",
    answer: "هاري",
  },
  { question: "ما الرقم الذي يكمل النمط: 10، 9، 7، 4، 0، ؟", answer: "-5" },
];

let currentQuestion = parseInt(localStorage.getItem("currentQuestion")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;
let timeLeft = parseInt(localStorage.getItem("remainingTime")) || 70;
let timer;

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

const timerDiv = document.createElement("div");
timerDiv.id = "timer";
timerDiv.style.textAlign = "center";
timerDiv.style.fontSize = "20px";
document.getElementById("quizContainer").insertBefore(timerDiv, resultDiv);

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showFinalResult();
    return;
  }

  const q = questions[currentQuestion];
  questionText.textContent = `السؤال ${currentQuestion + 1}: ${q.question}`;
  answerInput.value = "";
  resultDiv.textContent = "";
  startTimer();
}

function startTimer() {
  timerDiv.textContent = `⏱️ الوقت المتبقي: ${timeLeft} ثانية`;

  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `⏱️ الوقت المتبقي: ${timeLeft} ثانية`;
    localStorage.setItem("remainingTime", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      resultDiv.textContent = "⛔ انتهى الوقت!";
      score--;
      localStorage.setItem("score", score);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(timer);
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestion].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    resultDiv.textContent = "✅ إجابة صحيحة!";
    score++;
  } else {
    resultDiv.textContent = `❌ إجابة خاطئة! الإجابة الصحيحة: ${correctAnswer}`;
    score--;
  }

  localStorage.setItem("score", score);
  nextQuestion();
}

function nextQuestion() {
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showFinalResult();
      return;
    }
    localStorage.setItem("currentQuestion", currentQuestion);
    timeLeft = 70;
    localStorage.setItem("remainingTime", timeLeft);
    showQuestion();
  }, 2000);
}

function showFinalResult() {
  localStorage.clear();
  questionText.textContent = "";
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  timerDiv.style.display = "none";
  resultDiv.innerHTML = `🎯 نتيجتك النهائية: <strong>${score}</strong> من أصل ${questions.length}`;
}

submitBtn.addEventListener("click", checkAnswer);
showQuestion();
