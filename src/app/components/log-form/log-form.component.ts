import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { ILog } from '../../models/ILog';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew = true;

  constructor(private _logService: LogService) { }

  ngOnInit() {
    // Subscribe to selected log observable
    this._logService.selectedLog.subscribe( log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    } );
  }
  onSubmit() {
    // check if new log
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      // Add log
      this._logService.addLog(newLog);
    } else {
      // Create log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // Update log
      this._logService.updateLog(updLog);
    }

    // clear the state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this._logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
