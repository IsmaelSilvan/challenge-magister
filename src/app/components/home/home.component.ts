import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion/conexion.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConexionService]
})
export class HomeComponent implements OnInit {

  items: any;

  constructor(private _conexionService: ConexionService) {
    this._conexionService.getItems().subscribe(item => {
      this.items = item;
    })



  }


  ngOnInit(): void {
  }

}
