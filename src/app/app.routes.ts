import { Router, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';

const isAuthorized  =() => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }

export const routes: Routes = [
    { path: 'login', component: AuthenticationComponent },
    {path:'', component:HomeComponent,canActivate: [isAuthorized]},
    { path: 'blog-details/:id', component: BlogDetailComponent, canActivate: [isAuthorized] },
];


