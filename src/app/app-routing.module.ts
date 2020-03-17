import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './pages/workers/workers.component';
import { WorkerComponent } from './pages/workers/worker/worker.component';

const routes: Routes = [
	{ path:'',component:WorkersComponent },
	{ path:'blog',component:WorkerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
