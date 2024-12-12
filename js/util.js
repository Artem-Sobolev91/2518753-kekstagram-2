export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const CLASS_NAME_HIDDEN = 'hidden';


export const hasKeyEscape = (event) => event.key === 'Escape';
