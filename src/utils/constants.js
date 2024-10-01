export const API_CONFIGURATION = {
  initial_list: "https://pokeapi.co/api/v2/pokemon/",
  detailed_info: "https://pokeapi.co/api/v2/pokemon/",
  home_list_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/",
  female_api: "https://pokeapi.co/api/v2/gender/1/",
  male_api: "https://pokeapi.co/api/v2/gender/2/",
  genderless_api: "https://pokeapi.co/api/v2/gender/3/",
  types: "https://pokeapi.co/api/v2/type/"
};

export const Home_Title = "Pokédex";
export const Home_Description = "Search for any Pokémon that exists on the planet"

export const backgroundGradients = [
  `linear-gradient(185deg, #bfd3c8, #feb061)`,
  `linear-gradient(185deg, #A4CFC0, #CAACCE)`,
  `linear-gradient(185deg, #EDC2C4, #CBD5ED)`,
  `linear-gradient(185deg, #CBD5ED, #C0D4C8)`,
  `linear-gradient(185deg, #C0D4C8, #E2E2A0`,
  `linear-gradient(185deg, #E2E2A0, #C7D7DF)`,
  `linear-gradient(185deg, #C7D7DF, #CADCDF)`,
  `linear-gradient(185deg, #CADCDF, #C6C5E3)`,
  `linear-gradient(185deg, #C6C5E3, #E4C0CF)`,
  `linear-gradient(185deg, #E4C0CF, #C0DFDD)`,
];

export const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  bgcolor: '#2e3156',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "8px",
  color: "white",
  p: 4,
  maxHeight: "60%",
  overflowY: "scroll"
};

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll"
};

export const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  padding: "0px 20px",
};

export const ButtonStyle = {
  display: "flex",
  justifyContent: "space-between",
  color: "#515556",
  border: "1px solid #acb5b6",
  height: "100%"
}

export const empty_array = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];


export const types = [
  'Normal',
  'Fighting',
  "Flying",
  "Poison",
  "Ground",
  'Rock',
  "Fire",
  "Bug",
  "Water"
];
export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const marks = [
  { value: 0, label: '0' },
  { value: 70, label: '70' },
  { value: 150, label: '150' },
  { value: 210, label: '210' },
];
export const statsrangeObj = {
  hp: [0, 210],
  attack: [0, 210],
  defense: [0, 210],
  speed: [0, 210],
  spAttack: [0, 210],
  spDefense: [0, 210],
}

export const detailed_data = {
  "abilities": [
      {
          "ability": {
              "name": "blaze",
              "url": "https://pokeapi.co/api/v2/ability/66/"
          },
          "is_hidden": false,
          "slot": 1
      },
      {
          "ability": {
              "name": "solar-power",
              "url": "https://pokeapi.co/api/v2/ability/94/"
          },
          "is_hidden": true,
          "slot": 3
      }
  ],
  "height": 6,
  "id": 4,
  "name": "charmander",
  "species": {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
  },
  "sprites": {
      "other": {
          "dream_world": {
              "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
          },
          "official-artwork": {
              "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
          }
      }
  },
  "stats": [
      {
          "base_stat": 39,
          "effort": 0,
          "stat": {
              "name": "hp",
              "url": "https://pokeapi.co/api/v2/stat/1/"
          }
      },
      {
          "base_stat": 52,
          "effort": 0,
          "stat": {
              "name": "attack",
              "url": "https://pokeapi.co/api/v2/stat/2/"
          }
      },
      {
          "base_stat": 43,
          "effort": 0,
          "stat": {
              "name": "defense",
              "url": "https://pokeapi.co/api/v2/stat/3/"
          }
      },
      {
          "base_stat": 60,
          "effort": 0,
          "stat": {
              "name": "special-attack",
              "url": "https://pokeapi.co/api/v2/stat/4/"
          }
      },
      {
          "base_stat": 50,
          "effort": 0,
          "stat": {
              "name": "special-defense",
              "url": "https://pokeapi.co/api/v2/stat/5/"
          }
      },
      {
          "base_stat": 65,
          "effort": 1,
          "stat": {
              "name": "speed",
              "url": "https://pokeapi.co/api/v2/stat/6/"
          }
      }
  ],
  "types": [
      {
          "slot": 1,
          "type": {
              "name": "fire",
              "url": "https://pokeapi.co/api/v2/type/10/"
          }
      }
  ],
  "weight": 85
}