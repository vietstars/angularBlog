import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './pages/workers/workers.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
	{ path:'',component:WorkersComponent },
	{ path:'blog',component:BlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
