import { Player } from "./Player";

import { _decorator, Component, EditBox } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Login')
export class Login extends Component {
    @property(cc.EditBox)
    roomId: string = null;

    start(){

    }

    joinRoom() {
        console.log('join room', this.roomId.string);
        Player.Instance.joinRoom(this.roomId.string);
        cc.director.loadScene('Play');
    }
}