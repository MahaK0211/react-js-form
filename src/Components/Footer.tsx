import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#f9fafb", mt: 5, pt: 4, pb: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* About Us Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            About Us
          </Typography>
          <Link href="#" underline="hover" display="block" color="inherit">
            Our Story
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Blog
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Careers
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Press
          </Link>
        </Grid>

        {/* Explore Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Explore
          </Typography>
          <Link href="#" underline="hover" display="block" color="inherit">
            Recipes
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Popular Dishes
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Chefs
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Cooking Tips
          </Link>
        </Grid>

        {/* Services Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Services
          </Typography>
          <Link href="#" underline="hover" display="block" color="inherit">
            Food Delivery
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Meal Plans
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Catering
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Gift Cards
          </Link>
        </Grid>

        {/* Support Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Support
          </Typography>
          <Link href="#" underline="hover" display="block" color="inherit">
            Help Center
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            FAQs
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Contact Us
          </Link>
          <Link href="#" underline="hover" display="block" color="inherit">
            Privacy Policy
          </Link>
        </Grid>
      </Grid>

      {/* Divider + Bottom Section */}
      <Divider sx={{ my: 3 }} />
      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © 2025 FoodiesHub | Built with Material UI
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
