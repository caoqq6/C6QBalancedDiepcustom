"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Barrel_1 = __importDefault(require("../Barrel"));
const Bullet_1 = __importDefault(require("./Bullet"));
const AI_1 = require("../../AI");
const GliderBarrelDefinition = {
    angle: Math.PI - 5 / 25 * Math.PI,
    offset: 0,
    size: 70,
    width: 37.8,
    delay: 0.5,
    reload: 0.75,
    recoil: 3.8,
    isTrapezoid: false,
    trapezoidDirection: 0,
    addon: null,
    bullet: {
        type: "bullet",
        health: 0.6,
        damage: 0.6,
        speed: 0.7,
        scatterRate: 1,
        lifeLength: 0.5,
        sizeRatio: 1,
        absorbtionFactor: 1
    }
};
class Glider extends Bullet_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.reloadTime = 15;
        this.cameraEntity = tank.cameraEntity;
        const gliderBarrels = this.gliderBarrels = [];
        this.pierceEffect = false;
        const s1 = new Barrel_1.default(this, { ...GliderBarrelDefinition });
        const s2Definition = { ...GliderBarrelDefinition };
        s2Definition.angle += Math.PI / 2.571428571;
        const s2 = new Barrel_1.default(this, s2Definition);
        s1.styleData.values.color = this.styleData.values.color;
        s2.styleData.values.color = this.styleData.values.color;
        gliderBarrels.push(s1, s2);
        this.inputs = new AI_1.Inputs();
        this.inputs.flags |= 1;
    }
    get sizeFactor() {
        return this.physicsData.values.size / 50;
    }
    tick(tick) {
        this.reloadTime = this.tank.reloadTime;
        super.tick(tick);
        if (this.deletionAnimation)
            return;
    }
}
exports.default = Glider;
