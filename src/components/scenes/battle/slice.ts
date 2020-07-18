import { createSlice } from "@reduxjs/toolkit";
import Monster from "../../../game-objects/monsters/base";
import PlayerHero from "../../../game-objects/heroes/base";

type AddEnemyAction = {
  payload: Monster & { type: string };
};
type AddHeroAction = {
  payload: PlayerHero & { type: string };
};

type BattlingMonster = {
  id: string;
  type: string;
  hp: number;
};

type BattlingPlayerHero = {
  id: string;
  type: string;
  hp: number;
};

type WrappedInitialState = {
  battle: InitialState;
};

export enum FightWinnerType {
  PLAYER = "PLAYER",
  MONSTER = "MONSTER",
  DRAW = "DRAW",
}

type RoundData = {
  damage: number;
  winner: FightWinnerType | null;
  heroRolls: number[];
  monsterRolls: number[];
};

type StatsData = {
  monsterDamageDealt: number;
  heroDamageDealt: number;
  attacksTaken: number;
  roundsWonByPlayer: number;
  roundsWonByMonster: number;
  roundsDrawn: number;
  monsterRollTotal: number;
  heroRollTotal: number;
};

type InitialState = {
  monster: BattlingMonster | null;
  hero: BattlingPlayerHero | null;
  round: RoundData;
  battleWinner: FightWinnerType.PLAYER | FightWinnerType.MONSTER | null;
  stats: StatsData;
};

export const initialState = (state = {} as InitialState): InitialState => {
  state.monster = null;
  state.hero = null;
  state.round = {
    winner: null,
    damage: 0,
    heroRolls: [],
    monsterRolls: [],
  };
  state.battleWinner = null;
  state.stats = {
    attacksTaken: 0,
    heroDamageDealt: 0,
    monsterDamageDealt: 0,
    roundsDrawn: 0,
    roundsWonByMonster: 0,
    roundsWonByPlayer: 0,
    monsterRollTotal: 0,
    heroRollTotal: 0,
  };

  return state;
};

export const counterSlice = createSlice({
  name: "battle",
  initialState: initialState(),
  reducers: {
    startBattle: (state) => {
      return initialState();
    },
    addMonster: (state, action: AddEnemyAction) => {
      state.monster = {
        id: action.payload.id,
        type: action.payload.type,
        hp: action.payload.hp,
      };
    },
    addHero: (state, action: AddHeroAction) => {
      state.hero = {
        id: action.payload.id,
        type: action.payload.type,
        hp: action.payload.hp,
      };
    },
    setHeroDiceRollValues: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      if (!state.hero) {
        return;
      }
      state.round.heroRolls = action.payload;
    },
    setMonsterDiceRollValues: (
      state,
      action: {
        payload: number[];
      }
    ) => {
      if (!state.monster) {
        return;
      }
      state.round.monsterRolls = action.payload;
    },
    resetRound: (state) => {
      state.round = {
        monsterRolls: [],
        heroRolls: [],
        damage: 0,
        winner: null,
      };
    },
    calculateDamageAndEndRound: (state) => {
      if (!state.monster || !state.hero) {
        return;
      }
      const monsterTotal = state.round.monsterRolls.reduce(
        (acc, rollValue) => acc + rollValue,
        0
      );
      const heroTotal = state.round.heroRolls.reduce(
        (acc, rollValue) => acc + rollValue,
        0
      );

      state.stats.monsterRollTotal += monsterTotal;
      state.stats.heroRollTotal += heroTotal;
      state.stats.attacksTaken += 1;

      const isDraw = monsterTotal === heroTotal;
      const winner = isDraw
        ? FightWinnerType.DRAW
        : monsterTotal < heroTotal
        ? FightWinnerType.PLAYER
        : FightWinnerType.MONSTER;

      if (winner === FightWinnerType.PLAYER) {
        const damage = heroTotal - monsterTotal;
        state.monster.hp -= damage;
        state.round.damage = damage;
        state.stats.roundsWonByPlayer += 1;
        state.stats.heroDamageDealt += damage;
      }
      if (winner === FightWinnerType.MONSTER) {
        const damage = monsterTotal - heroTotal;
        state.hero.hp -= damage;
        state.round.damage = damage;
        state.stats.roundsWonByMonster += 1;
        state.stats.monsterDamageDealt += damage;
      }

      if (winner === FightWinnerType.DRAW) {
        state.stats.roundsDrawn += 1;
      }

      state.round.winner = winner;

      if (state.hero.hp <= 0) {
        state.battleWinner = FightWinnerType.MONSTER;
      }
      if (state.monster.hp <= 0) {
        state.battleWinner = FightWinnerType.PLAYER;
      }
    },
  },
});

export const {
  addMonster,
  addHero,
  startBattle,
  setHeroDiceRollValues,
  setMonsterDiceRollValues,
  calculateDamageAndEndRound,
  resetRound,
} = counterSlice.actions;

export const selectMonster = (state: WrappedInitialState) =>
  state.battle.monster;

export const selectHero = (state: WrappedInitialState) => state.battle.hero;

export const selectHeroDice = (state: WrappedInitialState) =>
  state.battle.round.heroRolls;

export const selectMonsterDice = (state: WrappedInitialState) =>
  state.battle.round.monsterRolls;

export const selectRoundWinner = (state: WrappedInitialState) =>
  state.battle.round.winner;

export const selectRoundDamageAmount = (state: WrappedInitialState) =>
  state.battle.round.damage;

export const selectBattleWinner = (state: WrappedInitialState) =>
  state.battle.battleWinner;

export const selectBattleStats = (state: WrappedInitialState) =>
  state.battle.stats;

export default counterSlice.reducer;
