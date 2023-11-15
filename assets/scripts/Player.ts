import { _decorator, Component, Node,} from 'cc';
const { ccclass, property } = _decorator;

export enum WsTags {
    invalid = 0,
    login = 1,
    loginRsp = 2,
    userInfo = 3,
    roomInfo = 4,
    run = 5,
    stop = 6,
}

export interface WsMsg {
    tag: WsTags;
    data: any;
}

@ccclass('Player')
export class Player extends Component {
    static Instance: Player = null; // Singleton

    @property(cc.String)
    wsServer: string = 'ws://localhost:8080';

    private client: WebSocket = null;

    joinRoom(roomId: string) {
        this.sendMsg({
            tag: WsTags.login,
            data: {
                roomId: roomId,
            }
        });
        console.log('client join room', roomId);
    }
    
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.client = new WebSocket(this.wsServer);
        this.client.onopen = () => {
            console.log('Connected to server');
        }
        this.client.onerror = (err) => {
            console.log(err);
        }
        this.client.onmessage = (msg) => {
            console.log('Server send message', msg);
        }
        this.client.onclose = () => {
            console.log('Disconnected to server');
        }
        Player.Instance = this;
    }

    start(){
        Player.Instance = this;
    }

    public sendMsg(msg: WsMsg) {
        this.client.send(JSON.stringify(msg));
    }
}
