var video = [
  {
    "Id": 3498,
    "name": "Grand Theft Auto V",
    "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    "genres": "Action,Adventure",
    "rating": 4.48
  },
  {
    "Id": 3328,
    "name": "The Witcher 3: Wild Hunt",
    "image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "genres": "Action,Adventure,RPG",
    "rating": 4.67
  },
  {
    "Id": 4200,
    "name": "Portal 2",
    "image": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    "genres": "Shooter,Puzzle",
    "rating": 4.62
  }
]

console.log(video.filter(e => e.genres.toLowerCase().includes('RPG'.toLowerCase())))