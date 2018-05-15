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

  constructor(private _logService: LogService) { }

  ngOnInit() {
    this.logs = this._logService.getLogs();
  }

}
