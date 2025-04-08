import { Chip } from "@mui/material";

export default function InfoChip({ label }: { label: string }) {
  return (
    <Chip
      label={label}
      sx={{ bgcolor: "primary.main", color: "text.secondary" }}
    />
  );
}
