import * as minecraft from "@minecraft/server";
import * as GameTest from "@minecraft/server-gametest";
//import * as minecraft from "mojang-minecraft";
import * as ui from "@minecraft/server-ui"

function getScore(player, objetivo) {
    return minecraft.world.scoreboard.getObjective(`${objetivo}`).getScore(player)
};

function setscore(player, objetivo,amount) {
    return minecraft.world.scoreboard.getObjective(`${objetivo}`).setScore(player,amount)
};

function addScore(player, objetivo,amount) {
    return minecraft.world.scoreboard.getObjective(`${objetivo}`).addScore(player,amount)
};
class EntityQueryOptions {
    constructor() {
    }
    /**
* @param {string} name
* @param {string[]} value
*/
    then(name, value) {
        this[name] = value;
        return this;
    }
    end() {
        return JSON.parse(JSON.stringify(this))
    }
}


const overworld = minecraft.world.getDimension("overworld")
overworld.runCommandAsync(`say §l스크립트 오류로 리로드 되었습니다 연구중이거나 건설중이었다면 다시 해주십시오`)
/**
 *
 */
var Ai



GameTest.register("AI","spawn",function a(test) {
    Ai =  test.spawnSimulatedPlayer({ x: 39, y: -50, z: -84 },"AI",minecraft.GameMode.spectator) 
    Ai.addTag("Ai")
    setscore(Ai,"reward",0)
    Ai.runCommandAsync(`tp @s 178.79 -60.00 -3.03`)
    Ai.runCommandAsync(`gamemode s @s`)
    
    //Ai.moveToLocation()
    //Ai.move()
    //Ai.moveRelative()


}).structureName("mystructure:a").maxTicks(999999999)


minecraft.system.beforeEvents.watchdogTerminate.subscribe((event) => {
    event.cancel = true;
    console.warn(`[Watchdog] Canceled critical exception of type '${event.terminateReason}`);
  });

  class NeuralNetwork {
    constructor(layerSizes) {
      this.nodes = [];
      this.layerSizes = layerSizes;
      this.initializeNodes(layerSizes);
    }
  

    sigmoid(z) {
      return 1 / (1 + Math.exp(-z));
    }
  
    sigmoidDerivative(x) {
      let sig = this.sigmoid(x);
      return sig * (1 - sig);
    }
  

    ReLU(x) {
      return this.sigmoid(x)
    }
  
    reluDerivative(x) {
      return this.sigmoidDerivative(x)
    }
  

    LAF(x) {
      return x;
    }
  

    initializeNodes(size) {
      for (let i = 0; i < size.length; i++) {
        this.nodes[i] = [];
        for (let k = 0; k < size[i]; k++) {
          let temp = [];
          for (let m = 0; m < size[i - 1]; m++) {
            temp.push(Math.random());
          }
          this.nodes[i][k] = { w: temp, b: Math.random() };
        }
      }
    }
  

    getModelResult(x) {
      let layerOutputs = [];
  
      for (let l = 0; l < this.nodes.length; l++) {
        let temp = [];
        for (let k = 0; k < this.nodes[l].length; k++) {
          if (l === 0) {
            // 첫 번째 레이어는 입력 값으로 초기화
          } else {
            let sum = 0;
            for (let j = 0; j < this.nodes[l][k].w.length; j++) {
              sum += this.ReLU(layerOutputs[l - 1][j] * this.nodes[l][k].w[j] + this.nodes[l][k].b);
            }
            temp.push(sum);
          }
        }
        if (l === 0) {
          layerOutputs.push(x);
        } else {
          layerOutputs.push(temp);
        }
      }
      return { output: layerOutputs[this.nodes.length - 1][0], layerOutputs: layerOutputs };
    }
  

    backward(x, y, maxEpoch, learningRate, earlyExit = false) {
      for (let epoch = 0; epoch < maxEpoch; epoch++) {
        let { layerOutputs, output } = this.getModelResult(x);
  

        if (earlyExit && Math.abs(y - output) > 5) {
          return;
        }
        

        for (let l = this.nodes.length - 1; l >= 0; l--) {
          for (let k = 0; k < this.nodes[l].length; k++) {
            let delta = 0;
            if (l === this.nodes.length - 1) {

              delta = layerOutputs[l][k] - y
              //delta = (this.ReLU(layerOutputs[l][k]) - y) * this.reluDerivative(layerOutputs[l][k]);
            } else {
              let m = this.nodes[l + 1].length;
              for (let i = 0; i < m; i++) {
                delta += this.nodes[l + 1][i].d * this.nodes[l + 1][i].w[k] * this.reluDerivative(layerOutputs[l][k]);
              }
            }
            this.nodes[l][k] = { w: this.nodes[l][k].w, b: this.nodes[l][k].b, d: delta };
  

            for (let j = 0; j < this.nodes[l][k].w.length; j++) {
              this.nodes[l][k].w[j] -= learningRate * this.nodes[l][k].d * this.ReLU(layerOutputs[l - 1][j]);
            }
            this.nodes[l][k].b -= learningRate * this.nodes[l][k].d;
          }
        }
      }
    }
  }
  

  
  



minecraft.world.beforeEvents.chatSend.subscribe((ev)=>{
    const {sender,message} = ev
    if(sender.name == "Eueiwosjskj")
    {
        if(message.includes("!epsilon"))
        {
            epsilon = Number(message.split(" ")[1])
        }
        if(message.includes("!ai W"))
        {
            //    Ai.getViewDirection() Ai.location
            minecraft.system.run(()=>{
                Ai.moveRelative(0,1,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }
        if(message.includes("!ai S"))
        {
            minecraft.system.run(()=>{
                Ai.moveRelative(0,-1,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }
        if(message.includes("!ai WA"))
        {
            minecraft.system.run(()=>{
                Ai.moveRelative(1,1,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }
        if(message.includes("!ai WD"))
        {
            minecraft.system.run(()=>{
                Ai.moveRelative(-1,1,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }

        if(message.includes("!ai D"))
        {
            minecraft.system.run(()=>{
                Ai.moveRelative(-1,0,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }
        if(message.includes("!ai A"))
        {
            minecraft.system.run(()=>{
                Ai.moveRelative(1,0,1)
                minecraft.system.runTimeout(()=>{
                    Ai.stopMoving()
                },5)
            })
        }

        if(message.includes("!ai jump"))
        {
            minecraft.system.run(()=>{
                Ai.jump()
            })
        }
        if(message.includes("!ai attack"))
        {
            minecraft.system.run(()=>{
                Ai.attack()
            })
            minecraft.system.run(()=>{
                Ai.attack()
            })
            minecraft.system.run(()=>{
                Ai.attack()
            })
        }
        if(message.includes("!ai left"))
        {
            minecraft.system.run(()=>{
                Ai.rotateBody(-5)
            })
        }
        if(message.includes("!ai right"))
        {
            minecraft.system.run(()=>{
                Ai.rotateBody(5)
            })
        }
    }
})

let epsilon = 0.7; // 탐험 확률
minecraft.world.afterEvents.playerSpawn.subscribe((ev)=>{
    const player = ev.player
    if(!player.hasTag("start"))
    {
        player.addTag("start")
        player.runCommandAsync(`tp @s 172.63 -60.00 -2.54`)
    }
})


function getNearestPlayer(location) {
    let nearestPlayer = null;
    let shortestDistance = Infinity;

    for (const player of minecraft.world.getAllPlayers()) {
        if (player.hasTag("Ai")) {
            continue;
        }

        
        const dx = player.location.x - location.x;
        const dy = player.location.y - location.y;
        const dz = player.location.z - location.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);


        if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestPlayer = player;
        }
    }
    return nearestPlayer; 
}

function getnowstate(nearestPlayer) {
    return [calculateDistance(Ai.location.x,Ai.location.y,Ai.location.z,nearestPlayer.location.x,nearestPlayer.location.y,nearestPlayer.location.z)]
}

function doaction(action) {
    
    if(action == "W")
    {
        minecraft.system.run(() => {
            Ai.moveRelative(0, 1, 1);
            minecraft.system.runTimeout(() => {
                Ai.stopMoving();
            }, 5);
        });
    }
    if(action == "S")
    {
        minecraft.system.run(() => {
            Ai.moveRelative(0, -1, 1);
            minecraft.system.runTimeout(() => {
                Ai.stopMoving();
            }, 5);
        });
    }
    if(action == "A")
    {
        minecraft.system.run(()=>{
            Ai.moveRelative(1,0,1)
            minecraft.system.runTimeout(()=>{
                Ai.stopMoving()
            },5)
        })
    }
    if(action == "D")
    {
        minecraft.system.run(()=>{
            Ai.moveRelative(-1,0,1)
            minecraft.system.runTimeout(()=>{
                Ai.stopMoving()
            },5)
        })
    }
    if(action == "WA")
    {
        minecraft.system.run(() => {
            Ai.moveRelative(1, 1, 1);
            minecraft.system.runTimeout(() => {
                Ai.stopMoving();
            }, 5);
        });
    }
    if(action == "WD")
    {
        minecraft.system.run(() => {
            Ai.moveRelative(-1, 1, 1);
            minecraft.system.runTimeout(() => {
                Ai.stopMoving();
            }, 5);
        });
    }
    if(action == "attack")
    {
        minecraft.system.run(() => {
            Ai.attack();
        });
    }
    if(action == "left")
    {
        minecraft.system.run(() => {
            Ai.rotateBody(-10);
        });
    }
    if(action == "right")
    {
        minecraft.system.run(() => {
            Ai.rotateBody(10);
        });
    }
    if(action == "jump")
    {
        minecraft.system.run(() => {
            Ai.jump();
        });
    }
}
function calculateDistance(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

minecraft.world.afterEvents.entityHurt.subscribe((ev)=>{
    const hurt = ev.hurtEntity
    const hit = ev.damageSource.damagingEntity

    if(hurt == Ai)
    {
        setscore(Ai,"reward",-10)
        minecraft.system.runTimeout(()=>{
            setscore(Ai,"reward",0)
        },10)
    }
    if(hit == Ai)
    {
        setscore(Ai,"reward",10)
        minecraft.system.runTimeout(()=>{
            setscore(Ai,"reward",0)
        },10)
    }
})

minecraft.world.afterEvents.entityDie.subscribe((ev)=>{
    const dead = ev.deadEntity
    const kill = ev.damageSource.damagingEntity

    if(dead == Ai)
    {
        Ai.respawn()
        Ai.runCommandAsync(`tp @s 178.79 -60.00 -3.03`)
    }
})
/*
minecraft.system.runInterval(()=>{
    const plr = getNearestPlayer(Ai.location)
    setscore(Ai,"reward",-calculateDistance(Ai.location.x,Ai.location.y,Ai.location.z,plr.location.x,plr.location.y,plr.location.z))
},20)
*/
let ReplyMemory = []
const actions = ["W","WA","WD","attack"]
const nActions = actions.length
minecraft.system.runInterval(()=>{
    
    const explore = Math.random() < epsilon;
    const target = getNearestPlayer(Ai.location)
    const state = getnowstate(target)
    Ai.lookAtEntity(target,"Instant")
    let actionIndex = 0
    if (explore) {
        actionIndex = Math.floor(Math.random() * nActions); // 탐험 (무작위 행동 선택)
    } else {
        let results = []
        for(let i=0; i<actions.length; i++)
        {
            results.push(OnlineNetwork.getModelResult([state[0],i]).output)
        }
        actionIndex = results.indexOf(Math.max(...results))
        console.warn(actions[actionIndex])
                //최대 Q값 선택    
    }
    
    const action = actions[actionIndex]
    
    doaction(action)
    minecraft.system.runTimeout(()=>{
        const nextstate = getnowstate(target)
        const reward = getScore(Ai,"reward")
        ReplyMemory.push({action:actionIndex,reward:reward,state:state,nextstate:nextstate})
    },0.1)
},1)


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let OnlineNetwork = new NeuralNetwork([2, 10,10,10,10, 1]);
let TargetNetwork = new NeuralNetwork([2, 10,10,10,10, 1]);

const gamma = 0.99
minecraft.system.runInterval(()=>{
    const index = rand(0,ReplyMemory.length-1)
    const memory = ReplyMemory[index] 
    ReplyMemory.splice(index,1)
    const nextstate = memory.nextstate
    const state = memory.state
    const actionIndex = memory.action
    const reward = memory.reward
    let nextQValues = []
    for(let i=0; i<actions.length; i++)
    {
        nextQValues.push(TargetNetwork.getModelResult([nextstate[0],i]).output)
    }
    let target = reward + gamma * Math.max(...nextQValues);
    OnlineNetwork.backward([state[0],actionIndex],target,100,0.001,false)
},4)

minecraft.system.runInterval(()=>{
    TargetNetwork = OnlineNetwork
},300)

