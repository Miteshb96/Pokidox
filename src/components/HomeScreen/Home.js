import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Pagination } from '@mui/material';
import { useQuery } from "@tanstack/react-query";

import classes from "./Home.module.css";
import Header from "../Header/Header";
import { storeActions } from "../../store/index.js";
import {
  fetchIitialData, fetchPokemonDetail,
  fetchGenderbasedPokemonList, fetchSearchQueryResult
} from "../../store/actions.js";
import FullWidthTextField from "../Filter/FilterView.js";
import { API_CONFIGURATION } from "../../utils/constants.js";
import { backgroundGradients, Home_Title, Home_Description, empty_array } from "../../utils/constants.js";

const page_size = 20;
let current_offset = 1;
let searchTimer = null;
let content = null;
let TypeTimer = null;
let gendertimer = null;
let detailedArray = [];
const filtered_list = {
  male: [],
  female: [],
  genderless: []
}

const Home = () => {
  const { pokemonList, offset, pageOffset } = useSelector(state => state);
  const dispatch = useDispatch();

  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [gender, setGender] = useState("All");
  const [searchBy, setSearchBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [ImageList, setImageList] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterByStats, setFilterByStats] = useState(null);
  const [GenderBasedImageList, setGenImageList] = useState([]);

  const filterObj = {
    handleSearchBy: (val) => handleSearchBy("search", val),
    setTypeFilter: (val) => handleSearchBy("type", val),
    setGender: (val) => handleSearchBy("gender", val),
    setFilterByStats: (value) => setFilterByStats(value)
  };

  const handleSearchBy = (type, value) => {
    if (type === "search") {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        if (value !== "") { setLoading(true); }
        setSearchBy(value);
      }, 1000);
    } else if (type === "type") {
      setFilterType(value.map(obj => obj.toLowerCase()));
    } else if (type === "gender") {
      setGender(value);
      //resetting other filters
      setLoading(true);
      gendertimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      setSearchBy("");
      setFilterType([]);
    }
  };

  const { data, isError, error } = useQuery({
    queryKey: ['initial', { "offset": offset }],
    queryFn: () => fetchIitialData({ offset })
  });

  const searchResult = useQuery({
    queryKey: ['searchBy', { "search": searchBy }],
    queryFn: () => fetchSearchQueryResult({ searchBy })
  });

  const male_api_res = useQuery({
    queryKey: ['male'],
    queryFn: () => fetchGenderbasedPokemonList({ type: "male" })
  });

  const female_api_res = useQuery({
    queryKey: ['female'],
    queryFn: () => fetchGenderbasedPokemonList({ type: "female" })
  });

  const genderless_api_res = useQuery({
    queryKey: ['genderless'],
    queryFn: () => fetchGenderbasedPokemonList({ type: "genderless" })
  });

  useEffect(() => {
    return () => {
      clearTimeout(TypeTimer);
      clearTimeout(searchTimer);
      clearTimeout(gendertimer);
    }
  }, [])

  useEffect(() => {
    dispatch(storeActions.put(data));
    detailedArray = [];
    let count = 0;
    data?.results?.map((obj, i) => {
      fetchPokemonDetail(obj.url, i)
        .then((res) => {
          count += 1;
          detailedArray.push(res);
          if (count === data.results.length) {
            const arr = [];
            const type_array = []
            const stats_array = [];
            detailedArray.map(obj1 => {
              arr[obj1.id] = obj1.url;
              type_array[obj1.id] = obj1.type;
              stats_array[obj1.id] = obj1.stats;
              return null;
            });
            setStats(stats_array);
            setTypes(type_array);
            setImageList(arr);
          }
        });
      return null;
    });
  }, [offset, data, dispatch]);

  useEffect(() => {
    if (gender !== "All") {
      detailedArray = [];
      let count = 0;
      const currentList = filtered_list[gender] && filtered_list[gender].length > 0 && filtered_list[gender].slice(pageOffset, pageOffset + 20);
      currentList && currentList?.map((obj, i) => {
        const id = obj?.url?.split("/")[6];
        fetchPokemonDetail(`${API_CONFIGURATION.initial_list}${id}`, i)
          .then((res) => {
            count += 1;
            detailedArray.push(res);
            if (count === currentList.length) {
              const arr = [];
              const type_array = [];
              const stats_array = [];
              detailedArray.map(obj1 => {
                arr[obj1.id] = obj1.url;
                type_array[obj1.id] = obj1.type;
                stats_array[obj1.id] = obj1.stats;
                return null;
              });
              setStats(stats_array);
              setTypes(type_array);
              setGenImageList(arr);
            }
          });
        return null;
      });
    }
  }, [gender, pageOffset]);

  useEffect(() => {
    const male_list = [];
    male_api_res?.data && male_api_res.data?.pokemon_species_details?.map(obj => {
      const id = obj?.pokemon_species?.url?.split("/")[6];
      filtered_list.male.push({ id: id, ...obj.pokemon_species });
      male_list.push(obj.pokemon_species.name);
      return null;
    });
    dispatch(storeActions.setMaleList(male_list));
  }, [male_api_res.data, dispatch]);

  useEffect(() => {
    const female_list = [];
    female_api_res?.data && female_api_res.data?.pokemon_species_details?.map(obj => {
      const id = obj?.pokemon_species?.url?.split("/")[6];
      filtered_list.female.push({ id: id, ...obj.pokemon_species });
      female_list.push(obj.pokemon_species.name);
      return null;
    });
    dispatch(storeActions.setFemaleList(female_list));
  }, [female_api_res.data, dispatch]);

  useEffect(() => {
    const genderless_list = [];
    genderless_api_res?.data && genderless_api_res.data?.pokemon_species_details?.map(obj => {
      const id = obj?.pokemon_species?.url?.split("/")[6];
      filtered_list.genderless.push({ id: id, ...obj.pokemon_species });
      genderless_list.push(obj.pokemon_species.name);
      return null;
    });
    dispatch(storeActions.setGenderLessList(genderless_list));
  }, [genderless_api_res.data, dispatch]);

  const handlePageChange = async (page) => {
    current_offset = (page - 1) * page_size;
    dispatch(storeActions.setoffset(current_offset));
  }

  const handlePagination = async (page) => {
    current_offset = (page - 1) * page_size;
    dispatch(storeActions.setPageOffset(current_offset));
  }

  const statsCheck = [];
  let Pokemon_list = pokemonList ? pokemonList : empty_array;
  let pageCount = (Pokemon_list && Pokemon_list.count) ? Math.ceil(Pokemon_list.count / 20) : 0;
  let ImageForSearchResult = searchResult?.data?.sprites?.other?.dream_world?.front_default;

  if (ImageForSearchResult === null) {
    ImageForSearchResult = searchResult?.data?.sprites?.other?.official?.front_default;
  }
  if (gender !== "All") {
    pageCount = filtered_list && filtered_list[gender].length > 0 ? Math.ceil(filtered_list[gender].length / 20) : 0;
  }
  if (searchResult.data !== undefined && loading) {
    setLoading(false);
  }
  if (filterByStats !== null) {
    stats.map((obj, i) => {
      const check = obj[0].hp >= filterByStats.hp[0] && obj[0].hp <= filterByStats.hp[1] &&
        obj[1].attack >= filterByStats.attack[0] && obj[1].attack <= filterByStats.attack[1] &&
        obj[2].defense >= filterByStats.defense[0] && obj[2].defense <= filterByStats.defense[1] &&
        obj[5].speed >= filterByStats.speed[0] && obj[5].speed <= filterByStats.speed[1] &&
        obj[3]['special-attack'] >= filterByStats.spAttack[0] && obj[3]['special-attack'] <= filterByStats.spAttack[1] &&
        obj[4]['special-defense'] >= filterByStats.spDefense[0] && obj[4]['special-defense'] <= filterByStats.spDefense[1];
      statsCheck[i] = check;
      return null;
    })
  };

  //Dynamic conditional rendering
  if (isError) {
    content = <h2>{`Fetching data failed! Something went wrong. ${error}`}</h2>;
  } else if (loading) {
    content = <h2>{`Loading Search Reasult. Please wait!`}</h2>;
  } else if (searchResult.data !== undefined) {
    if (searchResult.data.isError) {
      content = <h2>{searchResult.data.message}</h2>
    } else {
      content = <div className={classes.grid}>
        <div key={0} className={classes.card} style={{ background: backgroundGradients[(searchResult.data.id) % 10] }}>
          <Link to={`/detail/${searchResult.data.id}`} aria-label={`View details for ${searchResult.data.name}`}>
            <img src={ImageForSearchResult} alt={searchResult.data.name} className={classes.image} />
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#2e3156" }}>{searchResult.data.name}</div>
            <div style={{ fontSize: "20px", color: "#2e3156" }}>{`${searchResult.data.id}`}</div>
          </Link>
        </div>
      </div>
    }
  } else if (gender !== "All") {
    content = <>
      <div className={classes.grid}>
        {filtered_list[gender].slice(pageOffset, pageOffset + 20).map((item, index) => {
          const array = item.url.split("/");
          const id = array[array.length - 2];
          return (statsCheck[index] || statsCheck.length === 0) && <div key={pageOffset + index} className={classes.card} style={{ background: backgroundGradients[(pageOffset + index + 1) % 10] }}>
            <Link to={`/detail/${id}`} aria-label={`View details for ${item.name}`}>
              <img src={GenderBasedImageList[index]} alt={item.name} className={classes.image} />
              <div style={{ fontSize: "20px", fontWeight: 600, color: "#2e3156" }}>{item.name}</div>
              <div style={{ fontSize: "20px", color: "#2e3156" }}>{`${id}`}</div>
            </Link>
          </div>
        }
        )}
      </div>
      <div className={classes.pagination}>
        <Stack spacing={2} >
          <Pagination page={(pageOffset / 20) + 1} count={pageCount} variant="outlined" shape="rounded" size="large" onChange={(e, page) => handlePagination(page)} />
        </Stack>
      </div>
    </>
  } else {
    content = <>
      <div aria-label='cardListing' className={classes.grid}>
        {Pokemon_list?.results?.filter((item, index) => {
          if (filterType.length > 0) {
            const filteredArr = types && types[index]?.filter((type) => {
              return (filterType.join(" ")).includes(type)
            });
            return (filterType?.length > 0 && filteredArr.length > 0) || (filterType.length === 0)
          } else return true;
        }).map((item, index) => {
          const array = item.url.split("/");
          const id = array[array.length - 2];
          return (statsCheck[index] || statsCheck.length === 0) && 
            <div aria-label={`card-${index}`} key={offset + index} className={classes.card} style={{ background: backgroundGradients[(offset + index + 1) % 10] }}>
              <Link to={`/detail/${id}`} aria-label={`View details for ${item.name}`}>
                <img src={ImageList[filterType.length > 0 ? id-1 : index]} alt={item.name} className={classes.image} />
                <div style={{ fontSize: "20px", fontWeight: 600, color: "#2e3156" }}>{item.name}</div>
                <div style={{ fontSize: "20px", color: "#2e3156" }}>{`${id}`}</div>
              </Link>
            </div>
          }
        )}
      </div>
      <div aria-label="pagination" className={classes.pagination}>
        <Stack spacing={2} >
          <Pagination page={(offset / 20) + 1} count={pageCount} variant="outlined" shape="rounded" size="large" onChange={(e, page) => handlePageChange(page)} />
        </Stack>
      </div>
    </>;
  }

  return (
    <div className={classes.container}>
      <Header title={Home_Title} description={Home_Description} />
      <FullWidthTextField filterObj={filterObj} />
      {content}
    </div>
  );
};

export default Home;