import {Injectable} from '@angular/core';
import {configuration} from '@mega/shared/util-constant';
import {LogEntry} from '@mega/shared/data-model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private level: number = configuration.LogLevel.Debug;
  private logWithDate: boolean = configuration.logWithDate;

  public writeToLog(msg: string,
                    level: number): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.logWithDate = this.logWithDate;

      console.log(entry.buildLogString());
    }
  }

  private shouldLog(level: number) {
    let ret = false;
    if ((level >= this.level &&
        level !== configuration.LogLevel.Off) ||
      this.level === configuration.LogLevel.All) {
      ret = true;
    }

    return ret;
  }
}
