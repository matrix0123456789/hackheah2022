import {Field} from "./field.js";

export class Tavern extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'tavern'
    }

    steppedIn(player, game) {
    }
}