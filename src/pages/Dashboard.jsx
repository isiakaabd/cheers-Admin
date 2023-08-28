import { Grid, Card, Typography, Skeleton } from "@mui/material";
import { useGetDashboardAnalyticsQuery } from "redux/api/admin";
import { Link } from "react-router-dom";
import Error from "components/Error";
const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardAnalyticsQuery();

  if (isLoading) return <Skeletons />;
  if (error) return <Error error={error} />;

  const {
    allLocalVendors,
    allUsers,
    totalFundedAmount,
    global_vendors,
    totalFundedItems,
    no_of_unique_wishlist,
  } = data;
  const arr = [
    {
      name: "Total Users",
      value: allUsers || 0,
      link: "/users",
    },
    {
      name: "Global Vendor",
      value: global_vendors || 0,
      link: "/global-vendors",
    },
    {
      name: "Local Vendor",
      value: allLocalVendors || 0,
      link: "/vendors",
    },
    {
      name: "Total Funded",
      value: totalFundedAmount || 0,
      link: "#",
    },
    {
      name: "Total Funded Items",
      value: totalFundedItems || 0,
      link: "#",
    },
    {
      name: "Wishlisted Item",
      value: no_of_unique_wishlist || 0,
      link: "#",
    },
  ];

  return (
    <Grid item container gap={4} sx={{ py: 3 }}>
      {arr?.map((item, index) => (
        <Grid item md={3.5} sm={5} xs={12} key={index} sx={{ boxShadow: 0 }}>
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
            <Typography variant="h4" sx={{ color: "#333" }}>
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
