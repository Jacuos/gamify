/**
 * Created by Jacek on 2017-02-28.
 */
import {Pipe, PipeTransform, Injectable} from '@angular/core';
import {Guser} from "./guser";
@Pipe({
  name: 'gusersearch',
  pure: false
})
@Injectable()
export class GuserSearchPipe implements PipeTransform {
  transform(items: Guser[], search: string, order: {column:string,asc:boolean}): Guser[] {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (items != null && search != null) {
      items =  items.filter(item => item.login.toUpperCase().indexOf(search.toUpperCase()) !== -1 || (item.firstName+" "+item.lastName).toUpperCase().indexOf(search.toUpperCase()) !== -1);
    }
    if (order.column != ""){
      switch (order.column){
        case "login":

          if (order.asc == true) {
            items.sort(this.cLoginAsc);
          }
          else
            items.sort(this.cLoginDesc);
          break;

        case "firstName":
          if (order.asc == true) {
            items.sort(this.cFirstAsc);
          }
          else
            items.sort(this.cFirstDesc);
          break;

        case "lastName":
          if (order.asc == true) {
            items.sort(this.cLastAsc);
          }
          else
            items.sort(this.cLastDesc);
          break;

        case "lvl":
          if (order.asc == true) {
            items.sort(this.cLvlAsc);
          }
          else
            items.sort(this.cLvlDesc);
          break;

        case "exp":
          if (order.asc == true) {
            items.sort(this.cExpAsc);
          }
          else
            items.sort(this.cExpDesc);
          break;

        case "desciption":
          if (order.asc == true) {
            items.sort(this.cDescrAsc);
          }
          else
            items.sort(this.cDescrDesc);
          break;
      }
    }
      return items;
  }
  cLoginAsc(a:Guser,b:Guser){
    if(a.login.toUpperCase() < b.login.toUpperCase()){
      return -1;
    }
    else if(a.login.toUpperCase() > b.login.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cLoginDesc(a:Guser,b:Guser){
    if(a.login.toUpperCase() > b.login.toUpperCase()){
      return -1;
    }
    else if(a.login.toUpperCase() < b.login.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cFirstAsc(a:Guser,b:Guser){
    if(a.firstName.toUpperCase() < b.firstName.toUpperCase()){
      return -1;
    }
    else if(a.firstName.toUpperCase() > b.firstName.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cFirstDesc(a:Guser,b:Guser){
    if(a.firstName.toUpperCase() > b.firstName.toUpperCase()){
      return -1;
    }
    else if(a.firstName.toUpperCase() < b.firstName.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cLastAsc(a:Guser,b:Guser){
    if(a.lastName.toUpperCase() < b.lastName.toUpperCase()){
      return -1;
    }
    else if(a.lastName.toUpperCase() > b.lastName.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cLastDesc(a:Guser,b:Guser){
    if(a.lastName.toUpperCase() > b.lastName.toUpperCase()){
      return -1;
    }
    else if(a.lastName.toUpperCase() < b.lastName.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cLvlAsc(a:Guser,b:Guser){
    return a.lvl - b.lvl;
  }
  cLvlDesc(a:Guser,b:Guser){
    return b.lvl - a.lvl;
  }
  cExpAsc(a:Guser,b:Guser){
    return a.exp - b.exp;
  }
  cExpDesc(a:Guser,b:Guser){
    return b.exp - a.exp;
  }
  cDescrAsc(a:Guser,b:Guser){
    if(a.description.toUpperCase() < b.description.toUpperCase()){
      return -1;
    }
    else if(a.description.toUpperCase() > b.description.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
  cDescrDesc(a:Guser,b:Guser){
    if(a.description.toUpperCase() > b.description.toUpperCase()){
      return -1;
    }
    else if(a.description.toUpperCase() < b.description.toUpperCase()){
      return 1;
    }
    else
      return 0;
  }
}
