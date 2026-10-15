"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function DateReserve() {
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  return (
    <div className="flex flex-col gap-7">
      {/* Date Picker with enhanced styling */}
      <div className="relative">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Event Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                sx: {
                  '& .MuiInput-root, & .MuiPickersInputBase-root': {
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    '&:before': {
                      borderBottomColor: 'var(--color-border)',
                      borderBottomWidth: '2px',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'var(--color-primary)',
                    },
                    '&:after': {
                      borderBottomColor: 'var(--color-primary)',
                      borderBottomWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                    color: 'var(--color-muted)',
                    fontSize: '1rem',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                  },
                  '& .MuiInputBase-input': {
                    paddingTop: '12px',
                    paddingBottom: '8px',
                    fontSize: '1rem',
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* Name with enhanced styling */}
      <TextField
        variant="standard"
        fullWidth
        name="Name-Lastname"
        label="Name-Lastname"
        placeholder="e.g. John Doe"
        sx={{
          '& .MuiInput-root': {
            paddingTop: '8px',
            paddingBottom: '8px',
            '&:before': {
              borderBottomColor: 'var(--color-border)',
              borderBottomWidth: '2px',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'var(--color-primary)',
            },
            '&:after': {
              borderBottomColor: 'var(--color-primary)',
              borderBottomWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: 'var(--color-muted)',
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
            fontWeight: 600,
          },
          '& .MuiInputBase-input': {
            paddingTop: '12px',
            paddingBottom: '8px',
            fontSize: '1rem',
          },
        }}
      />

      {/* Contact Number with enhanced styling */}
      <TextField
        variant="standard"
        fullWidth
        name="Contact-Number"
        label="Contact-Number"
        placeholder="e.g. 081-234-5678"
        sx={{
          '& .MuiInput-root': {
            paddingTop: '8px',
            paddingBottom: '8px',
            '&:before': {
              borderBottomColor: 'var(--color-border)',
              borderBottomWidth: '2px',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'var(--color-primary)',
            },
            '&:after': {
              borderBottomColor: 'var(--color-primary)',
              borderBottomWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: 'var(--color-muted)',
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
            fontWeight: 600,
          },
          '& .MuiInputBase-input': {
            paddingTop: '12px',
            paddingBottom: '8px',
            fontSize: '1rem',
          },
        }}
      />

      {/* Venue Select with enhanced styling */}
      <FormControl 
        fullWidth 
        variant="standard"
        sx={{
          '& .MuiInput-root': {
            paddingTop: '8px',
            paddingBottom: '8px',
            '&:before': {
              borderBottomColor: 'var(--color-border)',
              borderBottomWidth: '2px',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'var(--color-primary)',
            },
            '&:after': {
              borderBottomColor: 'var(--color-primary)',
              borderBottomWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: 'var(--color-muted)',
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
            fontWeight: 600,
          },
          '& .MuiSelect-select': {
            paddingTop: '12px',
            paddingBottom: '8px',
            fontSize: '1rem',
          },
        }}
      >
        <InputLabel id="venue-label">Venue</InputLabel>
        <Select
          id="venue"
          labelId="venue-label"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          displayEmpty
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
