import { _decorator, Component, Node, instantiate, Prefab } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

enum Chess {
    None = 0,
    Red = 1,
    Blue = 2
}

@ccclass('Game')
export class Game extends Component {
    public static Instance: Game = null; // Singleton

    @property(Node)
    public : Node = null!;
    @property(Prefab)
    public redChess: Prefab = null!;
    @property(Prefab)
    public blueChess : Prefab = null!;
    @property(Prefab)    
    public emptyChess : Prefab = null!;

    public static map: number[][] = new Array(5);
    public static player: number = 0;
    public static player1: number = 1;
    public static player2: number = 2;

    public static player1Score: number = 0;
    public static player2Score: number = 0;

    public static turn: number = 1;
    public static selectedChess: Node = null!;

    start(){
        this.initBoard();
        this.spawnChess();
    }
    onLoad() {
        Game.Instance = this;
    }

    initBoard(){
        for(let i = 0; i < 5; i++){
            Game.map[i] = new Array(5);
            for(let j = 0; j < 5; j++){
                Game.map[i][j] = 0;
            }
        }
        for(let i = 0; i < 5; i++){
            Game.map[0][i] = 1;
            Game.map[4][i] = 2;
        }
        Game.map[1][0] = 1;
        Game.map[1][4] = 1;
        Game.map[2][4] = 1;

        Game.map[2][0] = 2;
        Game.map[3][0] = 2;
        Game.map[3][4] = 2;
    }
    
    spawnChess(){
        for(let j = 0; j < 5; j++){
            for(let i = 0; i < 5; i++){
                if(Game.map[i][j] == 1){
                    let chess = instantiate(this.redChess);
                    chess.parent = this.node;
                    chess.setPosition(140 * j, -140 * (i - 2), 0);
                }
                else if(Game.map[i][j] == 2){
                    let chess = instantiate(this.blueChess);
                    chess.parent = this.node;
                    chess.setPosition(140 * j, -140 * (i - 2), 0);
                }
                // else {
                //     let chess = instantiate(this.emptyChess);
                //     chess.parent = this.node;
                //     chess.setPosition(140 * j, -140 * (i - 2), 0);
                // }
            }
        }
    }

    drawEmptyChess(){
        for(let j = 0; j < 5; j++){
            for(let i = 0; i < 5; i++){
                if(Game.map[i][j] == 0){
                    let chess = instantiate(this.emptyChess);
                    chess.parent = this.node;
                    chess.setPosition(140 * j, -140 * (i - 2), 0);
                }
            }
        }
    }

    selectChess(chess: Node){
        // if(Game.player == Game.player1 && chess.name == "redChess"){
        //     Game.selectedChess = chess;
        // }
        // else if(Game.player == Game.player2 && chess.name == "blueChess"){
        //     Game.selectedChess = chess;
        // }
        Game.selectedChess = chess;
        // Check move
        this.checkMove(chess);
        this.drawEmptyChess();
    }

    checkMove(chess: Node){
        console.log("checkMove");
    }
    
    selectNextMove(chess: Node){
        if (Game.selectedChess == null) return;

        // annoy position & array .-.
        let rowPos = Game.selectedChess.getPosition().y / -140 + 2;
        let colPos = Game.selectedChess.getPosition().x / 140;

        let newPos = chess.getPosition();
        let newRowPos = newPos.y / -140 + 2;
        let newColPos = newPos.x / 140;

        if(Game.map[newRowPos][newColPos] == 0){
            // console.log("Empty chess at", newRowPos, newColPos);
            Game.map[newRowPos][newColPos] = Game.map[rowPos][colPos]; // replace empty chess with selected chess
            Game.map[rowPos][colPos] = 0; // replace selected chess with empty chess
            Game.selectedChess.setPosition(newPos);
            Game.selectedChess = null!;
            Player.Instance.sendMsg({
                tag: 5,
                data: {
                    rowPos: rowPos,
                    colPos: colPos,
                    newRowPos: newRowPos,
                    newColPos: newColPos,
                }
            })
        }
        else{
            console.log("Not empty chess at", newRowPos, newColPos);
        }
    }

}
