
import buffChewbie from '../../assets/buffChewbie.png';
import creativeChewbie from '../../assets/creativeChewbie.png';
import gamerChewbie from '../../assets/gamerChewbie.png';
import scientistChewbie from '../../assets/scientistChewbie.png';

import './Results.css'

const mostCommon = arr => {
  const count = [0, 1, 2, 3].map(num => ({
    value: num,
    count: arr.filter(v => v === num).length
  }));

  count.sort((a, b) => b.count - a.count || a.value - b.value);

  return count[0].value;
};

const Results = ({ answers }) => {
  const score = mostCommon(answers)

  let description;
  let chewbieType;
  let memeImage;

  switch (score) {
    case 0:
      description = "You’re known for creating crazy combos that taste delicious. Your thirst for knowledge and curiosity cravings are as limitless as your need for new Hi-Chew flavors!"
      chewbieType = "Scientist Chewbie"
      memeImage = scientistChewbie;
      break;
    case 1:
      description = "You’re competitive, adventurous, and always down to show everyone who’s the best. You definitely have a favorite flavor and you cannot be swayed."
      chewbieType = "Gamer Chewbie"
      memeImage = gamerChewbie;
      break;
    case 2:
      description = "You are inventive, dreamy, and artistic! While you’re always open to trying new flavors, you usually pick them based on the color not the flavor."
      chewbieType = "Creative Chewbie"
      memeImage = creativeChewbie;
      break;
    case 3:
      description = "Strong and determined, there’s nothing you can’t do when you put your mind to it! You’re loyal to your favorite flavor, and your workout routine! "
      chewbieType = "Buff Chewbie"
      memeImage = buffChewbie;
      break;
    default:
      description = "You’re known for creating crazy combos that taste delicious. Your thirst for knowledge and curiosity cravings are as limitless as your need for new Hi-Chew flavors!"
      chewbieType = "Scientist Chewbie"
      memeImage = scientistChewbie;
  }

  const handleShareClick = async () => {
    try {
      const response = await fetch(memeImage);
      const blob = await response.blob();

      const file = new File([blob], 'chewbie.png', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `I'm a ${chewbieType}!`,
          text: 'See my result from Which Chewbie Are You?',
          files: [file]
        });
      } else {
        alert('Sharing not supported on this device. Try saving the image and sharing manually.');
      }
    } catch (error) {
    }
  };

  return (
    <div className="results-container">
      <div className="header-text-container">
        <h1 className='yourein-text'>You're In!</h1>
        <p className='thanksforentering-text'>Thanks for entering! You're officially in the running to win some seriously sweet HI-CHEW merch and treats.</p>
      </div>
      <img src={memeImage} alt="Chewbie Meme" className="pillow-image" />
      <div className="description-container">
        <div>
          <h1 className='progress-text'>You are:</h1>
          <h1 className='question-text'>{chewbieType}</h1>
        </div>
      </div>
      <p className="description-text">{description}</p>
      <button 
        className="share-button"
        onClick={handleShareClick}
      >
        Share your results
      </button>
    </div>
  );
};

export default Results;