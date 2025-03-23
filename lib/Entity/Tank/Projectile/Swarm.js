"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swarm = void 0;
const Drone_1 = __importDefault(require("./Drone"));
class Swarm extends Drone_1.default {
    constructor(barrel, tank, tankDefinition, shootAngle) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.ai.viewRange = 1000 * tank.sizeFactor * 2;
        this.physicsData.values.flags |= 8 | 256;
        this.physicsData.values.pushFactor = 1;
        this.pierceEffect = true;
    }
}
exports.Swarm = Swarm;
