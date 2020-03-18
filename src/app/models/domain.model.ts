export class Department {

	_value: string;
	_list: string[];

	constructor( id: any ) {
		this._list = ['BA','PM','PL','PG','ITC','QCL','QC','TRAINER','INTER SHIP'];
		this._value = this._list[parseInt(id)]; 
	}

	get(): string {
		return this._value;
	}

	getList(): string[] {
		return this._list;
	}
}

export class Gender {

	_value: string;
	_list: string[];

	constructor( id: any ) { 
		this._list = ['Female','Male'];
		this._value = this._list[parseInt(id)];
	}

	get(): string {
		return this._value;
	}

	getList(): string[] {
		return this._list;
	}
}

/********************/
/**  {{todayDate | date:'EEEE, MMMM d, yyyy'}}
/**  {{todayDate | date:'EEEE, MMMM d, yyyy h:mm a'}}
/**  {{todayDate | date:'EEEE, MMMM d, yyyy h:mm:ss a'}}
/**  {{todayDate | date:'MM/dd/yyyy h:mm a'}}
/**  {{todayDate | date:'MM/dd/yyyy h:mm:ss a'}}
/**  {{todayDate | date:'MMMM d'}}   
/**  {{todayDate | date:'yyyy-MM-ddTHH:mm:ss'}}
/**  {{todayDate | date:'h:mm a'}}
/**  {{todayDate | date:'h:mm:ss a'}}      
/**  {{todayDate | date:'EEEE, MMMM d, yyyy hh:mm:ss a'}}
/**  {{todayDate | date:'MMMM yyyy'}} 
/*******************/
export class Timestamp {

	_timeStamp: string;
	_datetime: Date;
	_time: string;
	_date: string;

	constructor( timeStamp: any ) { 
		this._timeStamp = timeStamp.replace(' ','T');
		this._datetime = new Date(this._timeStamp);
	}

	get(): string {
		return this._timeStamp;
	}

	getTime(half:boolean = false): string {
		if(half)
		{
			let _times = this._datetime.toLocaleTimeString("en-US",{hour12 : true});
			let [_time,half] = _times.split(' ');
			let [_hour,_minute,_second] = _time.split(':');
			this._time = `${_hour}h${_minute} ${half}`;
		}else{
			let _time = this._datetime.toLocaleTimeString("en-US",{hour12 : false});
			let [_hour,_minute,_second] = _time.split(':');
			this._time = `${_hour}h${_minute}`;
		}
		return this._time;
	}

	getDate(): string {		
		let _date = this._datetime.toLocaleDateString();
		let [_day,_month,_year] = _date.split('/');
		_day = parseInt(_day)<10?'0'+_day:_day; 
		_month = parseInt(_month)<10?'0'+_month:_month; 
		this._date = `${_year}-${_month}-${_day}`;
		return this._date;
	}
}

