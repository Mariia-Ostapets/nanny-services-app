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

export function applySorting(data, sortBy = 'Show all') {
  const sortFieldMap = {
    'A to Z': 'name',
    'Z to A': 'name',
    'Less than 10$': 'price_per_hour',
    'Greater than 10$': 'price_per_hour',
    'Not popular': 'rating',
    Popular: 'rating',
  };

  if (sortBy === 'Less than 10$') {
    data = data.filter(item => item.price_per_hour < 10);
  }

  if (sortBy === 'Greater than 10$') {
    data = data.filter(item => item.price_per_hour >= 10);
  }

  const field = sortFieldMap[sortBy];
  const isDescending = ['Z to A', 'Popular'].includes(sortBy);

  if (!field) return data;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string') {
      return isDescending
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    return isDescending ? bValue - aValue : aValue - bValue;
  });
}

export function paginate(data, page = 1, perPage = 3) {
  const startIndex = (page - 1) * perPage;
  const paginated = data.slice(startIndex, startIndex + perPage);
  const hasMore = startIndex + perPage < data.length;

  return {
    paginated,
    hasMore,
    lastKey: paginated.length ? paginated[paginated.length - 1].id : null,
  };
}
