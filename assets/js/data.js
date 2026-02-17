(function () {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomPick(list) {
    return list[randomInt(0, list.length - 1)];
  }

  const genericTags = [
    "flash",
    "custom",
    "sombras",
    "detalhe",
    "coverup",
    "delicado",
    "autoral",
    "color",
    "black",
    "fineline",
    "anime",
    "floral"
  ];

  const artists = [
    {
      id: 1,
      name: "Istonei",
      city: "Sao Paulo",
      styles: ["Fine Line", "Floral", "Minimalista"],
      price: "R$ 450+",
      rating: 4.9,
      bio: "Trampo focado em fine line, floral e composicoes leves. Atendimento calmo e desenho sob medida.",
      studio: "Lobo Ink Studio",
      serviceModes: ["Studio", "Guest Spot"],
      availability: "Seg a Sab - 11h as 20h"
    },
    {
      id: 2,
      name: "Estanlei",
      city: "Campinas",
      styles: ["Old School", "Neo Traditional", "Color"],
      price: "R$ 380+",
      rating: 4.8,
      bio: "Linhas pesadas, cores fortes e muito classico old school com leitura moderna.",
      studio: "Trad Family Tattoo",
      serviceModes: ["Studio", "Domicilio"],
      availability: "Ter a Sab - 10h as 19h"
    },
    {
      id: 3,
      name: "Instanei",
      city: "Rio de Janeiro",
      styles: ["Realismo", "Blackwork", "Geek"],
      price: "R$ 600+",
      rating: 5.0,
      bio: "Especialista em preto e cinza, retratos e pecas grandes de impacto.",
      studio: "Noir Rio Tattoo",
      serviceModes: ["Studio"],
      availability: "Qua a Dom - 12h as 21h"
    },
    {
      id: 4,
      name: "Stanley",
      city: "Belo Horizonte",
      styles: ["Geek", "Minimalista", "Blackwork"],
      price: "R$ 300+",
      rating: 4.7,
      bio: "Tattoos geeks e minimalistas com acabamento limpo e atendimento direto.",
      studio: "Pixel Needle House",
      serviceModes: ["Studio", "Guest Spot", "Domicilio"],
      availability: "Seg a Sex - 9h as 18h"
    }
  ];

  artists.forEach(function (artist) {
    const portfolio = [];

    for (let i = 1; i <= 8; i += 1) {
      const style = randomPick(artist.styles);
      const height = randomPick([640, 720, 800, 880, 960]);
      const createdAt = Date.now() - randomInt(1, 120) * 24 * 60 * 60 * 1000;

      portfolio.push({
        id: `${artist.id}-${i}`,
        artistId: artist.id,
        artistName: artist.name,
        style,
        title: `${style} #${i}`,
        likes: randomInt(60, 1800),
        createdAt,
        tags: [style.toLowerCase(), randomPick(genericTags), randomPick(genericTags)],
        image: `https://loremflickr.com/640/${height}/tattoo,ink?lock=${artist.id * 100 + i}`
      });
    }

    artist.portfolio = portfolio;
  });

  const feed = artists
    .flatMap(function (artist) {
      return artist.portfolio;
    })
    .sort(function () {
      return Math.random() - 0.5;
    });

  window.INKLINK_DATA = {
    artists,
    feed,
    nextSlots: [
      { date: "18/02 - 10:00", artist: "Istonei", status: "Livre" },
      { date: "18/02 - 14:00", artist: "Estanlei", status: "Reservado" },
      { date: "19/02 - 09:30", artist: "Instanei", status: "Livre" },
      { date: "19/02 - 16:00", artist: "Stanley", status: "Livre" }
    ]
  };
})();
