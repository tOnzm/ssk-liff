// Import stylesheets
import './style.css';

class BMIPlugin {
  constructor() {
    this.name = 'bmi';
  }

  install(context, option) {
    return {
      today: this.localDate(context.liff.getLanguage(), option.date),
      cal: this.calculate,
      greet: this.greeting,
    };
  }

  localDate(lang, date) {
    const locale = lang === 'en' ? 'en-US' : 'th-TH';
    return date.toLocaleDateString(locale, {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  }

  calculate(height, weight) {
    const heightInMeter = height / 100;
    const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(2);
    let result = 'ใส่เลขด้วยสิครับ!';
    if (bmi < 18.5) {
      result = 'XS';
    } else if (bmi >= 18.5 && bmi < 23) {
      result = 'S';
    } else if (bmi >= 23 && bmi < 25) {
      result = 'M';
    } else if (bmi >= 25 && bmi < 30) {
      result = 'L';
    } else if (bmi >= 30) {
      result = 'XL';
    }
    return result;
  }

  greeting(lang, profile) {
    const prefix = lang === 'en' ? 'Hello' : 'สวัสดี';
    return `${prefix} ${profile.displayName}!`;
  }
}

// Binding HTML elements
const h1Element = document.querySelector('h1');
const h2Element = document.querySelector('h2');
const h5Element = document.querySelector('h5');
const heightElement = document.querySelector('#height');
const weightElement = document.querySelector('#weight');
const btnElement = document.querySelector('button');

// Activate LIFF Plugin
liff.use(new BMIPlugin(), { date: new Date() });
// Display locale date
h5Element.innerHTML = liff.$bmi.today;
// Add event listerner to Calculate button
btnElement.onclick = () => {
  h2Element.innerHTML = liff.$bmi.cal(heightElement.value, weightElement.value);
};

const main = async () => {
  await liff.init({ liffId: 'Y1657906140-nka6RQew' });
  // Check login status
  if (liff.isLoggedIn()) {
    // Get user profile
    const profile = await liff.getProfile();

    h1Element.innerHTML = liff.$bmi.greet(liff.getLanguage(), profile);
  } else {
    liff.login();
  }
};
