import { baseModel } from "../baseModel"

export class Item extends baseModel {
    by : string;
    type : string;
    time : string;
    deleted? : string;
    text? : string;
    dead? : string;
    parent? : string;
    poll? : string;
    kids? : number[];
    url? : string;
    score? : string;
    title? : string;
    parts? : string;
    descendants? : string

    static getMockData(){

    }
  }