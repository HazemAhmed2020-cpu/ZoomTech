document.addEventListener("DOMContentLoaded", () => {
    initEditor();
    initQuiz();
});

// --- Editor & Pyodide Logic ---

let pyodide = null;
let editor = null;

async function initEditor() {
    // Initialize CodeMirror
    const textarea = document.getElementById("code-editor");
    editor = CodeMirror.fromTextArea(textarea, {
        mode: "python",
        theme: "dracula",
        lineNumbers: true,
        indentUnit: 4,
        direction: "ltr"
    });

    const runBtn = document.getElementById("run-btn");
    const outputTerminal = document.getElementById("output-terminal");
    const loader = document.getElementById("loader");

    // Print initial loading state
    outputTerminal.textContent = "جاري تحميل بيئة بايثون (Pyodide). يرجى الانتظار ثوانٍ معدودة...\n";
    loader.classList.remove("hidden");
    runBtn.disabled = true;

    try {
        // Load Pyodide
        pyodide = await loadPyodide();
        outputTerminal.textContent += "تم تحميل بايثون بنجاح! المتصفح جاهز لتنفيذ كودك الآن.\n\n";
        loader.classList.add("hidden");
        runBtn.disabled = false;

        // Custom standard output to capture print() statements
        pyodide.setStdout({ batched: (msg) => {
            outputTerminal.textContent += msg + "\n";
        }});
        
        pyodide.setStderr({ batched: (msg) => {
            outputTerminal.textContent += "[خطأ]: " + msg + "\n";
        }});

    } catch (err) {
        outputTerminal.textContent += "\n[حدث خطأ أثناء تحميل بيئة بايثون]: " + err;
        loader.classList.add("hidden");
    }

    // Run Button Click Handler
    runBtn.addEventListener("click", async () => {
        if (!pyodide) return;
        
        const code = editor.getValue();
        outputTerminal.textContent = ""; // Clear previous output
        
        try {
            await pyodide.runPythonAsync(code);
        } catch (err) {
            outputTerminal.textContent += "\n[يوجد خطأ في الكود]:\n" + err;
        }
    });
}

// --- Quiz Logic ---

function initQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submit-quiz");
    const quizResult = document.getElementById("quiz-result");
    const quizControls = document.getElementById("quiz-controls");

    if (typeof quizData !== 'undefined' && quizData.length > 0) {
        // Render Questions
        quizData.forEach((q, qIndex) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("quiz-question");
            questionElement.id = `question-container-${q.id}`;
            
            const header = document.createElement("div");
            header.classList.add("question-header");
            
            const title = document.createElement("h3");
            title.textContent = `${qIndex + 1}. ${q.question}`;
            
            const markIcon = document.createElement("span");
            markIcon.classList.add("mark-icon");
            markIcon.id = `mark-${q.id}`;
            
            header.appendChild(title);
            header.appendChild(markIcon);
            questionElement.appendChild(header);

            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("options");

            q.options.forEach((opt, optIndex) => {
                const label = document.createElement("label");
                label.classList.add("option-label");
                
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `question-${q.id}`;
                radio.value = optIndex;
                
                label.appendChild(radio);
                label.appendChild(document.createTextNode(" " + opt));
                optionsDiv.appendChild(label);
            });

            questionElement.appendChild(optionsDiv);
            
            // Explanation box (hidden by default)
            const explanationBox = document.createElement("div");
            explanationBox.classList.add("explanation-box", "hidden");
            explanationBox.id = `explanation-${q.id}`;
            explanationBox.innerHTML = `<strong>الإجابة الصحيحة:</strong> ${q.options[q.correctAnswer]} <br><br> <strong>الشرح:</strong> ${q.explanation}`;
            
            questionElement.appendChild(explanationBox);
            quizContainer.appendChild(questionElement);
        });

        quizControls.classList.remove("hidden");

        // Submit Handler
        submitBtn.addEventListener("click", () => {
            let score = 0;
            let answered = 0;

            quizData.forEach((q) => {
                const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);
                const qContainer = document.getElementById(`question-container-${q.id}`);
                const markIcon = document.getElementById(`mark-${q.id}`);
                const expBox = document.getElementById(`explanation-${q.id}`);
                
                // Reset styles
                qContainer.classList.remove("correct-border", "wrong-border");
                markIcon.textContent = "";
                markIcon.className = "mark-icon";
                expBox.classList.add("hidden");

                if (selected) {
                    answered++;
                    const selectedVal = parseInt(selected.value);
                    if (selectedVal === q.correctAnswer) {
                        score++;
                        qContainer.classList.add("correct-border");
                        markIcon.textContent = "✅";
                        markIcon.classList.add("correct");
                    } else {
                        qContainer.classList.add("wrong-border");
                        markIcon.textContent = "❌";
                        markIcon.classList.add("wrong");
                        expBox.classList.remove("hidden");
                    }
                }
            });

            if (answered < quizData.length) {
                alert("يرجى الإجابة على جميع الأسئلة لتتمكن من رؤية النتيجة والشرح!");
                return;
            }

            quizResult.classList.remove("hidden", "success", "fail");
            quizResult.textContent = `لقد حصلت على ${score} من ${quizData.length}`;

            if (score === quizData.length) {
                quizResult.classList.add("success");
                quizResult.textContent += " - أداء ممتاز وتفوق مبهر! 🌟";
                // Trigger Confetti Animation
                fireConfetti();
            } else if (score >= quizData.length / 2) {
                quizResult.classList.add("success");
                quizResult.textContent += " - أداء جيد! اقرأ الشرح للأسئلة الخاطئة لتتعلم أكثر.";
            } else {
                quizResult.classList.add("fail");
                quizResult.textContent += " - لا بأس، راجع المفاهيم الأساسية وحاول مرة أخرى.";
            }
            
            // Scroll to top of quiz to see results
            quizContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// --- Confetti Animation ---
function fireConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
}


