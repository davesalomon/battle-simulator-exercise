import { v4 as uuid } from "uuid";
import icon from "./icon.svg";
import Monster from "../base";
import { generateAttackValue } from "../../../utils/battle";
// @ts-ignore
import hitSound from "./hit.mp3";

class SlugMonster implements Monster {
  static type = "SLUG_MONSTER";
  static image = icon;
  static maxHp = 100;
  static hitSound = hitSound;

  private maxAttack = 2;
  private maxAttackPerDie = 6;

  id: string;
  hp: number;

  constructor() {
    this.id = uuid();
    this.hp = SlugMonster.maxHp;
  }

  attack() {
    return generateAttackValue(this.maxAttack, this.maxAttackPerDie);
  }
}

export default SlugMonster;
