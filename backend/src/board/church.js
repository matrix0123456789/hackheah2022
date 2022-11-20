import {Field} from "./field.js";

export class Church extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'church'
    }

    steppedIn(player, game) {
    }
}