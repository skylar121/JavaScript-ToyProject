class Pizza {
    constructor() {
        this.pos = new Tile(5, 5);
    }

    renderPizza() {
        this.pos.renderImg();
    }

    movePizza() {
        // 첫번째부터 마지막 타일중 랜덤한 곳에 위치
        const col = Math.floor(Math.random() * (tileWidth - 2) + 1);
        const row = Math.floor(Math.random() * (tileHeight - 2) + 1);
        this.pos = new Tile(col, row);
    }
}