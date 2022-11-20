import {Field} from "./field.js";

export class Tax extends Field{
    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'tax'
    }

    steppedIn(player, game) {
        player.money+=100
    }
}