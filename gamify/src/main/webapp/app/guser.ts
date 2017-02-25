/**
 * Created by Jacek on 22-01-2017.
 */
export class Guser{
  public id: number;
  public login: string;
  public firstName: string;
  public lastName: string;
  public description : string;
  public exp: number;
  public lvl: number;

  constructor(id: number, lo: string, fi: string, la: string, de: string, ex: number, lv: number){
    this.id = id;
    this.login = lo;
    this.firstName = fi;
    this.lastName = la;
    this.description = de;
    this.exp = ex;
    this.lvl = lv;
  }
}
