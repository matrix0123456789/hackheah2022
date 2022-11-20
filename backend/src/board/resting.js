import {Field} from "./field.js";

export class Resting extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'resting'
    }

    steppedIn(player, game) {
        player.position=10
    }
}