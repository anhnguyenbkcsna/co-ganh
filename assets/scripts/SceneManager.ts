import { _decorator, Component, Scene } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    loadMenuScene(){
        cc.director.loadScene('Menu');
    }
    loadSelectPlayer(){
        cc.director.loadScene('SelectPlayer');
    }
    loadPlayScene(){
        cc.director.loadScene('Play');
    }
    loadJoinRoom(){
        cc.director.loadScene('JoinRoom');
    }
}