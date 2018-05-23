import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ILog } from '../models/ILog';

@Injectable()
export class LogService {
  logs: ILog[];

  private logSource = new BehaviorSubject<ILog>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('12/26/2017 12:54:23')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('12/27/2017 9:54:23')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added logs component',
    //     date: new Date('12/27/2017 12:00:03')
    //   }
    // ];
    this.logs = [];
  }

  getLogs(): Observable<ILog[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(
      this.logs.sort((a, b) => {
        return b.date - a.date;
      })
    );
  }

  setFormLog(log: ILog) {
    this.logSource.next(log);
  }

  addLog(log: ILog) {
    this.logs.unshift(log);
    // Update local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: ILog) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  deleteLog(log: ILog) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete from local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
