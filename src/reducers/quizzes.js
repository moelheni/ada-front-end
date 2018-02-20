const quizzes = (state = [], action) => {
  if (action.type == "UPDATE_CURRENT_LESSON_SUCCESS") {
    return action.payload.data.model.quizzes
  } else if (action.type == "UPDATE_CURRENT_SLIDE_SUCCESS") {
    return action.payload.data.model.lesson.quizzes
  }else if (action.type == "UPDATE_CURRENT_LESSON_FAIL") {
    return { error: "Anuthorized" }
  } else if (action.type == "UPDATE_CURRENT_LESSON") {
    return { loading: true }
  } else if (action.type == "ANSWER_QUIZ_SUCCESS") {
    let quiz = action.payload.data.model.choice.question.quiz
    let thisQuestion = action.payload.data.model.choice.question
    quiz.questions.push(thisQuestion)
    return [quiz]
  }
  return state || {}
}

export default quizzes;
