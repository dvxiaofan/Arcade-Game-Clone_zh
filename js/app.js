// 定义常量， 方便后面使用
const H_WIDTH = 101;
const V_HEIGHT = 84;

// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

    this.setSpeed();
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    // 判断超出边界后复位，并重新设置初试速度
    if (this.x > 505) {
      this.x = -V_HEIGHT;
      // 随机出现在另一行
      this.y = V_HEIGHT * Math.ceil(Math.random() * 3) - 25;
      this.setSpeed();
    } else {
      this.x += this.speed + 100 * dt;
    }
    // 检查是否碰撞玩家
    this.checkCollisions(player);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 设置每个敌人的初始速度
Enemy.prototype.setSpeed = function() {
  this.speed = Math.floor(Math.random() * 5);
}

// 监测碰撞
Enemy.prototype.checkCollisions = function(player) {
  // 判断是否在同一行
  if((Math.floor(player.y) - 16) === this.y) {
    // 判断是否碰撞
    if((player.x - 70) <= this.x && (player.x + 70) >= this.x) {
      player.reset();
    }
  }
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x * H_WIDTH;
  this.y = y * V_HEIGHT;
}

Player.prototype.update = function(dt) {};
Player.prototype.render = function(sprite, x, y) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 控制玩家移动操作
Player.prototype.handleInput = function(e) {
  // 判断移动方向并处理临界点
  switch (e) {
  case "left":
    if (this.x <= 0) {
      this.x = this.x;
      break;
    }
    this.x -= H_WIDTH;
    break;
  case "right":
    if (this.x >= (404)) {
      this.x = this.x;
      break;
    }
    this.x += H_WIDTH;
    break;
  case "up":
    if (this.y <= -8) {
      this.y = this.y;
      break;
    }
    this.y -= V_HEIGHT;
    break;
  case "down":
    if (this.y >= 378) {
      this.y = this.y;
      break;
    }
    this.y += V_HEIGHT;
    break;
  }

  // 判断是否移动到顶部水里
  if(this.y > -10 && this.y < 0) {
    this.reset();
  }
};

// 游戏玩家复位函数
Player.prototype.reset = function() {
  this.x = 2 * H_WIDTH;
  this.y = 4.9 * V_HEIGHT;
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
for (var i = 0; i < 3; i++) {
  // 使初试敌人随机出现在每一行
  allEnemies.push(new Enemy(-V_HEIGHT, V_HEIGHT * Math.ceil(Math.random() * 3) - 25));
}

// 初始化玩家位置
var player = new Player(2, 4.9);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
