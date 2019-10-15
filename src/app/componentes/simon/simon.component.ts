import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss']
})
export class SimonComponent implements OnInit {

  constructor() { }

  private colours: Array<string> = ["green","red","yellow","blue"];
  private userColours: Array<string> = new Array<string>();
  private machineColours: Array<string> = new Array<string>();
  private level:number = 1;
  private levelJson:object = JSON.parse('{ "rounds":[{ "level":"1", "steps":"3", "speed":"800" }, { "level":"2", "steps":"2", "speed":"750" }, {"level":"3", "steps":"2", "speed":"700" }, {"level":"4", "steps":"3", "speed":"650" }, {"level":"5", "steps":"5", "speed":"600" }] }');
  private rounds:object = this.levelJson["rounds"]; 
  private isPlaying:boolean = false;
  private currentStep:number = 0;
  private speed:number = 800;
  private sounds = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  ];

  ngOnInit() {
  }

  startGame(){
    $("#start").attr("disabled", "true");
    $("body").attr("style", "pointer-events: none");
    this.clearVariables();
    let stepsCount:number = this.rounds[Object.keys(this.rounds).find(i => this.rounds[i].level === this.level.toString())].steps;
    this.fillMachineColours(stepsCount);
    console.log(this.machineColours);
    this.showSteps();
    this.isPlaying = true;
  }

  validate(event){
    let self = this;
    if(this.isPlaying){
      this.sounds[this.colours.indexOf($(event.currentTarget).attr("colour"))].play().catch(function(){});
      this.userColours.push($(event.currentTarget).attr("colour"));
      if(this.userColours[this.currentStep] == this.machineColours[this.currentStep]){
        this.currentStep++;
      }
      else{
        alert("Fallaste");
        self.restartGame();
        return;
      }

      if(this.userColours.length === this.machineColours.length)
        self.winGame();
    }
  }

  winGame(){
    let self = this;
    if(this.level === 5){
      alert("Ganaste!!!");
      self.restartGame();
    }
    else{
      this.isPlaying = false;
      this.level++;
      setTimeout(function() {
        self.startGame();
      }, 1000);
    }
  }

  restartGame(){
    this.machineColours = [];
    this.isPlaying = false;
    this.level = 1;
    this.speed = 800;
    $("#start").removeAttr("disabled");
  }

  clearVariables(){
    this.userColours = [];
    this.currentStep=0;
  }

  fillMachineColours(steps){
    for(let x:number = 0; x < steps; x++){
      let randomValue = this.colours[Math.floor(Math.random() * this.colours.length)];
      this.machineColours.push(randomValue);
    }
  }  

  showSteps() {
    let self = this;
    if(self.currentStep > self.machineColours.length-1) {
      self.currentStep = 0;
      $("body").removeAttr("style");
      return;
    }
    var colour = self.machineColours[self.currentStep];
    setTimeout(function() {
      $(".pad").each(function(){
        if($(this).attr("colour") == colour){
          $(this).addClass("active");
          self.sounds[self.colours.indexOf(colour)].play();
        }
      });
    }, 300);
    setTimeout(function() {
      $(".pad").each(function(){
        if($(this).attr("colour") == colour){
          $(this).removeClass("active");        
        }
      });
      self.currentStep++;
      self.speed = self.rounds[Object.keys(self.rounds).find(i => self.rounds[i].level === self.level.toString())].speed;
      self.showSteps();
    }, self.speed);
  }
}