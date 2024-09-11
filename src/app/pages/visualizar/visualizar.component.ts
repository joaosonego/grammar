import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GramaticaService } from '../../core/services/gramatica.service';
import Grammar from '../../core/classes/grammar';
import { MessageService } from '../../core/services/snackbar-message.service';
import { HomeButtonComponent } from '../../core/components/home-button.component';
import { MatCardModule } from '@angular/material/card';
import { Gramatica } from '../gramatica/gramatica.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visualizar',
  standalone: true,
  imports: [
    HomeButtonComponent,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './visualizar.component.html',
  styleUrl: '../../../../public/css/flexbox.css'
})
export class VisualizarComponent implements OnInit {

  gramatica: Grammar;
  resultado: any;
  model: Gramatica = null;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service: GramaticaService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(res => {
      this.gramatica = new Grammar();
      for(let t of res.terminais){
        this.gramatica.addTerminal(t);
      }
      for(let nt of res.naoTerminais){
        this.gramatica.addNaoTerminal(nt.naoTerminal);
        for(let p of nt.producoes){
          this.gramatica.addProducao(nt.naoTerminal, p);
        }
      }
      this.resultado = this.gramatica.buildSentence();
      this.model = res;
    },
    () => {
      this.message.error('Erro ao carregar a página');
    })
  }

  gerarNovaSentenca(){
    this.resultado = this.gramatica.buildSentence();
  }
}
