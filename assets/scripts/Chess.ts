import { Game } from './Game';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Chess')
export class Chess extends Component {
    @property(Node)
    public node: Node = null!;
    
    start() {

    }
    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }
    }
    onTouchStart(event: EventTouch) {
        const target = event.target as Node;
        if (target === this.node) {
            this.node.opacity = 100;
        }      
    }

    selectChess() {
        Game.Instance.selectChess(this.node);
    }
    selectNextMove() {
        Game.Instance.selectNextMove(this.node);
    }
    
    update(deltaTime: number) {
        
    }
}