class Tile {
    // col 가로로 몇번째 칸, row 세로로 몇번째 칸
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.posX = this.col * tileSize; // 칸번호에 사이즈 곱해주는것
        this.posY = this.row * tileSize;
    }

    // bg의 초기값 설정
    renderTile(bg = 'green') {
        ctx.fillStyle = bg;
        // ctx.fillRect(x좌표, y좌표, x축에서 몇픽셀 넓이, y축에서 몇픽셀 넓이)
        ctx.fillRect(this.posX, this.posY, tileSize, tileSize);
    }
    
    renderImg(bg = './pizza-big.png') {
        // img 요소 만들어야 함
        const image = new Image(tileSize, tileSize);
        image.src = bg;
        // drawImage 함수: 이미지를 그려줍니다. 그려줄 이미지 요소, x, y, 가로 사이즈, 세로 사이즈 전달 필요, 소스를 불러오기 다음에 해야함, 인자로는 image 소스 전달
        image.addEventListener('load', () => {
            ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize);
        })
    }

    // 충돌 체크 메서드 (피자 타일과 벌레의 머리 타일)
    collisionCheck(target) {
        return this.col === target.col && this.row === target.row; // 뒤의 boolean 값 반환
    }
}