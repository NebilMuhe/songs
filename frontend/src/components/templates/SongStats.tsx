import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatsRequest } from "../slice/statsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
// import { Bar, ChartOptions } from 'react-chartjs-2';
import { registerables } from "chart.js";
import { Chart } from "chart.js";
import styled from "@emotion/styled";
import LineChart from "../../graphs/LineChart";
import DoughnutChart from "../../graphs/DoughnutChart";
import BarChart from "../../graphs/BarChart";
import ScatterChart from "../../graphs/ScatterChart";
import BarChartSong from "../../graphs/BarChartSong";

interface StatsData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
}

Chart.register(...registerables);

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #f4f4f4;
`;

const GraphContainer = styled.div`
  max-width: 50%;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 30px;
`;

const SongStats = () => {
  // const songs: SongState = useSelector((store: RootState) => store.songs);
  const { stats } = useSelector((store: any) => store.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatsRequest());
  }, [dispatch]);

  if (!stats) return <p>Loading...</p>;

  // const data = {
  //   labels: stats.songsPerGenre.map((stat: { _id: string }) => stat._id),
  //   datasets: [
  //     {
  //       label: "Songs per Genre",
  //       data: stats.songsPerGenre.map((stat: { count: number }) => stat.count),
  //     },
  //   ],
  // };

  // const total = {
  //   labels: ["Total Songs", "Total Artists", "Total Albums"],
  //   datasets: [
  //     {
  //       labels: [`${stats.totalSongs}`, `${stats.artists}`, `${stats.albums}`],
  //       data: [stats.totalSongs, stats.artists, stats.albums],
  //       backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
  //       hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
  //     },
  //   ],
  // };

  // const artist = {
  //   labels: stats.artistStats.map((st: any) => st._id),
  //   datasets: [
  //     {
  //       label: "Songs",
  //       data: stats.artistStats.map((st: any) => st.songs),
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.5)",
  //         "rgba(54, 162, 235, 0.5)",
  //         "rgba(255, 206, 86, 0.5)",
  //         "rgba(75, 192, 192, 0.5)",
  //         "rgba(153, 102, 255, 0.5)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const artist = {
  //   labels: stats.artistStats.map((stat: any) => stat._id),
  //   datasets: [
  //     {
  //       label: "Songs",
  //       data: stats.artistStats.map((stat: any) => stat.songs),
  //       backgroundColor: "rgba(54, 162, 235, 0.5)",
  //       borderColor: "rgba(54, 162, 235, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "Albums",
  //       data: stats.artistStats.map((stat: any) => stat.albums.length),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options: ChartOptions<"bar"> = {
  //   indexAxis: "y",
  //   scales: {
  //     x: {
  //       stacked: true,
  //     },
  //   },
  // };

  // const album = {
  //   labels: stats.albumStats.map((stat: any) => stat._id),
  //   datasets: [
  //     {
  //       label: "Album Count",
  //       data: stats.albumStats.map((stat: any) => stat.count),
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  return (
    <Div>
      <h1>Song Stats Chart</h1>
      {/* <GraphContainer>
        <LineChart />
      </GraphContainer> */}
      <GraphContainer>
        <DoughnutChart />
      </GraphContainer>
      <GraphContainer>
        <BarChart />
      </GraphContainer>
      <GraphContainer>
        <BarChartSong />
      </GraphContainer>
      {/* <GraphContainer>
        <ScatterChart />
      </GraphContainer> */}
      <GraphContainer>
        <h2>Album Stats:</h2>
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Albums</th>
              {/* <th>Songs</th> */}
            </tr>
          </thead>
          <tbody>
            {stats.albumStats.map(
              (stat: {
                _id: string;
                albums: { album: number; songs: number }[];
              }) => (
                <tr key={stat._id}>
                  <td>{stat._id}</td>
                  {/* <td> */}
                  {stat.albums.map((data: { album: number; songs: number }) => (
                    <td key={data.album}>{data.album}</td>
                  ))}
                  {/* </td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      </GraphContainer>
    </Div>
  );

  // return (
  //   <div>
  //     <div style={{ width: "300px", height: "300px", color: "black" }}>
  //       <h2>Total Stats</h2>
  //       <Doughnut data={total} />
  //     </div>
  //     <div>
  //       <h2>Genres:</h2>
  //       <ul>
  //         {stats.genres.map((genre: string) => (
  //           <li key={genre}>{genre}</li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div>
  //       <h2>Songs Per Genre:</h2>
  //       <Bar data={data} />
  //     </div>
  //     {/* <div>
  //       <h2>Artist Stats:</h2>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Artist</th>
  //             <th>Songs</th>
  //             <th>Albums</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {stats.artistStats.map(
  //             (stat: { _id: string; songs: number; albums: string[] }) => (
  //               <tr key={stat._id}>
  //                 <td>{stat._id}</td>
  //                 <td>{stat.songs}</td>
  //                 <td>{stat.albums}</td>
  //               </tr>
  //             )
  //           )}
  //         </tbody>
  //       </table>
  //     </div> */}
  //     {/* <div style={{ width: "500px", height: "300px" }}>
  //       <h2>Artist Stats Pie Chart</h2>
  //       <Pie data={artist} />
  //     </div> */}
  //     <div style={{ width: "500px", height: "300px" }}>
  //       <h2>Artist Stats Chart</h2>
  //       <Bar data={artist} options={options} />
  //     </div>
  //     {/* <div>
  //       <h2>Album Stats:</h2>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Album</th>
  //             <th>Count</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {stats.albumStats.map((stat: { _id: string; count: number }) => (
  //             <tr key={stat._id}>
  //               <td>{stat._id}</td>
  //               <td>{stat.count}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div> */}
  //     <div style={{ width: "500px", height: "300px" }}>
  //       <h2>Album Stats</h2>
  //       <Bar data={album} />
  //     </div>
  //   </div>
  // );
};

export default SongStats;
