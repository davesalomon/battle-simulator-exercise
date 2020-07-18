import { v4 as uuid } from "uuid";
import icon from "./icon.svg";
import Hero from "../base";
import { generateAttackValue } from "../../../utils/battle";
// @ts-ignore
import hitSound from "./hit.mp3";

class KnightHero implements Hero {
  static type = "KNIGHT_HERO";
  static image = icon;
  static maxHp = process.env.REACT_APP_SHORT_GAME ? 10 : 100;
  static hitSound = hitSound;

  private maxAttack = 2;
  private maxAttackPerDie = 6;

  id: string;
  hp: number;

  constructor() {
    this.id = uuid();
    this.hp = KnightHero.maxHp;
  }

  attack() {
    return generateAttackValue(this.maxAttack, this.maxAttackPerDie);
  }
}

export default KnightHero;
