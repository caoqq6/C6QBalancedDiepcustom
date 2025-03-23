"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bullet_1 = __importDefault(require("./Bullet"));
class Cshotgun extends Bullet_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        const bulletDefinition = barrel.definition.bullet;
        this.baseAccel = barrel.bulletAccel + (Math.floor(Math.random() * 4 + 0) - Math.floor(Math.random() * 4 + 0));
        this.pierceEffect = false;
        this.baseSpeed = barrel.bulletAccel + 30 + ((Math.floor(Math.random() * 12.5 + 0) / (this.baseAccel / 20)) - (Math.floor(Math.random() * 12.5 + 0)) / (this.baseAccel / 20));
    }
    tick(tick) {
        super.tick(tick);
        let BaseAccelDecay = 0.1 * (this.baseAccel / 20);
        this.baseAccel -= BaseAccelDecay;
        if (this.baseAccel < 0.01) {
            this.baseAccel = 0;
        }
    }
}
exports.default = Cshotgun;
