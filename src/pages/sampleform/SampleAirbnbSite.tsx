import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Card, CardContent, CardMedia, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import resData from "../Datas/DummyData.json";
import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BarChart, PieChart } from "@mui/x-charts"; // ✅ Material UI charts

// Styled Navigation Item
const NavItem = styled(Typography)(() => ({
  cursor: "pointer",
  fontWeight: 500,
  "&:hover": { color: "green" },
}));

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  location: string;
  date: string;
}

const SampleCard: React.FC = () => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [allDates, setAllDates] = useState<DateObject[]>([]);

  // 📌 Filter recipes based on selected dates
  const filteredRecipes =
    dates?.length > 1
      ? resData.filter((recipe: Recipe) => {
          const recipeDate = new DateObject(recipe.date);
          return allDates.some((d) => d.format("YYYY-MM-DD") === recipeDate.format("YYYY-MM-DD"));
        })
      : resData;

  // 🔹 Prepare data for charts
  const cuisineCounts: Record<string, number> = {};
  const ratingGroups: Record<string, number> = { "0-2": 0, "2-4": 0, "4-5": 0 };

  filteredRecipes.forEach((recipe) => {
    // Cuisine count
    cuisineCounts[recipe.cuisine] = (cuisineCounts[recipe.cuisine] || 0) + 1;

    // Rating groups
    if (recipe.rating < 2) ratingGroups["0-2"]++;
    else if (recipe.rating < 4) ratingGroups["2-4"]++;
    else ratingGroups["4-5"]++;
  });

  const cuisineData = Object.keys(cuisineCounts).map((c) => ({
    label: c,
    value: cuisineCounts[c],
  }));

  const ratingData = Object.keys(ratingGroups).map((r) => ({
    label: r,
    value: ratingGroups[r],
  }));

  return (
    <>
      {/* 🌟 Airbnb-style Header */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #eee", backgroundColor: "white" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 4 }}>
            <NavItem variant="body1">Home</NavItem>
            <NavItem variant="body1">Recipes</NavItem>
            <NavItem variant="body1">Restaurants</NavItem>
            <NavItem variant="body1">Contact</NavItem>
          </Box>

          {/* 📅 Date Picker */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              border: "1px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              cursor: "pointer",
              "& .rmdp-wrapper": { border: "none", boxShadow: "none" },
            }}
          >
            <CalendarTodayIcon fontSize="small" sx={{ color: "gray" }} />
            MultiDate Filter
            <DatePicker
              range
              value={dates}
              minDate={new DateObject().toFirstOfMonth()}
              maxDate={new DateObject().add(1, "month").toLastOfMonth()}
              onChange={(dateObjects) => {
                setDates(dateObjects as DateObject[]);
                setAllDates(getAllDatesInRange(dateObjects as DateObject[]));
              }}
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                background: "transparent",
                width: "180px",
                cursor: "pointer",
              }}
              plugins={[<DatePanel eachDaysInRange />]}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🥘 Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 p-6 bg-gray-100">
        {filteredRecipes.map((recipe: Recipe) => (
          <Card key={recipe.id} className="rounded-2xl shadow-lg hover:shadow-xl transition w-full">
            <CardMedia
              component="img"
              height="200"
              image={recipe.image}
              alt={recipe.name}
              className="rounded-t-2xl object-cover"
            />
            <CardContent>
              <Typography variant="h6" component="div" className="font-bold">
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-2 text-gray-600">
                Cuisine: {recipe.cuisine}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-1 text-gray-600">
               {recipe.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-1 text-gray-600">
                {recipe.date}
              </Typography>
              <div className="flex items-center mt-2">
                <Rating value={recipe.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" className="ml-2 text-gray-700">
                  {recipe.rating.toFixed(1)}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRecipes.length === 0 && (
          <Typography variant="body1" color="text.secondary" className="col-span-full text-center py-4">
            No recipes found for selected dates
          </Typography>
        )}
      </div>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, p: 4 }}>
        <BarChart
          xAxis={[{ scaleType: "band", data: cuisineData.map((c) => c.label) }]}
          series={[{ data: cuisineData.map((c) => c.value) }]}
          height={300}
        />

        <PieChart
          series={[
            {
              data: cuisineData.map((c, i) => ({
                id: i,
                value: c.value,
                label: c.label,
              })),
            },
          ]}
          height={300}
        />

        {/* Donut Chart (Ratings) */}
        <PieChart
          series={[
            {
              innerRadius: 60,
              data: ratingData.map((r, i) => ({
                id: i,
                value: r.value,
                label: r.label,
              })),
            },
          ]}
          height={300}
        />
      </Box>
    </>
  );
};

export default SampleCard;
