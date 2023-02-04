import { Grid, Card, Typography, Skeleton } from "@mui/material";
import React from "react";
import {
  useGetAllCategoriesQuery,
  useGetAllVendorsQuery,
} from "redux/api/admin";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { data: category, isLoading: loading } = useGetAllCategoriesQuery();
  const { data: vendor, isLoading: load } = useGetAllVendorsQuery();

  if (loading || load) return <Skeleton />;
  const arr = [
    {
      name: "Total Vendor",
      value: vendor?.total || 0,
      link: "/vendors",
    },
    {
      name: "Total Categories",
      value: category?.length || 0,
      link: "/categories",
    },
    {
      name: "Total Categories",
      value: category?.length || 0,
      link: "/categories",
    },
  ];

  return (
    <Grid item container justifyContent="space-between" sx={{ py: 3 }}>
      {arr?.map((item, index) => (
        <Grid item md={3.5} xs={6} key={index} sx={{ boxShadow: 0 }}>
          <Card
            component={Link}
            variant="outlined"
            to={item.link}
            sx={{
              boxShadow: 2,
              textDecoration: "none",
              p: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "15rem",
              gap: 3,
            }}
          >
            <Typography variant="h4" color="primary" fontWeight={700}>
              {item.name}
            </Typography>
            <Typography variant="h4" sx={{ color: "#e4e6ef" }}>
              {item.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
