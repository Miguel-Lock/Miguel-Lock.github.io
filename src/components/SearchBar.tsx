import React from "react";
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
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
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
  displayFavorites: boolean;
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
        autoFocus={false} // Disable menu's auto focus
        disableAutoFocusItem // Don't focus menu items automatically
        PaperProps={{
          style: {
            width: "250px", // Set your desired width
            maxHeight: "none", // Remove default maxHeight if needed
            padding: "8px", // Optional padding
          },
        }}
        MenuListProps={{
          autoFocus: false,
          disableListWrap: true, // prevent wrapping around menu items
          disablePadding: true,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", px: 2 }}>
          <Typography>Max Cooking Time:</Typography>
          <Slider
            aria-label="Cooking Time"
            value={query.maxTime}
            defaultValue={60}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => (value === 60 ? "60+" : value)}
            shiftStep={30}
            step={5}
            marks
            min={5}
            max={60}
            sx={{ mt: 1, mb: 2 }}
            onChange={(_: Event, value) =>
              setSearchQuery({ ...query, maxTime: value as number })
            }
          />
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
              sx={{ mb: 2 }}
            >
              <MenuItem value={"hard"}>Hard</MenuItem>
              <MenuItem value={"moderate"}>Moderate</MenuItem>
              <MenuItem value={"easy"}>Easy</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="filter-label">Filters</InputLabel>
            <Select
              labelId="filter-label"
              id="selectFilter"
              multiple
              value={selectedFilters}
              onChange={(e: SelectChangeEvent<string[]>) => {
                const value = e.target.value;
                const setValue =
                  typeof value === "string" ? value.split(",") : value;
                setSelectedFilters(setValue);
                setSearchQuery({ ...query, filters: setValue });
              }}
              input={<OutlinedInput label="Filters" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedFilters.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </>
  );
};
