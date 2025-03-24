"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Barrel_1 = __importDefault(require("../Tank/Barrel"));
const TankDefinitions_1 = __importDefault(require("../../Const/TankDefinitions"));
const AbstractBoss_1 = __importDefault(require("./AbstractBoss"));
class FallenOverlord extends AbstractBoss_1.default {
    constructor(game) {
        super(game);
        this.nameData.values.name = 'Fallen Overlord';
        for (const barrelDefinition of TankDefinitions_1.default[12].barrels) {
            const def = Object.assign({}, barrelDefinition, { droneCount: 7, reload: 0.25 });
            def.bullet = Object.assign({}, def.bullet, { sizeRatio: 0.56, speed: 1.7, damage: 0.5, health: 12.5 });
            this.barrels.push(new Barrel_1.default(this, def));
        }
    }
    get sizeFactor() {
        return this.physicsData.values.size / 50;
    }
    tick(tick) {
        super.tick(tick);
        if (this.ai.state !== 3) {
            this.positionData.angle += this.ai.passiveRotation;
        }
    }
}
exports.default = FallenOverlord;
