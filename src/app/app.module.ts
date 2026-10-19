import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login.component';
import { AdminComponent } from './pages/admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'students', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'students/new', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'students/:id', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'examinations', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'results', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminComponent],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
