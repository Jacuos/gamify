/**
 * Created by Jacek on 2017-05-01.
 */
export class Layout{
  public id: string;
  public value: string;


  constructor(i: string, v: string){
    this.id = i;
    this.value = v;

  }
  public toString = () : string => {

    return this.id;
  }
}
