import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'isDisabled'
})
export class IsDisabledPipe implements PipeTransform
{

  transform(array: any, key: string): any
  {

    let val = array.find(v => v.hasOwnProperty(key));
    return val? val[key] : false;

  }

}