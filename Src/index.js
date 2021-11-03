const grid =document.querySelector('.grid');//The game area 300px*300px
const score=document.querySelector('.score');//To display the aliens killed
const resultsDisplay = document.querySelector('.results')
let shooterIndex=202;// shooter to be placed in the last row middle
let width =15;//the width of the grid
let direction =1;//used to move the alien right and left. for right =1 , left =-1
let invadersId;
let goingRight=true;
let aliensShot=[];//stores the index of the alien shot

for(let i=0;i<225;i++)
{
    grid.appendChild(document.createElement('div'));//creating 15*15=225 equal div with the grid

}
const squares =Array.from(document.querySelectorAll('.grid div'));//Array containing 15*15

const alien = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ]  //Alien intial position

  function draw()           //used to add class the alien (Color purple)
{
    for(let i=0;i<alien.length;i++)
    {
        if(!aliensShot.includes(i))  //the alien should not be shot
        {
            squares[alien[i]].classList.add('alien')
        }
    }
}

draw()//First time used to display the aliens

function remove() //Used to remove the alien CSS class from the current div
{
    for(let i=0;i<alien.length;i++)
    {
        squares[alien[i]].classList.remove('alien')
    }
}


squares[shooterIndex].classList.add('shooter');

function moveShooter(event)
{

    squares[shooterIndex].classList.remove('shooter');//Remove shooter from current shooter div
    switch(event.key)
    {
        case 'ArrowLeft':
            if(shooterIndex%width !==0) //if not in left corner
            {
                shooterIndex=shooterIndex-1;
            }
            break
        case 'ArrowRight':
            
                if(shooterIndex%width !=14)//if shooter not in the right corner
                {
                    shooterIndex=shooterIndex+1;
                }
                break;

        case 'Enter':
            shoot();
            break;
            
        default:
            break;
    }
    squares[shooterIndex].classList.add('shooter') //Add shooter class to the new div
}

document.addEventListener('keydown',moveShooter);

function moveAliens()
{
    remove();
    function moveDown()
    {
        for(let i=0;i<alien.length;i++) //to move one row down
    {
        alien[i]=alien[i]+width
    }

    }
    function moveSide()
    {
        for(let i=0;i<alien.length;i++)//to move once column right/one column left
    {
        alien[i]=alien[i]+direction;
       
    
    }

    }
    

    for(let i=0;i<alien.length;i++)
    {
        if(alien[i]%width===14 && direction===1)
        {
            moveDown();
            direction=-1
        }
        else if(alien[i]%width===0 && direction===-1)
        {
            moveDown();
            direction=+1;
        }
    }
    moveSide();

    

    draw();
    if(squares[shooterIndex].classList.contains('alien','shooter'))
    {
        resultsDisplay.innerHTML='Game Over';
        clearInterval(alienMove)
    }
    for(let i=0;i<alien.length;i++)
    {
        if(alien[i]>squares.length)
        {
            resultsDisplay.innerHTML='Game Over';
            clearInterval(alienMove)
        }

    }
    if(aliensShot.length===alien.length)
    {
        resultsDisplay.innerHTML='You Win';
        clearInterval(alienMove);
    }

}

alienMove=setInterval(moveAliens,600)

function shoot(event)
{
    if(event.key==='ArrowUp')
    {
    
    
    let shootBeam=shooterIndex
    function moveShootUp()
    {   
        if(shootBeam-width>=0)
        {
        
        
        
        
        squares[shootBeam].classList.remove('laser');
        shootBeam=shootBeam-width;
        squares[shootBeam].classList.add('laser');
        console.log(squares[shootBeam])


        if(squares[shootBeam].classList.contains('alien')){
            squares[shootBeam].classList.remove('laser');
            squares[shootBeam].classList.remove('alien');
            
            clearInterval(shoot)
            aliensShot.push(alien.indexOf(shootBeam));
            clearInterval(shoot);
        }
    }
    
    
    }
    shoot=setInterval(moveShootUp,100)
}

}

document.addEventListener('keydown',shoot)


  