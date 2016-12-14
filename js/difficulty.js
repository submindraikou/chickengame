//Create the images for the falling objects
rockImage = new Image(); 
rockImage.src = 'sprites/rock.png'; 
potholeImage = new Image(); 
potholeImage.src = 'sprites/pothole.png';
treeImage = new Image(); 
treeImage.src = 'sprites/tree.png'; 
brokenCarImage = new Image(); 
brokenCarImage.src = 'sprites/brokenCar.png';
KFCBossImage = new Image(); 
KFCBossImage.src = 'sprites/kfc.png'; 
KFCBossRAttack = new Image(); 
KFCBossRAttack.src = 'sprites/kfcrightattack.png';
KFCBossLAttack = new Image(); 
KFCBossLAttack.src = 'sprites/kfcleftattack.png';

//Create an array to hold falling objects (rocks, potholes, fallen trees, broken car)
fallingObjects = []; fallingObjectsY = [];

//Create a function to add falling objects
function addFallingObject(x){
    fallingObjects.push(x);
    fallingObjectsY.push(-50);
}

//Create a function to automatically add falling objects
function autoAddFallingObjects(){
    if(timeSinceStart % 15 === 0){
        if(chooseRandom(difficulty) === 1){
            return addFallingObject(pothole(randomX(0, 20)));
        } else if(chooseRandom(difficulty) === 2){
            return addFallingObject(rock(randomX(0, 30)));
        } else if(chooseRandom(difficulty) === 3){
            return addFallingObject(brokenCar(randomX(0, 70)));
        } else if(chooseRandom(difficulty) === 4){
            return addFallingObject(tree(randomX(0, 200)));
        }
    }
}

//Create a function to randomly choose a number
function chooseRandom(diff){
    if(diff === 1){
        return 1;
    }
    random = Math.random();
    if(diff === 2){
        if(random <= 0.5){
            return 1;
        } else if(random > 0.5){
            return 2;
        }
    }
    if(diff === 3){
        if(random < 0.33){
            return 1;
        } else if(random >= 0.33 && random <= 0.66){
            return 2;
        } else if(random > 0.66){
            return 3;
        }
    }
    if(diff === 4){
        if(random <= 0.25){
            return 1;
        } else if(random > 0.25 && random <= 0.5){
            return 2;
        } else if(random > 0.5 && random <= 0.75){
            return 3;
        } else if(random > 0.75){
            return 4;
        }
    }
}

//Create a function to randomly choose an x co-ordinate
function randomX(min, objsize){
    randomXcord = (Math.random() + min) * 650;
    if(randomXcord > 650 - objsize){
        randomXcord = randomXcord - objsize;
    } 
    return randomXcord;
}

//Create rocks
function rock(randomX){
    return function(ycord){
        ctx.drawImage(rockImage, randomX, ycord, 30, 30);
        if (checkCollision(randomX, ycord, 30, 30)){
            dead = true;
            deathType = 'rock';
        }
    };
}

//Create potholes
function pothole(randomX){
    return function(ycord){
        ctx.drawImage(potholeImage, randomX, ycord, 20, 20);
        if (checkCollision(randomX, ycord, 20, 20)){
            dead = true;
            deathType = 'pothole';
        }
    };
}

//Create tree
function tree(randomX){
    return function(ycord){
        ctx.drawImage(treeImage, randomX, ycord, 200, 20);
        if (checkCollision(randomX, ycord, 200, 20)){
            dead = true;
            deathType = 'tree';
        }
    };
}

//Create broken car
function brokenCar(randomX){
    return function(ycord){
        ctx.drawImage(brokenCarImage, randomX, ycord, 70, 20);
        if (checkCollision(randomX, ycord, 70, 20)){
            dead = true;
            deathType = 'car';
        }
    };
}

function netY(){
    ycoord = chickenY + (chickenSize / 2);
    if(ycoord > bossY + 90){
        ycoord = bossY + 90;
    }
    if(ycoord < bossY + 45){
        ycoord = bossY + 45;
    }
    return ycoord;
}

//KFC Boss
function KFCBoss(x, y){
        if (checkCollision(x, y, 50, 100)){
            dead = true;
            deathType = 'run';
        }
        if(bossAttack === 'leftMelee'){
            ctx.drawImage(KFCBossLAttack, x - 25, netY(), 25, 17);
            if(checkCollision(x - 25, y + 25, 25, 50)){
                dead = true;
                deathType = 'fried';
            }
        }
        if(bossAttack === 'rightMelee'){
            ctx.drawImage(KFCBossRAttack, x + 50, netY(), 25, 17);
            if(checkCollision(x + 50, y + 25, 25, 50)){
                dead = true;
                deathType = 'fried';
            }
        }
        ctx.drawImage(KFCBossImage, x, y, 50, 100);
        if(x < chickenX){
            bossX += bossSpeed;
        }
        if(x > chickenX){
            bossX -= bossSpeed;
        }
        if(y < chickenY){
            bossY += bossSpeed;
        }
        if(y > chickenY){
            bossY -= bossSpeed;
        }
        if(chickenY < y + 150 && chickenY > y - 50){
            if(chickenX < x){
                bossAttack = 'leftMelee';
                bossSpeed = 1;
            }
            if(chickenX > x){
                bossAttack = 'rightMelee';
                bossSpeed = 1;
            }
        } else {
            bossAttack = 'idle';
            bossSpeed = 3;
        }
        if(chickenX < x - 150){
            bossAttack = 'idle';
        }
        if(chickenX > x + 225){
            bossAttack = 'idle';
        }
}