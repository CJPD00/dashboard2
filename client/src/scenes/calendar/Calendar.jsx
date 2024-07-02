import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Calendar = () => {
  const theme = useTheme();

  const style = {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.text.primary,
  };

  return (
    <div className="p-2 m-2 mt-24 md:m-10 md:p-10 rounded-3xl" style={style}>
      <Header title="Calendario" subtitle="Agenda" />
    </div>
  );
};

export default Calendar;
