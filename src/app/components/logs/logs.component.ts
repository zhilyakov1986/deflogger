import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { ILog } from '../../models/ILog';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: ILog[];
  selectedLog: ILog;
  loaded = false;

  constructor(private _logService: LogService) { }

  ngOnInit() {
    this._logService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = {id: '', text: '', date: ''};
      }
    });
    this._logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: ILog) {
    this._logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: ILog) {
    if (confirm('Are you sure?')) {
      this._logService.deleteLog(log);
    }
  }

}
