class Card{
    constructor(name, cost){
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card{
    constructor(name, cost, power, resilience){
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }

    attack(target){
        target.resilience -= this.power;
        return target;
    }
}

class Effect extends Card{
    constructor(name, cost, stat, mag){
        super(name, cost);
        this.stat = stat;
        this.mag = mag;
        this.text = function(){
            if(this.mag > 0){
                return `Raise the target's ${this.stat} by ${this.amt}`;
            }
            else{
                return `Reduce the target's ${this.stat} by ${this.amt}`;
            }
        };
    }

    play(target){
        if(target instanceof Unit){
            if(this.mag > 0){
                target[this.stat] += this.mag;
                return this;
            }
            else if(this.mag < 0){
                target[this.stat] -= this.mag;
                return this;
            }
            else{
                throw new Error('Magnitude is unknown')
            }
        }
        else{
            throw new Error('Target is not unit')
        }
    }
}



console.log('Turn 1');
const rbn = new Unit('Red Belt Ninja', 3, 3, 4);
const ha = new Effect('Hard Algorithim', 2, 'resilience', 3);
console.log('Red Belt Ninja res before ',rbn.resilience);
ha.play(rbn);
console.log('Red Belt Ninja res after ',rbn.resilience);

console.log('Turn 2');
const bbn = new Unit('Black Belt Ninja', 4, 5, 5);
const upr = new Effect('Unhandled Promise Rejection', 1 ,'resilience', -2);
console.log('Red Belt Ninja res before ',rbn.resilience);
upr.play(rbn);
console.log('Red Belt Ninja res after ',rbn.resilience);

console.log('Turn 3');
const pp = new Effect('Pair Programming', 3, 'power', 2);
console.log('Red Belt Ninja power before',rbn.power);
pp.play(rbn);
console.log('Red Belt Ninja power after',rbn.power);
console.log('Black Belt Ninja res Before ', bbn.resilience);
rbn.attack(bbn);
console.log('Black Belt Ninja res After ', bbn.resilience);