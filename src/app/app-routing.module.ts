import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homedir } from 'os';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { PoeTableComponent } from './core/poes/components/poe-table/poe-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { PoeFormComponent } from './core/poes/components/poe-form/poe-form.component';
import { PoeResolver } from './core/resolvers/poe.resolver';
import { LoginFormComponent } from './user/components/login-form/login-form.component';
import { NoUserGuard } from './user/guards/no-user.guard';
import { HasUserGuard } from './user/guards/has-user.guard';
import { SignupFormComponent } from './user/components/signup-form/signup-form.component';
import { PoeDetailsComponent } from './core/poes/components/poe-details/poe-details.component';
import { SurveyFormComponent } from './survey/components/survey-form/survey-form.component';
import { QuestionFormComponent } from './question/components/question-form/question-form/question-form.component';
import { SurveyTableComponent } from './survey/components/survey-table/survey-table.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login', // Redirection vers un autre chemin, ici 'signin' 
      pathMatch: 'full'
    },
    { path: 'signup', component: SignupFormComponent },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'home',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/:id',
      component: PoeDetailsComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'add/poe',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire',
      component: StagiaireTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/:id',
      component: StagiaireDetailComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/update/:id',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/add/:idPoe',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey/add',
      component: SurveyFormComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'question',
      component: QuestionFormComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey',
      component: SurveyTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: '**', // Wild card (Redirige vers le home si l'url n'existe pas) - Toujours mettre en dernier
      redirectTo: 'home',
      pathMatch: 'full'
    },

  ];
}
