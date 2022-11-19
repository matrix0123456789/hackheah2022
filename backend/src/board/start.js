import {Field} from "./field.js";

export class Start extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'start'
    }
}