import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WorkersService } from 'src/app/services/workers.service';
import { SelectionModel } from '@angular/cdk/collections';
import { worker } from 'src/app/models/workers/workers.model';
import { Gender, Department, Timestamp } from 'src/app/models/workers/domain.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2'

export interface Dessert {
  id:number;
	name:string;
	subname:string;
	email:string;
	mobile:string;
	gender:string;
	department:string;
	hire_at:string;
	update_at:Timestamp;
	update_by:string;
	status:number;
}

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class WorkersComponent implements OnInit {

	displayedColumns: string[];

	length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  sortedData: worker[];

  colSpan: number;

  departments =  new Department(false).getList();

  genders =  new Gender(false).getList();

  newWorker = {
		name : '',
		subname : '',
		email : '',
		mobile : '',
		gender : '',
		department : '',
		hire_at : ''
  };

  newWorkerActive: string = '';

  sort = {
  	'email': '',
  	'mobile': '',
  	'department': '',
  	'gender': ''
  };

  filter: string = '';

  expandedElement: worker | null;

  selection: SelectionModel<worker> = new SelectionModel<worker>(true, []);

  constructor( private workersService: WorkersService ) { 
  	workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		let except: string[] = ['subname','update_at','update_by','status','detail','blog_title','blog_content'];
  		this.displayedColumns = Object.keys(res['data'][0]).filter(i=>!except.includes(i));
  		this.colSpan = this.displayedColumns.length;
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})
  }

  ngOnInit(): void { 
		const setPageSizeOptionsInput = document.getElementsByClassName("mat-table-data")[0];
  	this.pageSizeOptions = setPageSizeOptionsInput.getAttribute('pageSizeOptions').split(',').map(str => +str);
  	this.length = parseInt(setPageSizeOptionsInput.getAttribute('totalCount'));
  	this.pageSize = parseInt(setPageSizeOptionsInput.getAttribute('pageSize'));  	
  }

  toggleClass(): string {
  	return this.newWorkerActive = this.newWorkerActive!='active'?'active':'';
  }

  addWorker(): void {
    let msg = '';
    Object.keys(this.newWorker).forEach(i=>!this.newWorker[i]?(msg?msg+=', '+i:msg=i):null);
    msg==''?'':msg += 'still empty!<br/>';
  	Swal.fire({
		  title: 'Are you sure?',
		  html:`${msg}Do you want to create new worker with those details?`,
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, do it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {

        this.workersService.addWorker(this.newWorker).subscribe(res=>{
          if(res['insert'])
          {
            Swal.fire(
              'Success!',
              'New worker has been created.',
              'success'
            )
            this.workersService.getWorkers(this.sort,this.filter,0,this.pageSize,this.pageIndex).subscribe(res=>{
              this.length = res['total'];
              this.getSortData(res['data']);
            })
            this.toggleClass();
          }else{
            Swal.fire(
              'Fails!',
              'New worker hasn\'t been create. ',
              'error'
            )
          }
        })
        this.newWorker = {
          name : '',
          subname : '',
          email : '',
          mobile : '',
          gender : '',
          department : '',
          hire_at : ''
        };
        
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
		    Swal.fire(
		      'Cancelled',
		      'Your detail is safe! ',
		      'error'
		    )
		  }
		})
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.sortedData.length;
    return numSelected === numRows;
  }

  masterToggle():void {
    this.isAllSelected() ?
        this.selection.clear() :
        this.sortedData.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: worker): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  setClass(row?: worker): string{
  	if( row.status==1 )return 'bg-gradient-warning cursor-pointer';
  }

  changePageSize(event: Event):void{
  	this.pageSize = parseInt((event.target as HTMLInputElement).value);
  	this.workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})
  }

  changeTotal(event: Event):void{
  	this.length = parseInt((event.target as HTMLInputElement).value);
  	this.workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})
  }

  changePage(paginator: MatPaginator):void {
  	this.pageIndex = paginator.pageIndex;
  	this.pageSize = paginator.pageSize;
		this.workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})
  }

  sortData(sort: MatSort):void {

  	this.sort[sort.active] = sort.direction;
  	this.workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})

    // const data = this.desserts.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }
    // this.sortedData = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name': return compare(a.name, b.name, isAsc);
    //     case 'calories': return compare(a.calories, b.calories, isAsc);
    //     case 'fat': return compare(a.fat, b.fat, isAsc);
    //     case 'carbs': return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein': return compare(a.protein, b.protein, isAsc);
    //     default: return 0;
    //   }
    // });
  }

  applyFilter(event: Event):void {
    this.filter = (event.target as HTMLInputElement).value;
    // this.sortedData = this.sortedData.filter(i => (i.name+i.subname).toLowerCase().includes(filterValue.trim().toLowerCase()));
    this.workersService.getWorkers(this.sort,this.filter,this.length,this.pageSize,this.pageIndex).subscribe(res=>{
  		this.length = res['total'];
  		this.getSortData(res['data']);
  	})
  }

  getSortData( data ):void {
		this.sortedData = data.map(i=>{
			i.gender 			= new Gender(i.gender).get();
			i.department 	= new Department(i.department).get(); 
			i.hire_at 		= new Timestamp(i.hire_at).getDate(); 
			i.update_at 	= new Timestamp(i.update_at); 
			return i;
		});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string):void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public isSortingDisabled(columnText: string): boolean
	{
		let sorting = ['email','mobile','department','gender'];
	  return !sorting.includes(columnText);
	}

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
