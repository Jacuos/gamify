/**
 * Created by Jacek on 2017-02-25.
 */
export class Gquest{
  public id: number;
  public description: string;
  public exp: number;
  public endOf: Date;

  constructor(id: number, de: string, ex: number, en: Date){
    this.id = id;
    this.description = de;
    this.exp = ex;
    this.endOf = en;
  }
}
