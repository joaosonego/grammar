import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/snackbar-message.service';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Gramatica, Producao } from '../gramatica/gramatica.model';
import { Router } from '@angular/router';
import { GramaticaService } from '../../core/services/gramatica.service';
import { HomeButtonComponent } from '../../core/components/home-button.component';

@Component({
  selector: 'app-gramatica',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    HomeButtonComponent
  ],
  templateUrl: './gramatica.component.html',
  styleUrl: '../../../../public/css/flexbox.css'
})
export class GramaticaComponent implements OnInit {

  terminalForm: UntypedFormGroup;
  naoTerminalForm: UntypedFormGroup;
  isLoading = false;

  terminais: string[];
  naoTerminais: Producao[];
  hasVazio = false;
  novaProducao: string = '';

  constructor(
    private message: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: GramaticaService
  ) {
    this.terminalForm = this.formBuilder.group({
      terminal: [null, [Validators.maxLength(1)]],
      terminalList: [null, [Validators.required]]
    });
    this.naoTerminalForm = this.formBuilder.group({
      naoTerminal: [null, [Validators.maxLength(1)]],
      naoTerminalList: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.terminais = [];
    this.naoTerminais = [{naoTerminal: 'S', producoes: []}]
    this.naoTerminalForm.get('naoTerminalList').setValue('S');
  }

  addTerminal(){
    const input = this.terminalForm.get('terminal').value;
    if(!this.isTerminalValid(input)){
      this.message.error("Terminal inválido");
      return;
    }

    this.terminais.push(input);
    let list = '';
    this.terminais.map(x => {
      list += `${x}; `
    })
    this.terminalForm.get('terminal').setValue(null);
    this.terminalForm.get('terminalList').setValue(list);
  }

  clearTerminal(){
    this.terminais = [];
    this.terminalForm.get('terminalList').setValue(null);
  }

  isTerminalValid(input: string){
    if(!input) return false;
    if(input.includes(' ')) return false;
    if(input.charCodeAt(0) > 64 && input.charCodeAt(0) < 91) return false;
    if(this.terminais.includes(input)) return false;
    
    return true;
  }

  addNaoTerminal(){
    const input = this.naoTerminalForm.get('naoTerminal').value;
    if(!this.isNaoTerminalValid(input)){
      this.message.error("Não terminal inválido");
      return;
    }

    this.naoTerminais.push({
      naoTerminal: input,
      producoes: []
    });
    let list = '';
    this.naoTerminais.map(x => {
      list += `${x.naoTerminal}; `
    })
    this.naoTerminalForm.get('naoTerminal').setValue(null);
    this.naoTerminalForm.get('naoTerminalList').setValue(list);
  }

  clearNaoTerminal(){
    this.naoTerminais = [{naoTerminal: 'S', producoes: []}];
    this.naoTerminalForm.get('naoTerminalList').setValue('S');
  }

  isNaoTerminalValid(input: string){
    if(!input) return false;
    if(input.includes(' ')) return false;
    if(input.charCodeAt(0) < 65 || input.charCodeAt(0) > 90) return false;
    for(let nT of this.naoTerminais){
      if(nT.naoTerminal == input) return false;
    }
    
    return true;
  }

  addToProducao(terminal: string){
    this.novaProducao += terminal;
  }

  addProducao(naoTerminal: string){
    this.naoTerminais.map(x => {
      if(x.naoTerminal == naoTerminal){
        if(x.producoes.includes(this.novaProducao)){
          this.message.error("Produção já inserida");
        }
        else{
          x.producoes.push(this.novaProducao);
          this.clearNovaProducao();
        }
      }
    });
  }

  clearNovaProducao(){
    this.novaProducao = '';
  }

  addVazio(naoTerminal: string){
    this.naoTerminais.map(x => {
      if(x.naoTerminal == naoTerminal){
        if(x.producoes.includes(null)){
          this.message.error("Vazio já inserido");
        }
        else{
          x.producoes.push(null);
        }
      }
    });
  }

  removeVazio(naoTerminal: string){
    this.naoTerminais.map(x => {
      if(x.naoTerminal == naoTerminal){
        x.producoes = x.producoes.filter(p => p !== null);
      }
    });
  }

  isValid(){
    return !this.naoTerminais.some(x => x.producoes.length == 0);
  }

  save(){
    if(!this.isValid()){
      return;
    }
    this.isLoading = true;
    const newGrammar = {
      id: 4,
      terminais: this.terminais,
      naoTerminais: this.naoTerminais
    } as Gramatica;
    
    if(this.hasVazio){
      newGrammar.terminais.push(null);
    }

    this.service.updateGramatica(newGrammar).subscribe(res => {
      this.message.success("Gramática salva com sucesso!");
      this.router.navigateByUrl('/visualizar/4');
    },
    () => {
      this.isLoading = false;
      this.message.error("Erro ao salvar gramática");
    })
  }
}
