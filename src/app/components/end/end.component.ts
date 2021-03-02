import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: '../home/home.component.html'
})
export class EndComponent implements OnInit {
  public home: boolean;
  constructor() { this.home = false }

  ngOnInit(): void {
  }

}
