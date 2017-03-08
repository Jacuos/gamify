/**
 * Created by Jacek on 2017-03-01.
 */
export class Glogin{
  public login: string;
  public password: string;
  public isAdmin: boolean;
  public email: string;

  constructor(lo: string, pa: string, is: boolean, em: string){
    this.login = lo;
    this.password = pa;
    this.isAdmin = is;
    this.email = em;
  }
}
