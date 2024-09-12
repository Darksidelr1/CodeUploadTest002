const pianoKeys = document.querySelectorAll('.piano-keys .key'); // 获取所有的钢琴按键元素
const volumeSlider = document.querySelector('.volume-slider input'); // 获取音量控制滑动条元素
const keysCheckbox = document.querySelector('.keys-checkbox input'); // 获取显示按键名称的复选框元素
//通过querySelector选择器获取上面三个变量
let allKeys = []; // 存储所有按键的数组
let audio = new Audio('tunes/a.wav'); // 创建Audio对象，用于播放音频文件（初始化为'a.wav'）

// 播放音符的函数
const playTune = (key) => {
  audio.src = `tunes/${key}.wav`; // 设置音频文件的路径
  audio.play(); // 播放音乐
  const clickedKey = document.querySelector(`[data-key='${key}']`); // 获取被点击的按键元素
  clickedKey.classList.add('active'); // 添加'active'类，用于显示按键被按下的样式
  setTimeout(() => {
    clickedKey.classList.remove('active'); // 0.15秒后移除'active'类，恢复按键的默认样式
  }, 150);
};

pianoKeys.forEach(key => {
  allKeys.push(key.dataset.key); // 将所有按键的data-key属性值添加到allKeys数组中
  key.addEventListener('click', () => {
    playTune(key.dataset.key); // 添加点击事件监听器，点击按键时调用playTune函数播放对应音符
  });
});

// 音量控制的处理函数
const handleVolume = (e) => {
  audio.volume = e.target.value; // 将音频对象的音量设置为滑动条的值
};

// 显示/隐藏按键名称的处理函数
const showHideKeys = () => {
  pianoKeys.forEach(key => key.classList.toggle('hide')); // 切换按键元素的'hide'类，以控制显示/隐藏按键名称
};

// 处理按下键盘按键的函数
const pressedKey = (e) => {
  if (allKeys.includes(e.key)) {
    playTune(e.key); // 判断按下的按键是否在allKeys数组中，若是则调用playTune函数播放对应音符
  }
};

document.addEventListener('keydown', pressedKey); // 添加键盘按下事件监听器，按下键盘按键时调用pressedKey函数
volumeSlider.addEventListener('input', handleVolume); // 添加音量控制滑动条的输入事件监听器，滑动滑动条时调用handleVolume函数
keysCheckbox.addEventListener('click', showHideKeys); // 添加显示/隐藏按键名称复选框的点击事件监听器，点击复选框时调用showHideKeys函数

