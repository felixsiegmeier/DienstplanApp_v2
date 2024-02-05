export default function getRandomElements(array, n) {
    const shuffledArray = array.slice(); // Kopie des Arrays, um das Original nicht zu verändern
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray.slice(0, Math.min(n, shuffledArray.length));
  }