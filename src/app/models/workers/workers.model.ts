import { Gender, Department, Timestamp } from './domain.model';

export class worker {
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
