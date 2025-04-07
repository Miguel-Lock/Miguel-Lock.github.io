import React, { SyntheticEvent } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Slider from "@mui/material/Slider";

interface SearchQuery {
  target: string; //this is the name or ingredient of the recipe
  maxTime: number;
  maxDifficulty: "hard" | "moderate" | "easy";
  filters: string[];
}

interface SearchProps {
  query: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  displayFavorites: Boolean;
  toggleDisplayFavorites: () => void;
  search: () => void;
}

const filterOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Snacks",
  "Beverage",
  "Autumn",
  "Spring",
  "Winter",
  "Summer",
  "Gluten-Free",
  "Vegetarian",
  "Italian",
  "Thai",
];

let typingTimer: ReturnType<typeof setTimeout>;
const doneTypingInterval = 500;

export const SearchBar: React.FC<SearchProps> = ({
  query,
  setSearchQuery,
  displayFavorites,
  toggleDisplayFavorites,
  search,
}) => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //waits for .5s since the user stops typing to search
  const delayedSearch = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      search();
    }, doneTypingInterval);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    search();
  };

  return (
    <>
      <ToggleButtonGroup
        value={displayFavorites ? "fav" : "all"}
        exclusive
        onChange={toggleDisplayFavorites}
        aria-label="Platform"
        color="primary"
        sx={{ mr: 2, mb: 3, alignItems: "center" }}
      >
        <ToggleButton value="all" defaultChecked>
          All Recipes
        </ToggleButton>
        <ToggleButton value="fav">Favorites</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        placeholder="Search Recipes"
        variant="outlined"
        value={query.target}
        sx={{ width: "300px" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={openMenu}>
                  <FilterListIcon
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  sx={{ color: (theme) => theme.palette.text.primary }}
                />
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => {
          e.preventDefault();
          setSearchQuery({ ...query, target: e.target.value });
          delayedSearch();
        }}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "250px", // Set your desired width
            maxHeight: "none", // Remove default maxHeight if needed
            padding: "8px", // Optional padding
          },
        }}
      >
        <MenuItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Max Cooking Time:</Typography>
          <Slider
            aria-label="Cooking Time"
            value={query.maxTime}
            defaultValue={60}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={5}
            marks
            min={5}
            max={60}
            sx={{ mt: 3, mb: 1 }}
            onChange={(_: Event, value) =>
              setSearchQuery({ ...query, maxTime: value as number })
            }
          />
        </MenuItem>
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Max Difficulty
            </InputLabel>
            <Select
              value={query.maxDifficulty}
              label="Max Difficulty"
              onChange={(e: SelectChangeEvent) =>
                setSearchQuery({
                  ...query,
                  maxDifficulty: e.target.value as "hard" | "moderate" | "easy",
                })
              }
            >
              <MenuItem value={"hard"}>Hard</MenuItem>
              <MenuItem value={"moderate"}>Moderate</MenuItem>
              <MenuItem value={"easy"}>Easy</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={filterOptions}
            value={selectedFilters}
            onChange={(_: SyntheticEvent, value: string[]) => {
              setSelectedFilters(value);
              setSearchQuery({ ...query, filters: value });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Filter by Tag"
                placeholder="Add filters"
              />
            )}
            sx={{ width: "100%" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
