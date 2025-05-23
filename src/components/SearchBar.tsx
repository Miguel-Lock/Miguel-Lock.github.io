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
  ListSubheader,
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

const mealFilters = [
  "Appetizers",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Snacks",
  "Beverages",
];

const seasonFilters = ["Autumn", "Spring", "Winter", "Summer"];

const dietaryOptions = ["Gluten-Free", "Vegetarian", "High-Protein"];

const cuisineFilters = ["Italian", "Thai", "American", "Cuban", "Mexican"];

export const SearchBar: React.FC<SearchProps> = ({
  query,
  setSearchQuery,
  displayFavorites,
  toggleDisplayFavorites,
  search,
}) => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    search();
  };

  const filterMenuItem = (option: string) => {
    return (
      <MenuItem key={option} value={option}>
        <Checkbox
          checked={selectedFilters.includes(option)}
          sx={{ color: "text.primary" }}
        />
        <ListItemText primary={option} />
      </MenuItem>
    );
  };

  React.useEffect(() => {
    search();
  }, [query]);

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
        }}
        onKeyDown={(e) => (e.key === "Enter" ? search() : null)}
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
          <Typography>Max Time (min):</Typography>
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
            onChange={(_: Event, value) => {
              setSearchQuery({ ...query, maxTime: value as number });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Max Difficulty
            </InputLabel>
            <Select
              value={query.maxDifficulty}
              label="Max Difficulty"
              onChange={(e: SelectChangeEvent) => {
                setSearchQuery({
                  ...query,
                  maxDifficulty: e.target.value as "hard" | "moderate" | "easy",
                });
              }}
              sx={{
                mb: 2,
                "& .MuiSelect-icon": {
                  color: "text.primary", // Custom color
                },
              }}
            >
              <MenuItem value={"hard"}>Hard</MenuItem>
              <MenuItem value={"moderate"}>Moderate</MenuItem>
              <MenuItem value={"easy"}>Easy</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
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
              sx={{
                "& .MuiSelect-icon": {
                  color: "text.primary", // Custom color
                },
              }}
            >
              <ListSubheader sx={{ color: "text.primary" }}>Meal</ListSubheader>
              {mealFilters.map((option: string) => filterMenuItem(option))}

              <ListSubheader sx={{ color: "text.primary" }}>
                Season
              </ListSubheader>
              {seasonFilters.map((option) => filterMenuItem(option))}

              <ListSubheader sx={{ color: "text.primary" }}>
                Dietary
              </ListSubheader>
              {dietaryOptions.map((option) => filterMenuItem(option))}

              <ListSubheader sx={{ color: "text.primary" }}>
                Cuisine
              </ListSubheader>
              {cuisineFilters.map((option) => filterMenuItem(option))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </>
  );
};
