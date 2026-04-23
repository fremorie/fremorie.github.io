exports.gradeAnswer = function(graderConfig, sessionConfig, answer) {
    // Prevent Coursera from displaying JS error in UI
    if (answer === null) {
        const isCorrect = false;
        const feedback = "Please try again.";

        return {
            isCorrect,
            feedback,
            feedbackConfiguration: {
                feedback,
                isCorrect
            }
        }
    }
    const isCorrect = graderConfig.isCompleted === answer.isCompleted;
    const feedback = isCorrect ? "Great job!" : "Please try again.";

    return {
        isCorrect: isCorrect,
        feedback: feedback,
        feedbackConfiguration: {
            feedback,
            isCorrect
        }
    };
};
