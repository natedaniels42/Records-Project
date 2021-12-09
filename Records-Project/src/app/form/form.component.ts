import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Responses } from './Responses';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  blanks: string[] = [];
  values: string[] = [];
  title: string = '';
  ready: boolean = false;
  responses: Responses = new Responses('','','','','','','','','','');
  responseArr: string[] = [];
  story: string = '';
  
  constructor() { }

  getMadLib() {
    fetch('http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=15')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.blanks = response.blanks;
        this.values = response.value;
        this.title = response.title;
      })
  }

  onSubmit() {
    for (let i = 0; i < this.values.length - 1; i++) {
      this.story += this.values[i];
      if (this.responseArr[i]) {
        this.story += `${this.responseArr[i].toUpperCase()}`;
      }
    }
    this.ready = true;
  }

  reset() {
    this.blanks = [];
    this.values = [];
    this.title = '';
    this.ready = false;
    this.responses = new Responses('','','','','','','','','','');
    this.responseArr = [];
    this.story = '';
    this.getMadLib();
  }

  ngOnInit(): void {
  }

}
