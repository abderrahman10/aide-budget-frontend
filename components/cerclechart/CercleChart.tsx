"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import GetStatistics from "./GetStatistics";

export default function CercleChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const statistics = await GetStatistics();
      console.log("zzz", statistics);
      if (statistics) {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: statistics.labels || [
            "participants avec consentement sans relance",
            "participants sans consentement sans relance",
            "participants avec revoke",
            "participants avec consentement apres relance",
            "participants avec relance sans consentement",
          ], // Assurez-vous que votre API renvoie les labels
          datasets: [
            {
              data: statistics.data || [
                statistics.nbr_client_consentement_without_relance,
                statistics.nbr_client_without_consentement_without_relance,
                statistics.nbr_client_revoke,
                statistics.nbr_client_consentement_after_relance,
                statistics.nbr_client_relance_without_consentement,
              ], // Assurez-vous que votre API renvoie les données
              backgroundColor: [
                documentStyle.getPropertyValue("--blue-500"),
                documentStyle.getPropertyValue("--yellow-500"),
                documentStyle.getPropertyValue("--green-500"),
                documentStyle.getPropertyValue("--red-500"),
                documentStyle.getPropertyValue("--pink-500"),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue("--blue-500"),
                documentStyle.getPropertyValue("--yellow-500"),
                documentStyle.getPropertyValue("--green-500"),
                documentStyle.getPropertyValue("--red-500"),
                documentStyle.getPropertyValue("--pink-500"),
              ],
            },
          ],
        };
        setChartData(data);
      }
    };

    fetchStatistics();

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
