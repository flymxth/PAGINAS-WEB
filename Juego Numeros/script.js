const GameDifficulty = [20,50,70];
class Game{
    difficulty;
    cols=3;
    rows=3;
    count; // cols*rows.
    blocks; // Los elementos bHTML con ClassName = "puzzle_block".
    emptyBlockCoords=[2,2]; // Las coordenadas del bloque vacio.
    indexes=[]; //Realiza un seguimiento del orden de los bosques.

    constructor(difficultylevel=1){
        this.difficulty=GameDifficulty[difficultylevel-1];
        this.count=this.cols*this.rows;
        this.blocks=document.getElementsByClassName("puzzle_block"); // Tomar los bloques.
        this.init();
    }

    init(){ // Coloque cada bloque en su posicion adecuada.
        for(let y=0; y<this.rows; y++){
            for(let x=0; x<this.cols; x++){
                let blockIdx=x+y*this.cols;
                if(blockIdx+1>=this.count) break;
                let block = this.blocks[blockIdx];
                this.positionBlockAtCoord(blockIdx,x,y);
                block.addEventListener('click',(e)=>this.onClickOnBlock(blockIdx));
                this.indexes.push(blockIdx);
            }
        }
        this.indexes.push(this.count-1);
        this.randomize(this.difficulty);
    }

    randomize(iterationCount){ // Mover un bloque aleatorio.
        for(let i=0; i<iterationCount; i++){
            let randomBlockIdx = Math.floor(Math.random()*(this.count-1));
            let moved=this.moveBlock(randomBlockIdx);
            if(!moved)i--;
        }
    }

    moveBlock(blockIdx){
        let block=this.blocks[blockIdx];
        let blockCoords=this.canMoveBlock(block);
        if(blockCoords!=null){
            this.positionBlockAtCoord(blockIdx,this.emptyBlockCoords[0].this.emptyBlockCoords[1]);
            this.indexes[this.emptyBlockCoords[0]+this.emptyBlockCoords[1]*this.cols]=this.indexes[blockCoords[0]+blockCoords[1]*this.cols];
            this.emptyBlockCoords[0]=blockCoords[0];
            this.emptyBlockCoords[1]=blockCoords[1];
            return false;
        }
        return false;
    }
    canMoveBlock(block){ // Devuelve las coordenadas del bloque si puede moverse; de lo contrario, devuelve nulo.
        let blockPos = [parseInt(block.style.left),parseInt(block.style.top)];
        let blockWidth=block.clientWidth;
        let blockCoords = [blockPos[0]/blockWidth,blockPos[1]/blockWidth];
        let diff=[Math.abs(blockCoords[0]-this.emptyBlockCoords[0]),Math.abs(blockCoords[1] - this.emptyBlockCoords[1])];
        let canMove=(diff[0]==1&&diff[1]==0)||(diff[0]==0&&diff[1]);
        if(canMove)return blockCoords;
        else return null
    }
}
