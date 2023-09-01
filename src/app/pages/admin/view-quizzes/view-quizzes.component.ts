import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {


  quizzes=[
    {
      qid:23,
      title:'BAsic Java Quiz',
      description:'Java Quiz',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'programming'
      }
    },
    {
      qid:23,
      title:'BAsic Java Quiz',
      description:'The Java SE is a computing-based platform and used for developing desktop or Window based applications. Thus, core Java is the part of Java SE where the developers develop desktop-based applications by using the basic concepts of Java where JDK (Java Development Kit) is a quite familiar Java SE implementation.',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'programming'
      }
    },
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error !', 'Error in loading data !', 'error' )
      }
    )
  }

  deleteQuiz(qid:any)
  {
    
    Swal.fire({
      icon:'info',
      title:"are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete
        this._quiz.deleteQuiz(qid).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
          Swal.fire('Success!!' , 'quiz deleted', 'success')},
       (error)=>{
        Swal.fire('Error!!' , 'error in deleting quiz', 'error')
       }
        )
      }
    })


  }

}
