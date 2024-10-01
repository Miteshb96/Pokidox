import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  TextField, InputLabel, InputAdornment, FormControl, Select, MenuItem,
  ListItemText, Checkbox, OutlinedInput, Button, Slider, Box, Typography, Modal
} from '@mui/material';

import classes from "./Filter.module.css";
import { style, ButtonStyle, styleModal, types, MenuProps, marks, statsrangeObj } from "../../utils/constants";

let timer = null;

export default function FullWidthTextField(props) {
  const { handleSearchBy, setTypeFilter, setGender, setFilterByStats } = props.filterObj;

  const [open, setOpen] = useState(false);
  const [tag, setTag] = React.useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [openMenu, setOpenmenu] = useState(false);
  const [gender, setSelectedGender] = useState("All")
  const [statRanges, setStatRanges] = useState(statsrangeObj);

  const handleOpen = () => setOpen(true);

  const handleClose = (type) => {
    //pass state to Home component and write logic to filter the data.
    if (type === "reset") {
      setStatRanges(statsrangeObj);
      setFilterByStats(null);
    } else {
      setFilterByStats(statRanges);
    }
    setOpen(false);
  }

  const handleSliderChange = (stat, newValue) => {
    setStatRanges((prev) => ({
      ...prev,
      [stat]: newValue,
    }));
  };

  const handleInputChange = (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchBy(value);
      if (value.length === 0) {
        handleSearchBy("");
      }
    }, 200);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    setGender(value)
  }

  const handleChange = (event) => {
    const { target: { value }, } = event;
    setTag(typeof value === 'string' ? value.split(',') : value);
    setTypeFilter(value)
  };

  const renderSlider = (label, statKey) => (
    <Box key={statKey} mb={2}>
      <Typography>{label}</Typography>
      <Slider
        value={statRanges[statKey]}
        onChange={(e, newValue) => handleSliderChange(statKey, newValue)}
        valueLabelDisplay="auto"
        min={30}
        max={210}
        marks={marks}
      />
    </Box>
  );

  const handleMenuOpen = () => setOpenmenu(true);
  const handleMenuClose = (type) => {
    //pass state to Home component and write logic to filter the data.
    if (type === "reset") {
      setStatRanges(statsrangeObj);
      setFilterByStats(null);
    } else {
      setFilterByStats(statRanges);
    }
    setOpenmenu(false);
  }

  const typeTag = ({ id, sx }) => (
    <FormControl sx={sx}>
      <InputLabel id={id}>Type</InputLabel>
      <Select
        aria-label="type"
        labelId={id}
        id={`${id} demo-multiple-checkbox`}
        multiple
        value={tag}
        onChange={handleChange}
        input={<OutlinedInput label="Type" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            <Checkbox checked={tag.includes(type)} />
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>);

  const genderTag = ({ id, sx }) => (<FormControl sx={sx}>
    <InputLabel id={id}>Gender</InputLabel>
    <Select
      labelId={id}
      id={`${id} demo-simple-select`}
      label="Gender"
      defaultValue={"All"}
      value={gender}
      onChange={(e) => handleGenderChange(e.target.value)}
    >
      <MenuItem value={"All"}>All</MenuItem>
      <MenuItem value={"male"}>Male</MenuItem>
      <MenuItem value={"female"}>Female</MenuItem>
      <MenuItem value={"genderless"}>Genderless</MenuItem>
    </Select>
  </FormControl>);

  const statsTag = () => (<>
    {renderSlider("HP", "hp")}
    {renderSlider("Attack", "attack")}
    {renderSlider("Defense", "defense")}
    {renderSlider("Speed", "speed")}
    {renderSlider("Sp. Attack", "spAttack")}
    {renderSlider("Sp. Def.", "spDefense")}
  </>);

  return (
    <div className={classes.container}>
      <TextField className={classes.SearchFiled} placeholder='Name or Number' label="Search By"
        onChange={(e) => handleInputChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <Button aria-label="Search" onClick={() => handleSearchBy(searchBy)}>
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            </Button>
          ),
        }}
      />

      <div className={classes.menu} role="button">
        <Button sx={{ backgroundColor: "#2e3156" }} onClick={handleMenuOpen}>
          <MenuIcon sx={{ color: "white", fontSize: "xx-large" }} />
        </Button>
      </div>
      <Modal
        open={openMenu}
        onClose={handleMenuClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography variant="h6" component="h2" sx={{ display: "flex", justifyContent: "space-between", padding: "10px 0px 5px 10px", borderBottom: "1px solid #e0e0e5" }}>
            Filters <Button onClick={handleMenuClose}> <CloseIcon /></Button>
          </Typography>
          <section className={classes.sectionPadding}>
            {typeTag({ id: "demo-multiple-checkbox-label-1", sx: { width: "70%" } })}
          </section>
          <section className={classes.sectionPadding}>
            {genderTag({ id: "demo-simple-select-label", sx: { width: "70%" } })}
          </section>
          <section className={classes.sectionPadding}>
            {statsTag()}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="outlined" onClick={() => handleMenuClose("reset")}>
                Reset
              </Button>
              <Button variant="contained" onClick={() => handleMenuClose("apply")}>
                Apply
              </Button>
            </Box>
          </section>
        </Box>
      </Modal>

      <div className={classes.formControl} role="dialog">
        {typeTag({ id: "demo-multiple-checkbox-label", sx: {} })}
      </div>

      <div className={classes.formControl} role="dialog">
        {genderTag({ id: "demo-simple-select-label", sx: {} })}
      </div>

      <div className={classes.formControlStats} role="dialog">
        <FormControl className={classes.formControl}>
          <Button variant="outlined" aria-label="Stats" onClick={handleOpen} sx={ButtonStyle}>
            Stats <ArrowDropDownIcon />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                Select Stats
              </Typography>
              {statsTag()}
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button variant="outlined" onClick={() => handleClose("reset")}>
                  Reset
                </Button>
                <Button variant="contained" onClick={() => handleClose("apply")}>
                  Apply
                </Button>
              </Box>
            </Box>
          </Modal>
        </FormControl>
      </div>
    </div>
  );
}