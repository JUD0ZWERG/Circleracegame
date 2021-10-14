class Item{
    constructor (x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }

    draw () {
        fill(this.color)
        stroke(this.color)
        triangle(this.x - 10, this.y -10, this. x + 10, this.y - 10, this.x, this.y + 10)
    }

    collide(player){
        let vplayer = createVector(player.x,player.y)
        let vtriangle = createVector(this.x,this.y);
        let vsum = vplayer.sub(vtriangle);
        //vsum = Abstand zwischen Spielermittelpunkt und Circlemittelpunkt
        
        if (vsum.mag() > 10){
          return false
        } else {
          return true
        }
    }
}