class Bar {
    constructor(x,y,width,height) {
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      World.add(world, this.body);
    }

    remove(){
      World.remove(world, this.body);
    }

    display(){
      rectMode(CENTER);

      fill("brown");
      rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }

    displayWhite(){
      rectMode(CENTER);

      fill("white");
      rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
  };
