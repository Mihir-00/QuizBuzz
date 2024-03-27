// Start quiz

async function startQuiz(selectedIndex) {
    quizHeader.innerHTML = quizSelection[selectedIndex].text;
    questions = await getQuiz(selectedIndex);
    currentQuestionIndex = 0;
    completedQuestions = 0;
    progressText.innerText = `${completedQuestions}/${questions.length}`;
    progressPercent = 0;
    progressBar.style.width = `${progressPercent}%`;
    score = 0;
    nextButton.innerHTML = 'Next';
    main.style.display = 'none';
    app.style.display = 'block';
    randomizeAnswers(questions);
    showQuestion(questions);
}

/*
If offline while app is open, changes background color and theme color to white and displays text "Offline".
When online again, displays message saying to reopen the app.
*/

window.addEventListener('offline', function() {
    this.document.body.style.backgroundColor = '#fff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff');
    this.document.body.innerText = "Offline"
});

window.addEventListener('online', function() {
    this.document.body.style.backgroundColor = '#fff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff');
    this.document.body.innerText = "Online. Please reopen the app."
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        completedQuestions++;
        if (completedQuestions <= questions.length) {
            progressText.innerText = `${completedQuestions}/${questions.length}`;
        }
        progressPercent += 10;
        progressBar.style.width = `${progressPercent}%`;
        handleNextButton(questions);
    } else {
        startQuiz(selectedIndex=getSelectedIndex());
    }
});