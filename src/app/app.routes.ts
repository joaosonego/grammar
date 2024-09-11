import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GramaticaComponent } from './pages/gramatica/gramatica.component';
import { VisualizarComponent } from './pages/visualizar/visualizar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nova-gramatica', component: GramaticaComponent },
    { path: 'visualizar/:id', component: VisualizarComponent}
];
