import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { VerifyPassComponent } from './components/verify-pass/verify-pass.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { ChangePassComponent } from '../../shared/components/change-pass/change-pass.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent, title: 'Login Page' },
  { path: 'register', component: RegisterComponent, title: 'Register Page' },
  { path: 'resetPass', component: ResetPassComponent, title: 'Reset Page' },
  {
    path: 'forgetPass',
    component: ForgetPassComponent,
    title: 'ForgetPass Page',
  },
  { path: 'verifyPass', component: VerifyPassComponent, title: 'Verify Page' },
  { path: '**', component: NotFoundComponent, title: 'NotFound Page' },
];

@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
    ForgetPassComponent,
    ResetPassComponent,
    VerifyPassComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class AuthModule {}
