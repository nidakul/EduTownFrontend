import React from "react";

type Props = {
  date: Date | undefined;
  format?: "full" | "year" | "month" | "day" | "time" | "minute" | "dateOnly";
};

const FormattedDate: React.FC<Props> = ({ date, format = "full" }) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    switch (format) {
      case "year":
        return formattedDate.getFullYear().toString();
      case "month":
        return formattedDate.toLocaleString("default", { month: "long" });
      case "day":
        return formattedDate.getDate().toString();
      case "dateOnly":
        return formattedDate.toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
      case "time":
        return formattedDate.toLocaleTimeString("tr-TR", {
          timeZone: "Europe/Istanbul",
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        });
      case "minute":
        return formattedDate.getMinutes().toString();
      default:
        return formattedDate.toLocaleString("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
    }
  };

  const formattedDate = formatDate(date);

  return <span>{formattedDate}</span>;
};

export default FormattedDate;