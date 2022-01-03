class GlassBottle
{
    constructor(x,y,w,h)
    {
        this.x= x
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = loadImage("./assets/glassbottle.png")
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(myWorld,this.body);
    }
    display()
    {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image,0,0,this.w,this.h);
        pop();
    }
}