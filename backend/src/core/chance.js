import {Field} from "../board/field.js";
import {Village} from "../board/village.js";

export class Chance extends Field {
    available = [{
        text: 'Rzucasz kośćmi, wygrywasz lub przegrywasz 50 TODO',
        execute(player, game) {
        }
    }, {
        text: 'Otrzymujesz pańszczyznę od chłopów w wysokości 100',
        execute(player, game) {
            player.money += 100
        }
    }, {
        text: 'Przesuwasz się o 5 kroków do przodu',
        execute(player, game) {
            player.position += 5
            if (player.position > game.board.length) {
                player.position %= game.board.length;
                player.money += 200;
            }
        }
    }, {
        text: 'Na najbliższej twojej wiosce dostajesz za darmo jedną chłopską chatę',
        execute(player, game) {
            for (let i = 0; i < 40; i++) {
                let field = game.board[(player.position + i) % game.board.length];
                if (field instanceof Village && field.owner == player && field.houseCount < 5) {
                    field.houseCount++;
                    return
                }
            }
        }
    }, {
        text: 'Masz urodziny, dsostajesz od każdego księcia po 100',
        execute(player, game) {
            for (const x of game.players) {
                if (x != player) {
                    player.money += 100;
                    x.money -= 100;
                    if (x.money < 0) {
                        game.bancrupt(x, player);
                    }
                }
            }
        }
    }, {
        text: 'Przechodzisz na pole Olesno, jeśli jest wolne dostajesz je za darmo',
        execute(player, game) {
            let field = game.board[31];
            if (field.owner == null) {
                field.owner = player;
            } else if (field.owner != player) {
                field.owner.money += field.rent;
                player.money -= field.rent;
                if (player.money < 0) {
                    game.bancrupt(player, field.owner);
                }
            }
        }
    }, {
        text: 'Przechodzisz na pole Selistat, jeśli jest wolne dostajesz je za darmo',
        execute(player, game) {
            let field = game.board[9];
            if (field.owner == null) {
                field.owner = player;
            } else if (field.owner != player) {
                field.owner.money += field.rent;
                player.money -= field.rent;
                if (player.money < 0) {
                    game.bancrupt(player, field.owner);
                }
            }
        }
    }, {
        text: 'Przychodzi powódź, tracisz jeden dom',
        execute(player, game) {
            for (let i = 0; i < 40; i++) {
                let field = game.board[(player.position + i) % game.board.length];
                if (field instanceof Village && field.owner == player && field.houseCount >0) {
                    field.houseCount--;
                    return
                }
            }
        }
    },{
        text: '',
        execute(player, game) {

        }
    },]

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