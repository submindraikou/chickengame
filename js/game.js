//Create the variables
chicken1 = new Image(); 
chicken1.src = 'sprites/chicken1.png'; 
chicken2 = new Image(); 
chicken2.src = 'sprites/chicken2.png';
chickenX = 300; 
chickenY = 550; 
canMoveUp = true; 
canMoveDown = true; 
canMoveLeft = true; 
canMoveRight = true;
movingUp = false; 
movingLeft = false; 
movingRight = false; 
movingDown = false; 
holdingUp = false; 
holdingDown = false;
holdingLeft = false; 
holdingRight = false; 
difficulty = 1; 
chickenSize = 50; 
dead = false; 
deathType = ''; 
timeSinceStart = 0;
bossBattle = false; 
bossNum = 1; 
bossAttack = ''; 
bossX = 300; 
bossY = -100; 
bossSpeed = 0; 
aimImage = new Image();
aimImage.src = 'sprites/aim.png'; 
canShoot = true; 
bulletX = 0; 
bulletY = 0; 
timeSinceLastShot = 0; 
bulletImage = new Image();
bulletImage.src = 'sprites/bullet.png'; 
bossHP = 100; 
road = new Image(); 
road.src = 'sprites/road.png'; 
roadY = 0; 
secondroadY = -650;
thirdroadY = -1300;
animationTimer = 0; 
animationFrame = false; 
timeSinceDead = 0; 
speed = 10;
deathRock = new Image(); 
deathRock.src = 'sprites/deathRock.png'; 
deathCar = new Image(); 
deathCar.src = 'sprites/deathCar.png'; 
deathTree = new Image(); 
deathTree.src = 'sprites/deathTree.png'; 
deathPothole = new Image(); 
deathPothole.src = 'sprites/deathPothole.png'; 
deathRun = new Image(); 
deathRun.src = 'sprites/deathRun.png'; 
deathFry = new Image(); 
deathFry.src = 'sprites/deathFry.png'; 
kfcLogo = new Image();
kfcLogo.src = 'sprites/kfclogo.png';
kfcLogo2 = new Image();
kfcLogo2.src = 'sprites/kfclogowin.png';
bluebox = new Image();
bluebox.src = 'sprites/bluebox.png';
tank1 = new Image();
tank1.src = 'sprites/tank1.png';
tank2 = new Image();
tank2.src = 'sprites/tank2.png';

//Create the variable  to control the screen
frame = 0;

//Create a function to reset the game
function resetGame(){
    chickenX = 300; 
    chickenY = 550; 
    canMoveUp = true; 
    canMoveDown = true; 
    canMoveLeft = true; 
    canMoveRight = true;
    movingUp = false; 
    movingLeft = false; 
    movingRight = false; 
    movingDown = false; 
    holdingUp = false; 
    holdingDown = false;
    holdingLeft = false; 
    holdingRight = false; 
    difficulty = 1; 
    chickenSize = 50; 
    dead = false; 
    deathType = ''; 
    timeSinceStart = 0;
    frame = 1; 
    fallingObjects.length = 0; 
    fallingObjectsY.length = 0; 
    bossBattle = false; 
    bossNum = 1; 
    bossAttack = '';
    bossX = 300; 
    bossY = -100; 
    canShoot = true; 
    bulletX = 0; 
    bulletY = 0; 
    timeSinceLastShot = 0; 
    bossHP = 100; 
    timeSinceDead = 0;
}

//Add a function to get mouse position relative to the canvas
canvas.addEventListener('mousemove', function(e){
    mousePosition = getMousePosition(canvas, e);
}, false);

function getMousePosition(canvas, e){
    rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

//Add a function to tell which keys are pressed and control movement
document.onkeydown = function(e){
    
    //Prevent default actions and make variables for access later
    e.preventDefault();
    keyPressed = String.fromCharCode(e.keyCode);
    keyPressedCode = e.keyCode;
    
    if((frame === 2 || frame === 0)&& timeSinceDead > 100 
            && e.keyCode !== 81 && e.keyCode !== 69
            && e.keyCode !== 107 && e.keyCode !== 109
            && e.keyCode !== 61 && e.keyCode !== 173){
        keyHasBeenPressed = true;
    } else {
        keyHasBeenPressed = false;
    }
    
    //Set movement to true once keys are pressed
    if(e.keyCode === 87 || e.keyCode === 38){
        if(movingDown === false){
            movingUp = true;
        } else {
            holdingUp = true;
        }
    } 
    if(e.keyCode === 65 || e.keyCode === 37){
        if(movingRight === false){
             movingLeft = true;
        } else {
            holdingLeft = true;
        }
    } 
    if(e.keyCode === 83 || e.keyCode === 40){
        if(movingUp === false){
            movingDown = true;
        } else {
            holdingDown = true;
        }
    } 
    if(e.keyCode === 68 || e.keyCode === 39){
        if(movingLeft === false){
            movingRight = true;
        } else {
            holdingRight = true;
        }
    }
    
};

document.onkeyup = function(e){
    
    keyHasBeenPressed = false;
    
    //Create variables for access later
    keyLifted = String.fromCharCode(e.keyCode);
    keyLiftedCode = e.keyCode;
    
    //Set movement to false once the keys are lifted
    if(e.keyCode === 87 || e.keyCode === 38){
        movingUp = false;
        holdingUp = false;
        if(holdingDown){
            movingDown = true;
        }
    }
    if(e.keyCode === 65 || e.keyCode === 37){
        movingLeft = false;
        holdingLeft = false;
        if(holdingRight){
            movingRight = true;
        }
    } 
    if(e.keyCode === 83 || e.keyCode === 40){
        movingDown = false;
        holdingDown = false;
        if(holdingUp){
            movingUp = true;
        }
    } 
    if(e.keyCode === 68 || e.keyCode === 39){
        movingRight = false;
        holdingRight = false;
        if(holdingLeft){
            movingLeft = true;
        }
    } 
};

function chickenDeathType(type){
    if(type === 'rock'){
        ctx.drawImage(deathRock, 300, 250);
    }
    if(type === 'pothole'){
        ctx.drawImage(deathPothole, 300, 250);
    }
    if(type === 'car'){
        ctx.drawImage(deathCar, 300, 250);
    }
    if(type === 'tree'){
        ctx.drawImage(deathTree, 300, 250);
    }
    if(type === 'run'){
        ctx.drawImage(deathRun, 300, 250);
    }
    if(type === 'fried'){
        ctx.drawImage(deathFry, 300, 250);
    }
}

//Create a function for the chicken
function chicken(){
    
    //Move the chicken
    if(movingUp && canMoveUp){
        chickenY -= 7;
    }
    if(movingDown && canMoveDown){
        chickenY += 7;
    }
    if(movingLeft && canMoveLeft){
        chickenX -= 7;
    }
    if(movingRight && canMoveRight){
        chickenX += 7;
    }
    
    //Animate the chicken
    if(animationFrame === true){
        ctx.drawImage(chicken1, chickenX, chickenY, chickenSize, chickenSize);
    } else if (animationFrame === false){
        ctx.drawImage(chicken2, chickenX, chickenY, chickenSize, chickenSize);
    }
    
    //Create borders for the chicken
    if(chickenX <= 0){
        chickenX = 0;
        canMoveLeft = false;
    } else {
        canMoveLeft = true;
    }
    if(chickenY <= 0){
        chickenY = 0;
        canMoveUp = false;
    } else {
        canMoveUp = true;
    }
    if(chickenX >= 600){
        chickenX = 600;
        canMoveRight = false;
    } else {
        canMoveRight = true;
    }
    if(chickenY >= 595){
        chickenY = 595;
        canMoveDown = false;
    } else {
        canMoveDown = true;
    }
}

//Create the tank chicken
function tankChicken(){
    
    //Move the chicken
    if(movingUp && canMoveUp){
        chickenY -= 6;
    }
    if(movingDown && canMoveDown){
        chickenY += 6;
    }
    if(movingLeft && canMoveLeft){
        chickenX -= 6;
    }
    if(movingRight && canMoveRight){
        chickenX += 6;
    }
    
    //Animate the chicken
    if(animationFrame === true){
        ctx.drawImage(tank1, chickenX, chickenY, chickenSize, chickenSize);
    } else if (animationFrame === false){
        ctx.drawImage(tank2, chickenX, chickenY, chickenSize, chickenSize);
    }
    
    //Create borders for the chicken
    if(chickenX <= 0){
        chickenX = 0;
        canMoveLeft = false;
    } else {
        canMoveLeft = true;
    }
    if(chickenY <= 0){
        chickenY = 0;
        canMoveUp = false;
    } else {
        canMoveUp = true;
    }
    if(chickenX >= 600){
        chickenX = 600;
        canMoveRight = false;
    } else {
        canMoveRight = true;
    }
    if(chickenY >= 595){
        chickenY = 595;
        canMoveDown = false;
    } else {
        canMoveDown = true;
    }
}

//Create a function for the tank aim
function tankAim(){
    document.onmousedown = function(e){
        e.preventDefault();
        if(canShoot){
            bulletX = mouseX;
            bulletY = mouseY;
            if(bulletX > bossX && bulletX < bossX + 50 && bulletY > bossY && bulletY < bossY + 100){
                bossHP -= 10;
            }
            canShoot = false;
        }
    };
    if(canShoot === false){
        timeSinceLastShot++;
        ctx.drawImage(bulletImage, bulletX - 20, bulletY - 20, 40, 40);
        if(timeSinceLastShot === 50){
            timeSinceLastShot = 0;
            canShoot = true;
        }
    }
    ctx.drawImage(aimImage, mouseX - 25, mouseY - 25, 50, 50);
}

function changeSpeed(x){
    if(x === 'show'){
    ctx.font = '10px Arial Rounded MT Bold';
    ctx.fillText("Speed (Use Q/E or +/- to change): " + speed, 10, 10);
    }
    if(keyPressedCode === 81 || keyPressedCode === 107 || keyPressedCode === 61){
        speed++;
        keyPressedCode = 0;
    } else if(keyPressedCode === 69 || keyPressedCode === 109 || keyPressedCode === 173){
        speed--;
        keyPressedCode = 0;
    }
    if(speed <= 0){
        speed = 1;
    }
}

//Create a function that checks for collision with the chicken
function checkCollision(x, y, w, h) {
    if(     (chickenX + chickenSize) >= x && 
            (chickenY + chickenSize) >= y && 
            (chickenX) <= (x + w) && 
            (chickenY) <= (y + h)){
        return true;
    } else {
        return false;
    }
}

//Create the loop
function loop(){
//Get the mouse position
if(typeof mousePosition === 'undefined'){
    mouseX = 0;
} else {
    mouseX = mousePosition.x;
}
if(typeof mousePosition === 'undefined'){
    mouseY = 0;
} else {
    mouseY = mousePosition.y;
}
 


//Fill in the background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'blue';   

//If the player is on the title
if(frame === 0){
    timeSinceDead = 101;
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial Rounded MT Bold';
    ctx.fillText('press any key to play', 185, 620);
    changeSpeed('show');
    if(keyHasBeenPressed){
            resetGame();
    }
}

//If the player is in game
if(frame === 1){
    
    //Run the timer to switch between true and false
    animationTimer ++;
    if(animationTimer > 5){
        animationTimer = 0;
        if(animationFrame === true){
            animationFrame = false;
        } else if (animationFrame === false){
            animationFrame = true;
        }
    }   

    //Animate the road
    ctx.drawImage(road, 0, roadY, 650, 650);
    ctx.drawImage(road, 0, secondroadY, 650, 650);
    ctx.drawImage(road, 0, thirdroadY, 650, 650);
    roadY += speed;
    secondroadY += speed;
    thirdroadY += speed;
    if(roadY > 650){
        roadY = secondroadY - 648;
    }
    if(secondroadY > 650){
        secondroadY = thirdroadY - 648;
    }
    if(thirdroadY > 650){
        thirdroadY = roadY - 648;
    }
    
    //Move falling objects
    for (i = 0; i < fallingObjects.length; i++){
        ycord = fallingObjectsY[i];
        fallingObjects[i](ycord);
        ycord += speed;
        if(ycord > 650){
           fallingObjects.splice(i, 1);
            fallingObjectsY.splice(i, 1);
        } else {
            fallingObjectsY[i] = ycord;
        }
    }
    
    //Check if the chicken is dead
    if(dead){
        frame = 2;
    }
    
    //Increment the time since the start
    timeSinceStart++;
    
    //Check if the player is in a boss battle
    if(bossBattle === false){
        //Add falling objects
        autoAddFallingObjects();

        //Increase the difficulty
        if(timeSinceStart > 1000){
            difficulty = 2;
        }
        if(timeSinceStart > 2000){
            difficulty = 3;
        }
        if(timeSinceStart > 3000){
            difficulty = 4;
        }
        if(timeSinceStart > 4000){
        bossBattle = true;
        }
        //Draw the chicken
        chicken();
    }
    
    //Boss battle
    if(bossBattle === true){
        tankChicken();
        if(fallingObjects.length === 0){
            KFCBoss(bossX, bossY);
        }
        tankAim();
        if(bossHP <= 0){
            frame = 2;
        }
    }
    changeSpeed('');
    
}

//The ending scene
if(frame === 2){
    if(dead){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '30px Chiller';
        ctx.fillText('You are dead...', 270, 200);
        if(timeSinceDead < 100){
            ctx.fillText('you can respawn shortly', 220, 620);
        } else {
            ctx.fillText('press any key to try again', 210, 620);
        }
        changeSpeed('show');
        chickenDeathType(deathType);
        ctx.drawImage(kfcLogo, 240, 250, 60, 60);
        ctx.drawImage(kfcLogo, 360, 250, 60, 60);
        if(keyHasBeenPressed){
            resetGame();
        }
        timeSinceDead++;
    } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial Rounded MT Bold';
        ctx.fillText('You have defeated the evil KFC', 150, 200);
        ctx.fillText('and brought peace to the roads!', 190, 220);
        ctx.font = '30px Algerian';
        if(timeSinceDead < 100){
            ctx.fillText('you can play again shortly', 95, 620);
        } else {
            ctx.fillText('press any key to play again', 95, 620);
        }
        changeSpeed('show');
        ctx.drawImage(kfcLogo2, 240, 250, 180, 180);
        if(keyHasBeenPressed){
            resetGame();
        }
        timeSinceDead++;
        
    }
}

//The debug map
if(frame === 3){
    if(dead){
        frame = 2;
    }
    for (i = 0; i < fallingObjects.length; i++){
        ycord = fallingObjectsY[i];
        fallingObjects[i](ycord);
        ycord += 5;
        if(ycord > 650){
           fallingObjects.splice(i, 1);
            fallingObjectsY.splice(i, 1);
        } else {
            fallingObjectsY[i] = ycord;
        }
    }
    timeSinceStart++;
    if(bossBattle === false){
        bossBattle = true;

        chicken();
    }
    
    //Boss battles
    if(bossBattle === true){
        tankChicken();
        if(fallingObjects.length === 0){
            KFCBoss(bossX, bossY);
            ctx.fillText(bossHP, 50, 50);
        }
        tankAim();
        if(bossHP <= 0){
            frame = 2;
        }
    }
}
}