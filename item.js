class Item{
    constructor (x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }

    draw () {
        fill(this.color)
        stroke(this.color)
        //triangle(, , , , , )
        triangle(int(this.x) - 10,int(this.y) +8.66,int(this.x) + 10,int(this.y) + 8.66,int(this.x),int(this.y) - 8.66)
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