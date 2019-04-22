import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {

  constructor() { }

  private colours: Array<string> = ["green","red","yellow","blue"];
  private userColours: Array<string> = new Array<string>();
  private machineColours: Array<string> = new Array<string>();
  private level:number = 1;
  private levelJson:object = JSON.parse('{ "rounds":[{ "level":"1", "steps":"3" }, { "level":"2", "steps":"5" }, {"level":"3", "steps":"7" }] }');
  private isPlaying:boolean = false;
  private currentStep:number = 0;
  private timeout;
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
    this.clearVariables();
    let rounds:object = this.levelJson["rounds"];
    let colourCount:number = rounds[Object.keys(rounds).find(i => rounds[i].level === this.level.toString())].steps;
    this.fillMachineColours(colourCount);
    console.log(this.machineColours)
    this.showSteps();
    this.currentStep = 0;  
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
        self.restartGame("Fallaste");
        return;
      }

      if(this.userColours.length === this.machineColours.length)
        self.winGame();
    }
  }

  winGame(){
    let self = this;
    if(this.level === 3){
      self.restartGame("Ganaste!!");
    }
    else{
      this.isPlaying = false;
      this.level++;
      setTimeout(function() {
        self.startGame();
      }, 1000);
    }
  }

  restartGame(message:string){
    alert(message);
    this.isPlaying = false;
    this.level = 1;
    $("#start").removeAttr("disabled");
  }

  clearVariables(){
    this.userColours = [];
    this.machineColours = [];
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
      return;
    }
    var colour = self.machineColours[self.currentStep];
    $(".pad").each(function(){
      if($(this).attr("colour") == colour){
        $(this).addClass("active");
        self.sounds[self.colours.indexOf(colour)].play();
      }
    });
    setTimeout(function() {
      $(".pad").each(function(){
        if($(this).attr("colour") == colour){
          $(this).removeClass("active");        }
      });
      self.currentStep++;
      self.showSteps();
    }, 0.6*1000);
  }
}