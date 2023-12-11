
let questions = [
    {
        prompt: "What is the primary purpose of data science?",
        options: [
            "To analyze and interpret complex data",
            "To write code",
            "To design websites",
            "To create graphics"
        ],
        answer: "To analyze and interpret complex data"
    },

	{
		prompt: "What is the term for a statistical measure that represents the variability of a set of data?",
		options: [
			"Mean",
			"Median",
			"Mode",
			"Standard deviation"
		],
		answer: "Standard deviation"
	},
	{
		prompt: "What is the main goal of exploratory data analysis (EDA) in data science?",
		options: [
			"To build predictive models",
			"To summarize and visualize data",
			"To deploy machine learning algorithms",
			"To write complex algorithms"
		],
		answer: "To summarize and visualize data"
	},
	
	{
		prompt: "What does SQL stand for in the context of data science?",
		options: [
			"Simple Query Language",
			"Structured Question Language",
			"Systematic Query Language",
			"Structured Query Language"
		],
		answer: "Structured Query Language"
	},
	
	{
		prompt: "In the context of machine learning, what does 'overfitting' mean?",
		options: [
			"Fitting the data too closely",
			"Not fitting the data at all",
			"Balancing the data",
			"Ignoring outliers"
		],
		answer: "Fitting the data too closely"
	},
    {
        prompt: "Which programming language is commonly used in data science?",
        options: [
            "Java",
            "Python",
            "C++",
            "Ruby"
        ],
        answer: "Python"
    },

    {
        prompt: "What is the process of cleaning and organizing raw data into a useful format called?",
        options: [
            "Data visualization",
            "Data transformation",
            "Data cleaning",
            "Data structuring"
        ],
        answer: "Data cleaning"
    },

    {
        prompt: "Which of the following is a supervised learning algorithm?",
        options: [
            "K-means clustering",
            "Decision tree",
            "Principal component analysis",
            "Apriori algorithm"
        ],
        answer: "Decision tree"
    },

    {
        prompt: "In machine learning, what does the acronym 'ML' stand for?",
        options: [
            "Multiple Language",
            "Major Learning",
            "Machine Learning",
            "Massive Leverage"
        ],
        answer: "Machine Learning"
    },









	

];



let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 


function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 


function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 


function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 


function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 


function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 


function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 


submitBtn.onclick = saveHighscore; 


startBtn.onclick = quizStart;
