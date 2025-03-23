"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Barrel_1 = __importDefault(require("../Barrel"));
const Bullet_1 = __importDefault(require("./Bullet"));
const AI_1 = require("../../AI");
const LauncherRocketBarrelDefinition = {
    angle: Math.PI,
    offset: 0,
    size: 70,
    width: 72,
    delay: 0,
    reload: 0.3,
    recoil: 3.333,
    isTrapezoid: true,
    trapezoidDirection: 0,
    addon: null,
    bullet: {
        type: "bullet",
        health: 0.3,
        damage: 3 / 5,
        speed: 1.5,
        scatterRate: 1,
        lifeLength: 0.175,
        sizeRatio: 1,
        absorbtionFactor: 1
    }
};
class LauncherRocket extends Bullet_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.reloadTime = 1;
        this.inputs = new AI_1.Inputs();
        this.cameraEntity = tank.cameraEntity;
        this.pierceEffect = false;
        const rocketBarrel = this.rocketBarrel = new Barrel_1.default(this, { ...LauncherRocketBarrelDefinition });
        rocketBarrel.styleData.values.color = this.styleData.values.color;
    }
    get sizeFactor() {
        return this.physicsData.values.size / 50;
    }
    tick(tick) {
        this.reloadTime = this.tank.reloadTime;
        if (!this.deletionAnimation && this.rocketBarrel)
            this.rocketBarrel.definition.width = ((this.barrelEntity.definition.width / 2) * LauncherRocketBarrelDefinition.width) / this.physicsData.values.size;
        super.tick(tick);
        if (this.deletionAnimation)
            return;
        if (tick - this.spawnTick >= this.tank.reloadTime)
            this.inputs.flags |= 1;
    }
}
exports.default = LauncherRocket;
