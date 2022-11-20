import {Field} from "./field.js";

export class Tavern extends Field{

    allDataToJson() {
        return {type: this.getTypeName()}
    }

    getTypeName() {
        return 'tavern'
    }

    steppedIn(player, game) {
        game.players.forEach(x => x.send('additionalRollPending', {playerId: player.id, price: this.price}))
    }
}