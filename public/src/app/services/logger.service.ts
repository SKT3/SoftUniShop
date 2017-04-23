import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  logs: any[] = [];

  constructor() { }

  /**
   * Log message and store it to logs for later use
   * @param  {any}       message Message to log
   * @param  {string =       ''}          note Clarification for log(if any)
   * @return {void}
   */
  log(message: any, note: string = ''): void{
      this.logs.push(`${note} ${message}`);
      console.log(note, message);
  }
}
