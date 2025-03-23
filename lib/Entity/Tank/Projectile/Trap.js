"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bullet_1 = __importDefault(require("./Bullet"));
const util_1 = require("../../../util");
class Trap extends Bullet_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.collisionEnd = 0;
        const bulletDefinition = barrel.definition.bullet;
        const statLevels = tank.cameraEntity.cameraData?.values.statLevels.values;
        const BulletSpeed = statLevels ? statLevels[4] : 0;
        this.baseSpeed = 36 + (BulletSpeed * 5.4) + (Math.floor(Math.random() * 1.8 + 0) - Math.floor(Math.random() * 1.8 + 0));
        if (tankDefinition && tankDefinition.id === 34)
            this.baseSpeed = 36 + (BulletSpeed * 5.4) + (Math.floor(Math.random() * 1.8 + 0) - Math.floor(Math.random() * 1.8 + 0)) + 25;
        this.baseAccel = 0;
        this.physicsData.values.sides = bulletDefinition.sides ?? 3;
        if (this.physicsData.values.flags & 8)
            this.physicsData.values.flags ^= 8;
        this.physicsData.values.flags |= 32;
        this.styleData.values.flags |= 16;
        this.styleData.values.flags &= ~128;
        this.collisionEnd = this.lifeLength >> 3;
        this.pierceEffect = false;
        this.pierceEffect = false;
        this.lifeLength = (600 * barrel.definition.bullet.lifeLength) >> 3;
        if (tankDefinition && tankDefinition.id === -4)
            this.collisionEnd = this.lifeLength - 1;
        this.positionData.values.angle = Math.random() * util_1.PI2;
    }
    tick(tick) {
        super.tick(tick);
        if (tick - this.spawnTick === this.collisionEnd) {
            if (this.physicsData.values.flags & 32)
                this.physicsData.flags ^= 32;
            this.physicsData.values.flags |= 8;
        }
    }
}
exports.default = Trap;
