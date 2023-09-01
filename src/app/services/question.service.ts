import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsofQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsofQuizForTest(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`, question)
  }

  //delete question
  public deleteQuestion(questionId:any)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }

  //get the single question
  public getQuestion(quesId:any)
  {
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }

  //update question
  public updateQuestion(question:any)
  {
    return this._http.put(`${baseUrl}/question/`,question)
  }

  //evalquiz
  public evalQuiz(questions:any)
  {
      return this._http.post(`${baseUrl}/question/eval-quiz`, questions)
  }
}
