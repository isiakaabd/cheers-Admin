import { Grid, Card, Typography, Skeleton } from "@mui/material";
import {
  useGetAllCategoriesQuery,
  useGetAllVendorsQuery,
  useGetMainVendorsQuery,
} from "redux/api/admin";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { data: category, isLoading: loading } = useGetAllCategoriesQuery();
  const { data: vendors, isLoading } = useGetMainVendorsQuery();
  const { data: vendor, isLoading: load } = useGetAllVendorsQuery();

  if (loading || load || isLoading) return <Skeletons />;
  const arr = [
    {
      name: "Total Users",
      value: vendor?.total || 0,
      link: "/#",
    },
    {
      name: "Global Vendor",
      value: vendor?.total || 0,
      link: "/global-vendors",
    },
    {
      name: "Local Vendor",
      value: vendor?.total || 0,
      link: "/#",
    },
    {
      name: "Total Funded",
      value: category?.length || 0,
      link: "/categories",
    },
    {
      name: "Wishlisted Item",
      value: vendors?.length || 0,
      link: "/vendors",
    },
  ];

  return (
    <Grid item container justifyContent="space-between" gap={3} sx={{ py: 3 }}>
      {arr?.map((item, index) => (
        <Grid item md={3.5} sm={3.5} xs={12} key={index} sx={{ boxShadow: 0 }}>
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
              gap: { md: 3, sm: 1, xs: 3 },
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

function Skeletons() {
  return (
    <Grid item container gap={3} flexWrap={{ md: "nowrap", xs: "wrap" }}>
      {Array(5)
        .fill(undefined)
        .map((item, index) => (
          <Skeleton
            key={index}
            sx={{ height: "15rem", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        ))}
    </Grid>
  );
}
