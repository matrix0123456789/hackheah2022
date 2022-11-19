import {Field} from "./field.js";

export class Windmill extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'windmill'
    }
}