import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: '../../../../public/css/flexbox.css'
})
export class HomeComponent {

  constructor(
    private router: Router,
  ) {}

  goTo(id: number){
    this.router.navigateByUrl(`/visualizar/${id}`);
  }

  newGrammar(){
    this.router.navigateByUrl(`/nova-gramatica`);
  }

}
