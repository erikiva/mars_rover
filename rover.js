

function Rover(position, direction, name, grid) {
  if (grid.setObstacle(position)) {
    this.position = position;
    this.direction = direction;
    this.name = name;
    this.grid = grid;
   } else { throw "Unable to place " + name + " on that position"
  }
}

function Grid(SN, WE){
  
  this.grid = new Array(SN);
  for (var i = 0; i < SN; i++) {
    this.grid[i] = new Array(WE);
  }
  this.height = SN;
  this.width = WE;

}

Grid.prototype.setObstacle = function(coordinates){
  if (this.grid[coordinates[0]][coordinates[1]] == 'x'){
    console.log("Invalid position");
    return false;
  } else {
    this.grid[coordinates[0]][coordinates[1]] = 'x';
    return true;
  }
}

Grid.prototype.moveObstacle = function(oldPos, newPos){
  if (this.validatePosition(newPos) && !this.validatePosition(oldPos) ){
    this.grid[oldPos[0]][oldPos[1]] = '';
    this.grid[newPos[0]][newPos[1]] = 'x';
    return true;
  } else {
    return false;
  }

}

Rover.prototype.move = function(squares){
  var newPos = [this.position[0], this.position[1]];
  switch(this.direction) {
    case 'N':
      newPos[0] += squares
      break;
    case 'E':
      newPos[1] += squares
      break;
    case 'S':
      newPos[0] -= squares
      break;
    case 'W':
      newPos[1] -= squares
      break;
  };
  this.grid.correctPosition(newPos);
  if (this.grid.moveObstacle(this.position, newPos)) {
    this.position = newPos;
    console.log("Current Position for " + this.name + " : [" + this.position[0] + ", " + this.position[1] + "]");
    return true;
  } else {
    console.log("Obstacle in position [" + newPos[0] + ", " + newPos[1] +"] Unable to continue");
    return false;
  }

}

Rover.prototype.goForward = function() {
  return this.move(1);
  
}

Rover.prototype.goBack= function() {
  return this.move(-1);

}

Rover.prototype.turnRight = function() {
  switch(this.direction) {
    case 'N':
      this.direction = 'E'
      break;
    case 'E':
      this.direction = 'S'
      break;
    case 'S':
      this.direction = 'W'
      break;
    case 'W':
      this.direction = 'N'
      break;
  };

  console.log("Current Direction for " + this.name + ": [" + this.direction  + "]")
}

Rover.prototype.turnLeft = function() {
  switch(this.direction) {
    case 'N':
      this.direction = 'W'
      break;
    case 'E':
      this.direction = 'N'
      break;
    case 'S':
      this.direction = 'E'
      break;
    case 'W':
      this.direction = 'S'
      break;
  };

  console.log("Current Direction for " + this.name + ": [" + this.direction  + "]")
}

Rover.prototype.moveAlong = function(sequence) {

  sequence = sequence.toLowerCase();
  console.log(sequence);
  loop:
  for (var i = 0, len = sequence.length; i < len; i++) {
    switch(sequence[i]){
      case 'f':
        if (!this.goForward()) break loop;
        break;
      case 'b':
        if (!this.goBack())  break loop;
        break;
      case 'l':
        this.turnLeft();
        break;
      case 'r':
        this.turnRight();
        break;
      default:
        console.log("Unrecognized command : " + sequence[i] );
        break;
    }
  }

  console.log("Current Direction for " + this.name + ": [" + this.direction  + "]", 
    "Current Position for " + this.name + ": [" + this.position[0] + ", " + this.position[1] + "]")
}

Grid.prototype.correctPosition = function (newPos){
    if (newPos[0] < 0) newPos[0] = this.height + newPos[0];
    else if (newPos[0] > this.height - 1) newPos[0] = newPos[0] - this.height;

    if (newPos[1] < 0) newPos[1] = this.width + newPos[1];
    else if (newPos[0] > this.width - 1) newPos[1] = newPos[1] - this.width;

}

Grid.prototype.validatePosition = function (newPos){
  if (this.grid[newPos[0]][newPos[1]] == 'x'){
    return false;
  }   
  return true;

}
var grid = new Grid(10,10);
grid.setObstacle([2,5]);
//grid.setObstacle([2,7]);
grid.setObstacle([1,0]);
//grid.setObstacle([9, 6]);


var walle = new Rover([0,0], 'N', "Wall-E", grid);

walle.goForward();
walle.goBack();
walle.turnLeft();
walle.goForward();
walle.goForward();
walle.moveAlong('FFfrfflfffbb');

var eve = new Rover([1,0], 'N',  "Eve", grid);
eve.goForward();
eve.moveAlong('ffbZblllrrr');
