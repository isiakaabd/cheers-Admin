import moment from "moment";

export const COLORS = {
  secondary: "#E5E5E5",
  gray: "#74858C",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
export const getTimeMoment = (startDate) => {
  const durationObj = moment.duration(
    moment(new Date()).diff(moment(startDate))
  );

  if (durationObj.asMonths() >= 1) {
    return durationObj.asMonths().toFixed(0) + "M";
  } else if (durationObj.asDays() >= 1) {
    return durationObj.asDays().toFixed(0) + "d";
  } else if (durationObj.asDays() >= 7) {
    return durationObj.asWeeks().toFixed(0) + "w";
  } else if (durationObj.asHours() >= 1) {
    return durationObj.asHours().toFixed(0) + "h";
  } else if (durationObj.asMinutes() > 1) {
    return durationObj.asMinutes().toFixed(0) + "m ";
  } else if (durationObj.asSeconds() >= 1) {
    return durationObj.asSeconds().toFixed(0) + "s ";
  }
  return "now";
  //  durationObj.seconds().toFixed(0) + "s";
  // return formattedDuration;
};
export const getDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};
