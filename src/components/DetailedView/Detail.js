import React, { useEffect, useState } from 'react';
import classes from "./Details.module.css";
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Modal, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import { API_CONFIGURATION, backgroundGradients, ModalStyle } from "../../utils/constants";

let desc_count = 0;
let description_tooltip = "";
let desc = "";
let evolution_chain = [];
let types = null;

const generateEvolutionChain = (input) => {
  if (input !== null) {
    const splitArray = input?.species?.url?.split("/");
    const id = splitArray ? splitArray[splitArray?.length - 2] : 0;
    let image_obj = {
      name: input?.species?.name,
      id: id
    };
    evolution_chain.push(image_obj);
    if (input?.evolves_to?.length !== 0) {
      generateEvolutionChain(input?.evolves_to[0]);
    }
  };
}

const Detail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const requestData = useLoaderData();
  const { maleList, femaleList, genderLessList } = useSelector(state => state);

  const [weakness, setWeakness] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [description, setDescriptioin] = useState(["", ""]);

  id = parseInt(id);
  let data = null,
    species_resp = null,
    evol_chain = null;
  let gender = "";

  if (maleList?.includes(data?.name)) {
    gender = gender + "Male, ";
  }
  if (femaleList?.includes(data?.name)) {
    gender = gender + "Female, "
  }
  if (genderLessList?.includes(data?.name)) {
    gender = gender + "Genderless, "
  } else if (gender === "") {
    gender = "Genderless";
  }
  if (requestData.isError === undefined) {
    [data, species_resp, evol_chain] = requestData;
  }
  if (maleList?.length === 0) {
    navigate("/");
  }

  useEffect(() => {
    desc_count = 0;
  });

  useEffect(() => {
    handletypesfetch(data?.types[0]);
  }, [data]);

  useEffect(() => {
    evolution_chain = [];
    evol_chain?.chain && generateEvolutionChain(evol_chain?.chain);
  }, [evol_chain]);

  let image = data?.sprites?.other?.dream_world?.front_default;
  if (image === null) {
    image = data.sprites.other["official-artwork"].front_default;
  }

  useEffect(() => {
    if (desc_count < (species_resp?.flavor_text_entries?.length >= 10 ? 10 : species_resp?.flavor_text_entries?.length)) {
      desc = "";
      description_tooltip = "";
      species_resp?.flavor_text_entries?.map((obj) => {
        if (obj.language?.name === "en" && desc_count <= 10) {
          if (desc_count <= 5) {
            desc = desc + obj.flavor_text;
          }

          description_tooltip = description_tooltip + obj.flavor_text;
          desc_count += 1;
        }
        return null;
      });
      setDescriptioin([desc, description_tooltip])
    }
  }, [species_resp]);

  const handletypesfetch = async (data) => {
    types = await fetchTypesData(data);
    await setWeakness(types?.damage_relations?.double_damage_from);
  };

  const handleNevigation = (type) => {
    if (id >= 1) {
      if (type === "back" && id > 1) {
        setDescriptioin(["", ""]);
        desc_count = 0;
        navigate(`/detail/${id - 1}`);
      } else if (type === "next") {
        desc_count = 0;
        setDescriptioin(["", ""]);
        navigate(`/detail/${id + 1}`);
      }
    }
  }

  if (requestData?.isError) return <h2>{requestData.message}</h2>;

  const nav_icons = <>
    <div className={classes.extraHeader}>
      <Button onClick={() => handleNevigation("back")} aria-label='Go Previous' startIcon={<ArrowBackIosNewIcon fontSize='small' />} />
      <Button onClick={() => navigate(`/`)} aria-label='Go To Home' startIcon={<HomeIcon fontSize='small' />} />
      <Button onClick={() => handleNevigation("next")} aria-label='Go Next' startIcon={<ArrowForwardIosIcon fontSize='small' />} />
    </div>
    <div className={classes.crossbutton}>
      <Button onClick={() => navigate(`/`)} aria-label='Go Home' startIcon={<HomeIcon fontSize='small' />} />
    </div>
  </>;

  return (
    <div className={classes.container}>
      <article className={classes.card_container} aria-labelledby="charizard-title">
        <section className={classes.pokemon_info}>
          <div className={classes.description}>
            <Header title={data?.name} description={id} extrahtml={nav_icons} className={["detailedHeader", "extraLogoCss"]} />
            <span className={classes.contentWrapper}>
              <div className={classes.card} style={{ background: backgroundGradients[(id) % 10] }}>
                <img
                  aria-label='pokemon-default'
                  className={classes.pokemon_img}
                  src={image}
                  alt={`Pokemon: ${data?.name}`}
                />
              </div>

              <p aria-label="description" className={classes.paragraph}>
                {`${description[0]}..`}
                <span className={classes.read_more} onClick={() => setOpen(true)}>Read More</span>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={ModalStyle}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {`${description[1]}..`}
                    </Typography>
                  </Box>
                </Modal>
              </p>
            </span>
          </div>
        </section>

        {/* Stats and Abilities Section */}
        <section aria-label='configuration' className={classes.pokemon_details}>
          <dl className={classes.stats}>
            <div>
              <dt>Height:</dt>
              <dd>{data?.height}</dd>
            </div>
            <div>
              <dt>Weight:</dt>
              <dd>{data?.weight} KG</dd>
            </div>
            <div>
              <dt>Gender(s):</dt>
              <dd>{gender}</dd>
            </div>
            <div>
              <dt>Egg Groups:</dt>
              <dd>{species_resp?.egg_groups?.map(group => `${group.name}, `)}</dd>
            </div>
            <div>
              <dt>Abilities:</dt>
              <dd>{data?.abilities?.map(ability => `${ability.ability.name}, `)}</dd>
            </div>
            <div>
              <dt>Types:</dt>
              <dd>
                {data?.types?.map((type, i) =>
                  <span key={i} className={`${classes.type} ${classes[type.type.name]}  ${classes.border}`} role="img" aria-label="Fire type">{type.type.name}</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Weak Against:</dt>
              <dd>
                {weakness.map(weak => {
                  return <span className={`${classes.weakness} ${classes[weak.name]} ${classes.border}`} role="img" aria-label="Weak against Fighting">{weak.name}</span>
                })}
              </dd>
            </div>
          </dl>

          {/* Stats bar */}
          <div aria-label="Stats-Status" className={classes.stats_section}>
            <h2 id="stats-title">Stats</h2>
            <section className={classes.stats_bars} aria-labelledby="stats-title">
              {data?.stats?.map((stat, i) =>
                <div key={i} className={classes.stat}>
                  <span>{(stat.stat.name)}</span>
                  <div className={classes.progress_bar} role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="150">
                    <div className={classes.progress} style={{ width: `${stat.base_stat}%` }}> <span>{stat.base_stat}</span></div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>

        <section aria-label="evolution-chain" className={classes.evolution_section}>
          <h2 id="evolution-title">Evolution Chain</h2>
          <div className={classes.evolution_chain}>
            {evolution_chain && evolution_chain.map((obj, ind) => <><div className={classes.evolcard} style={{ background: backgroundGradients[(obj.id) % 10] }}>
              <img
                className={classes.evolution_img}
                src={`${API_CONFIGURATION.home_list_image}${obj.id}.svg`}
                alt={data?.name}
              />
              <div className={classes.evolName}>{obj.name}</div>
              <div className={classes.evolNo}>{`00${obj.id}`}</div>
            </div>
              {!(ind === (evolution_chain.length - 1)) && ArrowRight()}
            </>)}
          </div>
        </section>
      </article>
    </div>
  );
};

export default Detail;

export async function fetchDetailedInfo(id) {
  const response = await fetch(`${API_CONFIGURATION.detailed_info}${id}`);

  if (!response.ok) {
    throw { isError: true, message: `Could not fetch Data for requested id: ${id}. Something went wrong! ${response.status}` }
  } else {
    const data = await response.json();
    let species_resp = null;
    const species = async () => {
      const response = await fetch(`${data.species.url}`);
      if (!response.ok) {
        return { isError: true, message: "Something went wrong while fetching species data!" }
      }
      species_resp = await response.json();
      let evol_chain = null;
      const chaining = async () => {
        const response1 = await fetch(`${species_resp?.evolution_chain?.url}`);
        if (!response1.ok) {
          return { isError: true, message: "Something went wrong while fetching Evolution Chain data!" }
        }
        evol_chain = await response1.json();
        species_resp = await [species_resp, evol_chain];
      }
      await chaining();
    }
    await species();
    return [data, ...species_resp];
  }
}

const fetchTypesData = async (urlValue) => {
  let response = null;
  await fetch(urlValue?.type?.url).then((res) => {
    if (!res.ok) {
      return { isError: true, message: "Something went wrong while fetching types data!" }
    }
    response = res.json()
  });
  return await response;
}

const ArrowRight = () => {
  return (
    <ArrowForwardIcon fontSize='large' />
  );
};