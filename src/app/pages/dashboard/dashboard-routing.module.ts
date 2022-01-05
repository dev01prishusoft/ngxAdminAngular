import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'All-users',
      component: HomeComponent,
    },
    {
      path: 'Add-User',
      component: AddUserComponent,
    },
    {
      path: 'Add-User/:data',
      component: AddUserComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
