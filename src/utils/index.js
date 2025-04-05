export function calculateAge(birthdayStr) {
  const birthday = new Date(birthdayStr);
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

export function getCharactersToString(characters) {
  const capitalized = characters.map(
    character => character.charAt(0).toUpperCase() + character.slice(1)
  );

  return capitalized.join(', ');
}

export function getFirstLetter(name) {
  return name.slice(0, 1).toUpperCase();
}
