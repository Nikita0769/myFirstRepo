import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { UxproductsService } from './uxproducts.service';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 

  @ViewChild('userForm') userForm:NgForm;
  url='https://uxproducts-6ad4a.firebaseio.com/user.json'
  
  myuser=[];
 updateMode:boolean = false;
  updateUserId;
constructor(private http:HttpClient, private ux:UxproductsService) { }

ngOnInit(){
  this.onFetchUser();
  {
     userId: "-M5mI3BuV--_ONTXSthA";
     name: "Nikita";
     technology: "IT"
  }
}
 
onAddUser(userData:User){
  if(this.updateMode){
    this.http.put<User>('https://uxproducts-6ad4a.firebaseio.com/user/'+ this.updateUserId+'.json',userData).subscribe(
      (res)=>{
     console.log(res);
     this.onFetchUser();
      })
  }else{
      console.log(userData);
      this.myuser.push(userData);
      this.http.post<User>(this.url,userData).subscribe(
        (res)=>{
       console.log(res);
        })
  }
}

onFetchUser(){
  this.http.get<User>(this.url)
  .pipe(map(resData=>{
   console.log(resData);
   const userArray=[];
   for(const key in resData){
    if(resData.hasOwnProperty(key)){
      userArray.push({userId:key,...resData[key]})
    }
   }
   return userArray
  }))
  .subscribe((myuser)=>{
     console.log(myuser);
     this.myuser = myuser;
    })
 }

 onDeleteUser(userId){
  if(confirm('Do you want to delete this user?')){
    console.log(userId);
    this.http.delete('https://uxproducts-6ad4a.firebaseio.com/user/'+userId+'.json')
    .subscribe(() =>{
        this.onFetchUser();
    })
 }
}

onUpdateUsers(userId,index){
   this.updateMode=true;
  console.log( this.myuser[index]);
  this.updateUserId=userId;
  this.userForm.setValue({
    name: this.myuser[index].name,
     technology:this.myuser[index].technology

 })
}

}
