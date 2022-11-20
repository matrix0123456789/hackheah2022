import {Field} from "./field.js";

export class Windmill extends Field {

    allDataToJson() {
        return {
            type: this.getTypeName(),
            price: this.price,
            rent: this.rent
        }

    }

    getTypeName() {
        return 'windmill'
    }
    steppedIn(player, game) {
        if (this.owner == null) {
            return true;//wait for decision
        } else if (this.owner == player) {
            //do nothing
        } else {
            this.owner.money += this.rent;
            player.money -= this.rent;
            if (player.money < 0) {
                game.bancrupt(player, this.owner);
            }
        }
    }
    price = 200;
    rent = 20;
}