import {Field} from "../board/field.js";

export class Chance extends Field {
    available = [{
        execute(player, game) {
        }
    }, {
        execute(player, game) {
        }
    }]

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'chance'
    }

    steppedIn(player, game) {
        let card = this.available.shift();
        this.available.push(card);
        card.execute(player, game)
    }
}