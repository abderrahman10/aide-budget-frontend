"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { GetParticipantsStatistics } from "./GetParticipantsStatistics";


interface Statistics {
    participated: number;
    revoke: number;
    
  }
  
export default function LineChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const statistics: { [key: string]: Statistics } = await GetParticipantsStatistics();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        if (statistics) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue("--text-color");
          const textColorSecondary = documentStyle.getPropertyValue(
            "--text-color-secondary"
          );
          const surfaceBorder =
            documentStyle.getPropertyValue("--surface-border");
          const data = {
            labels: Object.keys(statistics).map(
              (month) => months[parseInt(month) - 1]
            ),
            datasets: [
              {
                label: "participated",
                data: Object.values(statistics).map(
                  (data) => data.participated
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue("--blue-500"),
                tension: 0.4,
              },
              {
                label: "revoke",
                data: Object.values(statistics).map((data) => data.revoke),
                fill: false,
                borderColor: documentStyle.getPropertyValue("--pink-500"),
                tension: 0.4,
              },
            ],
          };

          const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
              y: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
            },
          };

          setChartData(data);
          setChartOptions(options);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur.
      }
    };
    fetchStatistics();
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
