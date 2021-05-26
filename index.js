// REFs
const startBtnRef = document.querySelector('.btn[data-action-start]');
const stopBtnRef = document.querySelector('.btn[data-action-stop]');
const daysRef = document.querySelector('.value[data-value="days"]');
const hoursRef = document.querySelector('.value[data-value="hours"]');
const minsRef = document.querySelector('.value[data-value="mins"]');
const secsRef = document.querySelector('.value[data-value="secs"]');

// CONSTRUCTOR
class CountdownTimer {
  constructor({onTick, targetDate,selector}) {
      this.intervalId = null;
      this.isActive = false;
      this.onTick = onTick;
      this.targetDate = targetDate;
      this.selector = selector;
      this.init();
  }

  start() {
      if (this.isActive) {
          return;
      }               
      this.isActive = true;
      
      this.intervalId = setInterval(() => {
          const targetDate = this.targetDate;
          const currentDate = Date.now();
          const deltaTime = targetDate - currentDate;
          const time = this.getTimeComponents(deltaTime);
  
          this.onTick(time);
      }, 1000);
  }
  init() {
    const { days, hours, mins, secs } = this.getTimeComponents(0);
    this.onTick({ days, hours, mins, secs });
  }
  stop() {
      clearInterval(this.intervalId);
      this.isActive = false;
      this.init();
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  getTimeComponents(time) {
      const days =  this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours =  this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins =  this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
      return { days, hours, mins, secs };
  };

  
}
// TIMER
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 01, 2021'),
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, mins, secs }) {
  daysRef.textContent = `${days}:`,
  hoursRef.textContent = `${hours}:`,
  minsRef.textContent = `${mins}:`,
  secsRef.textContent = `${secs}`
};
// lISTENERS
startBtnRef.addEventListener('click', timer.start.bind(timer));
stopBtnRef.addEventListener('click', timer.stop.bind(timer));