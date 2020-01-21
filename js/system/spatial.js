
export { Vector2, Transform, Angle, Rectangle }

class Vector2{
    x = 0.0;
    y = 0.0;

    static origin = Vector2();
    static unit_x = Vector2(x=1.0);
    static unit_y = Vector2(y=1.0);

    constructor(x=0.0, y=0.0){
        this.x = x;
        this.y = y;
    }

    translate(translation){
        return new Vector2(this.x + translation.x, this.y + translation.y);
    }

    rotate(degrees){
        throw "not implemented yet";
    }
};

class Angle {
    radian = 0.0;
    constructor(degrees){
        this.radian = degrees * Math.PI; // TODO: this this, this is incorrect but I'm in a bus, no way to check right now
        throw "fix me";
    }
    get degrees() { throw "implement me"; }
    get radian() { throw "implement me"; }
};

class Transform {
    position = new Vector2();
    scale = new Vector2();
    orientation = new Angle();
};

// BEWARE, THIS RECTANGLE CANNOT BE ROTATED
class Rectangle {
    top_left = new Vector2();
    bottom_right = new Vector2();

    get width(){
        return this.bottom_right.x - this.top_left.x;
    }
    get height(){
        return this.bottom_right.y - this.top_left.y;
    }

};

