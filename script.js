let questions = [];
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let currentDifficulty = "easy";
let performanceHistory = [];
let timeLeft = 30;
let timer;

// Question Bank
const questionBank = {
    java: [
        {
            question: "Which keyword is used to create a class in Java?",
            options: ["class", "create", "new", "Class"],
            answer: "class"
        },

        {
            question: "Which method is the starting point of a Java program?",
            options: ["start()", "main()", "run()", "begin()"],
            answer: "main()"
        },

        {
            question: "Which language is Java based on?",
            options: ["C/C++", "Python", "JavaScript", "HTML"],
            answer: "C/C++"
        },

        {
            question: "Which keyword is used for inheritance in Java?",
            options: ["inherits", "extends", "implements", "inherit"],
            answer: "extends"
        },

        {
            question: "Which symbol is used to end a statement in Java?",
            options: [".", ":", ";", ","],
            answer: ";"
        },
        {
            question: "Which data type is used to store whole numbers?",
            options: ["float", "char", "int", "boolean"],
            answer: "int"
        },
        {
            question: "Which keyword is used to create an object?",
            options: ["object", "new", "create", "this"],
            answer: "new"
        },
        {
            question: "Which concept allows the same method name with different parameters?",
            options: ["Inheritance", "Encapsulation", "Overloading", "Abstraction"],
            answer: "Overloading"
        }
    ],

    python: [
        {
            question: "Which symbol is used for comments in Python?",
            options: ["//", "#", "/*", "--"],
            answer: "#"
        },
        {
            question: "Which function is used to display output?",
            options: ["display()", "show()", "print()", "output()"],
            answer: "print()"
        },
        {
            question: "Which keyword is used to define a function?",
            options: ["function", "def", "fun", "define"],
            answer: "def"
        },
        {
            question: "Which data type stores True or False?",
            options: ["int", "string", "boolean", "float"],
            answer: "boolean"
        },
        {
            question: "Which brackets are used for a list?",
            options: ["()", "{}", "[]", "<>"],
            answer: "[]"
        }
    ],

    dsa: [
        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: "Queue"
        },
        {
            question: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Array", "Tree"],
            answer: "Stack"
        },
        {
            question: "Which data structure uses nodes and links?",
            options: ["Linked List", "Array", "Stack", "Queue"],
            answer: "Linked List"
        },
        {
            question: "What is the root node in a tree?",
            options: ["Last node", "Middle node", "Top node", "Leaf node"],
            answer: "Top node"
        },
        {
            question: "Which structure is used in BFS?",
            options: ["Stack", "Queue", "Array", "Heap"],
            answer: "Queue"
        }
    ],

    ai: [
        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automatic Information",
                "Advanced Internet",
                "Artificial Internet"
            ],
            answer: "Artificial Intelligence"
        },
        {
            question: "Which is an example of AI?",
            options: [
                "Calculator",
                "Voice Assistant",
                "Simple Bulb",
                "Keyboard"
            ],
            answer: "Voice Assistant"
        },
        {
            question: "What does ML stand for?",
            options: [
                "Machine Learning",
                "Machine Language",
                "Modern Learning",
                "Model Logic"
            ],
            answer: "Machine Learning"
        },
        {
            question: "Which is commonly used in Machine Learning?",
            options: [
                "Training Data",
                "Printer",
                "Keyboard",
                "Monitor"
            ],
            answer: "Training Data"
        },
        {
            question: "Which technology helps computers understand human language?",
            options: [
                "NLP",
                "CPU",
                "RAM",
                "USB"
            ],
            answer: "NLP"
        }
    ]
};


function startQuiz() {

fetch("http://localhost:8080/api/hello")
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log("Backend Error:", error));

    const subject = document.getElementById("subject").value;
    const difficulty = document.getElementById("difficulty").value;
    const number = parseInt(document.getElementById("question-count").value);

    questions = [...questionBank[subject]];

    // Shuffle questions
    questions.sort(() => Math.random() - 0.5);

    questions = questions.slice(0, Math.min(number, questions.length));

    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
}


// Show Question
function showQuestion() {

    clearInterval(timer);

    timeLeft = 30;

    const q = questions[currentQuestion];

    document.getElementById("difficulty").value = currentDifficulty;

    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    document.getElementById("question").textContent = q.question;

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        button.onclick = () => selectAnswer(button, option);

        optionsContainer.appendChild(button);
    });

    document.getElementById("next-btn").disabled = true;

    startTimer();
}


// Select Answer
function selectAnswer(button, selected) {

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (selected === correctAnswer) {
        score++;
        correctCount++;

        button.classList.add("correct");
    } else {
        wrongCount++;

        button.classList.add("wrong");
    }

    updateDifficulty();

    function updateDifficulty() {
    if (correctCount >= 3 && correctCount > wrongCount) {
        currentDifficulty = "hard";
    } else if (wrongCount > correctCount) {
        currentDifficulty = "easy";
    } else {
        currentDifficulty = "medium";
    }
}

    document.getElementById("next-btn").disabled = false;

    clearInterval(timer);
}


// Timer
function startTimer() {

    const timerElement = document.getElementById("timer");

    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            wrongCount++;

            const correctAnswer = questions[currentQuestion].answer;

            document.querySelectorAll(".option").forEach(btn => {

                btn.disabled = true;

                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct");
                }
            });

            document.getElementById("next-btn").disabled = false;
        }

    }, 1000);
}


// Next Question
function nextQuestion() {
    currentDifficulty = score > currentQuestion / 2 ? "medium" : "easy";

document.getElementById("next-btn").addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});
}


// Result
function showResult() {

    clearInterval(timer);

    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;

    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById("percentage").textContent =
        `${percentage}%`;

        correctCount = Number(score) || 0;
        wrongCount = Math.max(0, questions.length - correctCount);

        document.getElementById("correct").textContent = correctCount;
        document.getElementById("wrong").textContent = wrongCount;

    let message = "";

    if (percentage >= 80) {
        message = "Excellent! 🎉";
    } else if (percentage >= 60) {
        message = "Very Good! 👍";
    } else if (percentage >= 40) {
        message = "Good Try! 💪";
    } else {
        message = "Keep Practicing! 📚";
    }

    document.getElementById("result-message").textContent = message;
}

function restartQuiz() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

function
updateDifficulty(isCorrect) {
    if (isCorrect) {
        currentDifficulty = "hard";
    } else {
        currentDifficulty = "easy";
    }
}