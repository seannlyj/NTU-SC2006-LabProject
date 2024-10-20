// ActivityRecommendation.js
import { allActivities } from "./EditProfilePanel.js";

export const getRecommendedActivities = (activities, preferences, weather) => {
  console.log("getRecommendedActivities called with:");
  console.log("Activities:", activities);
  console.log("Preferences:", preferences);
  console.log("Weather:", weather);

  const outdoorWeatherConditions = [
    "Fair (Day)",
    "Fair",
    "Fair (Night)",
    "Warm",
    "Windy",
  ];
  const showOutdoorActivities = outdoorWeatherConditions.includes(weather);

  // Use allActivities if preferences is empty
  const filteredPreferences =
    preferences.length > 0 ? preferences : allActivities;

  const recommendedActivities = activities.filter((activity) => {
    const isPreferredActivity = filteredPreferences.includes(activity.activity);
    const isSuitableForWeather = showOutdoorActivities
      ? activity.indoorOutdoor === "outdoor"
      : activity.indoorOutdoor === "indoor";

    return isPreferredActivity && isSuitableForWeather;
  });

  console.log("Recommended Activities:", recommendedActivities);
  return recommendedActivities;

  //return activities;
};
