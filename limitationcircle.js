class Limitationcircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = ("#c0c0c0")  
    this.diameter = 60 //durchmesser
  }
  

  draw() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }
  
  collide(playerx,playery){
    let vplayer = createVector(playerx,playery)
    let vcircle = createVector(this.x,this.y);
    let vsum = vplayer.sub(vcircle);
    //vsum = Abstand zwischen Spielermittelpunkt und Circlemittelpunkt
    
    if (vsum.mag() > this.diameter/2){
      return false
    } else {
      return true
    }
  }
  
  startcircle(){
    this.color = ("#f72fe3")
  }
  
  endcircle(){
    this.color =("#b134eb")
  }
  
  cpcircle(){
    this.color = ("#00e5ff")
  }
  
  halfcp(){
    this.color = ("#ccffff")
  }
  
  nocp(){
    this.color = ("#c0c0c0") 
  }
}
