import {Injectable} from '@angular/core';
import {Comment, Employee, NewCommentEntry, State, Step} from '@mega/shared/data-model';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }

  getDoneCommentsCount(comments: Array<Comment>): number {
    return this.getDoneComments(comments).length;
  }

  getDoneComments(comments: Array<Comment>): Array<Comment> {
    return comments.filter(comment => comment.state === State.DONE);
  }

  finish(comment: Comment): Observable<number> {
    this.deleteViewModelProps(comment);
    return this.httpClient.put<number>(this.config.getBackendUrlWithContext('/comments/finish'), comment);
  }

  getCommentsForEmployee(employeeEmail: string, montYear: string): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(
      this.config.getBackendUrlWithContext('/comments/getallcommentsforemployee'),
      {
        params: {
          email: employeeEmail,
          date: montYear
        }
      });
  }

  createNewComment(employeeEmail: string, message: string, assigneeEmail: string, step: Step, project: string, currentMonthYear: string): Observable<any> {
    return this.httpClient.post(
      this.config.getBackendUrlWithContext('/comments'),
      new NewCommentEntry(step, employeeEmail, message, assigneeEmail, project, currentMonthYear)
    );
  }

  updateComment(comment: Comment): Observable<any> {
    this.deleteViewModelProps(comment);
    return this.httpClient.put(
      this.config.getBackendUrlWithContext('/comments'),
      comment
    );
  }

  deleteComment(comment: Comment): Observable<any> {
    return this.httpClient.delete(this.config.getBackendUrlWithContext('/comments/' + comment.id));
  }

  /**
   * remove props which got added for ViewModel purposes, to avoid 'unrecognised field ...' exceptions from backend and to avoid unnecessary
   * traffic
   */
  private deleteViewModelProps(comment: Comment) {
    delete comment.isEditing;
  }
}
