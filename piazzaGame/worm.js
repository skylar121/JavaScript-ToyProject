class Worm {
    constructor() {
        this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
        this.dir = 'ArrowUp';
        // 지렁이가 방향을 틀때는 꼭 옆으로 꺾어서 가야함
        this.dirNext = 'ArrowUp';
    }

    renderWorm() {
        this.wormBody.forEach((item) => {
            item.renderTile();
        })
    }

    // 벌레가 벽에 충돌하는거 체크
    collisionCheck(wormHead) {
        const leftEdge = (wormHead.col === 0); // 벌레 머리가 왼쪽끝에 닿으면 true 반환
        const topEdge = (wormHead.row === 0); // 벌레 머리가 위에 닿으면 true 반환
        const rightEdge = (wormHead.col === tileWidth - 1); // 벌레 머리가 왼쪽끝에 닿으면 true 반환
        // 기준점이 왼쪽 끝이어서 -1 해줌
        const downEdge = (wormHead.row === tileHeight - 1); // 벌레 머리가 바닥에 닿으면 true 반환
        const collisionEdge = leftEdge || topEdge || rightEdge || downEdge; // 하나라도 true가 존재하면 true

        let collisionBody;
        this.wormBody.forEach((item) => {
            if(wormHead.collisionCheck(item)) { // 타일 클래스의 collisionCheck
                collisionBody = true;
            }
        })
        
        return collisionEdge || collisionBody;
    }

    // 지렁이 이동 함수
    moveWorm() {
        const head = this.wormBody[0];

        // 이동에 따른 벌레의 새로운 머리
        // 방향을 이동할때마다 머리를 새로 만들고, 끝부분 꼬리를 지우면 이동하는 것처럼 보임
        let newHead;
        this.dir = this.dirNext;

        if(this.dir === 'ArrowRight') {
            newHead = new Tile(head.col+1, head.row);
        } else if(this.dir === 'ArrowDown') {
            newHead = new Tile(head.col, head.row + 1);
        } else if(this.dir === 'ArrowLeft') {
            newHead = new Tile(head.col -1, head.row);
        } else if (this.dir === 'ArrowUp') {
            newHead = new Tile(head.col, head.row - 1);
        }

        // 머리가 충돌하면 게임 오버
        if(this.collisionCheck(newHead)) {
            renderGameOver();
        }

        this.wormBody.unshift(newHead);

        // 피자를 먹는 로직
        if (newHead.collisionCheck(pizza.pos)) {
            ctxBg.clearRect(0, 0, cWidth, cHeight);
            score++;
            pizza.movePizza();
        } else {
            this.wormBody.pop();
        }
    }

    // 지렁이 이동 예외처리
    checkDirection(dirKey) {
        // 지렁이가 오른쪽으로 갈때 사용자가 왼쪽키를 누르면
        if(this.dir === 'ArrowRight' && dirKey === 'ArrowLeft') {
            return;
        } else if(this.dir === 'ArrowDown' && dirKey === 'ArrowUp') {
            return;
        } else if(this.dir === 'ArrowLeft' && dirKey === 'ArrowRight') {
            return;
        } else if(this.dir === 'ArrowUp' && dirKey === 'ArrowDown') {
            return;
        }

        this.dirNext = dirKey;
    }
}