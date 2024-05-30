import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

type SearchProps = {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
};

function Search({ value, onChange, onClear }: SearchProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <TextField
      onChange={handleChange}
      value={value}
      variant="outlined"
      fullWidth
      placeholder="Search for a show"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={onClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
Search.displayName = "Search";

export default Search;
