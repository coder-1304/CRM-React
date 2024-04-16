import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";
import { useState } from "react";
import axios from "axios";
import { doGet, doPost, getToken } from "../api/callAPI";
import Cookies from "js-cookie";
// import Notification from "../components/toast/Toast";

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);


const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  //   const [charCategories, setChartCategories] = (null);
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState("Loading");
  const [statusInfo, setStatusInfo] = useState([]);

  async function componentDidMount() {
    // setChartData;
    // Make the API call when the component mounts

      // const response = await doGet("rest/services/getSummary");

    // console.log(response);
    
    // const { data } = response.data;

     // Simulate API call response with hardcoded data
     const hardcodedData = {
      data: {
          monthViseOrders: [
              { "Jan": 100 },
              { "Feb": 200 },
              { "Mar": 150 },
              // Add more months as needed
          ],
          completedOrdersCount: 1500,
          completedItemsCount: 3000,
          // Add more data as needed
      }
  };

  // Extract data from the hardcoded response
  const  data  = hardcodedData.data;
 
    let monthViseOrders = data.monthViseOrders;

    const orderMonths = monthViseOrders.map((obj) => Object.keys(obj)[0]);
    const totalOrders = monthViseOrders.map((obj) => Object.values(obj)[0]);

    setStatusInfo([
      {
        icon: "bx bx-shopping-bag",
        count: data.completedOrdersCount,
        title: "Completed Orders",
      },
      {
        icon: "bx bx-cart",
        count: data.completedItemsCount,
        title: "Completed Items",
      },
      {
        icon: "bx bx-dollar-circle",
        count: "$2,632",
        title: "Total income",
      },
      {
        icon: "bx bx-receipt",
        count: "1,711",
        title: "Total orders",
      },
    ]);

    setChartOptions({
      series: [
        {
          name: "Total Completed Orders",
          data: [...totalOrders],
        },
      ],
      options: {
        color: ["#6ab04c", "#2980b9"],
        chart: {
          background: "transparent",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: [...orderMonths],
        },
        legend: {
          position: "top",
        },
        grid: {
          show: false,
        },
      },
    });
    setLoading(false);
    
  }

  useEffect(() => {
    getToken();
    componentDidMount();
  }, []);

  return (
    <>
      {/* <Notification text="Hello, world!" /> */}
      {loading == true ? (
        <div>{loadingContent}</div>
      ) : (
        <div>
          <h2 className="page-header">Dashboard</h2>
          <div className="row">
            <div className="col-6">
              <div className="row">
                {statusInfo.map((item, index) => {
                  console.log(item);
                  return (
                    <div className="col-6" key={index}>
                      <StatusCard
                        icon={item.icon}
                        count={item.count}
                        title={item.title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="card full-height">
                {/* chart */}
                <Chart
                  options={
                    themeReducer === "theme-mode-dark"
                      ? {
                          ...chartOptions.options,
                          theme: { mode: "dark" },
                        }
                      : {
                          ...chartOptions.options,
                          theme: { mode: "light" },
                        }
                  }
                  series={chartOptions.series}
                  type="line"
                  height="100%"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card__header">
                  <h3>top customers</h3>
                </div>
                <div className="card__body">
                  <Table
                    headData={topCustomers.head}
                    renderHead={(item, index) => renderCusomerHead(item, index)}
                    bodyData={topCustomers.body}
                    renderBody={(item, index) => renderCusomerBody(item, index)}
                  />
                </div>
                <div className="card__footer">
                  <Link to="/">view all</Link>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card">
                <div className="card__header">
                  <h3>latest orders</h3>
                </div>
                <div className="card__body">
                  <Table
                    headData={latestOrders.header}
                    renderHead={(item, index) => renderOrderHead(item, index)}
                    bodyData={latestOrders.body}
                    renderBody={(item, index) => renderOrderBody(item, index)}
                  />
                </div>
                <div className="card__footer">
                  <Link to="/">view all</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <></>
  );
};

export default Dashboard;
