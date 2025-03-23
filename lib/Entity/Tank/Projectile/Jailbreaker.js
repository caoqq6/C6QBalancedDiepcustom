"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bullet_1 = __importDefault(require("./Bullet"));
const AI_1 = require("../../AI");
const AutoTurret_1 = __importDefault(require("../AutoTurret"));
const AutoTurret_2 = require("../AutoTurret");
const MountedTurretDefinition = {
    ...AutoTurret_2.AutoTurretDefinition,
    bullet: {
        ...AutoTurret_2.AutoTurretDefinition.bullet,
        speed: 1.2,
        damage: 0.3,
        health: 1,
    }
};
class JailbreakerRocket extends Bullet_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.reloadTime = 1;
        this.inputs = new AI_1.Inputs();
        this.cameraEntity = tank.cameraEntity;
        const MountedTurretDefinition = new AutoTurret_1.default(this, { ...AutoTurret_2.AutoTurretDefinition });
    }
    get sizeFactor() {
        return this.physicsData.values.size / 50;
    }
    tick(tick) {
        this.reloadTime = this.tank.reloadTime;
        super.tick(tick);
        if (this.deletionAnimation)
            return;
        if (tick - this.spawnTick >= this.tank.reloadTime)
            this.inputs.flags |= 1;
    }
}
exports.default = JailbreakerRocket;
