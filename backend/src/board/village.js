import {Field} from "./field.js";

export class Village extends Field {

    owner = null;
    houseCount = 0;
    price = 100;//todo
    basicRent = [20, 100, 200, 300, 400, 500];
    housePrice = 100;

    constructor(name, country, price, housePrice, basicRent) {
        super();
        this.price = price
        this.housePrice = housePrice;
        this.basicRent = basicRent
    }

    allDataToJson() {
        return {type: this.getTypeName(), owner: this.owner?.id ?? null, houseCount: this.houseCount}
    }

    getTypeName() {
        return 'village'
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

    get rent() {
        return this.basicRent[this.houseCount];//todo
    }
}