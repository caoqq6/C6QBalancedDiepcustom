"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Arena_1 = __importDefault(require("../Native/Arena"));
const TeamBase_1 = __importDefault(require("../Entity/Misc/TeamBase"));
const TankBody_1 = __importDefault(require("../Entity/Tank/TankBody"));
const TeamEntity_1 = require("../Entity/Misc/TeamEntity");
const arenaSize = 11150;
const baseWidth = 2007;
class Teams2Arena extends Arena_1.default {
    constructor(game) {
        super(game);
        this.playerTeamMap = new Map();
        this.updateBounds(arenaSize * 2, arenaSize * 2);
        this.blueTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, 3), -arenaSize + baseWidth / 2, 0, arenaSize * 2, baseWidth);
        this.redTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, 4), arenaSize - baseWidth / 2, 0, arenaSize * 2, baseWidth);
    }
    spawnPlayer(tank, client) {
        tank.positionData.values.y = 2 * arenaSize * Math.random() - arenaSize;
        const xOffset = (Math.random() - 0.5) * baseWidth;
        const entities = this.game.entities.inner.slice(0, this.game.entities.lastId)
            .filter(e => e instanceof TankBody_1.default)
            .map(e => e?.relationsData ? e.relationsData.values.team : null);
        const red = entities.filter(team => team === this.redTeamBase).length;
        const blue = entities.filter(team => team === this.blueTeamBase).length;
        const base = this.playerTeamMap.get(client) ||
            (red === blue
                ? [this.blueTeamBase, this.redTeamBase][Math.random() * 2 | 0]
                : (red < blue ? this.redTeamBase : this.blueTeamBase));
        tank.relationsData.values.team = base.relationsData.values.team;
        tank.styleData.values.color = base.styleData.values.color;
        tank.positionData.values.x = base.positionData.values.x + xOffset;
        this.playerTeamMap.set(client, base);
        if (client.camera)
            client.camera.relationsData.team = tank.relationsData.values.team;
    }
}
exports.default = Teams2Arena;
